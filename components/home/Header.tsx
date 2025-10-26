"use client";

import { Menu, ExternalLink, X } from "lucide-react";
import { LucideGithub } from "lucide-react"; // ícone de estrela para Community
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

interface HeaderProps {
  headerText?: string;
  noHomeLink?: boolean;
}

// Tipo para os links
interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  showStar?: boolean; // se true, mostra ícone de estrela
}

export default function Header({ headerText, noHomeLink }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Array único de links para desktop e mobile
  const links: NavLink[] = [
    noHomeLink
      ? { label: "Home", href: "/" }
      : { label: "Features", href: "#features" },
    {
      label: "About",
      href: "https://github.com/lukaulk/broadcast-studio/blob/master/README.md",
      external: true,
    },
    { label: "Download", href: "#download" },
    { label: "Community", href: "/community", showStar: true },
  ];

  const renderLink = ({ label, href, external, showStar }: NavLink) => {
    const baseClasses = "text-gray-300 hover:text-white transition-colors flex items-center gap-1";
    if (external) {
      return (
        <a
          key={label}
          href={href}
          className={baseClasses}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label} <ExternalLink className="w-4 h-4" />
        </a>
      );
    }
    if (href.startsWith("/")) {
      return (
        <Link key={label} href={href}>
          <span className={baseClasses}>
            {label} {showStar && <div className="px-2 py-1 border border-zinc-700 rounded-sm flex items-center gap-1"><LucideGithub className="w-4 h-4 text-zinc-200" /> <span className="text-sm text-zinc-400">3.2K</span></div>}
          </span>
        </Link>
      );
    }
    return (
      <a key={label} href={href} className={baseClasses}>
        {label} {showStar && <div className="px-2 py-1 border border-zinc-700 rounded-sm flex items-center gap-1"><LucideGithub className="w-4 h-4 text-zinc-200" /> <span className="text-sm text-zinc-400">3.2K</span></div>}
      </a>
    );
  };

  return (
    <header className="fixed radio-canada top-0 w-full z-50 bg-[var(--background)] border-b border-b-zinc-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Logo e título */}
          <div className="flex items-center space-x-2">
            <Image
              src="/favicon.png"
              alt="Broadcast Studio Logo"
              width={40}
              height={40}
              className="backdrop-blur-2xl bg-black/10"
            />
            <span className="text-xl font-semibold text-white" translate="no">
              {headerText || "Broadcast Studio"}
            </span>
          </div>

          {/* Menu desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map(renderLink)}
          </nav>

          {/* Botão menu mobile */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t">
          <div className="px-4 py-6 space-y-4 flex flex-col">
            {links.map(({ label, href, external, showStar }) => (
              <div key={label} className="block hover:bg-zinc-500 transition-colors rounded-md px-3 py-2 cursor-pointer">
                {renderLink({ label, href, external, showStar })}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
