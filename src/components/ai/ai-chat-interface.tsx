"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2, Sparkles, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  status?: "pending" | "complete" | "error";
}

interface SuggestionChip {
  id: string;
  label: string;
  action: () => void;
}

interface AIChatInterfaceProps {
  onGenerateComponent?: (prompt: string, targetId?: string) => void;
  onUpdateComponent?: (prompt: string, componentId: string) => void;
  selectedComponentId?: string | null;
  isProcessing?: boolean;
}

export default function AIChatInterface({
  onGenerateComponent = () => {},
  onUpdateComponent = () => {},
  selectedComponentId = null,
  isProcessing = false,
}: AIChatInterfaceProps) {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [context, setContext] = useState<"page" | "component">("page");
  const [isExpanded, setIsExpanded] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample suggestion chips
  const suggestionChips: SuggestionChip[] = [
    {
      id: "1",
      label: "Add a hero section",
      action: () =>
        handleSuggestionClick(
          "Add a hero section with a heading, subheading, and a call-to-action button",
        ),
    },
    {
      id: "2",
      label: "Create a pricing table",
      action: () =>
        handleSuggestionClick(
          "Create a pricing table with 3 tiers: Basic, Pro, and Enterprise",
        ),
    },
    {
      id: "3",
      label: "Add testimonials",
      action: () =>
        handleSuggestionClick(
          "Add a testimonials section with 3 customer quotes",
        ),
    },
    {
      id: "4",
      label: "Improve layout",
      action: () =>
        handleSuggestionClick(
          "Improve the layout and spacing of the current component",
        ),
    },
  ];

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isProcessing) return;

    // Add user message to chat
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: prompt,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);

    // Process the prompt based on context
    if (context === "component" && selectedComponentId) {
      onUpdateComponent(prompt, selectedComponentId);
    } else {
      onGenerateComponent(prompt);
    }

    // Clear the input
    setPrompt("");

    // Add a pending assistant message
    const pendingMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "Generating response...",
      timestamp: new Date(),
      status: "pending",
    };

    setMessages((prev) => [...prev, pendingMessage]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="bg-background border-t border-border w-full">
      <div className="flex items-center justify-between p-2 border-b border-border">
        <div className="flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-primary" />
          <h3 className="text-sm font-medium">AI Assistant</h3>
          {isProcessing && (
            <div className="flex items-center ml-3">
              <Loader2 className="h-3 w-3 animate-spin mr-1" />
              <span className="text-xs text-muted-foreground">
                Processing...
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  className="h-7 w-7 p-0"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-7 w-7 p-0"
          >
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${isExpanded ? "" : "rotate-180"}`}
            />
          </Button>
        </div>
      </div>

      {isExpanded && (
        <>
          <div className="p-3 max-h-[200px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <Sparkles className="h-8 w-8 mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  How can I help you build your page today?
                </p>
                <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                  {suggestionChips.map((chip) => (
                    <Badge
                      key={chip.id}
                      variant="outline"
                      className="cursor-pointer hover:bg-accent"
                      onClick={chip.action}
                    >
                      {chip.label}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <Card
                      className={`px-3 py-2 max-w-[80%] ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"} ${message.status === "pending" ? "opacity-70" : ""}`}
                    >
                      <p className="text-sm">{message.content}</p>
                      {message.status === "pending" && (
                        <Loader2 className="h-3 w-3 animate-spin mt-1" />
                      )}
                    </Card>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-border">
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    {context === "page" ? "Entire Page" : "Selected Component"}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => setContext("page")}>
                    Entire Page
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setContext("component")}
                    disabled={!selectedComponentId}
                  >
                    Selected Component
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex-1 relative">
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask AI to create or modify components..."
                  className="pr-10"
                  disabled={isProcessing}
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                  disabled={!prompt.trim() || isProcessing}
                >
                  {isProcessing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Suggestion chips */}
            {messages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {suggestionChips.slice(0, 3).map((chip) => (
                  <Badge
                    key={chip.id}
                    variant="outline"
                    className="cursor-pointer hover:bg-accent text-xs"
                    onClick={chip.action}
                  >
                    {chip.label}
                  </Badge>
                ))}
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
}
