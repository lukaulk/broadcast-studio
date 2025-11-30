"use client";

import { useStudio } from "./studioContext";
import { ReactFlowProvider } from "@xyflow/react";
import Header from "./header";
import DrawingOverlay from "./DrawingOverlay";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import OptionBar from "./optionBar";
import SideBar from "./sideBar";
import ElementBar from "./elementBar";
import StatusBar from "./statusBar";

export default function StudioContent() {
    const { showHierarchy } = useStudio();

    return (
        <div className="flex flex-col h-dvh w-full min-w-dvh bg-[var(--bsui-gray-4)] text-[var(--bsui-gray-0)]">
            <ReactFlowProvider>
                <Header />
                <DrawingOverlay />
                <ResizablePanelGroup direction="vertical" className="flex-1 w-full select-none">
                    <ResizablePanel defaultSize={72} className="flex w-full">
                        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
                            <ResizablePanel defaultSize={80} className="flex w-full h-vh">
                                <OptionBar />
                            </ResizablePanel>
                            <ResizableHandle withHandle className="bg-[var(--bsui-border)] hover:bg-[var(--bsui-active)] hover:w-1 w-[1px] cursor-col-resize" />
                            {showHierarchy && (
                                <ResizablePanel defaultSize={20} minSize={13} maxSize={21} className="flex">
                                    <SideBar />
                                </ResizablePanel>
                            )}
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
            </ReactFlowProvider>
        </div>
    );
}
