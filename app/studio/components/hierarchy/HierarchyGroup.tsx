"use client";

import React, { useState } from "react";
import { HierarchyGroup as HierarchyGroupType } from "./types";
import { HierarchyItem as HierarchyItemComponent } from "./HierarchyItem";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface HierarchyGroupProps {
    group: HierarchyGroupType;
    onToggleExpand: (groupId: string) => void;
    onRename: (groupId: string, newName: string) => void;
    onDelete: (groupId: string) => void;
    onItemAction: {
        onToggleVisibility: (itemId: string) => void;
        onToggleLock: (itemId: string) => void;
        onSelect: (nodeId: string) => void;
        onDelete: (itemId: string) => void;
        onMoveToGroup?: (itemId: string, groupId: string | null) => void;
    };
    selectedNodeIds?: Set<string>;
    availableGroups?: Array<{ id: string; name: string }>;
}

export function HierarchyGroup({
    group,
    onToggleExpand,
    onRename,
    onDelete,
    onItemAction,
    selectedNodeIds = new Set(),
    availableGroups,
}: HierarchyGroupProps) {
    const [isRenaming, setIsRenaming] = useState(false);
    const [renameValue, setRenameValue] = useState(group.name);

    const handleRename = () => {
        if (renameValue.trim()) {
            onRename(group.id, renameValue.trim());
        } else {
            setRenameValue(group.name);
        }
        setIsRenaming(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleRename();
        } else if (e.key === "Escape") {
            setRenameValue(group.name);
            setIsRenaming(false);
        }
    };

    return (
        <div className="select-none">
            {/* Group Header */}
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[var(--bsui-gray-2)] transition-colors">
                <button
                    onClick={() => onToggleExpand(group.id)}
                    className="p-1 hover:bg-[var(--bsui-gray-1)] rounded transition-colors"
                >
                    {group.expanded ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    )}
                </button>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 text-[var(--bsui-gray-1)]"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                    />
                </svg>

                {isRenaming ? (
                    <Input
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onBlur={handleRename}
                        onKeyDown={handleKeyDown}
                        className="h-6 px-2 text-sm bg-[var(--bsui-gray-2)] border-[var(--bsui-border)] text-[var(--bsui-gray-0)]"
                        autoFocus
                    />
                ) : (
                    <span
                        className="flex-1 text-sm font-medium cursor-pointer"
                        onDoubleClick={() => setIsRenaming(true)}
                    >
                        {group.name}
                    </span>
                )}

                <span className="text-xs text-[var(--bsui-gray-1)]">
                    ({group.children.length})
                </span>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                                />
                            </svg>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => setIsRenaming(true)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-4 mr-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18.14 4.741l-1.25 1.25m-5.64 5.64-1.25 1.25m-5.64 5.64-1.25 1.25"
                                />
                            </svg>
                            Rename
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => onDelete(group.id)}
                            className="text-red-400"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-4 mr-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                            </svg>
                            Delete Group
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Group Children */}
            {group.expanded && (
                <div className="ml-4 mt-1 space-y-1">
                    {group.children.map((item) => (
                        <HierarchyItemComponent
                            key={item.id}
                            item={item}
                            onToggleVisibility={onItemAction.onToggleVisibility}
                            onToggleLock={onItemAction.onToggleLock}
                            onSelect={onItemAction.onSelect}
                            onDelete={onItemAction.onDelete}
                            onMoveToGroup={onItemAction.onMoveToGroup}
                            availableGroups={availableGroups}
                            isSelected={selectedNodeIds?.has(item.nodeId)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

