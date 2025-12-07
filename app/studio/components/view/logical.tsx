"use client";
import "@xyflow/react/dist/style.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MiniMap, ReactFlow, useNodesState, useEdgesState, addEdge, useReactFlow, Background } from "@xyflow/react";
import type { Node, Edge, Connection } from "@xyflow/react";
import ToolBar from "../toolBar";
import DrawingOverlay from "../DrawingOverlay";
import { nodeTypes, createNodeFromType, nodeConfigs } from "../nodes";
import { useStudio } from "../studioContext";
import { toast } from "sonner";
import ContextMenu from "../ContextMenu";

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
  const { screenToFlowPosition, getViewport, setViewport, zoomIn, zoomOut, fitView } = useReactFlow();
  const nextIdRef = useRef<number>(defaultNodes.length + 1);
  const { setEditApiImpl, setFlowApiImpl, incrementNodesVersion, toolMode, takeSnapshot, editApi } = useStudio();
  const [showGrid, setShowGrid] = useState(true);
  const versionScheduleRef = useRef<number | null>(null);

  // Context Menu State
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const onContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
  }, []);

  const onPaneClick = useCallback(() => {
    if (contextMenu) setContextMenu(null);
  }, [contextMenu]);

  const notifyNodesChanged = useCallback(() => {
    if (typeof window === "undefined") return;
    if (versionScheduleRef.current !== null) return;
    versionScheduleRef.current = window.requestAnimationFrame(() => {
      versionScheduleRef.current = null;
      incrementNodesVersion();
    });
  }, [incrementNodesVersion]);

  useEffect(() => {
    return () => {
      if (versionScheduleRef.current !== null) {
        window.cancelAnimationFrame(versionScheduleRef.current);
        versionScheduleRef.current = null;
      }
    };
  }, []);

  const handleNodesChange = useCallback((changes: Parameters<typeof onNodesChange>[0]) => {
    onNodesChange(changes);
    notifyNodesChanged();
  }, [onNodesChange, notifyNodesChanged]);

  // clipboard for copy/paste
  const clipboardRef = useRef<Node[]>([]);

  const onConnect = (connection: Connection) => {
    takeSnapshot();
    setEdges((eds) => addEdge(connection, eds));
  };

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // read our primary custom MIME type first, then fallback to text/plain
    const raw =
      event.dataTransfer.getData("application/reactflow") ||
      event.dataTransfer.getData("text/plain");
    if (!raw) return;

    try {
      const payload = JSON.parse(raw) as { type?: string; nodeType?: string; src?: string; name?: string };

      // Use screenToFlowPosition with current flow instance
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

      setNodes((nds) => [...nds, newNode]);
      notifyNodesChanged();

      // helpful tip on first use
      toast.success(`${payload.name || nodeType} added`, {
        description: "CTRL+Click for multi-selection",
        duration: 3000
      });
    } catch {
      // Silently handle invalid payloads
      // Error is likely due to invalid JSON or missing required fields
    }
  }, [screenToFlowPosition, setNodes, notifyNodesChanged]);


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
      notifyNodesChanged();
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
      notifyNodesChanged();
    };

    const deleteSelected = () => {
      const selectedNodeIds = new Set(getSelectedNodes().map((n) => n.id));
      const selectedEdgeIds = new Set(getSelectedEdges().map((e) => e.id));
      if (selectedNodeIds.size === 0 && selectedEdgeIds.size === 0) return;
      setNodes((nds) => nds.filter((n) => !selectedNodeIds.has(n.id)));
      notifyNodesChanged();
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

    // Expose nodes and edges to context for hierarchy
    setFlowApiImpl({
      getNodes: () => nodes,
      getEdges: () => edges,
      setNodes: (newNodes) => {
        if (typeof newNodes === 'function') {
          setNodes((prevNodes) => newNodes(prevNodes));
        } else {
          setNodes(newNodes);
        }
        notifyNodesChanged();
      },
      setEdges: (newEdges) => {
        if (typeof newEdges === 'function') {
          setEdges((prevEdges) => newEdges(prevEdges));
        } else {
          setEdges(newEdges);
        }
      },
      addNode: (newNode) => {
        setNodes((nds) => [...nds, newNode]);
        notifyNodesChanged();
      },
      toggleGrid: () => setShowGrid((prev) => !prev),
      getShowGrid: () => showGrid,
      loadProjectData: (data) => {
        setNodes(data.nodes || []);
        setEdges(data.edges || []);
        if (data.viewport) {
          setViewport(data.viewport);
        } else {
          fitView();
        }
        notifyNodesChanged();
      },
      getViewport: () => getViewport(),
      zoomIn: () => zoomIn(),
      zoomOut: () => zoomOut(),
      fitView: (options) => fitView(options),
    } as Partial<import("../studioContext").StudioFlowApi>);
  }, [nodes, edges, setNodes, setEdges, setEditApiImpl, setFlowApiImpl, notifyNodesChanged, showGrid, getViewport, setViewport, zoomIn, zoomOut, fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={handleNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      onDrop={onDrop}
      onDragOver={onDragOver}
      elementsSelectable={toolMode === "select"}
      selectionOnDrag={toolMode === "select"}
      nodesDraggable={toolMode === "select"}
      panOnDrag={toolMode === "move"}
      panOnScroll={toolMode !== "pen"}
      zoomOnScroll={toolMode !== "pen"}
      fitView
      deleteKeyCode={null}
      multiSelectionKeyCode={null}
      onContextMenu={onContextMenu}
      onPaneClick={onPaneClick}
      onNodeDragStart={() => takeSnapshot()} // Snapshot *before* drag? Or after? Usually before to undo to previous pos.
      onSelectionDragStart={() => takeSnapshot()}
    >
      {contextMenu && <ContextMenu position={contextMenu} onClose={() => setContextMenu(null)} editApi={editApi} />}
      {showGrid && <Background gap={20} size={1} />}
      <MiniMap
        nodeStrokeWidth={1}
        className="border-2 p-0 m-0 rounded"
        position="bottom-right"
        bgColor="#1A1B1DCC"
        maskColor="#383B3EAA"
        zoomable
        pannable
      />
      <ToolBar />
      <DrawingOverlay />
    </ReactFlow>
  );
}

export default Flow;
