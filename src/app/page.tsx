"use client";

import { useState } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import MainCanvas from "@/components/canvas/main-canvas";
// Assume this component is created but not yet implemented
// We'll need to implement it with a default export
import PropertyInspector from "@/components/properties/property-inspector";
import ComponentLibraryPanel from "@/components/library/component-library-panel";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Save, Play, Settings, Undo, Redo } from "lucide-react";

// Define a temporary chat interface component until the real one is implemented
const AiChatInterface = ({
  selectedComponentId,
}: {
  selectedComponentId: string | null;
}) => {
  return (
    <div className="h-full p-4 bg-background">
      <div className="flex flex-col h-full justify-end">
        <div className="flex items-center gap-2 border rounded-lg p-2">
          <input
            type="text"
            placeholder="Describe what you want to create or modify..."
            className="flex-1 bg-transparent focus:outline-none"
          />
          <Button size="sm">Send</Button>
        </div>
      </div>
    </div>
  );
};

export default function PageBuilder() {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    null,
  );

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background z-10">
        <div className="flex h-14 items-center px-4 justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">AI Page Builder</h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Undo className="h-4 w-4 mr-1" />
                Undo
              </Button>
              <Button variant="outline" size="sm">
                <Redo className="h-4 w-4 mr-1" />
                Redo
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeSwitcher />
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <Play className="h-4 w-4 mr-1" />
              Preview
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-1" />
              Publish
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Sidebar - Component Library */}
          <ResizablePanel
            defaultSize={15}
            minSize={10}
            maxSize={25}
            className="border-r"
          >
            <ComponentLibraryPanel />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Main Content Area */}
          <ResizablePanel defaultSize={60} className="flex flex-col">
            <div className="flex-1 overflow-auto p-4">
              <MainCanvas
                selectedComponentId={selectedComponentId}
                onSelectComponent={setSelectedComponentId}
              />
            </div>

            <Separator />

            {/* Bottom Panel - AI Chat Interface */}
            <div className="h-[150px] border-t">
              <AiChatInterface selectedComponentId={selectedComponentId} />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Sidebar - Property Inspector */}
          <ResizablePanel
            defaultSize={25}
            minSize={15}
            maxSize={40}
            className="border-l"
          >
            <PropertyInspector selectedComponentId={selectedComponentId} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
