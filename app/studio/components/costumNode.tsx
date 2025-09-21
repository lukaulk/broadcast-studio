// components/CustomNode.tsx
import React from "react";
import Image from "next/image";
import { Handle, Position, NodeProps } from "@xyflow/react"; // <-- same package as Flow

// Export the data shape so Flow and other files reuse it
export interface CustomNodeData {
  label: React.ReactNode;
  image?: string;
}

// NodeProps<CustomNodeData> ensures `data` is not unknown
const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 bg-white rounded-lg shadow-md w-24 h-28">
      {data.image && (
        <Image
          src={data.image}
          alt={String(data.label)}
          width={48}
          height={48}
          className="w-12 h-12 object-contain mb-2"
        />
      )}
      <span className="text-sm font-medium text-center">{data.label}</span>

      <Handle type="target" position={Position.Top} className="bg-blue-500 w-3 h-3 rounded-full" />
      <Handle type="source" position={Position.Bottom} className="bg-blue-500 w-3 h-3 rounded-full" />
    </div>
  );
};

export default CustomNode;
