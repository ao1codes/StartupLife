
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameState } from "@/lib/game-state";
import SketchyCard from "./sketchy-card";
import SpeechBubble from "./speech-bubble";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface MentorCardProps {
  gameState: GameState;
  className?: string;
}

const getMentorAdvice = (gameState: GameState) => {
  const { stats, currentRound, gamePhase, selectedIdea } = gameState;
  const { funding, team, hype, progress, stress } = stats;

  // Stress-based advice
  if (stress > 70) {
    return {
      text: "Whoa there, speed racer! You're burning hotter than a CPU mining crypto. Take a breather before you combust! 🔥",
      emoji: "😰",
      type: "warning"
    };
  }

  // Low funding advice
  if (funding < 100 && currentRound > 5) {
    return {
      text: "Your bank account is looking lonelier than a programmer on Valentine's Day. Time to sweet-talk some investors! 💸",
      emoji: "💰",
      type: "urgent"
    };
  }

  // High hype, low progress
  if (hype > 60 && progress < 30) {
    return {
      text: "You're all sizzle and no steak! People are hyped, but where's the beef? Time to actually build something! 🚀",
      emoji: "🎭",
      type: "advice"
    };
  }

  // Phase-based advice
  if (gamePhase === 'scaling' && team < 5) {
    return {
      text: "You're trying to scale with a team smaller than a boy band. Time to recruit some talent! 👥",
      emoji: "📈",
      type: "suggestion"
    };
  }

  // Startup-specific advice
  if (selectedIdea?.id === 'crypto-food' && hype < 40) {
    return {
      text: "Crypto + Food = 🚀 or 💥. You need more hype than a Tesla announcement. Get that buzz going! ⚡",
      emoji: "🍕",
      type: "specific"
    };
  }

  // General encouragement
  const encouragements = [
    "You're doing great! Rome wasn't built in a day, and neither was Facebook. Keep grinding! 💪",
    "Remember: every 'no' gets you closer to a 'yes'. Unless you're asking for a unicorn. That's always a no. 🦄",
    "Your startup journey is like a roller coaster, but with more caffeine and less safety regulations! 🎢",
    "Pro tip: When in doubt, add more features. Just kidding! Focus on what matters. 🎯"
  ];

  return {
    text: encouragements[Math.floor(Math.random() * encouragements.length)],
    emoji: "😊",
    type: "encouragement"
  };
};

export default function MentorCard({ gameState, className }: MentorCardProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentAdvice, setCurrentAdvice] = useState(getMentorAdvice(gameState));

  const refreshAdvice = () => {
    setCurrentAdvice(getMentorAdvice(gameState));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-red-pen bg-red-50';
      case 'urgent': return 'border-highlighter bg-yellow-50';
      case 'advice': return 'border-marker-blue bg-blue-50';
      case 'suggestion': return 'border-purple-marker bg-purple-50';
      default: return 'border-green-pen bg-green-50';
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={cn("fixed bottom-4 right-4 z-50 max-w-sm", className)}
        initial={{ opacity: 0, x: 300, rotate: 5 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        exit={{ opacity: 0, x: 300, rotate: -5 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <SketchyCard className={cn("p-4 relative", getTypeColor(currentAdvice.type))}>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-1 right-1 text-ink opacity-50 hover:opacity-100 text-sm"
          >
            ✕
          </button>

          <div className="flex items-start gap-3 mb-3">
            <motion.div
              className="text-3xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🧙‍♂️
            </motion.div>
            <div className="flex-1">
              <h3 className="font-bangers text-lg text-ink mb-1">
                Startup Wizard Says:
              </h3>
            </div>
          </div>

          <SpeechBubble className="mb-3 bg-white">
            <p className="font-caveat text-base text-ink flex items-start gap-2">
              <span className="text-xl flex-shrink-0">{currentAdvice.emoji}</span>
              <span>{currentAdvice.text}</span>
            </p>
          </SpeechBubble>

          <div className="flex gap-2 text-xs">
            <Button
              onClick={refreshAdvice}
              size="sm"
              className="bg-white hover:bg-notebook-lines font-caveat text-ink border border-ink"
              variant="outline"
            >
              🔄 New Tip
            </Button>
            <Button
              onClick={() => setIsVisible(false)}
              size="sm"
              className="bg-ink hover:bg-gray-700 font-caveat text-white"
            >
              Got it! 👍
            </Button>
          </div>

          <div className="margin-doodle bounce-crazy">✨</div>
        </SketchyCard>
      </motion.div>
    </AnimatePresence>
  );
}
