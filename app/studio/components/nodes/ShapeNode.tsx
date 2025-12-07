"use client";
import React from "react";
import { NodeProps, Handle, Position } from "@xyflow/react";

export interface ShapeNodeData extends Record<string, unknown> {
    label?: string;
    shapeType: "square" | "circle" | "triangle";
    color?: string;
    info?: string;
}

export interface ShapeNodeProps extends NodeProps {
    data: ShapeNodeData;
}

const ShapeNode: React.FC<ShapeNodeProps> = ({ data, selected }) => {
    const { shapeType, label, color = "#e2e2e2" } = data;

    const getShapeStyle = () => {
        const baseStyle = "flex items-center justify-center text-xs font-semibold text-black/70 pointer-events-none transition-all duration-200";
        const selectedStyle = selected ? "ring-2 ring-[#008AED] ring-offset-2" : "";

        switch (shapeType) {
            case "circle":
                return `${baseStyle} w-32 h-32 rounded-full border-2 border-dashed border-gray-400 bg-white/50 ${selectedStyle}`;
            case "triangle":
                // Triangle is trickier with pure CSS borders but can be done with clip-path
                return `${baseStyle} w-32 h-32 clip-path-triangle bg-white/50 ${selectedStyle}`;
            case "square":
            default:
                return `${baseStyle} w-32 h-32 rounded-md border-2 border-dashed border-gray-400 bg-white/50 ${selectedStyle}`;
        }
    };

    // For triangle clip-path
    const triangleStyle = shapeType === 'triangle' ? { clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' } : {};

    return (
        <div className="relative group">
            {/* Info Badge if present */}
            {data.info && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-cyan-300/30 border border-cyan-400 text-[10px] px-2 py-0.5 rounded text-black whitespace-nowrap">
                    {data.info}
                </div>
            )}

            <div
                className={getShapeStyle()}
                style={{ ...triangleStyle, backgroundColor: color + '50' }} // Add transparency
            >
                {label}
            </div>

            {/* Handles - Keep them but maybe hidden or minimal for shapes just to allow connections if needed for diagramming */}
            <Handle type="target" position={Position.Top} className="opacity-0 group-hover:opacity-50" />
            <Handle type="source" position={Position.Bottom} className="opacity-0 group-hover:opacity-50" />
            <Handle type="target" position={Position.Left} className="opacity-0 group-hover:opacity-50" />
            <Handle type="source" position={Position.Right} className="opacity-0 group-hover:opacity-50" />
        </div>
    );
};

export default ShapeNode;
