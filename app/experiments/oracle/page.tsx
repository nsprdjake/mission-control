'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LandingScreen } from './LandingScreen';
import { FortuneScreen } from './FortuneScreen';
import { DesertGradient } from './DesertGradient';
import { getRandomFortune, Fortune } from './fortunes';

function OracleContent() {
  const searchParams = useSearchParams();
  const [screen, setScreen] = useState<'landing' | 'fortune'>('landing');
  const [currentFortune, setCurrentFortune] = useState<Fortune | null>(null);

  useEffect(() => {
    // Check for shared fortune ID in URL
    const fortuneId = searchParams.get('f');
    if (fortuneId) {
      const fortune = getRandomFortune(fortuneId);
      setCurrentFortune(fortune);
      setScreen('fortune');
    }
  }, [searchParams]);

  const handleConsult = () => {
    const fortune = getRandomFortune();
    setCurrentFortune(fortune);
    setScreen('fortune');
  };

  const handleConsultAgain = () => {
    setScreen('landing');
    setTimeout(() => {
      handleConsult();
    }, 500);
  };

  return (
    <>
      <DesertGradient state={screen}>
        {screen === 'landing' ? (
          <LandingScreen onConsult={handleConsult} />
        ) : currentFortune ? (
          <FortuneScreen
            fortune={currentFortune.text}
            fortuneId={currentFortune.id}
            onConsultAgain={handleConsultAgain}
          />
        ) : null}
      </DesertGradient>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}

export default function DesertOracle() {
  return (
    <Suspense fallback={<div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(180deg, #4A3B5C 0%, #8A9A5B 50%, #D2691E 100%)' }} />}>
      <OracleContent />
    </Suspense>
  );
}
