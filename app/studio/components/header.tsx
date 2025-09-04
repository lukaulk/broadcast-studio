import Image from "next/image";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  return (
    <div className="flex h-10 w-full items-center bg-[var(--bsui-gray-1)] text-[var(--bsui-gray-0)] ">
      <div className="flex items-center bs-logo mr-3 overflow-x-hidden">
        <Image src="/favicon.png" alt="Logo" width={34} height={34} className="ml-4" />
        <span className="ml-2 text-md font-semibold">Broadcast Studio</span>
      </div>
      <div className="flex items-center space-x-1 ml-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button
              type="button"
              className="flex cursor-pointer items-center rounded-md px-3 py-1 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)]"
            >
              <span className="text-sm">File</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[var(--bsui-gray-2)] border border-[var(--bsui-border)] text-[var(--bsui-gray-0)] rounded-none group-hover:bg-[var(--bsui-gray-2)]">
            <DropdownMenuItem>New Project</DropdownMenuItem>
            <DropdownMenuItem>Open Project</DropdownMenuItem>
            <DropdownMenuItem>Save Project</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button
              type="button"
              className="flex cursor-pointer items-center rounded-md px-3 py-1 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)]"
            >
              <span className="text-sm">Edit</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[var(--bsui-gray-2)] border border-[var(--bsui-border)] text-[var(--bsui-gray-0)] rounded-none group-hover:bg-[var(--bsui-gray-2)]">
            <DropdownMenuItem>Undo</DropdownMenuItem>
            <DropdownMenuItem>Redo</DropdownMenuItem>
            <DropdownMenuItem>Cut</DropdownMenuItem>
            <DropdownMenuItem>Copy</DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
         <DropdownMenu>
          <DropdownMenuTrigger>
            <button
              type="button"
              className="flex cursor-pointer items-center rounded-md px-3 py-1 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)]"
            >
              <span className="text-sm">View</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[var(--bsui-gray-2)] border border-[var(--bsui-border)] text-[var(--bsui-gray-0)] rounded-none group-hover:bg-[var(--bsui-gray-2)]">
            <DropdownMenuItem>Zoom In</DropdownMenuItem>
            <DropdownMenuItem>Zoom Out</DropdownMenuItem>
            <DropdownMenuItem>Theme</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <button
          type="button"
          className="flex cursor-pointer items-center rounded-md px-3 py-1 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)]"
        >
          <span className="text-sm">Nodes</span>
        </button>
        <button
          type="button"
          className="flex cursor-pointer items-center rounded-md px-3 py-1 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)]"
        >
          <span className="text-sm">Hierarchy</span>
        </button>
        <button
          type="button"
          className="flex cursor-pointer items-center rounded-md px-3 py-1 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)]"
        >
          <span className="text-sm">Window</span>
        </button>
      </div>
    </div>
  );
}
