import { MiniMap, ReactFlow,  
  ReactFlowProvider
 } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import ToolBar from "../toolBar";

function Flow() {
  const defaultEdges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3", animated: true },
  ]; 
  const defaultNodes = [
    {
      id: "1",
      type: "input",
      data: { label: "Input Node" },
      position: { x: 250, y: 25 },
    },

    {
      id: "2",
      // you can also pass a React component as a label
      data: { label: <div>Default Node</div> },
      position: { x: 100, y: 125 },
    },
    {
      id: "3",
      type: "output",
      data: { label: "Output Node" },
      position: { x: 250, y: 250 },
    },
  ];

  return (
       <ReactFlowProvider>
    <ReactFlow defaultNodes={defaultNodes} defaultEdges={defaultEdges} fitView >
      <MiniMap nodeStrokeWidth={1} className="border-2 p-0 m-0 rounded" position="bottom-right"  bgColor="#1A1B1DCC" maskColor="#383B3EAA" zoomable pannable />
      
       <ToolBar />
    </ReactFlow>
    </ReactFlowProvider>
  );
}

export default Flow;