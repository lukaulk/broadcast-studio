import React from "react";
import { MiniMap, ReactFlow, ReactFlowProvider, Node, Edge, NodeProps } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import ToolBar from "../toolBar";
import CustomNode, { ImageLabelNodeData } from "../costumNode"; // ajustar caminho se necessário

// --- edges
const defaultEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3", animated: true },
];

// --- nodes
const defaultNodes: Node<any>[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 25 },
  },
  {
    
    id: "2",
    type: "customNode", 
    position: { x: 10, y: 125 },
    data: { label: "PC", image: "/dvc/desktop.png" },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
  },
];

// --- nodeTypes
const nodeTypes: Record<string, React.FC<NodeProps<any>>> = {
  customNode: CustomNode,
};

function Flow() {
  return (
    <ReactFlowProvider>
      <ReactFlow
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        nodeTypes={nodeTypes}
        fitView
        colorMode="dark"
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

export default Flow;
