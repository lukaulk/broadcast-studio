"use client";

import Component from "./component";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { nodeConfigs } from "./nodes";

export default function ElementBar() {
  // Usa a configuração centralizada dos nodes
  const components = Object.values(nodeConfigs).map(config => ({
    icon: config.icon,
    name: config.name,
    type: config.dvctype,
    nodeType: config.type,
    className: config.className,
  }));

  return (
    <div className="p-2">
      <ScrollArea className="w-full">
        <div className="flex items-center min-w-20">
          <div className="flex space-x-4 items-center">
            {components.map((component, index) => (
              <Component
                key={`${component.name}-${index}`}
                icon={component.icon}
                name={component.name}
                type={component.type}
                nodeType={component.nodeType}
                className={component.className}
              />
            ))}

            <div className="w-12 h-12 bg-[var(--bsui-gray-2)] border border-[var(--bsui-border)] rounded-md flex items-center justify-center hover:bg-[var(--bsui-active)] active:scale-95 cursor-pointer">
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
            </div>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
