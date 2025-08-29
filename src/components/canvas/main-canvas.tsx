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

  const renderComponent = (component: ComponentData) => {
    const isSelected = component.id === selectedComponentId;

    return (
      <div
        key={component.id}
        className={`relative p-4 mb-4 border-2 ${isSelected ? "border-blue-500" : "border-dashed border-gray-300"} rounded-md transition-all`}
        onClick={(e) => {
          e.stopPropagation();
          onSelectComponent(component.id);
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="text-xs text-gray-500">{component.type}</div>
          {isSelected && (
            <div className="flex space-x-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {component.type === "Header" && (
          <div className="bg-background">
            <h1 className="text-2xl font-bold">{component.props.title}</h1>
            <p className="text-gray-500">{component.props.subtitle}</p>
          </div>
        )}

        {component.type === "ContentSection" && (
          <div className="bg-background p-4">
            <p>{component.props.content}</p>
          </div>
        )}

        {component.children?.map((child) => renderComponent(child))}
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
        className="flex-1 overflow-auto p-8 relative"
        style={{
          backgroundImage: showGrid
            ? "radial-gradient(circle, #ddd 1px, transparent 1px)"
            : "none",
          backgroundSize: "20px 20px",
        }}
        onClick={() => onSelectComponent("")}
      >
        <div
          className="min-h-[1200px] w-full max-w-[1200px] mx-auto bg-white shadow-sm rounded-md overflow-hidden transition-transform"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
          }}
        >
          <div className="p-6">
            {pageSchema.components.map((component) =>
              renderComponent(component),
            )}

            {pageSchema.components.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-md">
                <p className="text-gray-500 mb-4">Your canvas is empty</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Component
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCanvas;
