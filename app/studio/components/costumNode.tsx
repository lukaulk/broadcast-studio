import React from "react";
import Image from "next/image";
import { NodeProps, Handle, Position } from "@xyflow/react";

export interface ImageLabelNodeData {
  label: string;
  image: string;
}

const CustomNode: React.FC<NodeProps<ImageLabelNodeData>> = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 ">
      <Image
        src={data.image}
        alt={data.label}
        width={48}
        height={48}
        className="w-12 h-12 object-contain mb-2"
      />
      <span className="text-sm font-medium text-center">{data.label}</span>

      {/* Optional handles if you want to connect this node */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;
