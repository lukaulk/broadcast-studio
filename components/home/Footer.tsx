import { Github, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--background)] border-t border-[var(--bsui-gray-0)] py-12 radio-canada">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center">

          <div className="flex items-center space-x-6">
            <a href="https://github.com/lukaulk/broadcast-studio" className="text-[var(--muted-foreground)] hover:text-cyan-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://x.com/lukaudev" className="text-[var(--muted-foreground)] hover:text-cyan-400 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 text-center text-[var(--muted-foreground)]">
          <p>&copy; {new Date().getFullYear()} Broadcast Studio. Open source and free to the community.</p>
        </div>
        <Link href="https://lukau.vercel.app/" target="_blank" rel="noopener noreferrer">
          <div className="flex items-center justify-center mt-2 "><span translate="no" className="text-[var(--bsui-gray-0)]">Created By</span> <Image src={"/icons/lukaustack.png"} alt="Lukaustack" width={100} height={60} className="bg-black ml-2 p-2 rounded-[2px]" /></div>
        </Link>
      </div>
    </footer>
  );
}