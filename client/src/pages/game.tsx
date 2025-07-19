import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import SketchyCard from "@/components/ui/sketchy-card";
import SpeechBubble from "@/components/ui/speech-bubble";
import StatBar from "@/components/ui/stat-bar";
import EventCard from "@/components/ui/event-card";
import MentorCard from "@/components/ui/mentor-card";
import { 
  GameState, 
  createInitialGameState, 
  StartupIdea, 
  GameEvent, 
  EventChoice,
  calculatePhase,
  calculateStress,
  getRandomEvents
} from "@/lib/game-state";
import { STARTUP_IDEAS, GAME_EVENTS } from "@/lib/game-data";
import { soundManager } from "@/lib/sound-manager";

export default function GamePage() {
  const [, navigate] = useLocation();
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [showChoiceResult, setShowChoiceResult] = useState(false);
  const [lastChoiceResult, setLastChoiceResult] = useState<{
    choice: EventChoice;
    flavor: string;
  } | null>(null);
  

  

  // Initialize or advance to next round
  const advanceRound = useCallback(() => {
    setGameState((prev: GameState) => {
      const newState = {
        ...prev,
        currentRound: prev.currentRound + 1,
        gamePhase: calculatePhase(prev.currentRound + 1),
        stats: {
          ...prev.stats
        }
      };

      // Check for game end
      if (newState.currentRound > newState.maxRounds) {
        newState.ending = calculateEnding(newState);
        // Play ending sound based on result
        setTimeout(() => {
          if (newState.ending?.type === 'unicorn' || newState.ending?.type === 'successful') {
            soundManager.play('success');
          } else {
            soundManager.play('gameOver');
          }
        }, 500);
        return newState;
      }

      // Get next event
      const availableEvents = getRandomEvents(newState, GAME_EVENTS);
      if (availableEvents.length > 0) {
        setCurrentEvent(availableEvents[0]);
      }

      return newState;
    });
  }, []);

  // Calculate final ending
  const calculateEnding = (state: GameState) => {
    const { funding, team, hype, progress, stress } = state.stats;
    const totalScore = funding + team * 10 + hype + progress - stress;

    // Check critical failures first (these override success)
    if (stress >= 90) {
      return {
        type: 'burnout' as const,
        title: '😵 Burnout!',
        description: 'You burned out spectacularly. At least you have great stories for therapy.',
        emoji: '🔥',
        score: totalScore
      };
    }

    // Check for early acquisition (special ending)
    if (state.unlockedContent.includes('early-exit')) {
      return {
        type: 'acquired' as const,
        title: '💰 Acquired!',
        description: 'You sold your startup and retired early. Some call it giving up, you call it winning.',
        emoji: '🏖️',
        score: totalScore
      };
    }

    // Check success conditions (best to worst)
    if (funding >= 5000 && hype >= 80 && progress >= 80) {
      return {
        type: 'unicorn' as const,
        title: '🦄 Unicorn Status!',
        description: 'You did it! Your startup is now worth billions. You\'re the next Steve Jobs, except cooler.',
        emoji: '🦄',
        score: totalScore
      };
    } else if (funding >= 1000 && progress >= 60) {
      return {
        type: 'successful' as const,
        title: '🎉 Startup Success!',
        description: 'Your startup is profitable and growing. You\'re not changing the world, but you\'re paying the bills!',
        emoji: '📈',
        score: totalScore
      };
    } 
    
    // Check moderate failures
    else if (stress >= 80) {
      return {
        type: 'burnout' as const,
        title: '😵 Burnout!',
        description: 'You burned out spectacularly. At least you have great stories for therapy.',
        emoji: '🔥',
        score: totalScore
      };
    } else if (progress < 30) {
      return {
        type: 'failure' as const,
        title: '💥 Epic Failure!',
        description: 'Your startup crashed and burned. But hey, failure is just success in progress, right?',
        emoji: '💥',
        score: totalScore
      };
    } 
    
    // Default ending for middle-ground results
    else {
      return {
        type: 'pivot' as const,
        title: '🔄 Pivot Master!',
        description: 'After multiple pivots, you found your niche. Your original idea was terrible, but persistence paid off!',
        emoji: '🎯',
        score: totalScore
      };
    }
  };

  const handleRestartGame = () => {
    soundManager.play('click');
    setGameState(createInitialGameState());
    setCurrentEvent(null);
    setShowChoiceResult(false);
    setLastChoiceResult(null);
    navigate("/");
  };

  const handleSelectIdea = (idea: StartupIdea) => {
    soundManager.play('startup');
    setGameState((prev: GameState) => {
      const newState = {
        ...prev,
        selectedIdea: idea,
        gamePhase: 'building' as const,
        stats: {
          ...prev.stats,
          ...idea.baseStats
        }
      };
      return newState;
    });
    // Start first event after a delay
    setTimeout(() => {
      advanceRound();
    }, 1000);
  };

  const handleChoiceSelect = (choice: EventChoice) => {
    if (!currentEvent || showChoiceResult) return;

    // Play appropriate sound based on event type and consequences
    if (currentEvent.type === 'crisis') {
      soundManager.play('crisis');
    } else if (currentEvent.type === 'opportunity') {
      soundManager.play('opportunity');
    } else if (currentEvent.type === 'milestone') {
      soundManager.play('milestone');
    } else {
      soundManager.play('click');
    }

    setGameState((prev: GameState) => {
      const newStats = { ...prev.stats };

      // Apply consequences and play stat change sound if significant change
      let hasSignificantChange = false;
      if (choice.consequences.funding) {
        newStats.funding = Math.max(0, newStats.funding + choice.consequences.funding);
        if (Math.abs(choice.consequences.funding) >= 50) hasSignificantChange = true;
      }
      if (choice.consequences.team) {
        newStats.team = Math.max(1, newStats.team + choice.consequences.team);
        if (Math.abs(choice.consequences.team) >= 1) hasSignificantChange = true;
      }
      if (choice.consequences.hype) {
        newStats.hype = Math.max(0, Math.min(100, newStats.hype + choice.consequences.hype));
        if (Math.abs(choice.consequences.hype) >= 20) hasSignificantChange = true;
      }
      if (choice.consequences.progress) {
        newStats.progress = Math.max(0, Math.min(100, newStats.progress + choice.consequences.progress));
        if (Math.abs(choice.consequences.progress) >= 15) hasSignificantChange = true;
      }
      if (choice.consequences.stress) {
        newStats.stress = Math.max(0, Math.min(100, newStats.stress + choice.consequences.stress));
        if (Math.abs(choice.consequences.stress) >= 20) hasSignificantChange = true;
      }

      if (hasSignificantChange) {
        setTimeout(() => soundManager.play('statChange'), 500);
      }

      // Apply hidden consequences
      const hiddenStats = (prev as any).hiddenStats || {};
      if (choice.hiddenConsequences) {
        Object.entries(choice.hiddenConsequences).forEach(([key, value]) => {
          if (typeof value === 'number') {
            hiddenStats[key] = (hiddenStats[key] || 0) + value;
          } else {
            hiddenStats[key] = value;
          }
        });
      }

      // Add delayed consequences for future rounds
      const delayedEvents = (prev as any).delayedEvents || [];
      if (choice.delayedConsequences) {
        choice.delayedConsequences.forEach(delayed => {
          delayedEvents.push({
            triggerRound: prev.currentRound + delayed.rounds,
            effects: delayed.effects,
            message: delayed.message
          });
        });
      }

      // Add to event history
      const newEventHistory = [...prev.eventHistory, {
        event: currentEvent,
        choice: choice,
        round: prev.currentRound
      }];

      const newState = {
        ...prev,
        stats: newStats,
        eventHistory: newEventHistory,
        unlockedContent: choice.unlocks ? [...prev.unlockedContent, ...choice.unlocks] : prev.unlockedContent,
        hiddenStats,
        delayedEvents
      } as any;

      // Check if this choice should immediately end the game (like acquisition)
      if (choice.id === 'accept-offer') {
        newState.currentRound = newState.maxRounds + 1; // Force game end
        newState.ending = calculateEnding(newState);
        // Play ending sound
        setTimeout(() => {
          soundManager.play('success');
        }, 500);
      }

      return newState;
    });

    

    // Show choice result
    setLastChoiceResult({ choice, flavor: choice.flavor });
    setShowChoiceResult(true);
    setCurrentEvent(null);

    // Auto-advance after showing result
    setTimeout(() => {
      setShowChoiceResult(false);
      advanceRound();
    }, 3000);
  };

  const getRoundPhaseLabel = (phase: GameState['gamePhase']) => {
    switch (phase) {
      case 'idea': return 'Ideation';
      case 'building': return 'Building';
      case 'scaling': return 'Scaling';
      case 'endgame': return 'Endgame';
      default: return 'Startup';
    }
  };

  return (
    <div className="min-h-screen container mx-auto px-4 py-8 max-w-6xl relative">
      {/* random floating doodles */}
      <div className="fixed top-10 left-10 text-lg opacity-20 animate-bounce z-0">🚀</div>
      <div className="fixed top-20 right-20 text-sm opacity-15 animate-pulse z-0">💡</div>
      <div className="fixed bottom-20 left-20 text-xl opacity-25 animate-spin z-0">⚡</div>
      <div className="fixed bottom-10 right-10 text-lg opacity-20 animate-bounce z-0">🎯</div>

      <div className="relative z-10">
        {/* game Header */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <SketchyCard className="bg-white p-4 transform rotate-1 relative wobble-card">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h1 className="font-bangers text-2xl md:text-3xl text-ink bounce-crazy">StartupLife</h1>
                {gameState.selectedIdea && (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{gameState.selectedIdea.emoji}</span>
                    <span className="font-caveat text-lg text-ink">{gameState.selectedIdea.name}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    const enabled = soundManager.toggle();
                    soundManager.play('click');
                  }}
                  onMouseEnter={() => soundManager.play('hover')}
                  className="bg-purple-marker hover:bg-purple-600 text-white font-caveat"
                  size="sm"
                >
                  {soundManager.isEnabled() ? '🔊' : '🔇'} Sound
                </Button>
                <Button 
                  onClick={handleRestartGame}
                  onMouseEnter={() => soundManager.play('hover')}
                  className="bg-red-pen hover:bg-red-600 text-white font-caveat"
                  size="sm"
                >
                  🔄 Restart
                </Button>
              </div>
            </div>
            <div className="margin-doodle bounce-crazy">🎮</div>
          </SketchyCard>
        </motion.div>

        {/* game progress and stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* round progress */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SketchyCard className="bg-white p-6 transform -rotate-1 relative wobble-card">
              <h2 className="font-kalam text-xl text-ink mb-4 scribble-line">
                Round {gameState.currentRound}/{gameState.maxRounds} - {getRoundPhaseLabel(gameState.gamePhase)}
              </h2>
              <div className="w-full bg-notebook-lines rounded-full h-3 mb-4 overflow-hidden">
                <motion.div
                  className="h-full bg-marker-blue rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(gameState.currentRound / gameState.maxRounds) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              
              <div className="margin-doodle bounce-crazy">📊</div>
            </SketchyCard>
          </motion.div>

          {/* current stats */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SketchyCard className="bg-white p-6 transform rotate-1 relative wobble-card">
              <h2 className="font-kalam text-xl text-ink mb-4 scribble-line">Startup Stats</h2>
              <div className="space-y-3">
                <StatBar 
                  label="Funding" 
                  value={gameState.stats.funding} 
                  maxValue={1000}
                  emoji="💰" 
                  color="text-green-pen" 
                  bgColor="bg-green-pen"
                />
                <StatBar 
                  label="Team" 
                  value={gameState.stats.team} 
                  maxValue={20}
                  emoji="👥" 
                  color="text-marker-blue" 
                  bgColor="bg-marker-blue"
                />
                <StatBar 
                  label="Hype" 
                  value={gameState.stats.hype} 
                  maxValue={100}
                  emoji="🔥" 
                  color="text-red-pen" 
                  bgColor="bg-red-pen"
                />
                <StatBar 
                  label="Progress" 
                  value={gameState.stats.progress} 
                  maxValue={100}
                  emoji="📈" 
                  color="text-purple-marker" 
                  bgColor="bg-purple-marker"
                />
                <StatBar 
                  label="Stress" 
                  value={gameState.stats.stress} 
                  maxValue={100}
                  emoji="😰" 
                  color="text-highlighter" 
                  bgColor="bg-highlighter"
                />
              </div>
              <div className="margin-doodle bounce-crazy">📈</div>
            </SketchyCard>
          </motion.div>
        </div>

        {/* main game content */}
        <AnimatePresence mode="wait">
          {/* startup idea selection */}
          {gameState.gamePhase === 'idea' && !gameState.selectedIdea && (
            <motion.div
              key="idea-selection"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <SketchyCard className="bg-white p-6 md:p-8 mb-6 relative circle-doodle">
                <h2 className="font-bangers text-3xl text-ink mb-4 text-center explosion-stars">
                  Choose Your Startup Destiny!
                </h2>

                <SpeechBubble className="mb-6 shake-text">
                  <p className="font-caveat text-lg text-ink">
                    "Every unicorn starts with a wild idea. What's yours going to be? Choose wisely... or don't! 🎲"
                  </p>
                </SpeechBubble>

                <div className="grid md:grid-cols-3 gap-4">
                  {STARTUP_IDEAS.map((idea, index) => (
                    <motion.div
                      key={idea.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => handleSelectIdea(idea)}
                        onMouseEnter={() => soundManager.play('hover')}
                        className={`bg-paper sketchy-border p-6 text-left hover:${idea.bgColor} transition-colors w-full h-auto relative`}
                        variant="outline"
                      >
                        <div className="text-left space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-3xl">{idea.emoji}</span>
                            <span className={`font-bangers text-lg ${idea.color}`}>
                              {idea.name}
                            </span>
                          </div>
                          <p className="font-caveat text-sm text-ink">
                            "{idea.description}"
                          </p>
                          <div className="flex gap-2 text-xs opacity-70">
                            <span className="bg-notebook-lines px-2 py-1 rounded">
                              {idea.industry}
                            </span>
                            <span className="bg-notebook-lines px-2 py-1 rounded capitalize">
                              {idea.difficulty}
                            </span>
                          </div>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>

                <div className="margin-doodle bounce-crazy">🎯</div>
              </SketchyCard>
            </motion.div>
          )}

          {/* event display */}
          {currentEvent && (
            <EventCard 
              key={currentEvent.id}
              event={currentEvent}
              onChoiceSelect={handleChoiceSelect}
            />
          )}

          {/* choice result */}
          {showChoiceResult && lastChoiceResult && (
            <motion.div
              key="choice-result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <SketchyCard className="bg-highlighter p-6 mb-6 tape-element relative">
                <div className="text-center">
                  <h3 className="font-bangers text-2xl text-ink mb-2">
                    {lastChoiceResult.choice.emoji} You chose: {lastChoiceResult.choice.text}
                  </h3>
                  <SpeechBubble className="bg-white">
                    <p className="font-caveat text-lg text-ink">
                      {lastChoiceResult.flavor}
                    </p>
                  </SpeechBubble>
                </div>
                <div className="margin-doodle bounce-crazy">✨</div>
              </SketchyCard>
            </motion.div>
          )}

          {/* game ending */}
          {gameState.ending && (
            <motion.div
              key="game-ending"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <SketchyCard className="bg-white p-8 mb-6 relative explosion-stars">
                <div className="text-center space-y-6">
                  <motion.div
                    className="text-8xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0] 
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  >
                    {gameState.ending.emoji}
                  </motion.div>

                  <h2 className="font-bangers text-4xl text-ink mb-4">
                    {gameState.ending.title}
                  </h2>

                  <SpeechBubble className="bg-paper">
                    <p className="font-caveat text-xl text-ink">
                      {gameState.ending.description}
                    </p>
                  </SpeechBubble>

                  <div className="bg-notebook-lines p-4 rounded-lg">
                    <h3 className="font-kalam text-lg text-ink mb-2">Final Score</h3>
                    <div className="font-bangers text-3xl text-marker-blue">
                      {gameState.ending.score}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleRestartGame}
                      onMouseEnter={() => soundManager.play('hover')}
                      className="bg-highlighter hover:bg-yellow-400 sketchy-border px-8 py-4 font-bangers text-2xl text-ink bounce-crazy"
                      size="lg"
                    >
                      🚀 Try Again!
                    </Button>
                    <Button
                      onClick={() => {
                        soundManager.play('click');
                        navigate('/');
                      }}
                      onMouseEnter={() => soundManager.play('hover')}
                      className="bg-paper hover:bg-notebook-lines sketchy-border px-6 py-3 font-caveat text-lg text-ink"
                      variant="outline"
                    >
                      🏠 Back to Home
                    </Button>
                  </div>
                </div>
                <div className="margin-doodle bounce-crazy">🏆</div>
              </SketchyCard>
            </motion.div>
          )}
        </AnimatePresence>

        

        {/* mentor character */}
        {gameState.selectedIdea && currentEvent && (
          <MentorCard gameState={gameState} />
        )}
      </div>
    </div>
  );
}