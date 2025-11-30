"use client";

import Image from "next/image";
import { memo, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useStudio } from "./studioContext";
import { useSession, signOut } from "@/lib/auth-client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
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
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Menu,
  X,
  Plus,
  FolderOpen,
  Save,
  FileDown,
  File,
  Calendar,
  Network,
  Search,
  LogOut,
} from "lucide-react";
import { nodeConfigs, createNodeFromType } from "./nodes";
import { logoutGuest } from "@/app/actions/guest";
import type { NodeConfig } from "./nodes";

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
    ],
  },
  view: {
    label: "View",
    items: [
      "Zoom In",
      "Zoom Out",
      "separator",
      "Full Screen",
      "Grid",
      "separator",
      "Preferences",
    ],
  },
  nodes: {
    label: "Nodes",
    items: [
      "Add Node",
      "separator",
      "Node Properties",
      "Node Library",
    ],
  },
  hierarchy: {
    label: "Hierarchy",
    items: [
      "Show/Hide Hierarchy",
      "New Group"
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
    description: "Primary networks",
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
 *
 * Substituí o `any` por `unknown` e faço checagens de tipo em runtime
 * para evitar a regra @typescript-eslint/no-explicit-any.
 */
const hasStudioMethod = (studio: ReturnType<typeof useStudio> | undefined, methodPath: string[]) => {
  if (!studio) return false;

  let ptr: unknown = studio;
  for (const key of methodPath) {
    if (typeof ptr === "object" && ptr !== null) {
      const record = ptr as Record<string, unknown>;
      if (!(key in record)) return false;
      ptr = record[key];
    } else {
      return false;
    }
  }

  // Se o ponteiro final é função => tem o método
  return typeof ptr === "function";
};

/**
 * MenuDropdown
 * - Renders either a desktop or mobile dropdown menu.
 * - Provides dialogs for New/Open project and file import/export helpers.
 */
const MenuDropdown = memo(({ menuKey, isDesktop = true }: { menuKey: MenuKey; isDesktop?: boolean }) => {
  const menu = MENU_DATA[menuKey];
  const {
    currentProject,
    flowApi,
    editApi,
    showHierarchy,
    setShowHierarchy,
    openCreateGroupDialog,
  } = useStudio();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dialog visibility
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [openProjectOpen, setOpenProjectOpen] = useState(false);
  const [addNodeOpen, setAddNodeOpen] = useState(false);

  // Form & UI state
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [nodeSearchQuery, setNodeSearchQuery] = useState("");

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

    // eslint-disable-next-line no-console
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
    // eslint-disable-next-line no-console
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
      // eslint-disable-next-line no-console
      console.warn("Unsupported file type:", file.name);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const projectData = JSON.parse(e.target?.result as string);
        // eslint-disable-next-line no-console
        console.log("Loaded project from file:", projectData);
        setOpenProjectOpen(false);
        // TODO: import projectData into studio
      } catch (error) {
        // eslint-disable-next-line no-console
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
      nodes: flowApi.getNodes(),
      connections: flowApi.getEdges(),
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

  /**
   * Add a node to the flow at the center of the viewport
   */
  const handleAddNode = (nodeType: string) => {
    if (!currentProject) return;

    try {
      const nodes = flowApi.getNodes();
      const viewport = flowApi.getViewport();

      // Calculate center position in flow coordinates
      // Approximate center based on viewport (this is a simple approximation)
      const centerX = -viewport.x / viewport.zoom + (typeof window !== 'undefined' ? window.innerWidth / 2 / viewport.zoom : 400);
      const centerY = -viewport.y / viewport.zoom + (typeof window !== 'undefined' ? window.innerHeight / 2 / viewport.zoom : 300);

      const newId = String(nodes.length + 1);
      const newNode = createNodeFromType(nodeType, newId, { x: centerX, y: centerY });

      flowApi.addNode(newNode);
      setAddNodeOpen(false);
      setNodeSearchQuery("");

      // Show success message
      // eslint-disable-next-line no-console
      console.log(`Node ${nodeConfigs[nodeType]?.name || nodeType} added`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error adding node:", error);
    }
  };

  /**
   * Toggle fullscreen mode
   */
  const toggleFullScreen = () => {
    if (typeof document === 'undefined') return;

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        // eslint-disable-next-line no-console
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch((err) => {
        // eslint-disable-next-line no-console
        console.error(`Error attempting to exit fullscreen: ${err.message}`);
      });
    }
  };

  /** Handler for actions that map directly to the studio API or local helpers. */
  const handleItem = (item: string) => {
    if (!currentProject) return;

    // Map of simple command handlers -> keeps switch compact and easy to extend.
    const commandMap: Record<string, () => void> = {
      "New Project": () => setNewProjectOpen(true),
      "Open Project": () => setOpenProjectOpen(true),
      "Save Project": () => {
        // eslint-disable-next-line no-console
        console.log("Saving current project...");
      },
      "Save As...": handleSaveAs,
      Exit: () => router.back(),
      "Add Node": () => setAddNodeOpen(true),
      "Zoom In": () => flowApi.zoomIn(),
      "Zoom Out": () => flowApi.zoomOut(),
      "Full Screen": toggleFullScreen,
      "Grid": () => flowApi.toggleGrid(),
      Copy: () => editApi.copy(),
      Cut: () => editApi.cut(),
      Paste: () => editApi.paste(),
      Delete: () => editApi.deleteSelected(),
      "Select All": () => editApi.selectAll(),
      "Show/Hide Hierarchy": () => setShowHierarchy(!showHierarchy),
      "New Group": () => openCreateGroupDialog(),
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

  /** Filtered nodes list based on search query */
  const filteredNodes = Object.entries(nodeConfigs).filter(([key, config]) =>
    config.name.toLowerCase().includes(nodeSearchQuery.toLowerCase()) ||
    config.dvctype.toLowerCase().includes(nodeSearchQuery.toLowerCase()) ||
    key.toLowerCase().includes(nodeSearchQuery.toLowerCase())
  );

  /** Compute whether a menu item should be disabled using studio API guards. */
  const computeDisabled = (item: string) => {
    if (!currentProject) return false;
    if (["Copy", "Cut", "Delete"].includes(item)) return !editApi.hasSelection();
    if (item === "Paste") return !editApi.canPaste();
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
                {item === "Show/Hide Hierarchy" ? (showHierarchy ? "Hide Hierarchy" : "Show Hierarchy") : item}
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
                            {new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC" }).format(project.lastModified)}
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

      {/* Add Node Dialog */}
      <Dialog open={addNodeOpen} onOpenChange={setAddNodeOpen}>
        <DialogContent className={`${STYLES.dialog.content} max-w-2xl`}>
          <DialogHeader className={STYLES.dialog.header}>
            <DialogTitle className={STYLES.dialog.title}>
              Add Node
            </DialogTitle>
            <DialogDescription className={STYLES.dialog.description}>
              Select a network node to add
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search nodes..."
                value={nodeSearchQuery}
                onChange={(e) => setNodeSearchQuery(e.target.value)}
                className={`${STYLES.dialog.input} pl-10`}
              />
            </div>

            <ScrollArea className="h-96">
              <div className="pr-4 grid grid-cols-2 gap-3">
                {filteredNodes.map(([nodeType, config]) => {
                  const nodeConfig = config as NodeConfig;
                  return (
                    <div
                      key={nodeType}
                      className={STYLES.dialog.projectItem}
                      onClick={() => handleAddNode(nodeType)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-[var(--bsui-gray-1)] rounded-md flex items-center justify-center border border-[var(--bsui-border)]">
                          {nodeConfig.icon && (
                            <Image
                              src={nodeConfig.icon}
                              alt={nodeConfig.name}
                              width={50}
                              height={50}
                              className="object-contain"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 font-medium text-[var(--bsui-gray-0)]">
                            {nodeConfig.name}
                          </div>
                          <p className="text-sm opacity-70 mt-1 text-[var(--bsui-gray-0)]">{nodeConfig.dvctype}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            {filteredNodes.length === 0 && (
              <div className="text-center py-8 text-[var(--bsui-gray-0)] opacity-70">
                <p>No nodes found matching &quot;{nodeSearchQuery}&quot;</p>
              </div>
            )}
          </div>

          <DialogFooter className={STYLES.dialog.footer}>
            <Button
              variant="outline"
              onClick={() => {
                setAddNodeOpen(false);
                setNodeSearchQuery("");
              }}
              className={STYLES.dialog.button.secondary}
            >
              Cancel
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
  const { data: session } = useSession();
  const router = useRouter();
  // retirado: const studio = useStudio(); // estava definido mas não utilizado -> warning / lint

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const handleSignOut = async () => {
    if (session?.user) {
      await signOut();
      router.push("/login");
      router.refresh();
    } else {
      await logoutGuest();
    }
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

      {/* Theme Toggle and User Avatar - Desktop */}
      <div className="hidden md:flex items-center ml-auto mr-6 gap-2">
        <ThemeToggle />
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative flex gap-2 items-center rounded-sm justify-center shrink-0 overflow-hidden px-2 hover:bg-[var(--bsui-active)] transition-colors">
                <span className="text-sm">
                  {session.user.name || session.user.email || "User"}
                </span>
                <Avatar className="size-7">
                  <AvatarImage
                    src={session.user.image || undefined}
                    alt={session.user.name || session.user.email || "User"}
                  />
                  <AvatarFallback className="bg-[var(--bsui-gray-2)] text-[var(--bsui-gray-0)] text-sm font-medium">
                    {getUserInitials(session.user.name, session.user.email)}
                  </AvatarFallback>
                </Avatar>

              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className={STYLES.dropdown.content}
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {session.user.name || "User"}
                  </p>
                  <p className="text-xs leading-none opacity-70">
                    {session.user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className={STYLES.dropdown.separator} />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-red-400 focus:text-red-300 focus:bg-red-950/20 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative flex gap-2 items-center rounded-sm justify-center shrink-0 overflow-hidden px-2 hover:bg-[var(--bsui-active)] transition-colors">
                <span className="text-sm">Guest</span>
                <Avatar className="size-7">
                  <AvatarFallback className="bg-[var(--bsui-gray-2)] text-[var(--bsui-gray-0)] text-sm font-medium">
                    G
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={STYLES.dropdown.content}>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Guest User</p>
                  <p className="text-xs leading-none opacity-70">Temporary Session</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className={STYLES.dropdown.separator} />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-red-400 focus:text-red-300 focus:bg-red-950/20 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Exit Guest Mode</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Mobile menu button and user avatar */}
      <div className="md:hidden flex items-center gap-2">
        <ThemeToggle />
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative flex size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--bsui-border)]">
                <Avatar className="size-10">
                  <AvatarImage
                    src={session.user.image || undefined}
                    alt={session.user.name || session.user.email || "User"}
                  />
                  <AvatarFallback className="bg-[var(--bsui-gray-2)] text-[var(--bsui-gray-0)] text-sm font-medium">
                    {getUserInitials(session.user.name, session.user.email)}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className={STYLES.dropdown.content}
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {session.user.name || "User"}
                  </p>
                  <p className="text-xs leading-none opacity-70">
                    {session.user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className={STYLES.dropdown.separator} />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-red-400 focus:text-red-300 focus:bg-red-950/20 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative flex size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--bsui-border)]">
                <Avatar className="size-10">
                  <AvatarFallback className="bg-[var(--bsui-gray-2)] text-[var(--bsui-gray-0)] text-sm font-medium">
                    G
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={STYLES.dropdown.content}>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Guest User</p>
                  <p className="text-xs leading-none opacity-70">Temporary Session</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className={STYLES.dropdown.separator} />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-red-400 focus:text-red-300 focus:bg-red-950/20 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Exit Guest Mode</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
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
