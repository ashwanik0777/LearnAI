import React from "react";
import { BotMessageSquare } from "lucide-react";

interface ChatbotLogoProps {
  className?: string;
  strokeWidth?: number;
}

export function ChatbotLogo({ 
  className = "h-8 w-8", 
  strokeWidth = 2 
}: ChatbotLogoProps) {
  return (
    <BotMessageSquare 
      className={className} 
      strokeWidth={strokeWidth}
      aria-label="StudyMate AI Logo"
    />
  );
}
