'use client';

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Flame, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PointsBadgeProps {
  value: number;
  label?: string;
  prevValue?: number;
  icon?: "star" | "flame" | "award" | React.ReactNode;
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
  animate?: boolean;
}

export function PointsBadge({
  value,
  label,
  prevValue,
  icon = "star",
  size = "md",
  color,
  className,
  animate = true,
}: PointsBadgeProps) {
  const [animatedValue, setAnimatedValue] = useState(prevValue !== undefined ? prevValue : value);
  const [showIncrement, setShowIncrement] = useState(false);
  const [incrementValue, setIncrementValue] = useState(0);

  // Size based classes
  const sizeClass = {
    sm: "h-4 w-4 text-xs",
    md: "h-5 w-5 text-sm",
    lg: "h-6 w-6 text-base",
  };

  const containerClass = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  useEffect(() => {
    if (prevValue !== undefined && prevValue !== value) {
      // Show the increment animation
      setIncrementValue(value - prevValue);
      setShowIncrement(true);
      
      // Start animating the main value
      const animationDuration = 1500; // 1.5 seconds
      const steps = 20;
      const stepDuration = animationDuration / steps;
      
      const stepValue = (value - prevValue) / steps;
      let currentValue = prevValue;
      let step = 0;
      
      const interval = setInterval(() => {
        currentValue += stepValue;
        setAnimatedValue(Math.round(currentValue));
        
        step++;
        if (step >= steps) {
          clearInterval(interval);
          setAnimatedValue(value); // Ensure we end at the exact value
        }
      }, stepDuration);
      
      // Hide the increment after animation
      setTimeout(() => {
        setShowIncrement(false);
      }, 2000);
      
      return () => clearInterval(interval);
    } else {
      setAnimatedValue(value);
    }
  }, [value, prevValue]);

  // Get the icon to display
  const getIcon = () => {
    if (typeof icon === "string") {
      switch (icon) {
        case "star":
          return <Star className={cn(sizeClass[size], "text-yellow-400")} />;
        case "flame":
          return <Flame className={cn(sizeClass[size], "text-red-500")} />;
        case "award":
          return <Award className={cn(sizeClass[size], "text-blue-500")} />;
        default:
          return <Star className={cn(sizeClass[size], "text-yellow-400")} />;
      }
    }
    return icon;
  };

  return (
    <div className={cn("relative", className)}>
      <motion.div
        className={cn(
          "flex items-center gap-1.5 rounded-full border bg-white",
          containerClass[size],
          color ? `border-${color}-200 bg-${color}-50` : "border-yellow-200 bg-yellow-50"
        )}
        initial={animate ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {getIcon()}
        
        <div className="flex flex-col">
          <span className="font-bold leading-none">
            {animate ? animatedValue : value}
          </span>
          {label && <span className="text-xs text-gray-600">{label}</span>}
        </div>
      </motion.div>

      {/* Increment indicator animation */}
      <AnimatePresence>
        {showIncrement && incrementValue !== 0 && (
          <motion.div
            className={cn(
              "absolute -top-6 left-1/2 -translate-x-1/2 font-medium",
              incrementValue > 0 ? "text-green-600" : "text-red-600"
            )}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: -5 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
          >
            {incrementValue > 0 ? "+" : ""}
            {incrementValue}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}