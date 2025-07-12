import { motion, AnimatePresence } from "framer-motion";
import { Achievement } from "@/lib/game-state";
import SketchyCard from "./sketchy-card";
import { Button } from "./button";
import { X } from "lucide-react";

interface AchievementPopupProps {
  achievement: Achievement | null;
  isVisible: boolean;
  onClose: () => void;
}

export default function AchievementPopup({ achievement, isVisible, onClose }: AchievementPopupProps) {
  return (
    <AnimatePresence>
      {isVisible && achievement && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Achievement Card */}
          <motion.div
            className="relative z-10 max-w-md w-full"
            initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: 10, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              duration: 0.6
            }}
          >
            <SketchyCard className="bg-highlighter p-6 tape-element relative">
              {/* Close button */}
              <Button
                onClick={onClose}
                className="absolute top-2 right-2 p-2 bg-transparent hover:bg-white rounded-full"
                size="sm"
                variant="ghost"
              >
                <X size={16} />
              </Button>
              
              {/* Achievement content */}
              <div className="text-center space-y-4">
                <motion.div
                  className="text-6xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                >
                  {achievement.emoji}
                </motion.div>
                
                <div>
                  <h2 className="font-bangers text-2xl text-ink mb-2 explosion-stars">
                    🏆 Achievement Unlocked!
                  </h2>
                  <h3 className="font-bangers text-xl text-ink">
                    {achievement.name}
                  </h3>
                </div>
                
                <p className="font-caveat text-lg text-ink">
                  {achievement.description}
                </p>
                
                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    onClick={onClose}
                    className="bg-marker-blue hover:bg-blue-600 text-white font-caveat px-6 py-2"
                  >
                    Awesome! 🎉
                  </Button>
                </motion.div>
              </div>
            </SketchyCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}