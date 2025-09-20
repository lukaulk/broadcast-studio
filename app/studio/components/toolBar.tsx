"use client";

import { useReactFlow, useStore } from "@xyflow/react";
import { Hand, MousePointer, Move, NotebookPen, TagIcon, ZoomIn } from "lucide-react";


export default function ToolBar() {
  // agrupa as funções numa só chamada
  const { fitView, setNodes } = useReactFlow();

  // seleciona nodes que têm n.selected === true
  const selectedNodes = useStore((s) => s.nodes.filter((n) => !!(n as any).selected));

  const addLabel = () => {
    const label = prompt("Digite a etiqueta:");
    if (!label) return;

    setNodes((nds) =>
      nds.map((n) =>
        // atualiza apenas os nodes selecionados (propriedade selected === true)
        (n as any).selected
          ? { ...n, data: { ...(n.data ?? {}), label } }
          : n
      )
    );
  };

  return (
    <div className="h-sm absolute top-1/3 z-10 left-5 -translate-y-1/5 -mt-8 rounded-md p-2 border border-[var(--bsui-border)] bg-[var(--bsui-gray-3)]">
      <button
        type="button"
        className="mb-4 flex cursor-pointer items-center rounded-md px-3 py-3 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)]"
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
        className="mb-4 flex cursor-pointer items-center rounded-md px-3 py-3 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)]"
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
        type="button"
        className="mb-4 flex cursor-pointer items-center rounded-md px-3 py-3 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)]"
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
