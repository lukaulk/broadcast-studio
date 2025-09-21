// Flow.tsx
import React, { ComponentType } from "react";
import { MiniMap, ReactFlowProvider, ReactFlow } from "@xyflow/react";
import type { Edge, Node, NodeProps } from "@xyflow/react";
import CustomNode, { CustomNodeData } from "../costumNode"; // keep filename consistent
import ToolBar from "../toolBar";

// Node data shape (reuse CustomNodeData or define a shared one)
export type NodeData = CustomNodeData; // reuse exported interface

// edges array — Edge[] is correct
const defaultEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3", animated: true },
];

// nodes array: Node<NodeData>[]
const defaultNodes: Node<NodeData>[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 25 },
  },
  {
    id: "2",
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
  },
  {
    id: "4",
    type: "customNode",
    data: { label: "Custom", image: "/avatar.png" },
    position: { x: 400, y: 150 },
  },
];

// nodeTypes typed so TS knows each component expects NodeProps<NodeData>
const nodeTypes: Record<string, ComponentType<NodeProps<NodeData>>> = {
  customNode: CustomNode,
};

export default function Flow() {
  return (
    <ReactFlowProvider>
      <ReactFlow
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        fitView
        style={{ width: "100%", height: "100%" }}
        nodeTypes={nodeTypes}
      >
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
      </ReactFlow>
    </ReactFlowProvider>
  );
}
