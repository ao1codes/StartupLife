import { StartupIdea, GameEvent, Achievement, GameState } from '../../../shared/schema';

export const STARTUP_IDEAS: StartupIdea[] = [
  {
    id: 'social-pets',
    name: 'PetSpace',
    description: 'Social media for pets! Because humans are boring.',
    emoji: '🐕',
    color: 'text-marker-blue',
    bgColor: 'bg-blue-50',
    baseStats: { funding: 100, team: 2, hype: 30, progress: 10 },
    industry: 'Social Media',
    difficulty: 'easy'
  },
  {
    id: 'crypto-food',
    name: 'FoodCoin',
    description: 'Blockchain-powered food delivery with NFT receipts',
    emoji: '🍕',
    color: 'text-highlighter',
    bgColor: 'bg-yellow-50',
    baseStats: { funding: 200, team: 1, hype: 60, progress: 5 },
    industry: 'Crypto/Food',
    difficulty: 'hard'
  },
  {
    id: 'ai-dating',
    name: 'LoveBot',
    description: 'AI that writes your dating profile AND your breakup texts',
    emoji: '🤖',
    color: 'text-red-pen',
    bgColor: 'bg-red-50',
    baseStats: { funding: 150, team: 3, hype: 40, progress: 15 },
    industry: 'AI/Dating',
    difficulty: 'medium'
  },
  {
    id: 'vr-meditation',
    name: 'ZenVR',
    description: 'Virtual reality meditation in imaginary places',
    emoji: '🧘',
    color: 'text-purple-marker',
    bgColor: 'bg-purple-50',
    baseStats: { funding: 80, team: 2, hype: 25, progress: 20 },
    industry: 'VR/Wellness',
    difficulty: 'medium'
  },
  {
    id: 'drone-coffee',
    name: 'CoffeeDrone',
    description: 'Drone delivery for coffee addicts in withdrawal',
    emoji: '☕',
    color: 'text-green-pen',
    bgColor: 'bg-green-50',
    baseStats: { funding: 300, team: 4, hype: 50, progress: 25 },
    industry: 'Delivery/Hardware',
    difficulty: 'hard'
  },
  {
    id: 'plant-whisperer',
    name: 'PlantChat',
    description: 'App that translates plant needs into human complaints',
    emoji: '🌱',
    color: 'text-green-pen',
    bgColor: 'bg-green-50',
    baseStats: { funding: 60, team: 1, hype: 20, progress: 30 },
    industry: 'IoT/Gardening',
    difficulty: 'easy'
  }
];

