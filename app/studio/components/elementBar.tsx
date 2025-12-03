"use client";

import Component from "./component";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { nodeConfigs } from "./nodes";

export default function ElementBar() {
  const components = Object.values(nodeConfigs).map((config) => ({
    icon: config.icon,
    name: config.name,
    type: config.dvctype,
    nodeType: config.type,
    className: config.className,
  }));

  return (
    <div className="p-2 w-full overflow-hidden">
      <div className="flex items-center w-full overflow-hidden">
        <ScrollArea className="w-full overflow-x-auto overflow-hidden whitespace-nowrap">
          <div className="flex items-center space-x-4 py-1">
            {components.map((component, index) => (
              <div key={`${component.name}-${index}`} className="shrink-0">
                <Component
                  icon={component.icon}
                  name={component.name}
                  type={component.type}
                  nodeType={component.nodeType}
                  className={component.className}
                />
              </div>
            ))}

            {/* Plus button with dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-12 h-12 shrink-0 bg-[var(--bsui-gray-2)] border border-[var(--bsui-border)] rounded-md flex items-center justify-center hover:bg-[var(--bsui-active)] active:scale-95 cursor-pointer transition-all">
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-white"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </DialogTrigger>

              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>Add new element</DialogTitle>
                </DialogHeader>
                <p>New components soon...</p>
              </DialogContent>
            </Dialog>
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}