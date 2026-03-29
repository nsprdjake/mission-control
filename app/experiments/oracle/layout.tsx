import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Desert Oracle - Mystical Advice Engine',
  description: 'Consult the mystical desert cactus for cryptic wisdom, practical truths, and desert facts.',
  openGraph: {
    title: 'Desert Oracle - Mystical Advice Engine',
    description: 'Consult the mystical desert cactus for cryptic wisdom, practical truths, and desert facts.',
    type: 'website',
  },
};

export default function OracleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
