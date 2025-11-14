"use client";

import Image from "next/image";
import type { DragEvent } from "react";

interface ComponentProps {
  name?: string;
  type?: string;
  nodeType?: string;
  description?: string;
  icon?: string;
  className?: string;
}

export default function Component({
  name,
  type,
  nodeType,
  icon,
  description,
  className,
}: ComponentProps) {
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    // send a payload identifying the component with nodeType for proper node creation
    const payload = JSON.stringify({ 
      type: "imageNode", 
      nodeType: nodeType || name?.toLowerCase(), 
      src: icon, 
      name 
    });
    e.dataTransfer.setData("application/reactflow", payload);
    // also set plain text for better cross-browser drag initiation (e.g., Firefox)
    e.dataTransfer.setData("text/plain", payload);
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`group relative flex items-center justify-center w-40 h-40 hover:scale-105 transition-transform rounded-md overflow-hidden cursor-grab active:cursor-grabbing active:opacity-90 active:border active:border-blue-500 ${className}`}
      title={description}
    >
      {icon && (
        // keep using next/image for production rendering; for drag we only pass the src string
        <Image
          alt={name ?? "icon"}
          src={icon}
          fill
          sizes="160px"
          className="object-contain scale-90 transition-all duration-500 ease-in-out group-hover:scale-110 drop-shadow-black/90 drop-shadow-xs dark:drop-shadow-black/20 dark:drop-shadow-2xl pointer-events-none"
        />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
        <span className="text-white text-sm font-semibold mb-1">{name}</span>
        <span className="text-white text-xs opacity-80">{type}</span>
      </div>
    </div>
  );
}
