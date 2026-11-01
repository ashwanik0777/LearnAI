'use client';

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CompletionAnimationProps {
  isComplete: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: React.ReactNode;
  color?: string;
}

export function CompletionAnimation({
  isComplete,
  size = "md",
  className,
  icon,
  color,
}: CompletionAnimationProps) {
  // Size based classes
  const sizeClass = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  // Animation variants for the check mark
  const checkVariants = {
    checked: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 0.5, bounce: 0 },
        opacity: { duration: 0.25 },
      },
    },
    unchecked: {
      pathLength: 0,
      opacity: 0,
      transition: {
        pathLength: { type: "spring", duration: 0.5, bounce: 0 },
        opacity: { duration: 0.25 },
      },
    },
  };

  // Circle animation variants
  const circleVariants = {
    checked: {
      scale: [0.8, 1.2, 1],
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    unchecked: {
      scale: 1,
      opacity: 0.5,
    },
  };

  const defaultColor = color || "currentColor";

  return (
    <motion.div
      initial={false}
      animate={isComplete ? "checked" : "unchecked"}
      className={cn("relative", className)}
    >
      {icon ? (
        <motion.div
          variants={circleVariants}
          className={cn(sizeClass[size], "text-green-500")}
        >
          {icon}
        </motion.div>
      ) : (
        <motion.div
          variants={circleVariants}
          className={cn("relative flex items-center justify-center", sizeClass[size])}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ 
              backgroundColor: isComplete ? "rgba(34, 197, 94, 0.2)" : "transparent",
              borderColor: isComplete ? "rgb(34, 197, 94)" : "rgb(203, 213, 225)",
              borderWidth: 1.5
            }}
          />
          
          <motion.svg
            className="stroke-green-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M6 12L10 16L18 8"
              variants={checkVariants}
              strokeWidth={3}
              stroke={defaultColor}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      )}
    </motion.div>
  );
}

export interface TaskCompletionListItemProps {
  task: {
    id: string;
    title: string;
    isCompleted: boolean;
  };
  onToggle?: (id: string) => void;
  className?: string;
}

export function TaskCompletionListItem({
  task,
  onToggle,
  className,
}: TaskCompletionListItemProps) {
  const handleClick = () => {
    if (onToggle) {
      onToggle(task.id);
    }
  };

  return (
    <motion.div
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-gray-50",
        task.isCompleted && "text-gray-500",
        className
      )}
      onClick={handleClick}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
    >
      <CompletionAnimation isComplete={task.isCompleted} />
      <span className={cn(task.isCompleted && "line-through")}>{task.title}</span>
    </motion.div>
  );
}