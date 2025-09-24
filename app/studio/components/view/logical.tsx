"use client";
import "@xyflow/react/dist/style.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MiniMap, ReactFlow, useNodesState, useEdgesState, addEdge, useReactFlow } from "@xyflow/react";
import type { Node, Edge, Connection } from "@xyflow/react";
import ToolBar from "../toolBar";
import CustomNode from "../costumNode";

// --- edges
const defaultEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2"
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    style: { stroke: "#008aed", strokeWidth: 2 },
    animated: true,
    reconnectable: true,
  },
];

const defaultNodes: Node[] = [
];

const nodeTypes = {
  customNode: CustomNode,
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
  const { screenToFlowPosition } = useReactFlow();
  const nextIdRef = useRef<number>(defaultNodes.length + 1);
  const [mode, setMode] = useState<"select" | "pen" | "move">("select");

  // canvas drawing state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);
  const dprRef = useRef<number>(1);

  const onConnect = (connection: Connection) => setEdges((eds) => addEdge(connection, eds));

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const raw = event.dataTransfer.getData("application/reactflow");
    if (!raw) return;

    try {
      const payload = JSON.parse(raw) as { type?: string; src?: string; name?: string };
      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const newId = String(nextIdRef.current++);

      const newNode: Node = {
        id: newId,
        type: "customNode",
        position,
        data: { label: payload.name ? `${payload.name}-0${newId}` : "Device", image: payload.src ?? "/dvc/desktop.png" },
      };

      setNodes((nds) => nds.concat(newNode));
    } catch {
      // ignore invalid payloads
    }
  }, [screenToFlowPosition, setNodes]);

  // ensure canvas matches container size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.max(window.devicePixelRatio || 1, 1);
      dprRef.current = dpr;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#3AE87A";
        ctx.lineWidth = 3;
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      ro.disconnect();
    };
  }, []);

  const getCanvasPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.button !== 0) return; // only left button draws
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getCanvasPos(e);
    isDrawingRef.current = true;
    ctx.beginPath();
    ctx.moveTo(x, y);
    e.preventDefault();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getCanvasPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    e.preventDefault();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    e.preventDefault();
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // right-click clears all drawings
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.save();
    ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.restore();
  };

  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      onDrop={onDrop}
      onDragOver={onDragOver}
      elementsSelectable={mode === "select"}
      selectionOnDrag={mode === "select"}
      nodesDraggable={mode === "select"}
      panOnDrag={mode === "move"}
      fitView
    >
      {/* Pen overlay canvas - only interactive in pen mode */}
      <div className="absolute inset-0">
        <canvas
          ref={canvasRef}
          className={`${mode === "pen" ? "pointer-events-auto" : "pointer-events-none"}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onContextMenu={handleContextMenu}
        />
      </div>
      <MiniMap
        nodeStrokeWidth={1}
        className="border-2 p-0 m-0 rounded"
        position="bottom-right"
        bgColor="#1A1B1DCC"
        maskColor="#383B3EAA"
        zoomable
        pannable
      />
      <ToolBar mode={mode} setMode={setMode} />
    </ReactFlow>
  );
}

export default Flow;