// Shared schema for StartupLife game
import { z } from 'zod';

// Core game types
export const StartupIdeaSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  emoji: z.string(),
  color: z.string(),
  bgColor: z.string(),
  baseStats: z.object({
    funding: z.number(),
    team: z.number(),
    hype: z.number(),
    progress: z.number(),
  }),
  industry: z.string(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
});

export const EventChoiceSchema = z.object({
  id: z.string(),
  text: z.string(),
  emoji: z.string(),
  consequences: z.object({
    funding: z.number().optional(),
    team: z.number().optional(),
    hype: z.number().optional(),
    progress: z.number().optional(),
    stress: z.number().optional(),
  }),
  flavor: z.string(),
  animation: z.string().optional(),
  unlocks: z.array(z.string()).optional(),
  hiddenConsequences: z.record(z.union([z.number(), z.string(), z.boolean()])).optional(),
  delayedConsequences: z.array(z.object({
    rounds: z.number(),
    effects: z.record(z.number()),
    message: z.string(),
  })).optional(),
});

export const GameEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  emoji: z.string(),
  type: z.enum(['crisis', 'opportunity', 'milestone', 'surprise']),
  choices: z.array(EventChoiceSchema),
  triggerConditions: z.object({
    minRound: z.number().optional(),
    maxRound: z.number().optional(),
    minFunding: z.number().optional(),
    maxFunding: z.number().optional(),
    minHype: z.number().optional(),
    minTeam: z.number().optional(),
    requiresProgress: z.number().optional(),
    startupType: z.string().optional(),
    requiresHiddenStat: z.string().optional(),
  }).optional(),
  weight: z.number(),
});



export const GameStateSchema = z.object({
  currentRound: z.number(),
  maxRounds: z.number(),
  gamePhase: z.enum(['idea', 'building', 'scaling', 'endgame']),
  selectedIdea: StartupIdeaSchema.nullable(),
  stats: z.object({
    funding: z.number(),
    team: z.number(),
    hype: z.number(),
    progress: z.number(),
    stress: z.number(),
  }),
  eventHistory: z.array(z.object({
    event: GameEventSchema,
    choice: EventChoiceSchema,
    round: z.number(),
  })),
  achievements: z.array(z.string()),
  unlockedContent: z.array(z.string()),
  secretsFound: z.array(z.string()),
  specialEvents: z.array(z.string()),
  ending: z.object({
    type: z.enum(['unicorn', 'successful', 'pivot', 'failure', 'acquired', 'burnout']),
    title: z.string(),
    description: z.string(),
    emoji: z.string(),
    score: z.number(),
  }).nullable(),
});

// Export types
export type StartupIdea = z.infer<typeof StartupIdeaSchema>;
export type EventChoice = z.infer<typeof EventChoiceSchema>;
export type GameEvent = z.infer<typeof GameEventSchema>;

export type GameState = z.infer<typeof GameStateSchema>;

// Game utility functions
export function createInitialGameState(): GameState {
  return {
    currentRound: 1,
    maxRounds: 12,
    gamePhase: 'idea',
    selectedIdea: null,
    stats: {
      funding: 50,
      team: 1,
      hype: 10,
      progress: 0,
      stress: 0,
    },
    eventHistory: [],
    achievements: [],
    unlockedContent: [],
    secretsFound: [],
    specialEvents: [],
    ending: null,
  };
}

export function calculatePhase(round: number): 'idea' | 'building' | 'scaling' | 'endgame' {
  if (round <= 2) return 'idea';
  if (round <= 6) return 'building';
  if (round <= 10) return 'scaling';
  return 'endgame';
}

export function calculateStress(stats: GameState['stats']): number {
  const { funding, team, hype, progress } = stats;
  let stress = 0;

  if (funding < 100) stress += 20;
  if (team < 3) stress += 15;
  if (hype < 30) stress += 10;
  if (progress < 20) stress += 25;

  return Math.min(stress, 100);
}