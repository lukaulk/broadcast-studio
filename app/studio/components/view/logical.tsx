"use client";
import "@xyflow/react/dist/style.css";
import React from "react";
import { MiniMap, ReactFlow, useNodesState, useEdgesState, addEdge } from "@xyflow/react";
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
  {
    id: "1",
    type: "customNode",
    data: { label: "Printer", image: "/dvc/svg/printer.svg" },
    position: { x: 250, y: 25 },
  },
  {
    id: "2",
    type: "customNode",
    position: { x: 10, y: 125 },
    data: { label: "Desktop", image: "/dvc/svg/desktop.svg" },
  },
  {
    id: "3",
    type: "customNode",
    data: { label: "Switch", image: "/dvc/svg/switchs.svg", dvctype: "Connect Device" },
    position: { x: 250, y: 250 },
  },
];

// --- nodeTypes
const nodeTypes = {
  customNode: CustomNode,
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);

  const onConnect = (connection: Connection) => setEdges((eds) => addEdge(connection, eds));

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
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
  );
}

export default Flow;