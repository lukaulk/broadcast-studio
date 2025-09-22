"use client";
import React from "react";
import Image from "next/image";
import { NodeProps, Handle, Position } from "@xyflow/react";

export interface ImageLabelNodeData extends Record<string, unknown> {
  label: string;
  image: string;
  dvctype?: string;
  styles?: string;
}

const CustomNode: React.FC<NodeProps> = ({ data }) => {
  const d = data as ImageLabelNodeData;
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={d.image}
        alt={d.label}
        width={80}
        height={80}
        className={`w-30 h-30 object-fit drop-shadow-lg drop-shadow-black/20 ${d.styles || ''}`}
      />
      <div className="-mt-4 flex flex-col items-center justify-center">
        <span className="text-[15px]">{d.label}</span>
        <span className="text-[10px] font-semibold">{d.dvctype || "End Device"}</span>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        style={{
          border: "none",
          left: "20px",
          opacity: 0,
          borderRadius: 0,
          height: "100%",
          width: "20%",
        }}
      />
      <Handle type="source" position={Position.Right}
        style={{
          border: "none",
          right: "20px",
          opacity: 0,
          borderRadius: 0,
          height: "100%",
          width: "20%",
        }}
      />
    </div>
  );
};

export default CustomNode;
