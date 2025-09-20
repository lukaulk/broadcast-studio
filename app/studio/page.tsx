import OptionBar from "./components/optionBar";
import SideBar from "./components/sideBar";
import Header from "./components/header";
import StatusBar from "./components/statusBar";
import ToolBar from "./components/toolBar";
import ElementBar from "./components/elementBar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export const metadata = {
  title: "Broadcast Studio",
  description: "A simple broadcast studio application.",
};

export default function Studio() {
  return (
    <div className="flex flex-col h-dvh w-full min-w-dvh bg-[var(--bsui-gray-4)] text-[var(--bsui-gray-0)]">
      <Header />
      <ResizablePanelGroup direction="vertical" className="flex-1 w-full select-none">
        <ResizablePanel className="flex w-full">
          <ResizablePanelGroup direction="horizontal" className="w-full h-full">
            <ResizablePanel className="flex w-full h-vh">
              <OptionBar />
            </ResizablePanel>
            <ResizableHandle className="bg-[var(--bsui-border)] hover:bg-[var(--bsui-active)] hover:w-1 w-[1px] cursor-col-resize" />
            <ResizablePanel defaultSize={20} minSize={13} maxSize={21} className="flex">
              <SideBar />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        
          <ToolBar />

        <ResizableHandle className="bg-[var(--bsui-border)] hover:bg-[var(--bsui-active)] h-[1px] hover:h-2 cursor-row-resize" />
        
        {/* Painel inferior com ElementBar */}
        <ResizablePanel
          minSize={20}
          defaultSize={28}
          maxSize={30}
          className="flex rounded-none border-t border-t-[var(--bsui-border)] w-full items-center bg-[var(--bsui-gray-3)] text-[var(--bsui-gray-0)] shadow-md"
        >
          <ElementBar />
        </ResizablePanel>
      </ResizablePanelGroup>
      <StatusBar />
    </div>
  );
}