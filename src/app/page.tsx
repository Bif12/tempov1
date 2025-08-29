"use client";

import { useState } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainCanvas from "@/components/canvas/main-canvas";
import PropertyInspector from "@/components/properties/property-inspector";
import ComponentLibraryPanel from "@/components/library/component-library-panel";
import AIChatInterface from "@/components/ai/ai-chat-interface";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  Save,
  Play,
  Settings,
  Undo,
  Redo,
  Sparkles,
  Monitor,
  Tablet,
  Smartphone,
  Zap,
} from "lucide-react";
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

export default function BuildAIPageBuilder() {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    null,
  );
  const [aiPrompt, setAiPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );

  const handleAICommand = (prompt: string) => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      console.log("AI Command:", prompt);
    }, 2000);
  };

  const handleBrainBarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiPrompt.trim()) {
      handleAICommand(aiPrompt);
      setAiPrompt("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header with AI Brain Bar */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="flex h-16 items-center px-6 justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Build AI
              </h1>
            </div>

            {/* AI Brain Bar - The Core Feature */}
            <form onSubmit={handleBrainBarSubmit} className="flex-1 max-w-2xl">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Sparkles
                    className={`h-5 w-5 ${isProcessing ? "animate-pulse text-blue-500" : "text-muted-foreground"}`}
                  />
                </div>
                <Input
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Tell AI what to create... e.g., 'Create a hero section for my bakery with pastel colors'"
                  className="pl-12 pr-4 h-12 text-base bg-muted/50 border-2 border-muted focus:border-blue-500 focus:bg-background transition-all"
                  disabled={isProcessing}
                />
                {isProcessing && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
                  </div>
                )}
              </div>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === "desktop" ? "secondary" : "ghost"}
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setViewMode("desktop")}
                    >
                      <Monitor className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Desktop View</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === "tablet" ? "secondary" : "ghost"}
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setViewMode("tablet")}
                    >
                      <Tablet className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Tablet View</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === "mobile" ? "secondary" : "ghost"}
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setViewMode("mobile")}
                    >
                      <Smartphone className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Mobile View</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Undo className="h-4 w-4 mr-2" />
                      Undo
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Undo last action</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Redo className="h-4 w-4 mr-2" />
                      Redo
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Redo last action</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex items-center space-x-2">
              <ThemeSwitcher />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Project Settings</DropdownMenuItem>
                  <DropdownMenuItem>Export Options</DropdownMenuItem>
                  <DropdownMenuItem>AI Preferences</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" size="sm">
                <Play className="h-4 w-4 mr-2" />
                Preview
              </Button>

              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Save className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Sidebar - AI-Enhanced Component Library */}
          <ResizablePanel
            defaultSize={18}
            minSize={12}
            maxSize={30}
            className="border-r border-border/50"
          >
            <ComponentLibraryPanel
              onComponentAdd={(component) => {
                console.log("Adding component:", component);
              }}
            />
          </ResizablePanel>

          <ResizableHandle
            withHandle
            className="hover:bg-blue-500/20 transition-colors"
          />

          {/* Main Canvas Area */}
          <ResizablePanel defaultSize={57} className="flex flex-col">
            <MainCanvas
              selectedComponentId={selectedComponentId}
              onSelectComponent={setSelectedComponentId}
              viewMode={viewMode}
              isProcessing={isProcessing}
            />
          </ResizablePanel>

          <ResizableHandle
            withHandle
            className="hover:bg-blue-500/20 transition-colors"
          />

          {/* Right Sidebar - AI-Powered Property Inspector */}
          <ResizablePanel
            defaultSize={25}
            minSize={20}
            maxSize={40}
            className="border-l border-border/50"
          >
            <PropertyInspector
              selectedComponentId={selectedComponentId}
              onPropertyChange={(property, value) => {
                console.log("Property changed:", property, value);
              }}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Bottom AI Chat Interface */}
      <div className="border-t border-border/50">
        <AIChatInterface
          selectedComponentId={selectedComponentId}
          onGenerateComponent={(prompt) => handleAICommand(prompt)}
          onUpdateComponent={(prompt, componentId) => {
            handleAICommand(`Update ${componentId}: ${prompt}`);
          }}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  );
}
