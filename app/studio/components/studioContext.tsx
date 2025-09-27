"use client";

import React, { createContext, useContext, useMemo, useRef, useState } from "react";
import type { Node, Edge, Viewport, ReactFlowInstance } from "reactflow";

export type EditAction = "undo" | "redo" | "cut" | "copy" | "paste" | "delete" | "select_all" | "find" | "replace";

export interface StudioEditApi {
  copy: () => void;
  cut: () => void;
  paste: () => void;
  deleteSelected: () => void;
  selectAll: () => void;
  hasSelection: () => boolean;
  canPaste: () => boolean;
}

export interface StudioFlowApi {
  // Getters for ReactFlow data
  getNodes: () => Node[];
  getEdges: () => Edge[];
  getViewport: () => Viewport;
  getSelectedNodes: () => Node[];
  getSelectedEdges: () => Edge[];
  
  // Setters for ReactFlow data
  setNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => void;
  setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void;
  addNode: (node: Node) => void;
  addEdge: (edge: Edge) => void;
  deleteElements: (elements: { nodes?: Node[]; edges?: Edge[] }) => void;
  
  // ReactFlow instance methods
  fitView: (options?: any) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  setCenter: (x: number, y: number, options?: any) => void;
  
  // Project data
  getProjectData: () => ProjectData;
  loadProjectData: (data: ProjectData) => void;
}

export interface ProjectData {
  name: string;
  description?: string;
  version: string;
  nodes: Node[];
  edges: Edge[];
  viewport?: Viewport;
  settings?: ProjectSettings;
  createdAt: string;
  lastModified: string;
}

export interface ProjectSettings {
  theme?: "light" | "dark";
  grid?: boolean;
  snapToGrid?: boolean;
  minimap?: boolean;
  controls?: boolean;
  [key: string]: any;
}

interface StudioContextValue {
  // Edit API exposed to header and others
  editApi: StudioEditApi;
  
  // Flow API for ReactFlow interaction
  flowApi: StudioFlowApi;
  
  // Allow Flow to register actual implementations
  setEditApiImpl: (impl: Partial<StudioEditApi>) => void;
  setFlowApiImpl: (impl: Partial<StudioFlowApi>) => void;
  
  // Project management
  currentProject: ProjectData | null;
  setCurrentProject: (project: ProjectData | null) => void;
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;
  
  // Clipboard for copy/paste operations
  clipboard: {
    nodes: Node[];
    edges: Edge[];
  } | null;
  setClipboard: (data: { nodes: Node[]; edges: Edge[] } | null) => void;
}

const noop = () => {};
const noopArray = () => [];
const noopObject = () => ({});

const defaultEditApi: StudioEditApi = {
  copy: noop,
  cut: noop,
  paste: noop,
  deleteSelected: noop,
  selectAll: noop,
  hasSelection: () => false,
  canPaste: () => false,
};

const defaultFlowApi: StudioFlowApi = {
  getNodes: noopArray as () => Node[],
  getEdges: noopArray as () => Edge[],
  getViewport: () => ({ x: 0, y: 0, zoom: 1 }),
  getSelectedNodes: noopArray as () => Node[],
  getSelectedEdges: noopArray as () => Edge[],
  setNodes: noop,
  setEdges: noop,
  addNode: noop,
  addEdge: noop,
  deleteElements: noop,
  fitView: noop,
  zoomIn: noop,
  zoomOut: noop,
  setCenter: noop,
  getProjectData: () => ({
    name: "Untitled Project",
    version: "1.0.0",
    nodes: [],
    edges: [],
    createdAt: new Date().toISOString(),
    lastModified: new Date().toISOString(),
  }),
  loadProjectData: noop,
};

