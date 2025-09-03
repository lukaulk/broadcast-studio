import Image from "next/image";
export default function Header() {
    return (
        <div className="flex h-10 w-full items-center bg-[var(--bsui-gray-3)] text-[var(--bsui-gray-0)] shadow-md">
            <div className="flex items-center bs-logo">
                <Image src="/favicon.png" alt="Logo" width={34} height={34} className="ml-4"/>
                <span className="ml-2 text-md font-semibold">Broadcast Studio</span>
            </div>    
            <div className="flex items-center space-x-4">
                <button type="button" className="flex items-center space-x-1 rounded-md px-3 py-1 hover:bg-[var(--bsui-gray-2)]">
                    
                    <span className="text-sm">Connect</span>
                </button>
                <button type="button" className="flex items-center space-x-1 rounded-md px-3 py-1 hover:bg-[var(--bsui-gray-2)]">
                   
                    <span className="text-sm">Open Project</span>
                </button>
            </div>

        </div>
    );
}