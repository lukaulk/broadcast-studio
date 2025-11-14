"use client";

import React, { useState, useEffect } from "react";
import { Node } from "@xyflow/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NetworkNodeData } from "../nodes/types";
import { useStudio } from "../studioContext";

interface NodeSettingsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    node: Node;
    nodeName: string;
}

export function NodeSettingsDialog({
    open,
    onOpenChange,
    node,
    nodeName,
}: NodeSettingsDialogProps) {
    const { flowApi } = useStudio();
    const data = node.data as NetworkNodeData;

    const [name, setName] = useState(nodeName);
    const [label, setLabel] = useState(data.label || "");
    const [description, setDescription] = useState((data.description as string) || "");

    useEffect(() => {
        if (open) {
            setName(nodeName);
            setLabel(data.label || "");
            setDescription((data.description as string) || "");
        }
    }, [open, nodeName, data]);

    const handleSave = () => {
        const nodes = flowApi.getNodes();
        const updatedNodes = nodes.map((n) => {
            if (n.id === node.id) {
                return {
                    ...n,
                    data: {
                        ...n.data,
                        label: label || name,
                        description,
                    },
                };
            }
            return n;
        });
        flowApi.setNodes(updatedNodes);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-[var(--bsui-gray-4)] text-[var(--bsui-gray-0)] border-[var(--bsui-border)]">
                <DialogHeader>
                    <DialogTitle>Node Settings</DialogTitle>
                    <DialogDescription>
                        Configure properties for {nodeName}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-[var(--bsui-gray-3)] border-[var(--bsui-border)] text-[var(--bsui-gray-0)]"
                            disabled
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="label">Label</Label>
                        <Input
                            id="label"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            className="bg-[var(--bsui-gray-3)] border-[var(--bsui-border)] text-[var(--bsui-gray-0)]"
                            placeholder="Display label"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="type">Type</Label>
                        <Input
                            id="type"
                            value={data.dvctype || "End Device"}
                            className="bg-[var(--bsui-gray-3)] border-[var(--bsui-border)] text-[var(--bsui-gray-0)]"
                            disabled
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-[var(--bsui-gray-3)] border-[var(--bsui-border)] text-[var(--bsui-gray-0)]"
                            placeholder="Add a description..."
                            rows={3}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="border-[var(--bsui-border)] text-[var(--bsui-gray-0)] hover:bg-[var(--bsui-active)]"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="bg-[var(--bsui-active)] text-[var(--bsui-gray-0)] hover:bg-[var(--bsui-actived)]"
                    >
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

