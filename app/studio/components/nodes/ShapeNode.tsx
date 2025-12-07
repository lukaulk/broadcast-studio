"use client";
import React, { memo } from "react";
import { NodeProps, Handle, Position, NodeResizer } from "@xyflow/react";

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
        const baseStyle = "flex items-center justify-center text-xs font-semibold text-black/70 pointer-events-none transition-all duration-200 w-full h-full";
        // Selected state is now handled by the NodeResizer mostly, but we can keep a border if we want
        // or let the shape itself have the border.

        switch (shapeType) {
            case "circle":
                return `${baseStyle} rounded-full border-2 border-dashed border-gray-400 bg-white/50`;
            case "triangle":
                // Triangle is trickier with pure CSS borders but can be done with clip-path
                // Borders don't show well on clip-path triangles usually.
                return `${baseStyle} clip-path-triangle bg-white/50`;
            case "square":
            default:
                return `${baseStyle} rounded-md border-2 border-dashed border-gray-400 bg-white/50`;
        }
    };

    // For triangle clip-path
    const triangleStyle = shapeType === 'triangle' ? { clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' } : {};

    return (
        <div className="w-full h-full relative group min-w-[50px] min-h-[50px]">
            <NodeResizer
                isVisible={selected}
                minWidth={50}
                minHeight={50}
                keepAspectRatio={shapeType === 'circle' || shapeType === 'triangle'}
            />

            {/* Info Badge if present */}
            {data.info && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-cyan-300/30 border border-cyan-400 text-[10px] px-2 py-0.5 rounded text-black whitespace-nowrap z-10">
                    {data.info}
                </div>
            )}

            <div
                className={getShapeStyle()}
                style={{ ...triangleStyle, backgroundColor: color + '50' }} // Add transparency
            >
                {label}
            </div>

            {/* Handles - Hidden by default, show on hover or when connecting */}
            <Handle type="target" position={Position.Top} className="opacity-0 group-hover:opacity-50" />
            <Handle type="source" position={Position.Bottom} className="opacity-0 group-hover:opacity-50" />
            <Handle type="target" position={Position.Left} className="opacity-0 group-hover:opacity-50" />
            <Handle type="source" position={Position.Right} className="opacity-0 group-hover:opacity-50" />
        </div>
    );
};

export default memo(ShapeNode);
