"use client";

import { useReactFlow } from "@xyflow/react";
import { Hand, MousePointer, Move, NotebookPen, Tag, ZoomIn } from "lucide-react";
import { useStudio } from "./studioContext";
import { NodeLabelDialog } from "./NodeLabelDialog";
import { useState } from "react";

export default function ToolBar() {
  const { flowApi, editApi, toolMode, setToolMode } = useStudio();
  const { fitView } = useReactFlow();

  const [labelDialogOpen, setLabelDialogOpen] = useState(false);
  const [labelDialogInitialValue, setLabelDialogInitialValue] = useState("");

  const addLabel = () => {
    const nodes = flowApi.getNodes();
    const selectedNodes = nodes.filter((n) => n.selected);
    if (selectedNodes.length === 0) return;

    // Use the label of the first selected node as initial value
    const firstNode = selectedNodes[0];
    setLabelDialogInitialValue(firstNode.data?.label as string || "");
    setLabelDialogOpen(true);
  };

  const handleLabelSave = (label: string) => {
    if (!label) return;
    const nodes = flowApi.getNodes();
    const updatedNodes = nodes.map((n) => (n.selected ? { ...n, data: { ...(n.data ?? {}), label } } : n));
    flowApi.setNodes(updatedNodes);
  };

  return (
    <div className="h-sm absolute top-1/3 z-10 left-5 -translate-y-1/5 -mt-8 rounded-md p-2 border border-[var(--bsui-border)] bg-[var(--bsui-gray-3)]">
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
        className="mb-4 flex cursor-pointer items-center rounded-md px-3 py-3 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)]"
      >
        <Hand className="size-6" />
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
      <button
        onClick={() => setToolMode(toolMode === "pen" ? "select" : "pen")}
        type="button"
        className={`mb-4 flex cursor-pointer items-center rounded-md px-3 py-3 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)] ${toolMode === "pen" ? "bg-[var(--bsui-active)] ring-1 ring-[var(--bsui-actived)]" : ""}`}
        aria-pressed={toolMode === "pen"}
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
        onSave={handleLabelSave}
      />
    </div>
  );
}
