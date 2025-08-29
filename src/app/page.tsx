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
  FileText,
  BookOpen,
  BarChart3,
  Layout,
  Home,
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
  const [currentPage, setCurrentPage] = useState<
    "builder" | "templates" | "docs" | "dashboard" | "settings"
  >("builder");

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
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Build AI
                </h1>
              </div>

              {/* Navigation Links */}
              <nav className="flex items-center space-x-1">
                <Button
                  variant={currentPage === "builder" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage("builder")}
                  className="h-9"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Builder
                </Button>
                <Button
                  variant={currentPage === "templates" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage("templates")}
                  className="h-9"
                >
                  <Layout className="h-4 w-4 mr-2" />
                  Templates
                </Button>
                <Button
                  variant={currentPage === "docs" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage("docs")}
                  className="h-9"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Docs
                </Button>
                <Button
                  variant={currentPage === "dashboard" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage("dashboard")}
                  className="h-9"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button
                  variant={currentPage === "settings" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage("settings")}
                  className="h-9"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </nav>
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
        {currentPage === "builder" ? (
          <>
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
          </>
        ) : (
          <div className="h-full p-8 overflow-auto">
            {currentPage === "templates" && (
              <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-4">Templates</h2>
                  <p className="text-muted-foreground text-lg">
                    Choose from our collection of professionally designed
                    templates to get started quickly.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      name: "Landing Page",
                      description:
                        "Perfect for product launches and marketing campaigns",
                      category: "Marketing",
                    },
                    {
                      name: "Portfolio",
                      description:
                        "Showcase your work and skills professionally",
                      category: "Personal",
                    },
                    {
                      name: "E-commerce",
                      description:
                        "Complete online store with product listings",
                      category: "Business",
                    },
                    {
                      name: "Blog",
                      description: "Clean and modern blog layout",
                      category: "Content",
                    },
                    {
                      name: "Corporate",
                      description: "Professional business website template",
                      category: "Business",
                    },
                    {
                      name: "SaaS",
                      description: "Software as a Service landing page",
                      category: "Technology",
                    },
                  ].map((template, index) => (
                    <Card
                      key={index}
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-lg flex items-center justify-center">
                        <Layout className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{template.name}</h3>
                          <span className="text-xs bg-muted px-2 py-1 rounded">
                            {template.category}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {template.description}
                        </p>
                        <Button className="w-full">Use Template</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {currentPage === "docs" && (
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-4">Documentation</h2>
                  <p className="text-muted-foreground text-lg">
                    Learn how to use Build AI to create amazing websites with
                    our comprehensive guides.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Getting Started",
                      description: "Learn the basics of using Build AI",
                      icon: <Sparkles className="h-6 w-6" />,
                    },
                    {
                      title: "AI Commands",
                      description: "Master the AI command system",
                      icon: <Zap className="h-6 w-6" />,
                    },
                    {
                      title: "Components",
                      description: "Understanding components and layouts",
                      icon: <Layout className="h-6 w-6" />,
                    },
                    {
                      title: "Publishing",
                      description: "Deploy your website to the web",
                      icon: <Play className="h-6 w-6" />,
                    },
                  ].map((doc, index) => (
                    <Card
                      key={index}
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="p-2 bg-primary/10 rounded-lg mr-4">
                            {doc.icon}
                          </div>
                          <h3 className="font-semibold text-lg">{doc.title}</h3>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          {doc.description}
                        </p>
                        <Button variant="outline" className="w-full">
                          Read More
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {currentPage === "dashboard" && (
              <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
                  <p className="text-muted-foreground text-lg">
                    Monitor your projects and track your progress.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    {
                      label: "Total Projects",
                      value: "12",
                      change: "+2 this month",
                    },
                    {
                      label: "Published Sites",
                      value: "8",
                      change: "+1 this week",
                    },
                    {
                      label: "AI Commands Used",
                      value: "247",
                      change: "+15 today",
                    },
                    {
                      label: "Storage Used",
                      value: "2.4 GB",
                      change: "of 10 GB",
                    },
                  ].map((stat, index) => (
                    <Card key={index}>
                      <div className="p-6">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          {stat.label}
                        </h3>
                        <div className="text-2xl font-bold mb-1">
                          {stat.value}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {stat.change}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>

                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Recent Projects
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          name: "My Portfolio",
                          status: "Published",
                          lastModified: "2 hours ago",
                        },
                        {
                          name: "Landing Page",
                          status: "Draft",
                          lastModified: "1 day ago",
                        },
                        {
                          name: "Blog Site",
                          status: "Published",
                          lastModified: "3 days ago",
                        },
                      ].map((project, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium">{project.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Last modified {project.lastModified}
                            </p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span
                              className={`px-2 py-1 text-xs rounded ${project.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                            >
                              {project.status}
                            </span>
                            <Button variant="outline" size="sm">
                              Open
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {currentPage === "settings" && (
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-4">Settings</h2>
                  <p className="text-muted-foreground text-lg">
                    Customize your Build AI experience and manage your account.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Account Settings
                      </h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">
                              Full Name
                            </label>
                            <Input placeholder="Enter your full name" />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">
                              Email
                            </label>
                            <Input
                              placeholder="Enter your email"
                              type="email"
                            />
                          </div>
                        </div>
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        AI Preferences
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Auto-suggestions</h4>
                            <p className="text-sm text-muted-foreground">
                              Enable AI to provide automatic suggestions while
                              you work
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Toggle
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Smart layouts</h4>
                            <p className="text-sm text-muted-foreground">
                              Let AI automatically optimize your layouts
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Toggle
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Appearance</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Theme
                          </label>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Light
                            </Button>
                            <Button variant="outline" size="sm">
                              Dark
                            </Button>
                            <Button variant="outline" size="sm">
                              System
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
