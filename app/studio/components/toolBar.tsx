"use client";

import { useReactFlow } from "@xyflow/react";
import { Shapes, MousePointer, Move, NotebookPen, Tag, ZoomIn, Square, Circle, Triangle } from "lucide-react";
import { useStudio } from "./studioContext";
import { NodeLabelDialog } from "./NodeLabelDialog";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ToolBar() {
  const { flowApi, toolMode, setToolMode, clearDrawing } = useStudio(); // Removed editApi as it seemed unused in original or causing issues? Checking original... used in original, will keep if needed but keeping it simple. Original had editApi, flowApi, toolMode, setToolMode.
  const { fitView } = useReactFlow();

  const [labelDialogOpen, setLabelDialogOpen] = useState(false);
  const [labelDialogInitialValue, setLabelDialogInitialValue] = useState("");
  const [labelDialogInitialInfo, setLabelDialogInitialInfo] = useState("");

  const addLabel = () => {
    const nodes = flowApi.getNodes();
    // Select node
    const selectedNodes = nodes.filter((n) => n.selected);
    if (selectedNodes.length === 0) return;

    // Use the label of the first selected node as initial value
    const firstNode = selectedNodes[0];
    setLabelDialogInitialValue(firstNode.data?.label as string || "");
    setLabelDialogInitialInfo(firstNode.data?.info as string || "");
    setLabelDialogOpen(true);
  };

  const handleLabelSave = (label: string, info: string) => {
    // if (!label) return;
    const nodes = flowApi.getNodes();
    const updatedNodes = nodes.map((n) => (n.selected ? { ...n, data: { ...(n.data ?? {}), label, info } } : n));
    flowApi.setNodes(updatedNodes);
  };

  const addShapeNode = (type: "square" | "circle" | "triangle") => {
    const id = `shape-${Date.now()}`;
    // Basic positioning logic - simple offset or center
    // For now, let's just place it at some visible coordinate.
    // Better would be center of viewport, but let's stick to simple fixed pos or random offset.
    const newNode = {
      id,
      type: "shape",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      style: { width: 128, height: 128, borderRadius: type === "circle" ? "50%" : "" },
      data: { label: type.charAt(0).toUpperCase() + type.slice(1), shapeType: type, info: "", icon: "/favicon.png" },
    };
    flowApi.addNode(newNode);
  };

  return (
    <div className="h-sm absolute top-1/3 z-[60] left-5 -translate-y-1/5 -mt-8 rounded-md p-2 border border-[var(--bsui-border)] bg-[var(--bsui-gray-3)]">
      <button
        onClick={() => setToolMode("select")}
        type="button"
        className={`mb-4 flex cursor-pointer items-center rounded-md px-3 py-3 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)] ${toolMode === "select" ? "bg-[var(--bsui-active)] ring-1 ring-[var(--bsui-actived)]" : ""}`}
        aria-pressed={toolMode === "select"}
      >
        <MousePointer className="size-6" />
      </button>
      <button
        type="button"
        onClick={() => setToolMode("move")}
        className={`mb-4 flex cursor-pointer items-center rounded-md px-3 py-3 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)] ${toolMode === "move" ? "bg-[var(--bsui-active)] ring-1 ring-[var(--bsui-actived)]" : ""}`}
        aria-pressed={toolMode === "move"}
      >
        <Move className="size-6" />
      </button>
      <button
        onClick={() => fitView()}
        type="button"
        className="mb-4 flex cursor-pointer items-center rounded-md px-3 py-3 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)]"
      >
        <ZoomIn className="size-6" />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="mb-4 flex cursor-pointer items-center rounded-md px-3 py-3 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)]"
          >
            <Shapes className="size-6" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="bg-[var(--bsui-gray-3)] border-[var(--bsui-border)] text-[var(--bsui-gray-0)]">
          <DropdownMenuItem onClick={() => addShapeNode("square")}>
            <Square className="mr-2 h-4 w-4" /> Square
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addShapeNode("circle")}>
            <Circle className="mr-2 h-4 w-4" /> Circle
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addShapeNode("triangle")}>
            <Triangle className="mr-2 h-4 w-4" /> Triangle
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <button
        onClick={() => setToolMode(toolMode === "pen" ? "select" : "pen")}
        onContextMenu={(e) => {
          e.preventDefault();
          clearDrawing();
        }}
        type="button"
        className={`mb-4 flex cursor-pointer items-center rounded-md px-3 py-3 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)] ${toolMode === "pen" ? "bg-[var(--bsui-active)] ring-1 ring-[var(--bsui-actived)]" : ""}`}
        aria-pressed={toolMode === "pen"}
        title="Right click to clear drawing"
      >
        <NotebookPen className="size-6" />
      </button>
      <button
        onClick={addLabel}
        type="button"
        className="mb-4 flex cursor-pointer items-center rounded-md px-3 py-3 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)]"
      >
        <Tag className="size-6" />
      </button>

      <NodeLabelDialog
        open={labelDialogOpen}
        onOpenChange={setLabelDialogOpen}
        initialLabel={labelDialogInitialValue}
        initialInfo={labelDialogInitialInfo}
        onSave={handleLabelSave}
      />
    </div>
  );
}
