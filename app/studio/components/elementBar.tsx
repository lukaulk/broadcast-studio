"use client";

import Component from "./component";

export default function ElementBar() {
  const components = [
    { icon: "/dvc/laptop.png", name: "PC", type: "End Device" },
    { icon: "/dvc/router.png", name: "Router", type: "Wireless Device" },
    { icon: "/dvc/switchs.png", name: "Switch", type: "Connect Device" },
    { icon: "/dvc/server.png", name: "Server", type: "End Device", className: "scale-125" },
    { icon: "/dvc/smartphone.png", name: "Smartphone", type: "End Device" },
    { icon: "/dvc/internet.png", name: "Cloud", type: "End Device", className: "scale-125" },
    { icon: "/dvc/desktop.png", name: "Desktop", type: "End Device" },
    { icon: "/dvc/printer.png", name: "Printer", type: "End Device", className: "scale-125" },
  ];

  return (
    <div className="p-2">
      <div className="flex items-center min-w-20">
        <div className="flex space-x-4 items-center">
          {components.map((component, index) => (
            <Component
              key={`${component.name}-${index}`}
              icon={component.icon}
              name={component.name}
              type={component.type}
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
    </div>
  );
}
