"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Move,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Grid,
  Layers,
  Plus,
  Settings,
  Trash2,
  Sparkles,
} from "lucide-react";

interface ComponentData {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: ComponentData[];
}

interface PageSchema {
  id: string;
  name: string;
  components: ComponentData[];
}

interface MainCanvasProps {
  pageSchema?: PageSchema;
  onSelectComponent?: (componentId: string) => void;
  selectedComponentId?: string | null;
  viewMode?: "desktop" | "tablet" | "mobile";
  isProcessing?: boolean;
}

const defaultPageSchema: PageSchema = {
  id: "default-page",
  name: "Untitled Page",
  components: [
    {
      id: "header-1",
      type: "Header",
      props: {
        title: "Welcome to Page Builder",
        subtitle: "Create beautiful pages with AI",
      },
    },
    {
      id: "content-1",
      type: "ContentSection",
      props: {
        content:
          "This is a sample content section. Select it to edit properties.",
      },
    },
  ],
};

const MainCanvas: React.FC<MainCanvasProps> = ({
  pageSchema = defaultPageSchema,
  onSelectComponent = () => {},
  selectedComponentId = null,
  viewMode = "desktop",
  isProcessing = false,
}) => {
  const [zoom, setZoom] = useState<number>(100);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(true);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50));
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  const getCanvasWidth = () => {
    switch (viewMode) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      case "desktop":
      default:
        return "1200px";
    }
  };

  const renderComponent = (component: ComponentData) => {
    const isSelected = component.id === selectedComponentId;

    return (
      <div
        key={component.id}
        className={`relative group transition-all duration-200 ${
          isSelected
            ? "ring-2 ring-blue-500 ring-offset-2 bg-blue-50/50"
            : "hover:ring-1 hover:ring-blue-300 hover:ring-offset-1"
        } rounded-lg`}
        onClick={(e) => {
          e.stopPropagation();
          onSelectComponent(component.id);
        }}
      >
        {/* Component Label */}
        <div
          className={`absolute -top-6 left-0 text-xs font-medium px-2 py-1 rounded-t-md transition-opacity ${
            isSelected || component.id === selectedComponentId
              ? "opacity-100 bg-blue-500 text-white"
              : "opacity-0 group-hover:opacity-100 bg-gray-800 text-white"
          }`}
        >
          {component.type}
        </div>

        {/* Component Actions */}
        {isSelected && (
          <div className="absolute -top-2 -right-2 flex space-x-1 z-10">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-7 w-7 p-0 shadow-md"
                  >
                    <Settings className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit Properties</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-7 w-7 p-0 shadow-md"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete Component</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        {/* Component Content */}
        <div className="p-6">
          {component.type === "Header" && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg text-center">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {component.props.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {component.props.subtitle}
              </p>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Get Started
              </Button>
            </div>
          )}

          {component.type === "ContentSection" && (
            <div className="bg-background p-6 rounded-lg border">
              <p className="text-lg leading-relaxed">
                {component.props.content}
              </p>
            </div>
          )}

          {component.children?.map((child) => renderComponent(child))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Canvas Toolbar */}
      <div className="bg-background border-b p-2 flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Move className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Move Canvas</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={handleZoomIn}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom In</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="text-xs font-mono">{zoom}%</span>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={handleZoomOut}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom Out</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={handleResetZoom}
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset Zoom</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={showGrid ? "secondary" : "ghost"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setShowGrid(!showGrid)}
                >
                  <Grid className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle Grid</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Layers className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Layers</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add Component</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Canvas Area */}
      <div
        className="flex-1 overflow-auto p-8 relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
        style={{
          backgroundImage: showGrid
            ? "radial-gradient(circle, hsl(var(--muted-foreground) / 0.15) 1px, transparent 1px)"
            : "none",
          backgroundSize: "20px 20px",
        }}
        onClick={() => onSelectComponent("")}
      >
        {/* AI Processing Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center">
            <div className="bg-background border rounded-lg p-6 shadow-lg flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
              <div>
                <p className="font-medium">Build AI is working...</p>
                <p className="text-sm text-muted-foreground">
                  Creating your component
                </p>
              </div>
            </div>
          </div>
        )}

        <div
          className="min-h-[1200px] mx-auto bg-background shadow-xl rounded-lg overflow-hidden transition-all duration-300 border"
          style={{
            width: getCanvasWidth(),
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
          }}
        >
          <div className="p-8 space-y-6">
            {pageSchema.components.map((component) =>
              renderComponent(component),
            )}

            {pageSchema.components.length === 0 && (
              <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-muted-foreground/25 rounded-lg bg-muted/20">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Ready to build something amazing?
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Use the AI Brain Bar above to describe what you want to
                      create, or drag components from the library.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Try AI: "Create a hero section"
                    </Button>
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Browse Components
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCanvas;
