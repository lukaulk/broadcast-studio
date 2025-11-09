"use client";

import { Menu, ExternalLink, X, LogOut } from "lucide-react";
import { LucideGithub } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

interface HeaderProps {
  headerText?: string;
  noHomeLink?: boolean;
}

// Tipo para os links
interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  showStar?: boolean;
}

export default function Header({ headerText, noHomeLink }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const getUserInitials = (name?: string | null, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return "U";
  };

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
    ...(session ? [] : [{ label: "Log In", href: "/login" }]),
    { label: "Community", href: "/community", showStar: true },
  ];

  const renderLink = ({ label, href, external, showStar }: NavLink) => {
    const baseClasses = "text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors flex items-center gap-1";
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
            {label} {showStar && <div className="px-2 py-1 border border-[var(--border)] rounded-sm flex items-center gap-1"><LucideGithub className="w-4 h-4 text-[var(--muted-foreground)]" /> <span className="text-sm text-[var(--muted-foreground)]">3.2K</span></div>}
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
    <header className="fixed radio-canada top-0 w-full z-50 bg-[var(--background)] border-b border-b-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Logo e título */}
          <Link href={noHomeLink ? "#" : "/"}>
            <div className="flex items-center space-x-2 user-select-none">
              <Image
                src="/favicon.png"
                alt="Broadcast Studio Logo"
                width={40}
                height={40}
                className="backdrop-blur-2xl bg-black/10"
              />
              <span className="text-xl font-semibold text-[var(--foreground)]" translate="no">
                {headerText || "Broadcast Studio"}
              </span>
            </div>
          </Link>
          {/* Menu desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map(renderLink)}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Avatar Dropdown */}
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative flex size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--border)] hover:ring-[var(--ring)] transition-colors">
                    <Avatar className="size-10">
                      <AvatarImage
                        src={session.user.image || undefined}
                        alt={session.user.name || session.user.email || "User"}
                      />
                      <AvatarFallback className="bg-[var(--muted)] text-[var(--foreground)] text-sm font-medium">
                        {getUserInitials(session.user.name, session.user.email)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-[var(--popover)] border-[var(--border)] text-[var(--foreground)]"
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session.user.name || "User"}
                      </p>
                      <p className="text-xs leading-none text-[var(--muted-foreground)]">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[var(--border)]" />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-[var(--destructive)] focus:text-[var(--destructive)]/80 focus:bg-[var(--destructive)]/10 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </nav>

          {/* Mobile menu button and user avatar */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative flex size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--border)]">
                    <Avatar className="size-10">
                      <AvatarImage
                        src={session.user.image || undefined}
                        alt={session.user.name || session.user.email || "User"}
                      />
                      <AvatarFallback className="bg-[var(--muted)] text-[var(--foreground)] text-sm font-medium">
                        {getUserInitials(session.user.name, session.user.email)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-[var(--popover)] border-[var(--border)] text-[var(--foreground)]"
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session.user.name || "User"}
                      </p>
                      <p className="text-xs leading-none text-[var(--muted-foreground)]">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[var(--border)]" />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-[var(--destructive)] focus:text-[var(--destructive)]/80 focus:bg-[var(--destructive)]/10 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t">
          <div className="px-4 py-6 space-y-4 flex flex-col">
            {links.map(({ label, href, external, showStar }) => (
              <div key={label} className="block hover:bg-[var(--accent)] transition-colors rounded-md px-3 py-2 cursor-pointer">
                {renderLink({ label, href, external, showStar })}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
