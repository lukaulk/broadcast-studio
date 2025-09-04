interface MinimapProps {
    margin?: number;
}
export default function Minimap( { margin = 2 }: MinimapProps ) {
    return (
       <div className={`absolute top-${margin} right-${margin} flex-col items-end space-y-2 hidden`}>
         <div className="w-29 h-18 border-4 border-[var(--bsui-border)] bg-black rounded-md" />
        <span className="text-sm text-[var(--bsui-gray-0)] text-center w-full flex justify-center">Background</span>
       </div>
    );
}