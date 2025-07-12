import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SketchyCard from "@/components/ui/sketchy-card";
import SpeechBubble from "@/components/ui/speech-bubble";

export default function LandingPage() {
  const [, navigate] = useLocation();

  const handleStartGame = () => {
    navigate("/game");
  };

  return (
    <div className="min-h-screen container mx-auto px-4 py-8 max-w-4xl relative">
      {/* Removed floating doodles for a cleaner look */}
      
      {/* Ensure content is above floating doodles */}
      <div className="relative z-10">
      {/* Header with Notebook Tab */}
      <motion.div 
        className="relative mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <SketchyCard className="bg-white tape-element p-6 transform -rotate-1">
          <h1 className="font-bangers text-4xl md:text-6xl text-ink text-center bounce-crazy">
            StartupLife
          </h1>
          <p className="font-caveat text-xl md:text-2xl text-center text-ink mt-2">
            <span className="scribble-line shake-text">The Ultimate Startup Simulator</span>
          </p>
        </SketchyCard>
        {/* Removed extra doodle/animated elements */}
      </motion.div>

      {/* Game Introduction Card */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <SketchyCard className="bg-white p-6 md:p-8 transform rotate-1 relative">
          <SpeechBubble className="mb-6 shake-text">
            <p className="font-caveat text-lg md:text-xl text-ink">
              "Ready to build the next unicorn? Or crash and burn spectacularly? 
              Either way, it's gonna be a WILD ride! 🚀💥"
            </p>
          </SpeechBubble>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="font-kalam text-2xl md:text-3xl text-ink">
                What is StartupLife?
              </h2>
              <div className="space-y-3 font-caveat text-lg text-ink">
                <div className="flex items-start gap-3 wiggle">
                  <span className="text-marker-blue text-2xl bounce-crazy">•</span>
                  <p>An interactive startup simulator where <strong>YOU</strong> make the decisions</p>
                </div>
                <div className="flex items-start gap-3 wiggle">
                  <span className="text-red-pen text-2xl bounce-crazy">•</span>
                  <p>Experience the chaos of startup life without the real-world consequences</p>
                </div>
                <div className="flex items-start gap-3 wiggle">
                  <span className="text-green-pen text-2xl bounce-crazy">•</span>
                  <p>Make crucial choices that determine your startup's fate</p>
                </div>
                <div className="flex items-start gap-3 wiggle">
                  <span className="text-purple-marker text-2xl bounce-crazy">•</span>
                  <p>Discover unique outcomes every time you play</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <SketchyCard className="bg-notebook-lines p-4 transform rotate-2">
                <div className="text-center">
                  <motion.div 
                    className="text-6xl mb-2 bounce-crazy"
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    🧑‍💻
                  </motion.div>
                  <p className="font-caveat text-sm text-ink opacity-70 shake-text">
                    *This could be you*<br />
                    <span className="text-xs scribble-line">CEO of the next big thing!</span>
                  </p>
                </div>
              </SketchyCard>
              {/* Removed margin-doodle and animated elements */}
            </div>
          </div>
          {/* Removed margin-doodle and animated elements */}
        </SketchyCard>
      </motion.div>

      {/* Game Phases Preview */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <SketchyCard className="bg-white p-6 md:p-8 transform -rotate-1 relative wobble-card">
          <h2 className="font-kalam text-2xl md:text-3xl text-ink mb-6 text-center scribble-line shake-text">
            Your Startup Journey
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <motion.div 
              className="transform rotate-1"
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <SketchyCard className="bg-paper tape-element p-4 relative wobble-card">
                <h3 className="font-bangers text-xl text-marker-blue mb-2 bounce-crazy">Phase 1</h3>
                <h4 className="font-kalam text-lg text-ink mb-2 wiggle">The Big Idea</h4>
                <p className="font-caveat text-sm text-ink">
                  Choose your startup concept and core features. Will you go solo or find your perfect co-founder?
                </p>
                <div className="text-2xl mt-2 bounce-crazy">🎯</div>
                <div className="absolute top-1 right-1 text-xs animate-pulse">💭</div>
              </SketchyCard>
            </motion.div>
            
            <motion.div 
              className="transform -rotate-1"
              whileHover={{ scale: 1.08, rotate: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <SketchyCard className="bg-paper tape-element p-4 relative wobble-card circle-doodle">
                <h3 className="font-bangers text-xl text-red-pen mb-2 bounce-crazy">Phase 2</h3>
                <h4 className="font-kalam text-lg text-ink mb-2 wiggle">Building & Growing</h4>
                <p className="font-caveat text-sm text-ink">
                  Navigate funding rounds, hire your team, and tackle the inevitable crises that come your way.
                </p>
                <div className="text-2xl mt-2 bounce-crazy">⚡</div>
                <div className="absolute top-1 right-1 text-xs animate-spin">🔥</div>
              </SketchyCard>
            </motion.div>
            
            <motion.div 
              className="transform rotate-1"
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <SketchyCard className="bg-paper tape-element p-4 relative wobble-card explosion-stars">
                <h3 className="font-bangers text-xl text-green-pen mb-2 bounce-crazy">Phase 3</h3>
                <h4 className="font-kalam text-lg text-ink mb-2 wiggle">The Outcome</h4>
                <p className="font-caveat text-sm text-ink">
                  Will you IPO, get acquired, or join the startup graveyard? Only one way to find out!
                </p>
                <div className="text-2xl mt-2 bounce-crazy">🎉</div>
                <div className="absolute top-1 right-1 text-xs animate-bounce">💰</div>
              </SketchyCard>
            </motion.div>
          </div>
          <div className="margin-doodle bounce-crazy">🗺️</div>
          <div className="absolute top-2 left-2 text-lg rotate-12 animate-pulse">📋</div>
          <div className="absolute bottom-2 right-2 text-sm -rotate-12 animate-bounce">✅</div>
        </SketchyCard>
      </motion.div>

      {/* Start Button */}
      <motion.div 
        className="text-center relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.9, rotate: -1 }}
          className="relative"
        >
          <Button 
            onClick={handleStartGame}
            className="bg-highlighter hover:bg-yellow-400 sketchy-border px-8 md:px-12 py-4 md:py-6 font-bangers text-2xl md:text-3xl text-ink bounce-crazy pulse-glow explosion-stars relative z-10"
            size="lg"
          >
            🚀 Start Your Startup Journey! 🚀
          </Button>
          <div className="absolute -top-3 -right-3 text-2xl animate-bounce">⚡</div>
          <div className="absolute -bottom-3 -left-3 text-lg animate-pulse">💰</div>
          <div className="absolute -top-2 -left-2 text-sm rotate-12 animate-spin">✨</div>
        </motion.div>
        <p className="font-caveat text-sm text-ink mt-3 opacity-70 shake-text">
          *Warning: May cause entrepreneurial delusions of grandeur 😵‍💫
        </p>
        <div className="absolute top-0 left-0 text-lg animate-bounce">🎯</div>
        <div className="absolute top-0 right-0 text-lg animate-pulse">💡</div>
      </motion.div>

      {/* Footer */}
      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="font-caveat text-sm text-ink opacity-50 shake-text">
          Made with ❤️ and way too much caffeine ☕
        </div>
      </motion.div>
      </div>
    </div>
  );
}
