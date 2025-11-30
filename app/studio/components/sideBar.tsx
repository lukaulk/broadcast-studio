"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useHierarchy } from "./hierarchy/useHierarchy";
import { HierarchyGroup } from "./hierarchy/HierarchyGroup";
import { HierarchyItem } from "./hierarchy/HierarchyItem";
import { useStudio } from "./studioContext";

export default function SideBar() {
  const { flowApi } = useStudio();
  const {
    groups,
    items,
    searchQuery,
    setSearchQuery,
    toggleItemVisibility,
    toggleItemLock,
    selectNode,
    deleteItem,
    createGroup,
    deleteGroup,
    renameGroup,
    toggleGroupExpand,
    moveItemToGroup,
  } = useHierarchy();

  const [showCreateGroupDialog, setShowCreateGroupDialog] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  const selectedNodes = flowApi.getSelectedNodes();
  const selectedNodeIds = new Set(selectedNodes.map((n) => n.id));

  const availableGroups = groups.map((g) => ({ id: g.id, name: g.name }));

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      createGroup(newGroupName.trim());
      setNewGroupName("");
      setShowCreateGroupDialog(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[var(--bsui-gray-3)] text-[var(--bsui-gray-0)]">
      {/* Header */}
      <div className="flex items-center border-b border-b-[var(--bsui-border)] w-full justify-center bg-[var(--bsui-gray-3)] text-[var(--bsui-gray-0)] shadow-md h-17 px-4">
        <span className="text-md font-semibold">Hierarchy</span>
        <Input
          type="text"
          className="mx-4 flex-1 h-8 border-[var(--bsui-border)] bg-[var(--bsui-gray-2)] text-[var(--bsui-gray-0)] placeholder:text-[var(--bsui-gray-1)]"
          placeholder="Search nodes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowCreateGroupDialog(true)}
          className="flex cursor-pointer items-center rounded-md px-3 py-2 hover:bg-[var(--bsui-active)] active:scale-95 transition-colors"
          title="Create Group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="space-y-1">
          {/* Groups */}
          {groups.map((group) => (
            <HierarchyGroup
              key={group.id}
              group={group}
              onToggleExpand={toggleGroupExpand}
              onRename={renameGroup}
              onDelete={deleteGroup}
              onItemAction={{
                onToggleVisibility: toggleItemVisibility,
                onToggleLock: toggleItemLock,
                onSelect: selectNode,
                onDelete: deleteItem,
                onMoveToGroup: moveItemToGroup,
              }}
              selectedNodeIds={selectedNodeIds}
              availableGroups={availableGroups.filter((g) => g.id !== group.id)}
            />
          ))}

          {/* Ungrouped Items */}
          {items.length > 0 && (
            <div className="mt-2">
              {items.map((item) => (
                <HierarchyItem
                  key={item.id}
                  item={item}
                  onToggleVisibility={toggleItemVisibility}
                  onToggleLock={toggleItemLock}
                  onSelect={selectNode}
                  onDelete={deleteItem}
                  onMoveToGroup={moveItemToGroup}
                  availableGroups={availableGroups}
                  isSelected={selectedNodeIds.has(item.nodeId)}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {groups.length === 0 && items.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center text-[var(--bsui-gray-0)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-12 mb-2 opacity-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                />
              </svg>
              <p className="text-sm">No nodes in hierarchy</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Create Group Dialog */}
      <Dialog open={showCreateGroupDialog} onOpenChange={setShowCreateGroupDialog}>
        <DialogContent className="sm:max-w-[400px] bg-[var(--bsui-gray-4)] text-[var(--bsui-gray-0)] border-[var(--bsui-border)]">
          <DialogHeader>
            <DialogTitle>Create Group</DialogTitle>
            <DialogDescription>
              Create a new group to organize your nodes
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="group-name" className="text-sm font-medium">
                Group Name
              </label>
              <Input
                id="group-name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="bg-[var(--bsui-gray-3)] border-[var(--bsui-border)] text-[var(--bsui-gray-0)]"
                placeholder="Enter group name..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCreateGroup();
                  }
                }}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateGroupDialog(false);
                setNewGroupName("");
              }}
              className="border-[var(--bsui-border)] text-[var(--bsui-gray-0)] hover:bg-[var(--bsui-active)]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateGroup}
              disabled={!newGroupName.trim()}
              className="bg-[var(--bsui-active)] text-[var(--bsui-gray-0)] hover:bg-[var(--bsui-actived)]"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
