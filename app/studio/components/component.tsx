import Image from "next/image";

interface ComponentProps {
  name?: string;
  type?: string;
  description?: string;
  icon?: string;
  className?: string;
}

export default function Component({ name, type, icon, description, className }: ComponentProps) {
  return (
    <div
      className={`group relative flex items-center justify-center w-40 h-40 hover:scale-105 transition-transform rounded-md overflow-hidden cursor-grab active:opacity-90 active:border active:border-blue-500 ${className}`}
      title={description}
    >
      {icon && (
        <Image
          alt={name ?? "icon"}
          src={icon}
          fill
          className="object-contain scale-90 transition-all duration-500 ease-in-out group-hover:scale-110 drop-shadow-black/10 drop-shadow-2xl"
        />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
        <span className="text-white text-sm font-semibold mb-1">
          {name}
        </span>
        <span className="text-white text-xs opacity-80">
          {type}
        </span>
      </div>
    </div>
  );
}
