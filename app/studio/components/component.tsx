import Image from "next/image";

interface ComponentProps {
    name?: string;
    type?: string;
    description?: string;
    icon?: string;
}
export default function Component( { name, type, icon, description }: ComponentProps ) {
  return (
  
      <div className="flex flex-col items-center w-30 h-30 justify-center hover:scale-105 py-2 px-4 transition-all rounded-sm cursor-grab active:opacity-90 active:border active:border-blue-500" title={description}>
        {icon !== undefined  && (
            <Image alt="TV" src={icon} width={100} height={100} />
        )}
        <span className="text-sm font-semibold mt-1">{name}</span>
        <span className="text-[12px] opacity-75 font-semibold">{type}</span>
      </div>
  );
}
