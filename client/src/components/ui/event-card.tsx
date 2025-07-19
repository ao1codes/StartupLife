import { ReactNode } from "react";
import { motion } from "framer-motion";
import { GameEvent, EventChoice } from "@/lib/game-state";
import SketchyCard from "./sketchy-card";
import SpeechBubble from "./speech-bubble";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: GameEvent;
  onChoiceSelect: (choice: EventChoice) => void;
  className?: string;
}

export default function EventCard({ event, onChoiceSelect, className }: EventCardProps) {
  const getEventTypeColor = (type: GameEvent['type']) => {
    switch (type) {
      case 'crisis': return 'border-red-pen bg-red-50';
      case 'opportunity': return 'border-green-pen bg-green-50';
      case 'milestone': return 'border-marker-blue bg-blue-50';
      case 'surprise': return 'border-purple-marker bg-purple-50';
      default: return 'border-ink bg-white';
    }
  };

  const getEventTypeEmoji = (type: GameEvent['type']) => {
    switch (type) {
      case 'crisis': return '🔥';
      case 'opportunity': return '💡';
      case 'milestone': return '🎯';
      case 'surprise': return '🎉';
      default: return '📝';
    }
  };

  return (
    <motion.div
      className={cn("relative", className)}
      initial={{ opacity: 0, x: -50, rotate: -2 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      transition={{ 
        duration: 0.6, 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      <SketchyCard className={cn("p-6 tape-element relative", getEventTypeColor(event.type))}>
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <span className="text-sm">{getEventTypeEmoji(event.type)}</span>
          <span className="font-caveat text-xs text-ink opacity-70 capitalize">
            {event.type}
          </span>
        </div>

        <div className="mb-4">
          <motion.h3 
            className="font-bangers text-2xl text-ink mb-2 flex items-center gap-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-3xl">{event.emoji}</span>
            {event.title}
          </motion.h3>

          <SpeechBubble className="mb-4">
            <p className="font-caveat text-lg text-ink">
              {event.description}
            </p>
          </SpeechBubble>
        </div>

        <div className="space-y-3">
          <h4 className="font-kalam text-lg text-ink mb-3">
            What do you do?
          </h4>

          {event.choices.map((choice: EventChoice, index: number) => (
            <motion.div
              key={choice.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                whileTap={{ scale: 0.98, rotate: -1 }}
              >
                <Button
                  onClick={() => onChoiceSelect(choice)}
                  onMouseEnter={() => {
                    try {
                      const { soundManager } = require('@/lib/sound-manager');
                      soundManager.play('hover');
                    } catch (e) {
                      // Fallback if sound manager not available
                    }
                  }}
                  className="w-full p-4 text-left bg-paper hover:bg-notebook-lines sketchy-border transition-colors min-h-[80px]"
                  variant="outline"
                >
                  <div className="flex items-start gap-3 w-full">
                    <span className="text-2xl flex-shrink-0">{choice.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-caveat text-lg text-ink leading-tight font-bold">{choice.text}</p>
                      <p className="text-sm text-gray-600 mt-1 font-normal">
                        {/* Removed obvious stat previews - now players must think strategically */}
                        Choose wisely...
                      </p>
                    </div>
                  </div>
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-1 -left-1 text-lg opacity-60"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          📎
        </motion.div>

        <div className="margin-doodle bounce-crazy">
          {event.type === 'crisis' ? '🚨' : event.type === 'opportunity' ? '✨' : '📝'}
        </div>
      </SketchyCard>
    </motion.div>
  );
}