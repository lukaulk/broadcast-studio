import { Input } from "@/components/ui/input";

export default function Studio() {
  return (
    <div className="flex h-vh w-sm border-l border-l-[var(--bsui-border)] justify-center bg-[var(--bsui-gray-3)] text-[var(--bsui-gray-0)]">
      <div className="flex items-center border-b border-b-[var(--bsui-border)] w-full justify-center bg-[var(--bsui-gray-3)] text-[var(--bsui-gray-0)] shadow-md h-17">
        <span className="text-md font-semibold ml-4">Hierarchy</span>
        <Input type="text" className="mx-4 w-30 border-[var(--bsui-border)]" placeholder="Search nodes.."/>
        <button
          type="button"
          className="ml-auto mr-4 flex cursor-pointer items-center rounded-md px-3 py-3 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)]"
        >
          <span className="text-sm flex space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              aria-hidden="true"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
