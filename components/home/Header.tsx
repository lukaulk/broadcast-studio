"use client";

import { Menu, ExternalLink, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image"; 

interface HeaderProps {
  headerText?: string;
  noHomeLink?: boolean;
}
export default function Header( { headerText, noHomeLink }: HeaderProps ) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed radio-canada top-0 w-full z-50 bg-[var(--background)]  border-b border-b-zinc-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Image
            src="/favicon.png"
            alt="Broadcast Studio Logo"
            width={40}
            height={40}
            className="backdrop-blur-2xl bg-black/1"
          />
            <span className="text-xl font-semibold text-white" translate="no">{headerText ? headerText : "Broadcast Studio"}</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {noHomeLink ? (
              <Link href="/">
                <span className="text-gray-300 hover:text-white transition-colors">Home</span>
              </Link>
            ) : (
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            )}
            
            <a
              href="https://github.com/lukaulk/broadcast-studio/blob/master/README.md"
              className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer"
            >
              About <ExternalLink className="inline-block w-4 h-4 ml-1" />
            </a>
            <a href="#download" className="text-gray-300 hover:text-white transition-colors">
              Download
            </a>
            <Link href="/community">
              <span className="text-gray-300 hover:text-white transition-colors">Community</span>
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>


      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
          <div className="px-4 py-6 space-y-4">
            <a href="#features" className="block text-gray-300 hover:text-white">
              Recursos
            </a>
            <a href="#about" className="block text-gray-300 hover:text-white">
              Sobre
            </a>
            <a href="#download" className="block text-gray-300 hover:text-white">
              Download
            </a>
            <a href="#community" className="block text-gray-300 hover:text-white">
              Comunidade
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
