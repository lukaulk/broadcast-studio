"use client";

import React, { useEffect, useRef } from "react";
import { StudioEditApi } from "./studioContext";

interface ContextMenuProps {
    position: { x: number; y: number };
    onClose: () => void;
    editApi: StudioEditApi;
}

export default function ContextMenu({ position, onClose, editApi }: ContextMenuProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClose();
            }
        };
        // Use capture to ensuring this fires before other click handlers if needed, 
        // or just window click.
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, [onClose]);

    // Close on escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const handleAction = (action: () => void) => {
        action();
        onClose();
    };

    const MenuItem = ({ label, action, disabled = false, shortcut }: { label: string; action: () => void; disabled?: boolean; shortcut?: string }) => (
        <button
            onClick={() => handleAction(action)}
            disabled={disabled}
            className={`w-full text-left px-3 py-2 text-sm flex justify-between items-center hover:bg-[var(--bsui-active)] ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
            <span>{label}</span>
            {shortcut && <span className="text-xs opacity-50 ml-4">{shortcut}</span>}
        </button>
    );

    const Separator = () => <div className="h-[1px] bg-[var(--bsui-border)] my-1" />;

    return (
        <div
            ref={ref}
            style={{ top: position.y, left: position.x }}
            className="fixed z-500 min-w-[200px] bg-[var(--bsui-gray-2)] border border-[var(--bsui-border)] shadow-xl rounded-md py-1 text-[var(--bsui-gray-0)]"
        >
            <MenuItem label="Undo" action={editApi.undo} disabled={!editApi.canUndo()} shortcut="Ctrl+Z" />
            <MenuItem label="Redo" action={editApi.redo} disabled={!editApi.canRedo()} shortcut="Ctrl+Y" />
            <Separator />
            <MenuItem label="Cut" action={editApi.cut} disabled={!editApi.hasSelection()} shortcut="Ctrl+X" />
            <MenuItem label="Copy" action={editApi.copy} disabled={!editApi.hasSelection()} shortcut="Ctrl+C" />
            <MenuItem label="Paste" action={editApi.paste} disabled={!editApi.canPaste()} shortcut="Ctrl+V" />
            <MenuItem label="Delete" action={editApi.deleteSelected} disabled={!editApi.hasSelection()} shortcut="Del" />
            <Separator />
            <MenuItem label="Select All" action={editApi.selectAll} shortcut="Ctrl+A" />
        </div>
    );
}
