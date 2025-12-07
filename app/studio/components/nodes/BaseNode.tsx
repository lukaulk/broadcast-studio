"use client";
import React from "react";
import Image from "next/image";
import { NodeProps, Handle, Position } from "@xyflow/react";
import { NetworkNodeData } from "./types";

export interface BaseNodeProps extends NodeProps {
    data: NetworkNodeData;
}

/**
 * Componente base para todos os nodes de rede
 * Fornece a estrutura comum e pode ser estendido por nodes específicos
 */
const BaseNode: React.FC<BaseNodeProps> = ({ data, selected }) => {
    return (
        <div className={`flex flex-col items-center justify-center ${selected ? "ring-[0.5px] border-dashed bg-[#008AED22] ring-[#008AED] rounded-md" : ""}`}>
            <div  className="w-full p-2 bg-cyan-300/30 border-cyan-400 text-xs text-center rounded-xs">{data.info || "192.167.0.2"}</div>
            <Image
                src={data.image}
                alt={data.label}
                width={80}
                height={80}
                className={`w-30 h-30 object-fit drop-shadow-lg ${selected ? "drop-shadow-[0_0_0.75rem_#1E90FF]" : "drop-shadow-black/20"} ${data.styles || ''}`}
            />
            <div className="-mt-2 flex flex-col items-center justify-center">
                <span className="text-[15px]">{data.label}</span>
                <span className="text-[10px] font-semibold">{data.dvctype || "End Device"}</span>
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
            <Handle
                type="source"
                position={Position.Right}
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

export default BaseNode;

