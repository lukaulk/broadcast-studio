import { headers } from "next/headers";
import OptionBar from "./components/optionBar";
import SideBar from "./components/sideBar";
import Header from "./components/header";
import StatusBar from "./components/statusBar";
import ElementBar from "./components/elementBar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ReactFlowProvider } from "@xyflow/react";
import { StudioProvider } from "./components/studioContext";

export const metadata = {
  title: "Broadcast Studio",
  description: "A simple broadcast studio application.",
};

// Função para checar se é desktop
function isDesktopDevice(userAgent: string | null) {
  if (!userAgent) return true; // assume desktop por padrão
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return !mobileRegex.test(userAgent);
}

export default async function Studio() {
  const headersList = await headers(); // <-- add await
  const userAgent = headersList.get("user-agent");

  if (!isDesktopDevice(userAgent)) {
    return (
      <div className="flex items-center justify-center h-screen text-center p-4 bg-[var(--bsui-gray-4)] text-[var(--bsui-gray-0)]">
        <h1>O Broadcast Studio só está disponível em PC.</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-dvh w-full min-w-dvh bg-[var(--bsui-gray-4)] text-[var(--bsui-gray-0)]">
      <StudioProvider>
        <Header />
        <ResizablePanelGroup direction="vertical" className="flex-1 w-full select-none">
          <ResizablePanel defaultSize={72} className="flex w-full">
            <ResizablePanelGroup direction="horizontal" className="w-full h-full">
              <ResizablePanel defaultSize={80} className="flex w-full h-vh">
                <ReactFlowProvider>
                  <OptionBar />
                </ReactFlowProvider>
              </ResizablePanel>

              <ResizableHandle withHandle className="bg-[var(--bsui-border)] hover:bg-[var(--bsui-active)] hover:w-1 w-[1px] cursor-col-resize" />
              <ResizablePanel defaultSize={20} minSize={13} maxSize={21} className="flex">
                <SideBar />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle className="bg-[var(--bsui-border)] hover:bg-[var(--bsui-active)] h-[1px] hover:h-4 cursor-row-resize" />
          
          <ResizablePanel
            minSize={19}
            defaultSize={20}
            maxSize={25}
            className="flex rounded-none border-t border-t-[var(--bsui-border)] w-full items-center bg-[var(--bsui-gray-3)] text-[var(--bsui-gray-0)] shadow-md"
          >
            <ElementBar />
          </ResizablePanel>
        </ResizablePanelGroup>
        <StatusBar />
      </StudioProvider>
    </div>
  );
}
