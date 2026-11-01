'use client';

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Star, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AchievementCelebrationProps {
  show: boolean;
  title: string;
  description?: string;
  type?: "achievement" | "milestone" | "level-up" | "streak";
  onComplete?: () => void;
  className?: string;
}

export function AchievementCelebration({
  show,
  title,
  description,
  type = "achievement",
  onComplete,
  className,
}: AchievementCelebrationProps) {
  // Auto-hide the celebration after 5 seconds
  React.useEffect(() => {
    if (show && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  // Define confetti-like particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100 - 50, // Random positions
    y: Math.random() * -100,
    size: Math.random() * 4 + 2,
    color: [
      "#FFD700", // Gold
      "#76E4F7", // Light blue
      "#9B5DE5", // Purple
      "#F15BB5", // Pink
      "#00BBF9", // Blue
    ][Math.floor(Math.random() * 5)],
  }));

  // Get icon based on achievement type
  const getIcon = () => {
    switch (type) {
      case "milestone":
        return <Trophy className="h-8 w-8 text-yellow-400" />;
      case "level-up":
        return <Star className="h-8 w-8 text-purple-500" />;
      case "streak":
        return <Award className="h-8 w-8 text-blue-500" />;
      default:
        return <Award className="h-8 w-8 text-green-500" />;
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm",
            className
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onComplete}
        >
          <motion.div
            className="relative max-w-md rounded-lg bg-white p-6 shadow-xl"
            initial={{ scale: 0.8, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {/* Confetti animation */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 0,
                }}
                animate={{
                  x: particle.x,
                  y: particle.y,
                  opacity: [1, 1, 0],
                  scale: [0, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: Math.random() * 0.2,
                }}
                style={{
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                }}
              />
            ))}

            <div className="flex flex-col items-center text-center">
              <motion.div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100"
                initial={{ rotate: -45, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  damping: 10,
                  stiffness: 100,
                  delay: 0.2,
                }}
              >
                {getIcon()}
              </motion.div>

              <motion.h3
                className="mb-2 text-lg font-bold text-gray-900"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {title}
              </motion.h3>

              {description && (
                <motion.p
                  className="text-sm text-gray-600"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {description}
                </motion.p>
              )}

              <motion.button
                className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onComplete) onComplete();
                }}
              >
                Awesome!
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}