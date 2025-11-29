"use client";

import OptionBar from "./optionBar";
import HierarchyPanel from "./hierarchyPanel";
import ElementBar from "./elementBar";
import StatusBar from "./statusBar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useStudio } from "./studioContext";

export default function StudioLayout() {
    const { showHierarchy } = useStudio();

    return (
        <>
            <ResizablePanelGroup direction="vertical" className="flex-1 w-full select-none">
                <ResizablePanel defaultSize={72} className="flex w-full">
                    <ResizablePanelGroup direction="horizontal" className="w-full h-full">
                        <ResizablePanel
                            defaultSize={showHierarchy ? 80 : 100}
                            className="flex w-full h-vh"
                        >
                            <OptionBar />
                        </ResizablePanel>
                        <HierarchyPanel />
                    </ResizablePanelGroup>
                </ResizablePanel>

                <ResizableHandle className="bg-[var(--bsui-border)] hover:bg-[var(--bsui-active)] h-[1px] hover:h-4 cursor-row-resize" />

                <ResizablePanel
                    minSize={19}
                    defaultSize={20}
                    maxSize={25}
                    className="flex rounded-none border-t border-t-[var(--bsui-border)] w-full items-center bg-[var(--bsui-gray-6)] text-[var(--bsui-gray-0)] shadow-md"
                >
                    <ElementBar />
                </ResizablePanel>
            </ResizablePanelGroup>
            <StatusBar />
        </>
    );
}