const StudioContext = createContext<StudioContextValue | null>(null);

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const editApiRef = useRef<StudioEditApi>({ ...defaultEditApi });
  const flowApiRef = useRef<StudioFlowApi>({ ...defaultFlowApi });
  const [, forceUpdate] = useState(0);
  
  // Project state
  const [currentProject, setCurrentProject] = useState<ProjectData | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [clipboard, setClipboard] = useState<{ nodes: Node[]; edges: Edge[] } | null>(null);

  const setEditApiImpl = (impl: Partial<StudioEditApi>) => {
    editApiRef.current = { ...editApiRef.current, ...impl } as StudioEditApi;
    // Force consumers to re-read canPaste/hasSelection when they render conditionally
    forceUpdate((v) => v + 1);
  };

  const setFlowApiImpl = (impl: Partial<StudioFlowApi>) => {
    flowApiRef.current = { ...flowApiRef.current, ...impl } as StudioFlowApi;
    forceUpdate((v) => v + 1);
  };

  const value = useMemo<StudioContextValue>(() => ({
    editApi: editApiRef.current,
    flowApi: flowApiRef.current,
    setEditApiImpl,
    setFlowApiImpl,
    currentProject,
    setCurrentProject,
    isDirty,
    setIsDirty,
    clipboard,
    setClipboard,
  }), [currentProject, isDirty, clipboard]);

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

export function useStudio() {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error("useStudio must be used within StudioProvider");
  return ctx;
}

