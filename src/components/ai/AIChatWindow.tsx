"use client";

import React, { useState } from "react";
import { Sparkles, Send, Bot, User, ArrowRight } from "lucide-react";
import { Card, Button, Input, Badge } from "@/design-system";
import { aiService } from "@/services/ai.service";
import { ChatMessage } from "@/ai/schemas/chat.schema";

export const AIChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-init",
      sender: "assistant",
      content:
        "Hello! I am VIKRAM AI — your 24/7 intelligent study abroad advisor. Ask me anything about university admissions, IELTS waivers, tuition fees, scholarships, or student visas!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      suggestedActions: ["What are top STEM universities in the USA?", "Tell me about Chevening Scholarship", "Check my admission eligibility"],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setLoading(true);

    try {
      const responseMsg = await aiService.sendChatMessage(query);
      setMessages((prev) => [...prev, responseMsg]);
    } catch (err) {
      console.error("AI Chat failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card variant="flat" padding="none" className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl flex flex-col h-[600px] max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-[#0A192F] text-white p-4 flex items-center justify-between border-b border-[#D4AF37]/30">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/10 text-[#D4AF37] border border-white/10">
            <Bot className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base font-['Outfit']">VIKRAM AI Advisor</h3>
              <Badge variant="gold" size="sm">
                <Sparkles className="w-3 h-3 mr-1" /> Multi-Model RAG
              </Badge>
            </div>
            <span className="text-[11px] text-slate-300">Available 24/7 for overseas counselling</span>
          </div>
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 bg-[#FAF9F5]">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 max-w-[85%] ${
              m.sender === "user" ? "ml-auto flex-row-reverse" : ""
            }`}
          >
            <div
              className={`p-2 rounded-xl text-xs flex-shrink-0 mt-1 ${
                m.sender === "user"
                  ? "bg-[#0B1B3D] text-[#D4AF37]"
                  : "bg-white border border-slate-200 text-[#0B1B3D]"
              }`}
            >
              {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className="flex flex-col gap-1.5">
              <div
                className={`p-4 rounded-2xl text-xs leading-relaxed ${
                  m.sender === "user"
                    ? "bg-[#0B1B3D] text-white rounded-tr-none shadow-md"
                    : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-none shadow-sm"
                }`}
              >
                {m.content}
              </div>

              {m.suggestedActions && m.suggestedActions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {m.suggestedActions.map((action, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(action)}
                      className="px-3 py-1.5 rounded-full bg-white border border-[#D4AF37]/50 text-[#0B1B3D] text-[11px] font-semibold hover:bg-[#D4AF37] hover:text-[#0A192F] transition-all flex items-center gap-1 shadow-xs"
                    >
                      <span>{action}</span>
                      <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-white p-3 rounded-xl w-fit border border-slate-200 animate-pulse">
            <Sparkles className="w-4 h-4 text-[#D4AF37] animate-spin" />
            <span>VIKRAM AI is analyzing global database...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
        <input
          type="text"
          placeholder="Ask VIKRAM AI about universities, SOPs, scholarships, or visas..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 rounded-xl border border-slate-200 p-3 text-xs text-slate-800 focus:outline-none focus:border-[#D4AF37]"
        />
        <Button
          variant="primary"
          size="md"
          onClick={() => handleSend()}
          isLoading={loading}
          rightIcon={<Send className="w-4 h-4" />}
        >
          Send
        </Button>
      </div>
    </Card>
  );
};
