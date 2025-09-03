export default function OptionBar() {
    return (
        <div className="flex h-17 border-b border-b-[var(--bsui-border)] w-full items-center bg-[var(--bsui-gray-3)] text-[var(--bsui-gray-0)] shadow-md">
            <div className="flex items-center space-x-1 ml-4">
                <button type="button" className="flex cursor-pointer items-center rounded-md px-3 py-1 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)]">
                    <span className="text-sm">Logical</span>
                </button>
                <button type="button" className="flex cursor-pointer items-center rounded-md px-3 py-1 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)]">
                    <span className="text-sm">Physical</span>
                </button>
            </div>
            <div className="ml-auto flex mr-4">
                <button type="button" className="flex cursor-pointer items-center rounded-md px-3 py-1 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)]">
                    <span className="text-sm">Execute</span>
                </button>
            </div>
        </div>
    );
}