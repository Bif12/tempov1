"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Plus,
  Sparkles,
  Filter,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

type ComponentCategory = {
  name: string;
  components: ComponentItem[];
};

type ComponentItem = {
  id: string;
  name: string;
  description: string;
  icon?: React.ReactNode;
  thumbnail?: string;
};

interface ComponentLibraryPanelProps {
  onComponentDragStart?: (
    component: ComponentItem,
    event: React.DragEvent,
  ) => void;
  onComponentAdd?: (component: ComponentItem) => void;
}

export default function ComponentLibraryPanel({
  onComponentDragStart = () => {},
  onComponentAdd = () => {},
}: ComponentLibraryPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([
    "Hero sections for landing pages",
    "Contact forms with validation",
    "Pricing tables for SaaS",
    "Testimonial carousels",
  ]);
  const [categories, setCategories] = useState<ComponentCategory[]>([
    {
      name: "Layout",
      components: [
        {
          id: "section",
          name: "Section",
          description: "A full-width container for content",
          thumbnail:
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=60",
        },
        {
          id: "container",
          name: "Container",
          description: "A centered content container with max-width",
          thumbnail:
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=60",
        },
        {
          id: "grid",
          name: "Grid",
          description: "A responsive grid layout system",
          thumbnail:
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=60",
        },
      ],
    },
    {
      name: "Content",
      components: [
        {
          id: "heading",
          name: "Heading",
          description: "A text heading with multiple levels",
          thumbnail:
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=60",
        },
        {
          id: "paragraph",
          name: "Paragraph",
          description: "A block of text content",
          thumbnail:
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=60",
        },
        {
          id: "button",
          name: "Button",
          description: "An interactive button element",
          thumbnail:
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=60",
        },
      ],
    },
    {
      name: "Media",
      components: [
        {
          id: "image",
          name: "Image",
          description: "A responsive image component",
          thumbnail:
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=60",
        },
        {
          id: "video",
          name: "Video",
          description: "An embedded video player",
          thumbnail:
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=60",
        },
        {
          id: "carousel",
          name: "Carousel",
          description: "A slideshow for cycling through elements",
          thumbnail:
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=60",
        },
      ],
    },
    {
      name: "Forms",
      components: [
        {
          id: "input",
          name: "Input",
          description: "A text input field",
          thumbnail:
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=60",
        },
        {
          id: "textarea",
          name: "Textarea",
          description: "A multi-line text input",
          thumbnail:
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=60",
        },
        {
          id: "contact-form",
          name: "Contact Form",
          description: "A complete contact form with validation",
          thumbnail:
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=60",
        },
      ],
    },
    {
      name: "Sections",
      components: [
        {
          id: "hero",
          name: "Hero Section",
          description: "A prominent banner section",
          thumbnail:
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=60",
        },
        {
          id: "features",
          name: "Features Grid",
          description: "A grid of feature cards or items",
          thumbnail:
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=60",
        },
        {
          id: "testimonials",
          name: "Testimonials",
          description: "A section for customer testimonials",
          thumbnail:
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=60",
        },
        {
          id: "pricing",
          name: "Pricing Table",
          description: "A comparison table for pricing plans",
          thumbnail:
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=60",
        },
        {
          id: "footer",
          name: "Footer",
          description: "A page footer with links and info",
          thumbnail:
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=60",
        },
      ],
    },
  ]);

  // Filter components based on search query
  const filteredCategories = searchQuery
    ? categories
        .map((category) => ({
          ...category,
          components: category.components.filter(
            (component) =>
              component.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              component.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.components.length > 0)
    : categories;

  const handleDragStart = (
    component: ComponentItem,
    event: React.DragEvent,
  ) => {
    // Set the drag data with the component information
    event.dataTransfer.setData("application/json", JSON.stringify(component));
    event.dataTransfer.effectAllowed = "copy";
    onComponentDragStart(component, event);
  };

  return (
    <div className="flex flex-col h-full w-full bg-background border-r">
      <div className="p-4 border-b space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Components</h2>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* AI Suggestions */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-3 rounded-lg border">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">AI Suggestions</span>
          </div>
          <div className="space-y-1">
            {aiSuggestions.slice(0, 2).map((suggestion, index) => (
              <button
                key={index}
                className="w-full text-left text-xs p-2 rounded bg-background/50 hover:bg-background transition-colors border"
                onClick={() => setSearchQuery(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search or describe what you need..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 p-2">
        {searchQuery && filteredCategories.length === 0 ? (
          <div className="p-4 text-center space-y-3">
            <div className="text-muted-foreground text-sm">
              No components found for "{searchQuery}"
            </div>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Zap className="h-4 w-4 mr-2" />
              Ask AI to Create
            </Button>
          </div>
        ) : (
          <Accordion
            type="multiple"
            defaultValue={["Layout"]}
            className="w-full"
          >
            {filteredCategories.map((category) => (
              <AccordionItem key={category.name} value={category.name}>
                <AccordionTrigger className="px-2 hover:no-underline">
                  <span className="text-sm font-medium">{category.name}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-2 p-1">
                    {category.components.map((component) => (
                      <ComponentCard
                        key={component.id}
                        component={component}
                        onDragStart={(e) => handleDragStart(component, e)}
                        onAdd={() => onComponentAdd(component)}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </ScrollArea>
    </div>
  );
}

interface ComponentCardProps {
  component: ComponentItem;
  onDragStart: (event: React.DragEvent) => void;
  onAdd: () => void;
}

function ComponentCard({ component, onDragStart, onAdd }: ComponentCardProps) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="flex items-center gap-2 p-2 rounded-md border bg-card hover:bg-accent/50 cursor-grab transition-colors group"
    >
      {component.thumbnail ? (
        <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0">
          <img
            src={component.thumbnail}
            alt={component.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-8 h-8 rounded bg-muted flex items-center justify-center flex-shrink-0">
          {component.icon || <div className="w-4 h-4 bg-primary/20 rounded" />}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{component.name}</p>
        <p className="text-xs text-muted-foreground truncate">
          {component.description}
        </p>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onAdd}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
