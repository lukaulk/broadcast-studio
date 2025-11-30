"use client";

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface NodeLabelDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialLabel: string;
    onSave: (label: string) => void;
}

export function NodeLabelDialog({
    open,
    onOpenChange,
    initialLabel,
    onSave,
}: NodeLabelDialogProps) {
    const [label, setLabel] = useState(initialLabel);

    useEffect(() => {
        if (open) {
            setLabel(initialLabel);
        }
    }, [open, initialLabel]);

    const handleSave = () => {
        onSave(label);
        onOpenChange(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSave();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-[var(--bsui-gray-3)] border-[var(--bsui-border)] text-[var(--bsui-gray-0)]">
                <DialogHeader>
                    <DialogTitle>Edit Node Label</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Label
                        </Label>
                        <Input
                            id="name"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="col-span-3 bg-[var(--bsui-gray-2)] border-[var(--bsui-border)] text-[var(--bsui-gray-0)]"
                            autoFocus
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSave}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
