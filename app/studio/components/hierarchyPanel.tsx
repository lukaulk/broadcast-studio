"use client";

import { useStudio } from "./studioContext";
import SideBar from "./sideBar";
import { ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

export default function HierarchyPanel() {
  const { showHierarchy } = useStudio();

  if (!showHierarchy) {
    return null;
  }

  return (
    <>
      <ResizableHandle 
        withHandle 
        className="bg-[var(--bsui-border)] hover:bg-[var(--bsui-active)] hover:w-1 w-[1px] cursor-col-resize" 
      />
      <ResizablePanel 
        defaultSize={20} 
        minSize={13} 
        maxSize={21} 
        className="flex"
      >
        <SideBar />
      </ResizablePanel>
    </>
  );
}

