"use client";
import "@xyflow/react/dist/style.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MiniMap, ReactFlow, useNodesState, useEdgesState, addEdge, useReactFlow } from "@xyflow/react";
import type { Node, Edge, Connection } from "@xyflow/react";
import ToolBar from "../toolBar";
import { nodeTypes, createNodeFromType, nodeConfigs } from "../nodes";
import { useStudio } from "../studioContext";
import { toast } from "sonner";

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

const defaultNodes: Node[] = [];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
  const { screenToFlowPosition } = useReactFlow();
  const nextIdRef = useRef<number>(defaultNodes.length + 1);
  const [mode, setMode] = useState<"select" | "pen" | "move">("select");
  const { setEditApiImpl } = useStudio();

  // clipboard for copy/paste
  const clipboardRef = useRef<Node[]>([]);

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
    // read our primary custom MIME type first, then fallback to text/plain
    const raw =
      event.dataTransfer.getData("application/reactflow") ||
      event.dataTransfer.getData("text/plain");
    if (!raw) return;

    try {
      const payload = JSON.parse(raw) as { type?: string; nodeType?: string; src?: string; name?: string };
      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const newId = String(nextIdRef.current++);

      // Determina o tipo de node baseado no payload
      // Prioriza nodeType, depois tenta inferir do name, e por último usa 'customNode' como fallback
      let nodeType = payload.nodeType || payload.type;

      if (!nodeType && payload.name) {
        // Tenta encontrar o tipo baseado no nome
        const nameLower = payload.name.toLowerCase();
        const foundType = Object.keys(nodeConfigs).find(
          key => nodeConfigs[key].name.toLowerCase() === nameLower
        );
        nodeType = foundType || "customNode";
      } else {
        nodeType = nodeType || "customNode";
      }

      // Cria o node usando a função utilitária ou cria manualmente se for customNode
      let newNode: Node;

      if (nodeType !== "customNode" && nodeConfigs[nodeType]) {
        newNode = createNodeFromType(nodeType, newId, position);
      } else {
        // Fallback para o formato antigo
        newNode = {
          id: newId,
          type: "customNode",
          position,
          data: {
            label: payload.name ? `${payload.name}-${newId}` : "Device",
            image: payload.src ?? "/dvc/desktop.png",
            dvctype: "End Device"
          },
        };
      }

      setNodes((nds) => nds.concat(newNode));

      // helpful tip on first use
      toast.success(`${payload.name || nodeType} added`, {
        description: "CTRL+Click for multi-selection",
        duration: 3000
      });
    } catch (error) {
      // Log error for debugging
      console.error("Error dropping node:", error);
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

  // register edit API with header via context
  useEffect(() => {
    const getSelectedNodes = () => nodes.filter((n) => n.selected);
    const getSelectedEdges = () => edges.filter((e) => e.selected);

    const copy = () => {
      const selected = getSelectedNodes();
      clipboardRef.current = selected.map((n) => ({ ...n, selected: false }));
    };

    const cut = () => {
      const selectedIds = new Set(getSelectedNodes().map((n) => n.id));
      clipboardRef.current = nodes.filter((n) => selectedIds.has(n.id)).map((n) => ({ ...n, selected: false }));
      setNodes((nds) => nds.filter((n) => !selectedIds.has(n.id)));
      // remove edges connected to deleted nodes
      setEdges((eds) => eds.filter((e) => !selectedIds.has(e.source) && !selectedIds.has(e.target)));
    };

    const paste = () => {
      if (!clipboardRef.current.length) return;
      const offset = 20;
      setNodes((nds) => {
        const pasted: Node[] = clipboardRef.current.map((n) => {
          const newId = String(nextIdRef.current++);
          return {
            ...n,
            id: newId,
            position: { x: n.position.x + offset, y: n.position.y + offset },
            selected: true,
          } as Node;
        });
        // deselect existing then add pasted selected
        const cleared: Node[] = nds.map((n) => ({ ...n, selected: false } as Node));
        return ([] as Node[]).concat(cleared, pasted);
      });
    };

    const deleteSelected = () => {
      const selectedNodeIds = new Set(getSelectedNodes().map((n) => n.id));
      const selectedEdgeIds = new Set(getSelectedEdges().map((e) => e.id));
      if (selectedNodeIds.size === 0 && selectedEdgeIds.size === 0) return;
      setNodes((nds) => nds.filter((n) => !selectedNodeIds.has(n.id)));
      setEdges((eds) => eds
        // drop explicitly selected edges
        .filter((e) => !selectedEdgeIds.has(e.id))
        // drop edges connected to removed nodes
        .filter((e) => !selectedNodeIds.has(e.source) && !selectedNodeIds.has(e.target))
      );
    };

    const selectAll = () => {
      setNodes((nds) => nds.map((n) => ({ ...n, selected: true })));
      setEdges((eds) => eds.map((e) => ({ ...e, selected: true })) as Edge[]);
    };

    setEditApiImpl({
      copy,
      cut,
      paste,
      deleteSelected,
      selectAll,
      hasSelection: () => nodes.some((n) => n.selected) || edges.some((e) => e.selected),
      canPaste: () => clipboardRef.current.length > 0,
    });
  }, [nodes, edges, setNodes, setEdges, setEditApiImpl]);

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
      panOnScroll={mode !== "pen"}
      zoomOnScroll={mode !== "pen"}
      fitView
    >
      {/* Pen overlay canvas - only interactive in pen mode */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: mode === "pen" ? 10 : -1 }}
      >
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 ${mode === "pen" ? "pointer-events-auto" : "pointer-events-none"}`}
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