export const GAME_EVENTS: GameEvent[] = [
  // Early Stage Events
  {
    id: 'first-user',
    title: 'First User Alert!',
    description: 'Someone actually signed up! They might be your mom, but it still counts.',
    emoji: '🎉',
    type: 'milestone',
    triggerConditions: { minRound: 1, maxRound: 3 },
    weight: 10,
    choices: [
      {
        id: 'celebrate',
        text: '🍾 Throw a party (population: 3)',
        emoji: '🎊',
        consequences: { hype: 10, stress: -5 },
        flavor: 'You bought a cake and ate it alone while crying happy tears.',
        animation: 'bounce'
      },
      {
        id: 'focus',
        text: '💻 Get back to coding',
        emoji: '👨‍💻',
        consequences: { progress: 15, stress: 5 },
        flavor: 'One user down, 7 billion to go. Time to hustle.',
        animation: 'wiggle'
      },
      {
        id: 'analyze',
        text: '📊 Analyze user behavior obsessively',
        emoji: '🔍',
        consequences: { progress: 5, stress: 10 },
        flavor: 'You spent 6 hours creating charts for 1 data point.',
        animation: 'shake'
      }
    ]
  },
  
  {
    id: 'coffee-crisis',
    title: 'The Great Coffee Crisis',
    description: "You're out of coffee. This is NOT a drill. The fate of your startup hangs in the balance.",
    emoji: '☕',
    type: 'crisis',
    triggerConditions: { minRound: 2, maxRound: 8 },
    weight: 8,
    choices: [
      {
        id: 'emergency-run',
        text: '🏃‍♂️ Emergency coffee run',
        emoji: '🚨',
        consequences: { progress: -5, stress: -20 },
        flavor: 'You sprinted to the coffee shop like your life depended on it. Because it did.',
        animation: 'bounce'
      },
      {
        id: 'switch-tea',
        text: '🍵 Switch to tea like a civilized person',
        emoji: '🫖',
        consequences: { progress: 10, hype: -5 },
        flavor: 'Your code quality improved, but your street cred plummeted.',
        animation: 'wiggle'
      },
      {
        id: 'energy-drinks',
        text: '⚡ Embrace the energy drink lifestyle',
        emoji: '🥤',
        consequences: { progress: 20, stress: 30 },
        flavor: 'You can see through time now, but your heart might explode.',
        animation: 'shake'
      }
    ]
  },

  {
    id: 'investor-meeting',
    title: 'Investor Meeting',
    description: 'A mysterious investor wants to meet. They could be your savior or your doom.',
    emoji: '💰',
    type: 'opportunity',
    triggerConditions: { minRound: 3, minHype: 20 },
    weight: 7,
    choices: [
      {
        id: 'professional',
        text: '👔 Be professional and prepared',
        emoji: '📋',
        consequences: { funding: 200, stress: 10 },
        flavor: 'You nailed it! They were impressed by your actual business plan.',
        animation: 'bounce'
      },
      {
        id: 'wing-it',
        text: '🎭 Wing it with pure charisma',
        emoji: '✨',
        consequences: { funding: 100, hype: 20 },
        flavor: 'You convinced them with interpretive dance. Somehow.',
        animation: 'wiggle'
      },
      {
        id: 'honesty',
        text: '😅 Be brutally honest about everything',
        emoji: '💯',
        consequences: { funding: 50, hype: 10, stress: -10 },
        flavor: 'They appreciated your honesty. And your self-deprecating humor.',
        animation: 'shake'
      }
    ]
  },

  {
    id: 'server-crash',
    title: 'Server Meltdown',
    description: 'Your server is on fire. Not metaphorically. Literally. (Just kidding, but it feels like it.)',
    emoji: '🔥',
    type: 'crisis',
    triggerConditions: { minRound: 4, requiresProgress: 30 },
    weight: 6,
    choices: [
      {
        id: 'all-nighter',
        text: '🌙 Pull an all-nighter to fix it',
        emoji: '💻',
        consequences: { progress: 25, stress: 40 },
        flavor: 'You fixed it at 4 AM. Your neighbors hate you but your users love you.',
        animation: 'shake'
      },
      {
        id: 'hire-expert',
        text: '🆘 Hire an expert (expensive but effective)',
        emoji: '💸',
        consequences: { funding: -100, progress: 30, stress: -10 },
        flavor: 'Problem solved in 2 hours. Your wallet is lighter but your sanity is intact.',
        animation: 'bounce'
      },
      {
        id: 'ignore-it',
        text: '🤷‍♂️ Maybe it will fix itself?',
        emoji: '🤞',
        consequences: { progress: -20, hype: -30 },
        flavor: 'Spoiler alert: It did not fix itself. Users are angry.',
        animation: 'wiggle'
      }
    ]
  },

  {
    id: 'viral-moment',
    title: 'Viral Moment!',
    description: 'Someone famous just mentioned your app! The internet is paying attention.',
    emoji: '📱',
    type: 'opportunity',
    triggerConditions: { minRound: 5, minHype: 40 },
    weight: 5,
    choices: [
      {
        id: 'ride-wave',
        text: '🏄‍♂️ Ride the wave with more content',
        emoji: '📸',
        consequences: { hype: 40, stress: 20 },
        flavor: 'You became a meme template. Fame is weird.',
        animation: 'bounce'
      },
      {
        id: 'scale-servers',
        text: '📈 Scale servers immediately',
        emoji: '💻',
        consequences: { funding: -50, progress: 20, hype: 20 },
        flavor: 'You handled the traffic like a pro. Users are impressed.',
        animation: 'wiggle'
      },
      {
        id: 'panic-mode',
        text: '😱 Panic and do nothing',
        emoji: '🫨',
        consequences: { hype: -10, stress: 30 },
        flavor: 'You watched helplessly as your servers melted. Lesson learned.',
        animation: 'shake'
      }
    ]
  },

  {
    id: 'competitor-launch',
    title: 'Competitor Alert!',
    description: 'A big company just launched something eerily similar to your idea. Coincidence?',
    emoji: '🥊',
    type: 'crisis',
    triggerConditions: { minRound: 6, minHype: 50 },
    weight: 6,
    choices: [
      {
        id: 'pivot-feature',
        text: '🔄 Pivot to a unique feature',
        emoji: '💡',
        consequences: { progress: 30, hype: 15 },
        flavor: 'You found your secret sauce. Take that, big corporation!',
        animation: 'bounce'
      },
      {
        id: 'price-war',
        text: '💰 Start a price war',
        emoji: '⚔️',
        consequences: { funding: -100, hype: 25 },
        flavor: 'You went nuclear. Users love free stuff.',
        animation: 'shake'
      },
      {
        id: 'ignore-them',
        text: '😎 Ignore them and focus on your vision',
        emoji: '🎯',
        consequences: { progress: 20, stress: -10 },
        flavor: 'Zen mode activated. You stayed true to your vision.',
        animation: 'wiggle'
      }
    ]
  },

  {
    id: 'team-drama',
    title: 'Office Drama',
    description: 'Your co-founder wants to add blockchain to everything. EVERYTHING.',
    emoji: '🎭',
    type: 'crisis',
    triggerConditions: { minRound: 7, minTeam: 2 },
    weight: 5,
    choices: [
      {
        id: 'compromise',
        text: '🤝 Find a compromise',
        emoji: '⚖️',
        consequences: { progress: 10, stress: 5 },
        flavor: 'You agreed to blockchain cat photos. Modern problems require modern solutions.',
        animation: 'wiggle'
      },
      {
        id: 'put-foot-down',
        text: '👠 Put your foot down',
        emoji: '🚫',
        consequences: { progress: 20, team: -1, stress: 20 },
        flavor: 'You won the argument but lost a friend. Leadership is lonely.',
        animation: 'shake'
      },
      {
        id: 'let-them-lead',
        text: '🎪 Let them take the lead',
        emoji: '🎨',
        consequences: { progress: -10, hype: 30 },
        flavor: 'Everything is blockchain now. Users are confused but intrigued.',
        animation: 'bounce'
      }
    ]
  },

  {
    id: 'acquisition-offer',
    title: 'Acquisition Offer',
    description: 'Google wants to buy your company. For a LOT of money. But also your soul.',
    emoji: '💎',
    type: 'opportunity',
    triggerConditions: { minRound: 8, minFunding: 500 },
    weight: 4,
    choices: [
      {
        id: 'accept-offer',
        text: '💰 Take the money and run',
        emoji: '🏃‍♂️',
        consequences: { funding: 10000 },
        flavor: 'You\'re rich! But you\'ll always wonder "what if..."',
        animation: 'bounce',
        unlocks: ['early-exit']
      },
      {
        id: 'negotiate',
        text: '🤝 Negotiate for more',
        emoji: '💼',
        consequences: { funding: 500, stress: 30 },
        flavor: 'You played hardball. They respect you more but the deal is shakier.',
        animation: 'shake'
      },
      {
        id: 'refuse',
        text: '🚫 Refuse and stay independent',
        emoji: '🦅',
        consequences: { hype: 50, stress: 20 },
        flavor: 'You chose freedom over money. The startup world is buzzing.',
        animation: 'wiggle'
      }
    ]
  },

  {
    id: 'burnout-warning',
    title: 'Burnout Alert',
    description: 'You haven\'t slept in 72 hours. Your reflection is giving you concerned looks.',
    emoji: '😵',
    type: 'crisis',
    triggerConditions: { minRound: 9 },
    weight: 7,
    choices: [
      {
        id: 'vacation',
        text: '🏖️ Take a vacation',
        emoji: '🌴',
        consequences: { progress: -20, stress: -50 },
        flavor: 'You remembered what sunlight feels like. Revolutionary.',
        animation: 'bounce'
      },
      {
        id: 'power-through',
        text: '💪 Power through with more caffeine',
        emoji: '⚡',
        consequences: { progress: 30, stress: 40 },
        flavor: 'You can taste colors now. This can\'t be healthy.',
        animation: 'shake'
      },
      {
        id: 'delegate',
        text: '👥 Delegate and trust your team',
        emoji: '🤝',
        consequences: { team: 1, stress: -20, progress: 10 },
        flavor: 'Your team stepped up. Who knew delegation was a superpower?',
        animation: 'wiggle'
      }
    ]
  },

  {
    id: 'final-presentation',
    title: 'The Big Pitch',
    description: 'This is it. The presentation that will make or break your startup.',
    emoji: '🎯',
    type: 'milestone',
    triggerConditions: { minRound: 10 },
    weight: 8,
    choices: [
      {
        id: 'perfect-pitch',
        text: '✨ Deliver the perfect pitch',
        emoji: '🎪',
        consequences: { funding: 1000, hype: 60 },
        flavor: 'You nailed it. Even you were impressed by yourself.',
        animation: 'bounce'
      },
      {
        id: 'wing-it-again',
        text: '🎭 Wing it with interpretive dance',
        emoji: '💃',
        consequences: { hype: 80, funding: 200 },
        flavor: 'They didn\'t understand your business, but they loved your moves.',
        animation: 'wiggle'
      },
      {
        id: 'honest-truth',
        text: '💯 Tell the brutal honest truth',
        emoji: '😅',
        consequences: { funding: 300, stress: -30 },
        flavor: 'Your vulnerability was your strength. They invested in YOU.',
        animation: 'shake'
      }
    ]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-steps',
    name: 'Baby Steps',
    description: 'Selected your first startup idea',
    emoji: '👶',
    condition: (state: GameState) => state.selectedIdea !== null,
    hidden: false
  },
  {
    id: 'coffee-addict',
    name: 'Coffee Addict',
    description: 'Experienced a coffee crisis',
    emoji: '☕',
    condition: (state: GameState) => state.eventHistory.some((e: any) => e.event.id === 'coffee-crisis'),
    hidden: false
  },
  {
    id: 'viral-star',
    name: 'Internet Famous',
    description: 'Went viral at least once',
    emoji: '⭐',
    condition: (state: GameState) => state.eventHistory.some((e: any) => e.event.id === 'viral-moment'),
    hidden: false
  },
  {
    id: 'funding-king',
    name: 'Money Magnet',
    description: 'Raised over $1,000 in funding',
    emoji: '💰',
    condition: (state: GameState) => state.stats.funding >= 1000,
    hidden: false
  },
  {
    id: 'team-builder',
    name: 'People Person',
    description: 'Built a team of 10+ people',
    emoji: '👥',
    condition: (state: GameState) => state.stats.team >= 10,
    hidden: false
  },
  {
    id: 'hype-master',
    name: 'Hype Master',
    description: 'Reached maximum hype (100)',
    emoji: '🔥',
    condition: (state: GameState) => state.stats.hype >= 100,
    hidden: false
  },
  {
    id: 'survivor',
    name: 'Survivor',
    description: 'Completed the game with high stress',
    emoji: '🏆',
    condition: (state: GameState) => state.stats.stress >= 80 && state.currentRound >= 12,
    hidden: false
  },
  {
    id: 'zen-master',
    name: 'Zen Master',
    description: 'Completed the game with low stress',
    emoji: '🧘',
    condition: (state: GameState) => state.stats.stress <= 20 && state.currentRound >= 12,
    hidden: false
  },
  {
    id: 'early-exit',
    name: 'Early Retirement',
    description: 'Got acquired early in the game',
    emoji: '🏖️',
    condition: (state: GameState) => state.unlockedContent.includes('early-exit'),
    hidden: true
  },
  {
    id: 'chaos-master',
    name: 'Chaos Master',
    description: 'Made the most chaotic choices possible',
    emoji: '🌪️',
    condition: (state: GameState) => {
      const chaoticChoices = state.eventHistory.filter((e: any) => 
        e.choice.id.includes('wing-it') || 
        e.choice.id.includes('panic') || 
        e.choice.id.includes('ignore')
      );
      return chaoticChoices.length >= 5;
    },
    hidden: true
  }
];

export const EASTER_EGGS = [
  {
    id: 'konami',
    name: 'Konami Code',
    description: 'Enter the Konami code during gameplay',
    reward: 'Unlock cheat mode',
    code: 'ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight KeyB KeyA'
  },
  {
    id: 'triple-click',
    name: 'Triple Click',
    description: 'Triple-click on your startup name',
    reward: 'Secret animation',
    trigger: 'triple-click-name'
  },
  {
    id: 'midnight-oil',
    name: 'Midnight Oil',
    description: 'Play the game at 3 AM',
    reward: 'Special late-night event',
    trigger: 'time-based'
  }
];