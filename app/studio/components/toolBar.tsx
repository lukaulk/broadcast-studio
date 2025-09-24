"use client";

import { useReactFlow } from "@xyflow/react";
import { Hand, MousePointer, Move, NotebookPen, TagIcon, ZoomIn } from "lucide-react";

interface ToolBarProps {
  mode: "select" | "pen" | "move";
  setMode: (mode: "select" | "pen" | "move") => void;
}

export default function ToolBar({ mode, setMode }: ToolBarProps) {
  const { fitView, setNodes } = useReactFlow();

  const addLabel = () => {
    const label = prompt("Digite a etiqueta para o componente:");
    if (!label) return;

    setNodes((nds) => nds.map((n) => (n.selected ? { ...n, data: { ...(n.data ?? {}), label } } : n)));
  };

  return (
    <div className="h-sm absolute top-1/3 z-10 left-5 -translate-y-1/5 -mt-8 rounded-md p-2 border border-[var(--bsui-border)] bg-[var(--bsui-gray-3)]">
      <button
        onClick={() => setMode("select")}
        type="button"
        className={`mb-4 flex cursor-pointer items-center rounded-md px-3 py-3 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)] ${mode === "select" ? "bg-[var(--bsui-active)] ring-1 ring-[var(--bsui-actived)]" : ""}`}
        aria-pressed={mode === "select"}
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
        onClick={() => setMode("move")}
        className={`mb-4 flex cursor-pointer items-center rounded-md px-3 py-3 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)] ${mode === "move" ? "bg-[var(--bsui-active)] ring-1 ring-[var(--bsui-actived)]" : ""}`}
        aria-pressed={mode === "move"}
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
        onClick={() => setMode("pen")}
        type="button"
        className={`mb-4 flex cursor-pointer items-center rounded-md px-3 py-3 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)] ${mode === "pen" ? "bg-[var(--bsui-active)] ring-1 ring-[var(--bsui-actived)]" : ""}`}
        aria-pressed={mode === "pen"}
      >
        <NotebookPen className="size-6" />
      </button>
      <button
        onClick={addLabel}
        type="button"
        className="mb-4 flex cursor-pointer items-center rounded-md px-3 py-3 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)]"
      >
        <TagIcon className="size-6" />
      </button>
    </div>
  );
}
