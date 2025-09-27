"use client";

import Image from "next/image";
import { memo, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useStudio } from "./studioContext";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Menu,
  X,
  Plus,
  FolderOpen,
  Save,
  FileDown,
  LogOut,
  File,
  Calendar,
  Network,
  Settings,
  Search,
} from "lucide-react";

/**
 * Static menu configuration.
 * - MENU_DATA describes the structure and items for each top menu.
 * - MENU_ORDER determines render order.
 */
const MENU_DATA = {
  file: {
    label: "File",
    items: [
      "New Project",
      "Open Project",
      "Save Project",
      "Save As...",
      "separator",
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

/**
 * Tailwind class collection to keep JSX concise and consistent.
 */
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
  dialog: {
    content: "bg-[var(--bsui-gray-2)] border border-[var(--bsui-border)] text-[var(--bsui-gray-0)]",
    header: "border-b border-[var(--bsui-border)] pb-4",
    title: "text-lg font-semibold flex items-center gap-2",
    description: "text-sm text-[var(--bsui-gray-0)] opacity-70 mt-2",
    footer: "border-t border-[var(--bsui-border)] pt-4",
    input: "bg-[var(--bsui-gray-1)] border-[var(--bsui-border)] text-[var(--bsui-gray-0)] focus:ring-2 focus:ring-[var(--bsui-active)]",
    label: "text-sm font-medium text-[var(--bsui-gray-0)]",
    button: {
      primary: "bg-[var(--bsui-primary)] text-[var(--bsui-gray-0)] hover:bg-[var(--bsui-actived)] active:scale-95",
      secondary: "bg-[var(--bsui-gray-1)] text-[var(--bsui-gray-0)] hover:bg-[var(--bsui-active)] active:scale-95",
    },
    projectItem: "p-3 mb-2 bg-[var(--bsui-gray-1)] rounded hover:bg-[var(--bsui-active)] cursor-pointer transition-colors",
    projectItemSelected: "p-3 mb-2 bg-[var(--bsui-active)] rounded cursor-pointer",
  },
} as const;

type MenuKey = keyof typeof MENU_DATA;

/**
 * Temporary mock projects. In a production app these come from API/local storage.
 */
const MOCK_PROJECTS = [
  {
    id: "1",
    name: "Main Broadcast Network",
    description: "Primary streaming setup with multiple cameras",
    lastModified: new Date("2024-01-15"),
    nodes: 12,
  },
  {
    id: "2",
    name: "Podcast Studio",
    description: "Audio-focused setup for podcast recording",
    lastModified: new Date("2024-01-10"),
    nodes: 8,
  },
  {
    id: "3",
    name: "Event Livestream",
    description: "Multi-camera setup for live events",
    lastModified: new Date("2024-01-05"),
    nodes: 15,
  },
];

/**
 * Utility: safe accessor for studio API methods (guards when studio is not ready).
 */
const hasStudioMethod = (studio: ReturnType<typeof useStudio> | undefined, methodPath: string[]) => {
  if (!studio) return false;
  // shallow check for nested methods like studio.editApi.hasSelection
  let ptr: any = studio;
  for (const key of methodPath) {
    ptr = ptr?.[key];
    if (ptr === undefined) return false;
  }
  return true;
};

/**
 * MenuDropdown
 * - Renders either a desktop or mobile dropdown menu.
 * - Provides dialogs for New/Open project and file import/export helpers.
 */
const MenuDropdown = memo(({ menuKey, isDesktop = true }: { menuKey: MenuKey; isDesktop?: boolean }) => {
  const menu = MENU_DATA[menuKey];
  const studio = useStudio();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dialog visibility
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [openProjectOpen, setOpenProjectOpen] = useState(false);

  // Form & UI state
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Create a new project (local-only for now).
   * Reset form and close dialog on success.
   */
  const handleNewProject = () => {
    if (!projectName.trim()) return;

    const newProject = {
      name: projectName.trim(),
      description: projectDescription.trim(),
      nodes: [],
      settings: {},
      createdAt: new Date().toISOString(),
    };

    console.log("Creating new project:", newProject);
    setProjectName("");
    setProjectDescription("");
    setNewProjectOpen(false);

    // TODO: persist project, navigate to project workspace, update app state
  };

  /**
   * Open a project from the mock list.
   * Closing dialog and clearing selection afterwards.
   */
  const handleOpenProject = () => {
    if (!selectedProject) return;
    const project = MOCK_PROJECTS.find((p) => p.id === selectedProject);
    console.log("Opening project:", project);
    setOpenProjectOpen(false);
    setSelectedProject(null);

    // TODO: load project into studio state
  };

  /** Trigger the hidden file input to import a .bsf file */
  const handleOpenFile = () => fileInputRef.current?.click();

  /**
   * Read selected .bsf file and attempt to parse JSON payload.
   * Any parsing errors are logged to console for now.
   */
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".bsf")) {
      console.warn("Unsupported file type:", file.name);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const projectData = JSON.parse(e.target?.result as string);
        console.log("Loaded project from file:", projectData);
        setOpenProjectOpen(false);
        // TODO: import projectData into studio
      } catch (error) {
        console.error("Error loading project file:", error);
      }
    };
    reader.readAsText(file);
  };

  /**
   * Export current project as a downloadable .bsf JSON file.
   * Uses the studio's flow API if available, otherwise exports a minimal scaffold.
   */
  const handleSaveAs = () => {
    const projectData = {
      name: "My Broadcast Project",
      version: "1.0.0",
      nodes: hasStudioMethod(studio, ["flowApi", "getNodes"]) ? studio!.flowApi.getNodes() : [],
      connections: hasStudioMethod(studio, ["flowApi", "getEdges"]) ? studio!.flowApi.getEdges() : [],
      settings: {
        theme: "dark",
        grid: true,
      },
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(projectData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(dataBlob);
    link.download = `${projectData.name.replace(/\s+/g, "_")}.bsf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /** Handler for actions that map directly to the studio API or local helpers. */
  const handleItem = (item: string) => {
    if (!studio) return;

    // Map of simple command handlers -> keeps switch compact and easy to extend.
    const commandMap: Record<string, () => void> = {
      "New Project": () => setNewProjectOpen(true),
      "Open Project": () => setOpenProjectOpen(true),
      "Save Project": () => console.log("Saving current project..."),
      "Save As...": handleSaveAs,
      Exit: () => router.back(),
      Copy: () => studio.editApi.copy(),
      Cut: () => studio.editApi.cut(),
      Paste: () => studio.editApi.paste(),
      Delete: () => studio.editApi.deleteSelected(),
      "Select All": () => studio.editApi.selectAll(),
    };
    const fn = commandMap[item];
    if (fn) fn();
  };

  /** Filtered project list based on search query */
  const filteredProjects = MOCK_PROJECTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /** Compute whether a menu item should be disabled using studio API guards. */
  const computeDisabled = (item: string) => {
    if (!studio) return false;
    if (["Copy", "Cut", "Delete"].includes(item)) return !hasStudioMethod(studio, ["editApi", "hasSelection"]) || !studio.editApi.hasSelection();
    if (item === "Paste") return !hasStudioMethod(studio, ["editApi", "canPaste"]) || !studio.editApi.canPaste();
    return false;
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={isDesktop ? STYLES.desktop.button : STYLES.mobile.menuButton}
          >
            <span className={isDesktop ? STYLES.desktop.text : undefined}>{menu.label}</span>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className={isDesktop ? STYLES.dropdown.content : STYLES.dropdown.contentMobile}>
          {menu.items.map((item, idx) =>
            item === "separator" ? (
              <DropdownMenuSeparator key={`${menuKey}-sep-${idx}`} className={STYLES.dropdown.separator} />
            ) : (
              <DropdownMenuItem
                key={`${menuKey}-${item}`}
                onSelect={() => handleItem(item)}
                disabled={computeDisabled(item)}
              >
                {item}
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* New Project Dialog */}
      <Dialog open={newProjectOpen} onOpenChange={setNewProjectOpen}>
        <DialogContent className={STYLES.dialog.content}>
          <DialogHeader className={STYLES.dialog.header}>
            <DialogTitle className={STYLES.dialog.title}>
              <Save size={20} />
              Create New Project
            </DialogTitle>
            <DialogDescription className={STYLES.dialog.description}>
              Set up a new broadcast network project with custom configurations.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="project-name" className={STYLES.dialog.label}>
                Project Name
              </Label>
              <Input
                id="project-name"
                placeholder="Enter project name..."
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className={STYLES.dialog.input}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-description" className={STYLES.dialog.label}>
                Description
              </Label>
              <Input
                id="project-description"
                placeholder="Describe your broadcast network setup..."
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className={STYLES.dialog.input}
              />
            </div>
          </div>

          <DialogFooter className={STYLES.dialog.footer}>
            <Button variant="outline" onClick={() => setNewProjectOpen(false)} className={STYLES.dialog.button.secondary}>
              Cancel
            </Button>
            <Button onClick={handleNewProject} disabled={!projectName.trim()} className={STYLES.dialog.button.primary}>
              <Plus size={16} className="mr-2" />
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Open Project Dialog */}
      <Dialog open={openProjectOpen} onOpenChange={setOpenProjectOpen}>
        <DialogContent className={`${STYLES.dialog.content} max-w-2xl`}>
          <DialogHeader className={STYLES.dialog.header}>
            <DialogTitle className={STYLES.dialog.title}>
              <FolderOpen size={20} />
              Open Project
            </DialogTitle>
            <DialogDescription className={STYLES.dialog.description}>
              Select a recent project or browse for a Broadcast Studio file (.bsf)
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${STYLES.dialog.input} pl-10`}
              />
            </div>

            <ScrollArea className="h-64">
              <div className="pr-4">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className={selectedProject === project.id ? STYLES.dialog.projectItemSelected : STYLES.dialog.projectItem}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 font-medium">
                          <File size={16} />
                          {project.name}
                        </div>
                        <p className="text-sm opacity-70 mt-1">{project.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs opacity-60">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {project.lastModified.toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Network size={12} />
                            {project.nodes} nodes
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Hidden file input used for .bsf import */}
            <input ref={fileInputRef} type="file" accept=".bsf" onChange={handleFileSelect} className="hidden" />
          </div>

          <DialogFooter className={STYLES.dialog.footer}>
            <Button variant="outline" onClick={handleOpenFile} className={STYLES.dialog.button.secondary}>
              <FileDown size={16} className="mr-2" />
              Browse Files
            </Button>

            <Button variant="outline" onClick={() => setOpenProjectOpen(false)} className={STYLES.dialog.button.secondary}>
              Cancel
            </Button>

            <Button onClick={handleOpenProject} disabled={!selectedProject} className={STYLES.dialog.button.primary}>
              <FolderOpen size={16} className="mr-2" />
              Open Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
});

MenuDropdown.displayName = "MenuDropdown";

/**
 * Header component
 * - Renders app logo, desktop menu bar and mobile hamburger + overlay.
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const studio = useStudio();

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <div className={STYLES.container}>
      <div className={STYLES.logo.container}>
        <Image src="/favicon.png" alt="Logo" width={34} height={34} className={STYLES.logo.image} />
        <span className={STYLES.logo.textDesktop}>Broadcast Studio</span>
        <span className={STYLES.logo.textMobile}>BS</span>
      </div>

      <div className={STYLES.desktop.container}>
        {MENU_ORDER.map((menuKey) => (
          <MenuDropdown key={`desktop-${menuKey}`} menuKey={menuKey} isDesktop />
        ))}
      </div>

      <div className={STYLES.mobile.button}>
        <button type="button" onClick={toggleMobileMenu} className={STYLES.mobile.hamburger} aria-label="Toggle mobile menu">
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className={STYLES.mobile.overlay}>
          <div className={STYLES.mobile.container}>
            {MENU_ORDER.map((menuKey) => (
              <MenuDropdown key={`mobile-${menuKey}`} menuKey={menuKey} isDesktop={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
