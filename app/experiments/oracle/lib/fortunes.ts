export interface Fortune {
  id: string;
  text: string;
  category: 'cryptic' | 'practical' | 'desert' | 'rare';
  rarity: 'common' | 'uncommon' | 'rare';
}

export const FORTUNES: Fortune[] = [
  // CRYPTIC - COMMON (8)
  {
    id: 'c1',
    text: 'The coyote watches but never crosses at rush hour.',
    category: 'cryptic',
    rarity: 'common',
  },
  {
    id: 'c2',
    text: 'Even the oldest Joshua tree started as a small yes.',
    category: 'cryptic',
    rarity: 'common',
  },
  {
    id: 'c3',
    text: 'The desert keeps no schedule. The stars keep every promise.',
    category: 'cryptic',
    rarity: 'common',
  },
  {
    id: 'c4',
    text: 'The mirage knows what you need before you do.',
    category: 'cryptic',
    rarity: 'common',
  },
  {
    id: 'c5',
    text: 'The sidewinder moves forward by going sideways.',
    category: 'cryptic',
    rarity: 'common',
  },
  {
    id: 'c6',
    text: 'The canyon echoes what you whispered last Tuesday.',
    category: 'cryptic',
    rarity: 'common',
  },
  {
    id: 'c7',
    text: 'The dust devil dances when no one is watching.',
    category: 'cryptic',
    rarity: 'common',
  },
  {
    id: 'c8',
    text: 'The moon cactus blooms only for those who forget to look.',
    category: 'cryptic',
    rarity: 'common',
  },

  // PRACTICAL - COMMON (8)
  {
    id: 'p1',
    text: 'Your Slack notifications are not emergencies. The ER has emergencies.',
    category: 'practical',
    rarity: 'common',
  },
  {
    id: 'p2',
    text: 'The meeting could have been an email. The email could have been nothing.',
    category: 'practical',
    rarity: 'common',
  },
  {
    id: 'p3',
    text: 'Inbox zero is a mirage. Inbox managed is an oasis.',
    category: 'practical',
    rarity: 'common',
  },
  {
    id: 'p4',
    text: 'The desert bloom waits years for rain. Your inbox can wait until tomorrow.',
    category: 'practical',
    rarity: 'common',
  },
  {
    id: 'p5',
    text: "The roadrunner doesn't look back. Neither should you at that meeting.",
    category: 'practical',
    rarity: 'common',
  },
  {
    id: 'p6',
    text: 'The coffee is hot. The email is not urgent. Choose warmth.',
    category: 'practical',
    rarity: 'common',
  },
  {
    id: 'p7',
    text: 'The calendar invites multiply like rabbits. Decline is also an answer.',
    category: 'practical',
    rarity: 'common',
  },
  {
    id: 'p8',
    text: 'The to-do list grows. The hours do not. Prioritize.',
    category: 'practical',
    rarity: 'common',
  },

  // DESERT FACTS - COMMON (6)
  {
    id: 'd1',
    text: 'The creosote bush can live 11,000 years by cloning itself. Your side project can wait until Monday.',
    category: 'desert',
    rarity: 'common',
  },
  {
    id: 'd2',
    text: 'Desert tortoises can hold their breath for months. You can hold your response for an hour.',
    category: 'desert',
    rarity: 'common',
  },
  {
    id: 'd3',
    text: 'Roadrunners can run 26 mph. Your career is not a sprint.',
    category: 'desert',
    rarity: 'common',
  },
  {
    id: 'd4',
    text: 'The saguaro takes 10 years to grow an inch. Slow progress is still progress.',
    category: 'desert',
    rarity: 'common',
  },
  {
    id: 'd5',
    text: 'The kangaroo rat never drinks water. You should probably hydrate.',
    category: 'desert',
    rarity: 'common',
  },
  {
    id: 'd6',
    text: 'The desert rain evaporates before hitting the ground. Document your wins before they vanish.',
    category: 'desert',
    rarity: 'common',
  },

  // UNCOMMON (3)
  {
    id: 'u1',
    text: 'The petroglyph waited 2,000 years to be understood. Your idea can wait one more day.',
    category: 'cryptic',
    rarity: 'uncommon',
  },
  {
    id: 'u2',
    text: 'The desert teaches patience. Your smartphone teaches urgency. One of them is lying.',
    category: 'practical',
    rarity: 'uncommon',
  },
  {
    id: 'u3',
    text: 'The haboob dust storm travels 60 miles. Your notification travels 60 feet. Scale accordingly.',
    category: 'desert',
    rarity: 'uncommon',
  },

  // RARE (1)
  {
    id: 'r1',
    text: "You are reading this at exactly the right time. Or the wrong time. The desert doesn't judge.",
    category: 'rare',
    rarity: 'rare',
  },
];

/**
 * Get a fortune by ID, or get a random fortune with rarity weights:
 * - 1% rare
 * - 9% uncommon
 * - 90% common
 */
export function getFortune(fortuneId?: string): Fortune {
  // If specific fortune requested, return it
  if (fortuneId) {
    const fortune = FORTUNES.find((f) => f.id === fortuneId);
    if (fortune) return fortune;
  }

  // Random fortune with weighted rarity
  const roll = Math.random() * 100;

  if (roll < 1) {
    // 1% chance for rare
    const rareFortunes = FORTUNES.filter((f) => f.rarity === 'rare');
    return rareFortunes[0] || FORTUNES[0];
  } else if (roll < 10) {
    // 9% chance for uncommon
    const uncommonFortunes = FORTUNES.filter((f) => f.rarity === 'uncommon');
    return uncommonFortunes[Math.floor(Math.random() * uncommonFortunes.length)];
  } else {
    // 90% chance for common
    const commonFortunes = FORTUNES.filter((f) => f.rarity === 'common');
    return commonFortunes[Math.floor(Math.random() * commonFortunes.length)];
  }
}
