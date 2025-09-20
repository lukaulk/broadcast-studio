"use client";

import Image from "next/image";
import { memo, useState, useCallback } from "react";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Menu, X } from "lucide-react";

const MENU_DATA = {
  file: {
    label: "File",
    items: [
      "New Project",
      "Open Project", 
      "Save Project",
      "Save As...",
      "separator",
      "Import",
      "Export",
      "separator",
      "Recent Projects",
      "Exit",
    ],
  },
  edit: {
    label: "Edit",
    items: [
      "Undo",
      "Redo",
      "separator",
      "Cut",
      "Copy",
      "Paste",
      "Delete",
      "separator",
      "Select All",
      "Find",
      "Replace",
    ],
  },
  view: {
    label: "View",
    items: [
      "Zoom In",
      "Zoom Out",
      "Fit to Screen",
      "Actual Size",
      "separator",
      "Full Screen",
      "Grid",
      "Rulers",
      "separator",
      "Theme",
      "Preferences",
    ],
  },
  nodes: {
    label: "Nodes",
    items: [
      "Add Node",
      "Delete Node",
      "Duplicate Node",
      "separator",
      "Group Nodes",
      "Ungroup Nodes",
      "separator",
      "Connect Nodes",
      "Disconnect Nodes",
      "separator",
      "Node Properties",
      "Node Library",
    ],
  },
  hierarchy: {
    label: "Hierarchy",
    items: [
      "Show Hierarchy",
      "Hide Hierarchy",
      "separator",
      "Expand All",
      "Collapse All",
      "separator",
      "Sort by Name",
      "Sort by Type",
      "Sort by Date",
      "separator",
      "Filter",
      "Search",
    ],
  },
  window: {
    label: "Window",
    items: [
      "Minimize",
      "Maximize",
      "Close",
      "separator",
      "New Window",
      "Split Window",
      "separator",
      "Properties Panel",
      "Timeline",
      "Preview",
      "Audio Mixer",
      "separator",
      "Reset Layout",
      "Save Layout",
    ],
  },
} as const;

const MENU_ORDER = ["file", "edit", "view", "nodes", "hierarchy", "window"] as const;

const STYLES = {
  container: "flex h-10 w-full items-center bg-[var(--bsui-gray-1)] text-[var(--bsui-gray-0)]",
  logo: {
    container: "flex items-center bs-logo mr-3 overflow-hidden flex-shrink-0",
    image: "ml-4",
    textDesktop: "ml-2 text-md font-semibold hidden sm:inline",
    textMobile: "ml-2 text-md font-semibold sm:hidden",
  },
  desktop: {
    container: "hidden md:flex items-center space-x-1 ml-2 flex-1 overflow-x-auto",
    button: "flex cursor-pointer items-center rounded-md px-3 py-1 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)] whitespace-nowrap",
    text: "text-sm",
  },
  mobile: {
    button: "md:hidden flex items-center ml-auto mr-4",
    hamburger: "flex cursor-pointer items-center rounded-md p-1 hover:bg-[var(--bsui-active)] active:scale-95 active:bg-[var(--bsui-actived)]",
    overlay: "absolute top-10 left-0 right-0 bg-[var(--bsui-gray-2)] border-b border-[var(--bsui-border)] z-50 md:hidden",
    container: "flex flex-col",
    menuButton: "w-full text-left px-4 py-2 text-sm hover:bg-[var(--bsui-active)]",
  },
  dropdown: {
    content: "bg-[var(--bsui-gray-2)] border border-[var(--bsui-border)] text-[var(--bsui-gray-0)] rounded-none",
    contentMobile: "bg-[var(--bsui-gray-2)] border border-[var(--bsui-border)] text-[var(--bsui-gray-0)] rounded-none w-full",
    separator: "bg-[var(--bsui-border)]",
  },
} as const;

type MenuKey = keyof typeof MENU_DATA;

const MenuDropdown = memo(({ menuKey, isDesktop = true }: { 
  menuKey: MenuKey; 
  isDesktop?: boolean; 
}) => {
  const menu = MENU_DATA[menuKey];
  let separatorCount = 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={isDesktop ? STYLES.desktop.button : STYLES.mobile.menuButton}
        >
          <span className={isDesktop ? STYLES.desktop.text : undefined}>
            {menu.label}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={isDesktop ? STYLES.dropdown.content : STYLES.dropdown.contentMobile}
      >
        {menu.items.map((item) => {
          if (item === "separator") {
            separatorCount += 1;
            return (
              <DropdownMenuSeparator 
                key={`${menuKey}-separator-${separatorCount}`} 
                className={STYLES.dropdown.separator} 
              />
            );
          }
          return (
            <DropdownMenuItem key={`${menuKey}-${item}`}>
              {item}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

MenuDropdown.displayName = "MenuDropdown";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <div className={STYLES.container}>
      <div className={STYLES.logo.container}>
        <Image 
          src="/favicon.png" 
          alt="Logo" 
          width={34} 
          height={34} 
          className={STYLES.logo.image} 
        />
        <span className={STYLES.logo.textDesktop}>Broadcast Studio</span>
        <span className={STYLES.logo.textMobile}>BS</span>
      </div>

      <div className={STYLES.desktop.container}>
        {MENU_ORDER.map(menuKey => (
          <MenuDropdown 
            key={`desktop-${menuKey}`} 
            menuKey={menuKey} 
            isDesktop 
          />
        ))}
      </div>

      <div className={STYLES.mobile.button}>
        <button
          type="button"
          onClick={toggleMobileMenu}
          className={STYLES.mobile.hamburger}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className={STYLES.mobile.overlay}>
          <div className={STYLES.mobile.container}>
            {MENU_ORDER.map(menuKey => (
              <MenuDropdown 
                key={`mobile-${menuKey}`} 
                menuKey={menuKey} 
                isDesktop={false} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}