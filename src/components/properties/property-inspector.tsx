"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  ChevronUp,
  X,
  Plus,
  Trash2,
  Settings,
  Palette,
  Layout,
  Type,
  Sparkles,
  Wand2,
  RefreshCw,
} from "lucide-react";

interface PropertyInspectorProps {
  selectedComponent?: any;
  onPropertyChange?: (property: string, value: any) => void;
}

export default function PropertyInspector({
  selectedComponent = null,
  onPropertyChange = () => {},
}: PropertyInspectorProps) {
  const [activeTab, setActiveTab] = useState("style");
  const [properties, setProperties] = useState<Record<string, any>>({});

  // Update local properties when selected component changes
  useEffect(() => {
    if (selectedComponent) {
      setProperties(selectedComponent.props || {});
    } else {
      setProperties({});
    }
  }, [selectedComponent]);

  // Handle property change
  const handlePropertyChange = (property: string, value: any) => {
    setProperties((prev) => ({
      ...prev,
      [property]: value,
    }));
    onPropertyChange(property, value);
  };

  // If no component is selected
  if (!selectedComponent) {
    return (
      <div className="w-full h-full bg-background border-l border-border p-4 flex flex-col items-center justify-center text-center">
        <Settings className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No Component Selected</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Select a component on the canvas to edit its properties
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-background border-l border-border flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-primary/10 p-2 rounded-md mr-3">
            {selectedComponent.type === "heading" ? (
              <Type className="h-5 w-5 text-primary" />
            ) : selectedComponent.type === "container" ? (
              <Layout className="h-5 w-5 text-primary" />
            ) : (
              <Settings className="h-5 w-5 text-primary" />
            )}
          </div>
          <div>
            <h3 className="font-medium">
              {selectedComponent.type || "Component"}
            </h3>
            <p className="text-xs text-muted-foreground">
              {selectedComponent.id}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <div className="px-4 pt-2">
          <TabsList className="w-full">
            <TabsTrigger value="style" className="flex-1">
              <Palette className="h-4 w-4 mr-2" />
              Style
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex-1">
              <Layout className="h-4 w-4 mr-2" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex-1">
              <Settings className="h-4 w-4 mr-2" />
              Advanced
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1 p-4">
          <TabsContent value="style" className="mt-0">
            <PropertySection title="Typography">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="text">Text</Label>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Wand2 className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    id="text"
                    value={properties.text || ""}
                    onChange={(e) =>
                      handlePropertyChange("text", e.target.value)
                    }
                    placeholder="Enter text content"
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Button variant="outline" size="sm" className="text-xs h-6">
                      Make shorter
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs h-6">
                      More professional
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs h-6">
                      Add emoji
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="fontSize">Font Size</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      id="fontSize"
                      min={8}
                      max={72}
                      step={1}
                      value={[properties.fontSize || 16]}
                      onValueChange={(value) =>
                        handlePropertyChange("fontSize", value[0])
                      }
                    />
                    <span className="w-12 text-center">
                      {properties.fontSize || 16}px
                    </span>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="fontWeight">Font Weight</Label>
                  <Select
                    value={properties.fontWeight || "normal"}
                    onValueChange={(value) =>
                      handlePropertyChange("fontWeight", value)
                    }
                  >
                    <SelectTrigger id="fontWeight">
                      <SelectValue placeholder="Select weight" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="semibold">Semibold</SelectItem>
                      <SelectItem value="bold">Bold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="textColor">Text Color</Label>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded border"
                      style={{
                        backgroundColor: properties.textColor || "#000000",
                      }}
                    />
                    <Input
                      id="textColor"
                      type="text"
                      value={properties.textColor || "#000000"}
                      onChange={(e) =>
                        handlePropertyChange("textColor", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </PropertySection>

            <PropertySection title="Appearance">
              <div className="space-y-4">
                {/* AI Style Suggestions */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">
                        AI Style Suggestions
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 flex flex-col p-1"
                    >
                      <div className="w-full h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded mb-1"></div>
                      Modern
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 flex flex-col p-1"
                    >
                      <div className="w-full h-3 bg-gradient-to-r from-green-400 to-emerald-600 rounded mb-1"></div>
                      Nature
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 flex flex-col p-1"
                    >
                      <div className="w-full h-3 bg-gradient-to-r from-purple-400 to-pink-600 rounded mb-1"></div>
                      Creative
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="backgroundColor">Background Color</Label>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Wand2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded border"
                      style={{
                        backgroundColor:
                          properties.backgroundColor || "transparent",
                      }}
                    />
                    <Input
                      id="backgroundColor"
                      type="text"
                      value={properties.backgroundColor || "transparent"}
                      onChange={(e) =>
                        handlePropertyChange("backgroundColor", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="borderRadius">Border Radius</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      id="borderRadius"
                      min={0}
                      max={50}
                      step={1}
                      value={[properties.borderRadius || 0]}
                      onValueChange={(value) =>
                        handlePropertyChange("borderRadius", value[0])
                      }
                    />
                    <span className="w-12 text-center">
                      {properties.borderRadius || 0}px
                    </span>
                  </div>
                </div>
              </div>
            </PropertySection>
          </TabsContent>

          <TabsContent value="layout" className="mt-0">
            <PropertySection title="Dimensions">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="width">Width</Label>
                    <Input
                      id="width"
                      type="text"
                      value={properties.width || "auto"}
                      onChange={(e) =>
                        handlePropertyChange("width", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="height">Height</Label>
                    <Input
                      id="height"
                      type="text"
                      value={properties.height || "auto"}
                      onChange={(e) =>
                        handlePropertyChange("height", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="padding">Padding</Label>
                  <div className="grid grid-cols-4 gap-2">
                    <Input
                      placeholder="Top"
                      value={properties.paddingTop || ""}
                      onChange={(e) =>
                        handlePropertyChange("paddingTop", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Right"
                      value={properties.paddingRight || ""}
                      onChange={(e) =>
                        handlePropertyChange("paddingRight", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Bottom"
                      value={properties.paddingBottom || ""}
                      onChange={(e) =>
                        handlePropertyChange("paddingBottom", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Left"
                      value={properties.paddingLeft || ""}
                      onChange={(e) =>
                        handlePropertyChange("paddingLeft", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="margin">Margin</Label>
                  <div className="grid grid-cols-4 gap-2">
                    <Input
                      placeholder="Top"
                      value={properties.marginTop || ""}
                      onChange={(e) =>
                        handlePropertyChange("marginTop", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Right"
                      value={properties.marginRight || ""}
                      onChange={(e) =>
                        handlePropertyChange("marginRight", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Bottom"
                      value={properties.marginBottom || ""}
                      onChange={(e) =>
                        handlePropertyChange("marginBottom", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Left"
                      value={properties.marginLeft || ""}
                      onChange={(e) =>
                        handlePropertyChange("marginLeft", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </PropertySection>

            <PropertySection title="Positioning">
              <div className="space-y-4">
                {/* AI Spacing Autofix */}
                <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Wand2 className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-medium">
                        Spacing Autofix
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className="h-7 bg-amber-500 hover:bg-amber-600"
                    >
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                    AI detected spacing issues. Click to auto-adjust margins and
                    padding.
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="flexbox">Flexbox</Label>
                  <Switch
                    id="flexbox"
                    checked={properties.display === "flex"}
                    onCheckedChange={(checked) =>
                      handlePropertyChange(
                        "display",
                        checked ? "flex" : "block",
                      )
                    }
                  />
                </div>

                {properties.display === "flex" && (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="flexDirection">Direction</Label>
                      <Select
                        value={properties.flexDirection || "row"}
                        onValueChange={(value) =>
                          handlePropertyChange("flexDirection", value)
                        }
                      >
                        <SelectTrigger id="flexDirection">
                          <SelectValue placeholder="Select direction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="row">Row</SelectItem>
                          <SelectItem value="column">Column</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="justifyContent">Justify Content</Label>
                      <Select
                        value={properties.justifyContent || "flex-start"}
                        onValueChange={(value) =>
                          handlePropertyChange("justifyContent", value)
                        }
                      >
                        <SelectTrigger id="justifyContent">
                          <SelectValue placeholder="Select alignment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="flex-start">Start</SelectItem>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="flex-end">End</SelectItem>
                          <SelectItem value="space-between">
                            Space Between
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>
            </PropertySection>
          </TabsContent>

          <TabsContent value="advanced" className="mt-0">
            <PropertySection title="Interactions">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="clickable">Clickable</Label>
                  <Switch
                    id="clickable"
                    checked={properties.clickable || false}
                    onCheckedChange={(checked) =>
                      handlePropertyChange("clickable", checked)
                    }
                  />
                </div>

                {properties.clickable && (
                  <div className="grid gap-2">
                    <Label htmlFor="linkUrl">Link URL</Label>
                    <Input
                      id="linkUrl"
                      type="text"
                      value={properties.linkUrl || ""}
                      onChange={(e) =>
                        handlePropertyChange("linkUrl", e.target.value)
                      }
                      placeholder="https://example.com"
                    />
                  </div>
                )}
              </div>
            </PropertySection>

            <PropertySection title="Custom Attributes">
              <div className="space-y-2">
                {(properties.customAttributes || []).map(
                  (attr: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder="Name"
                        value={attr.name}
                        onChange={(e) => {
                          const newAttrs = [
                            ...(properties.customAttributes || []),
                          ];
                          newAttrs[index] = {
                            ...newAttrs[index],
                            name: e.target.value,
                          };
                          handlePropertyChange("customAttributes", newAttrs);
                        }}
                        className="flex-1"
                      />
                      <Input
                        placeholder="Value"
                        value={attr.value}
                        onChange={(e) => {
                          const newAttrs = [
                            ...(properties.customAttributes || []),
                          ];
                          newAttrs[index] = {
                            ...newAttrs[index],
                            value: e.target.value,
                          };
                          handlePropertyChange("customAttributes", newAttrs);
                        }}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newAttrs = [
                            ...(properties.customAttributes || []),
                          ];
                          newAttrs.splice(index, 1);
                          handlePropertyChange("customAttributes", newAttrs);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ),
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => {
                    const newAttrs = [
                      ...(properties.customAttributes || []),
                      { name: "", value: "" },
                    ];
                    handlePropertyChange("customAttributes", newAttrs);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Attribute
                </Button>
              </div>
            </PropertySection>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}

interface PropertySectionProps {
  title: string;
  children: React.ReactNode;
}

function PropertySection({ title, children }: PropertySectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="mb-4">
      <CardHeader
        className="py-2 px-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      {isOpen && <CardContent className="py-3 px-4">{children}</CardContent>}
    </Card>
  );
}
