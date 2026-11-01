'use client';

import React, { useState, useRef, useEffect } from "react";
import { 
  X, Send, RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatbotLogo } from "./ChatbotLogo";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  quickReplies?: string[];
}

export function StudentChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const initialMessages: Message[] = [
    {
      id: "1",
      sender: "bot",
      text: "Hello! I'm StudyMate, your 24/7 AI learning partner. Need help understanding a formula, checking your concepts with a quick diagnostic question, or structuring your daily study schedule? Ask me anything!",
      timestamp: "Just now",
      quickReplies: [
        "Explain Calculus Derivatives simply",
        "How do I beat study fatigue?",
        "Physics: Explain Lenz's Law",
        "Plan a 2-hour study schedule"
      ]
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Pedagogical response simulation
    setTimeout(() => {
      let botResponse = "";
      const lower = messageText.toLowerCase();

      if (lower.includes("calculus") || lower.includes("derivative")) {
        botResponse = "In Calculus, the derivative measures the instantaneous rate of change of a function. \n\nFormula: f'(x) = lim(h→0) [f(x+h) - f(x)] / h\n\nKey Rule (Power Rule): d/dx(xⁿ) = n·xⁿ⁻¹.\nExample: d/dx(3x² + 5x) = 6x + 5. Would you like a practice quiz on this?";
      } else if (lower.includes("fatigue") || lower.includes("tired") || lower.includes("burnout")) {
        botResponse = "When experiencing cognitive fatigue, don't force high-intensity problem solving. \n\n1. Use the 25/5 Pomodoro method.\n2. Switch from complex calculations to light flashcards or summary reviews.\n3. Drink water and take a 10-minute screen break.\n\nOur adaptive engine automatically switches your active queue to lighter review cards when fatigue is high!";
      } else if (lower.includes("lenz") || lower.includes("physics") || lower.includes("flux")) {
        botResponse = "Lenz's Law states that an induced electromotive force (EMF) always produces a current whose magnetic field opposes the original change in magnetic flux that produced it.\n\nMathematical form: EMF = -dΦB/dt (Faraday-Lenz Law). The minus sign is Lenz's Law in action!";
      } else if (lower.includes("schedule") || lower.includes("plan") || lower.includes("routine")) {
        botResponse = "Here is an optimized 2-hour cognitive study plan:\n\n• 00-45 min: High-focus difficult subject (Math / Code)\n• 45-55 min: Break & hydration\n• 55-90 min: Active practice & diagnostic quiz (Physics / Chem)\n• 90-100 min: Short walk\n• 100-120 min: Spaced review flashcards\n\nWould you like me to sync this to your Smart Planner?";
      } else if (lower.includes("quiz") || lower.includes("test")) {
        botResponse = "Here is a quick diagnostic check:\n\nQuestion: What is the derivative of f(x) = 4x³ - 6x + 9?\nA) 12x² - 6\nB) 12x³ - 6\nC) 4x² - 6\n\nReply with your answer and I will check it for you!";
      } else {
        botResponse = `Great question regarding "${messageText}"! StudyMate adapts to your specific learning stage. You can generate a personalized diagnostic quiz or flashcard deck directly on your dashboard. What topic would you like to explore next?`;
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: ["Take a Diagnostic Quiz", "View Recommended Lessons", "Ask another question"]
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const resetChat = () => {
    setMessages(initialMessages);
  };

  return (
    <>
      {/* FLOATING TRIGGER BUTTON - CLEAN CIRCULAR ICON ONLY (NO TEXT) */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="relative group w-14 h-14 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-950/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center border-2 border-white cursor-pointer"
            aria-label="Open StudyMate AI"
          >
            <ChatbotLogo className="h-8.5 w-8.5 text-white" strokeWidth={2.2} />
            {/* Online status indicator dot */}
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white absolute top-0.5 right-0.5" />
          </button>
        </div>
      )}

      {/* CHATBOT WINDOW DIALOG */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-3 top-16 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[600px] sm:max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-slate-900 text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center text-white shrink-0">
                <ChatbotLogo className="h-5.5 w-5.5 text-white" strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  StudyMate AI
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Online
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">Your 24/7 AI Learning Partner</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button 
                onClick={resetChat}
                title="Restart Chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div className={`flex items-start gap-2 max-w-[88%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {msg.sender === "bot" && (
                    <div className="shrink-0 mt-0.5 w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-xs">
                      <ChatbotLogo className="h-4 w-4 text-white" strokeWidth={2.2} />
                    </div>
                  )}

                  <div 
                    className={`rounded-2xl p-3.5 leading-relaxed shadow-xs ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-tr-xs"
                        : "bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Quick Reply Suggestions if available */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[92%] pl-9">
                    {msg.quickReplies.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(reply)}
                        className="text-[11px] font-medium bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 rounded-lg px-2.5 py-1.5 transition-colors text-left"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2 pl-1 text-slate-500">
                <div className="shrink-0 w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-xs">
                  <ChatbotLogo className="h-4 w-4 text-white" strokeWidth={2.2} />
                </div>
                <div className="flex items-center space-x-1.5 bg-white border border-slate-200 rounded-xl p-3 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-xs text-slate-400 ml-1">StudyMate is thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a formula, concept, or study routine..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <Button 
                type="submit" 
                disabled={!input.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-2.5 h-auto shrink-0 disabled:opacity-50 transition-colors"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-[10px] text-slate-400 text-center mt-1.5">
              Powered by StudyMate Adaptive Intelligence
            </p>
          </div>
        </div>
      )}
    </>
  );
}
