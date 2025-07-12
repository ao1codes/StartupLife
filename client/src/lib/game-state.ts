// Import types from shared schema

import type { StartupIdea, GameEvent, EventChoice, Achievement, GameState } from '../../../shared/schema';
export type { StartupIdea, GameEvent, EventChoice, Achievement, GameState };

export {
  createInitialGameState,
  calculatePhase,
  calculateStress
} from '../../../shared/schema';

// Game utility functions specific to frontend
export function getRandomEvents(state: GameState, availableEvents: GameEvent[]): GameEvent[] {
  const currentRound = state.currentRound;
  const { funding, team, hype, progress } = state.stats;

  // Get list of events we've already seen
  const seenEventIds = state.eventHistory.map(entry => entry.event.id);

  // Filter events based on trigger conditions and prevent immediate repetition
  const eligibleEvents = availableEvents.filter(event => {
    const conditions = event.triggerConditions;

    // Basic condition checks
    if (conditions) {
      if (conditions.minRound && currentRound < conditions.minRound) return false;
      if (conditions.maxRound && currentRound > conditions.maxRound) return false;
      if (conditions.minFunding && funding < conditions.minFunding) return false;
      if (conditions.maxFunding && funding > conditions.maxFunding) return false;
      if (conditions.minHype && hype < conditions.minHype) return false;
      if (conditions.minTeam && team < conditions.minTeam) return false;
      if (conditions.requiresProgress && progress < conditions.requiresProgress) return false;
    }

    // Prevent showing the same event too frequently
    const lastSeenRound = state.eventHistory.findIndex(entry => entry.event.id === event.id);
    if (lastSeenRound !== -1 && (state.eventHistory.length - lastSeenRound) < 3) {
      return false; // Don't show events seen in the last 3 rounds
    }

    return true;
  });

  // If no eligible events after filtering, allow some repetition but prefer unseen events
  let finalEvents = eligibleEvents;
  if (finalEvents.length === 0) {
    finalEvents = availableEvents.filter(event => {
      const conditions = event.triggerConditions;
      if (conditions) {
        if (conditions.minRound && currentRound < conditions.minRound) return false;
        if (conditions.maxRound && currentRound > conditions.maxRound) return false;
        if (conditions.minFunding && funding < conditions.minFunding) return false;
        if (conditions.maxFunding && funding > conditions.maxFunding) return false;
        if (conditions.minHype && hype < conditions.minHype) return false;
        if (conditions.minTeam && team < conditions.minTeam) return false;
        if (conditions.requiresProgress && progress < conditions.requiresProgress) return false;
      }
      return true;
    });
  }

  if (finalEvents.length === 0) return [];

  // Boost weight for unseen events
  const eventsWithAdjustedWeights = finalEvents.map(event => ({
    ...event,
    adjustedWeight: seenEventIds.includes(event.id) ? event.weight * 0.3 : event.weight * 1.5
  }));

  // Weighted random selection with adjusted weights
  const totalWeight = eventsWithAdjustedWeights.reduce((sum, event) => sum + event.adjustedWeight, 0);
  if (totalWeight === 0) return finalEvents.slice(0, 1);

  const randomValue = Math.random() * totalWeight;
  let currentWeight = 0;

  for (const event of eventsWithAdjustedWeights) {
    currentWeight += event.adjustedWeight;
    if (randomValue <= currentWeight) {
      return [event];
    }
  }

  return finalEvents.slice(0, 1);
}