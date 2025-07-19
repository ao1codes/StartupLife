
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  velocity: { x: number; y: number };
}

interface ParticleEffectProps {
  trigger: boolean;
  type: 'success' | 'failure' | 'milestone' | 'viral';
  onComplete?: () => void;
}

const getParticleEmojis = (type: string) => {
  switch (type) {
    case 'success': return ['🎉', '🎊', '✨', '⭐', '🚀'];
    case 'failure': return ['💥', '😵', '🔥', '💸', '😭'];
    case 'milestone': return ['🏆', '🎯', '📈', '💪', '⚡'];
    case 'viral': return ['📱', '🔥', '📈', '⭐', '🌟'];
    default: return ['✨'];
  }
};

export default function ParticleEffect({ trigger, type, onComplete }: ParticleEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!trigger) return;

    const emojis = getParticleEmojis(type);
    const newParticles: Particle[] = [];

    const particleCount = Math.min(8, Math.max(3, Math.floor(window.innerWidth / 200)));
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * Math.min(window.innerWidth, 800),
        y: window.innerHeight + 50,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        velocity: {
          x: (Math.random() - 0.5) * 4,
          y: -Math.random() * 8 - 5
        }
      });
    }

    setParticles(newParticles);

    const timeout = setTimeout(() => {
      setParticles([]);
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [trigger, type, onComplete]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-2xl"
          initial={{ 
            x: particle.x, 
            y: particle.y,
            opacity: 1,
            scale: 1,
            rotate: 0
          }}
          animate={{ 
            x: particle.x + particle.velocity.x * 100,
            y: particle.y + particle.velocity.y * 100,
            opacity: 0,
            scale: 0.5,
            rotate: 360
          }}
          transition={{ 
            duration: 3,
            ease: "easeOut"
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}
    </div>
  );
}
