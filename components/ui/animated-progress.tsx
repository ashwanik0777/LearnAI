'use client';

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface AnimatedProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
  showAnimation?: boolean;
  animateOnMount?: boolean;
}

const AnimatedProgress = React.forwardRef<HTMLDivElement, AnimatedProgressProps>(
  (
    { 
      className, 
      value = 0, 
      max = 100, 
      showValue = false, 
      size = "md", 
      color,
      showAnimation = true,
      animateOnMount = true,
      ...props 
    }, 
    ref
  ) => {
    const percentage = Math.min(Math.max(0, value), max) / max * 100;
    const [prevValue, setPrevValue] = React.useState(animateOnMount ? 0 : value);

    React.useEffect(() => {
      if (prevValue !== value) {
        setPrevValue(value);
      }
    }, [value, prevValue]);

    const heightClass = size === "sm" ? "h-2" : size === "lg" ? "h-4" : "h-3";
    const getIndicatorStyles = () => {
      if (color) {
        return { backgroundColor: color };
      }
      return {};
    };

    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-full bg-primary-100",
          heightClass,
          className
        )}
        ref={ref}
        {...props}
      >
        <AnimatePresence initial={false}>
          <motion.div
            className="h-full w-full flex-1 rounded-full bg-primary transition-colors"
            style={getIndicatorStyles()}
            initial={showAnimation ? { width: `${prevValue / max * 100}%` } : { width: `${percentage}%` }}
            animate={{ width: `${percentage}%` }}
            transition={{ 
              type: "spring", 
              stiffness: 120, 
              damping: 20, 
              mass: 1 
            }}
          />
        </AnimatePresence>

        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span 
              className="text-xs font-medium text-white"
              key={value}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {Math.round(percentage)}%
            </motion.span>
          </div>
        )}
      </div>
    );
  }
);

AnimatedProgress.displayName = "AnimatedProgress";

export { AnimatedProgress };