"use client";

import { Menu, Network, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
  headerText?: string;
  noHomeLink?: boolean;
}
export default function Header( { headerText, noHomeLink }: HeaderProps ) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Network className="w-6 h-6 text-cyan-400" />

            <span className="text-xl font-bold text-white">{headerText ? headerText : "Broadcast Studio"}</span>
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
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
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