// Hook helper para componentes que implementam o ReactFlow
export function useStudioFlowImplementation(reactFlowInstance: ReactFlowInstance | null) {
  const { setFlowApiImpl, setEditApiImpl, clipboard, setClipboard, setIsDirty } = useStudio();

  React.useEffect(() => {
    if (!reactFlowInstance) return;

    // Implementar Flow API
    setFlowApiImpl({
      getNodes: () => reactFlowInstance.getNodes(),
      getEdges: () => reactFlowInstance.getEdges(),
      getViewport: () => reactFlowInstance.getViewport(),
      getSelectedNodes: () => {
        const nodes = reactFlowInstance.getNodes();
        return nodes.filter(node => node.selected);
      },
      getSelectedEdges: () => {
        const edges = reactFlowInstance.getEdges();
        return edges.filter(edge => edge.selected);
      },
      setNodes: (nodes) => {
        if (typeof nodes === 'function') {
          const currentNodes = reactFlowInstance.getNodes();
          reactFlowInstance.setNodes(nodes(currentNodes));
        } else {
          reactFlowInstance.setNodes(nodes);
        }
        setIsDirty(true);
      },
      setEdges: (edges) => {
        if (typeof edges === 'function') {
          const currentEdges = reactFlowInstance.getEdges();
          reactFlowInstance.setEdges(edges(currentEdges));
        } else {
          reactFlowInstance.setEdges(edges);
        }
        setIsDirty(true);
      },
      addNode: (node) => {
        const nodes = reactFlowInstance.getNodes();
        reactFlowInstance.setNodes([...nodes, node]);
        setIsDirty(true);
      },
      addEdge: (edge) => {
        const edges = reactFlowInstance.getEdges();
        reactFlowInstance.setEdges([...edges, edge]);
        setIsDirty(true);
      },
      deleteElements: ({ nodes = [], edges = [] }) => {
        const nodeIds = nodes.map(n => n.id);
        const edgeIds = edges.map(e => e.id);
        
        const currentNodes = reactFlowInstance.getNodes();
        const currentEdges = reactFlowInstance.getEdges();
        
        reactFlowInstance.setNodes(currentNodes.filter(n => !nodeIds.includes(n.id)));
        reactFlowInstance.setEdges(currentEdges.filter(e => !edgeIds.includes(e.id)));
        setIsDirty(true);
      },
      fitView: (options) => reactFlowInstance.fitView(options),
      zoomIn: () => reactFlowInstance.zoomIn(),
      zoomOut: () => reactFlowInstance.zoomOut(),
      setCenter: (x, y, options) => reactFlowInstance.setCenter(x, y, options),
      getProjectData: () => {
        const nodes = reactFlowInstance.getNodes();
        const edges = reactFlowInstance.getEdges();
        const viewport = reactFlowInstance.getViewport();
        
        return {
          name: "Broadcast Studio Project",
          version: "1.0.0",
          nodes,
          edges,
          viewport,
          settings: {
            theme: "dark",
            grid: true,
            snapToGrid: false,
            minimap: true,
            controls: true,
          },
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString(),
        };
      },
      loadProjectData: (data) => {
        reactFlowInstance.setNodes(data.nodes || []);
        reactFlowInstance.setEdges(data.edges || []);
        if (data.viewport) {
          reactFlowInstance.setViewport(data.viewport);
        }
        setIsDirty(false);
      },
    });

    // Implementar Edit API
    setEditApiImpl({
      copy: () => {
        const selectedNodes = reactFlowInstance.getNodes().filter(n => n.selected);
        const selectedEdges = reactFlowInstance.getEdges().filter(e => e.selected);
        
        if (selectedNodes.length > 0 || selectedEdges.length > 0) {
          setClipboard({ nodes: selectedNodes, edges: selectedEdges });
        }
      },
      cut: () => {
        const selectedNodes = reactFlowInstance.getNodes().filter(n => n.selected);
        const selectedEdges = reactFlowInstance.getEdges().filter(e => e.selected);
        
        if (selectedNodes.length > 0 || selectedEdges.length > 0) {
          setClipboard({ nodes: selectedNodes, edges: selectedEdges });
          
          // Remove selected elements
          const nodeIds = selectedNodes.map(n => n.id);
          const edgeIds = selectedEdges.map(e => e.id);
          
          const remainingNodes = reactFlowInstance.getNodes().filter(n => !nodeIds.includes(n.id));
          const remainingEdges = reactFlowInstance.getEdges().filter(e => !edgeIds.includes(e.id));
          
          reactFlowInstance.setNodes(remainingNodes);
          reactFlowInstance.setEdges(remainingEdges);
          setIsDirty(true);
        }
      },
      paste: () => {
        if (!clipboard) return;
        
        // Clone nodes with new IDs and offset position
        const nodeIdMap = new Map<string, string>();
        const pastedNodes = clipboard.nodes.map(node => {
          const newId = `${node.id}_copy_${Date.now()}`;
          nodeIdMap.set(node.id, newId);
          return {
            ...node,
            id: newId,
            position: {
              x: node.position.x + 50,
              y: node.position.y + 50,
            },
            selected: true,
          };
        });
        
        // Clone edges with updated node references
        const pastedEdges = clipboard.edges.map(edge => ({
          ...edge,
          id: `${edge.id}_copy_${Date.now()}`,
          source: nodeIdMap.get(edge.source) || edge.source,
          target: nodeIdMap.get(edge.target) || edge.target,
          selected: true,
        }));
        
        // Add to current elements
        const currentNodes = reactFlowInstance.getNodes().map(n => ({ ...n, selected: false }));
        const currentEdges = reactFlowInstance.getEdges().map(e => ({ ...e, selected: false }));
        
        reactFlowInstance.setNodes([...currentNodes, ...pastedNodes]);
        reactFlowInstance.setEdges([...currentEdges, ...pastedEdges]);
        setIsDirty(true);
      },
      deleteSelected: () => {
        const selectedNodes = reactFlowInstance.getNodes().filter(n => n.selected);
        const selectedEdges = reactFlowInstance.getEdges().filter(e => e.selected);
        
        if (selectedNodes.length > 0 || selectedEdges.length > 0) {
          const nodeIds = selectedNodes.map(n => n.id);
          const edgeIds = selectedEdges.map(e => e.id);
          
          const remainingNodes = reactFlowInstance.getNodes().filter(n => !nodeIds.includes(n.id));
          const remainingEdges = reactFlowInstance.getEdges().filter(e => !edgeIds.includes(e.id));
          
          reactFlowInstance.setNodes(remainingNodes);
          reactFlowInstance.setEdges(remainingEdges);
          setIsDirty(true);
        }
      },
      selectAll: () => {
        const nodes = reactFlowInstance.getNodes().map(n => ({ ...n, selected: true }));
        const edges = reactFlowInstance.getEdges().map(e => ({ ...e, selected: true }));
        
        reactFlowInstance.setNodes(nodes);
        reactFlowInstance.setEdges(edges);
      },
      hasSelection: () => {
        const nodes = reactFlowInstance.getNodes();
        const edges = reactFlowInstance.getEdges();
        return nodes.some(n => n.selected) || edges.some(e => e.selected);
      },
      canPaste: () => clipboard !== null,
    });
  }, [reactFlowInstance, setFlowApiImpl, setEditApiImpl, clipboard, setClipboard, setIsDirty]);
}