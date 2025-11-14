"use client";

import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { Node } from "@xyflow/react";
import { HierarchyGroup, HierarchyItem } from "./types";
import { useStudio } from "../studioContext";
import { NetworkNodeData } from "../nodes/types";

export function useHierarchy() {
    const { flowApi } = useStudio();
    const [groups, setGroups] = useState<HierarchyGroup[]>([]);
    const [items, setItems] = useState<HierarchyItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    // Use ref to store previous items to preserve groupId without causing re-renders
    const itemsRef = useRef<HierarchyItem[]>([]);

    // Sync with ReactFlow nodes
    useEffect(() => {
        const nodes = flowApi.getNodes();
        const networkNodes = nodes.filter(
            (n) => n.type && n.type !== "default"
        ) as Node[];

        // Create hierarchy items from nodes
        const hierarchyItems: HierarchyItem[] = networkNodes.map((node) => {
            const data = node.data as NetworkNodeData;
            // Use ref instead of state to avoid dependency loop
            const existingItem = itemsRef.current.find((item) => item.nodeId === node.id);

            return {
                id: existingItem?.id || node.id,
                nodeId: node.id,
                name: data.label || `Node-${node.id}`,
                type: data.dvctype || "End Device",
                icon: data.image || "/dvc/desktop.png",
                visible: !node.hidden,
                locked: node.draggable === false,
                groupId: existingItem?.groupId,
                node,
            };
        });

        // Remove items for deleted nodes
        const validNodeIds = new Set(networkNodes.map((n) => n.id));
        const filteredItems = hierarchyItems.filter((item) =>
            validNodeIds.has(item.nodeId)
        );

        // Update ref before setting state
        itemsRef.current = filteredItems;
        setItems(filteredItems);

        // Update groups to reflect current items
        setGroups((currentGroups) => {
            return currentGroups.map((group) => ({
                ...group,
                children: filteredItems.filter((item) => item.groupId === group.id),
            }));
        });
    }, [flowApi]);

    // Filter items based on search query
    const filteredItems = useMemo(() => {
        if (!searchQuery.trim()) return items;

        const query = searchQuery.toLowerCase();
        return items.filter(
            (item) =>
                item.name.toLowerCase().includes(query) ||
                item.type.toLowerCase().includes(query)
        );
    }, [items, searchQuery]);

    // Filter groups based on search query
    const filteredGroups = useMemo(() => {
        if (!searchQuery.trim()) return groups;

        const query = searchQuery.toLowerCase();
        return groups
            .map((group) => ({
                ...group,
                children: group.children.filter(
                    (item) =>
                        item.name.toLowerCase().includes(query) ||
                        item.type.toLowerCase().includes(query)
                ),
            }))
            .filter((group) => group.children.length > 0);
    }, [groups, searchQuery]);

    // Get ungrouped items
    const ungroupedItems = useMemo(() => {
        return filteredItems.filter((item) => !item.groupId);
    }, [filteredItems]);

    const toggleItemVisibility = useCallback(
        (itemId: string) => {
            setItems((current) => {
                const item = current.find((i) => i.id === itemId);
                if (!item) return current;

                const nodes = flowApi.getNodes();
                const updatedNodes = nodes.map((node) => {
                    if (node.id === item.nodeId) {
                        return {
                            ...node,
                            hidden: !node.hidden,
                        };
                    }
                    return node;
                });
                flowApi.setNodes(updatedNodes);

                const updated = current.map((i) =>
                    i.id === itemId ? { ...i, visible: !i.visible } : i
                );
                itemsRef.current = updated;
                return updated;
            });
        },
        [flowApi]
    );

    const toggleItemLock = useCallback(
        (itemId: string) => {
            setItems((current) => {
                const item = current.find((i) => i.id === itemId);
                if (!item) return current;

                const nodes = flowApi.getNodes();
                const updatedNodes = nodes.map((node) => {
                    if (node.id === item.nodeId) {
                        return {
                            ...node,
                            draggable: node.draggable === false ? true : false,
                        };
                    }
                    return node;
                });
                flowApi.setNodes(updatedNodes);

                const updated = current.map((i) =>
                    i.id === itemId ? { ...i, locked: !i.locked } : i
                );
                itemsRef.current = updated;
                return updated;
            });
        },
        [flowApi]
    );

    const selectNode = useCallback(
        (nodeId: string) => {
            const nodes = flowApi.getNodes();
            const updatedNodes = nodes.map((node) => ({
                ...node,
                selected: node.id === nodeId,
            }));
            flowApi.setNodes(updatedNodes);
        },
        [flowApi]
    );

    const deleteItem = useCallback(
        (itemId: string) => {
            setItems((current) => {
                const item = current.find((i) => i.id === itemId);
                if (!item) return current;

                const nodes = flowApi.getNodes();
                const updatedNodes = nodes.filter((node) => node.id !== item.nodeId);
                flowApi.setNodes(updatedNodes);

                const updated = current.filter((i) => i.id !== itemId);
                itemsRef.current = updated;
                return updated;
            });
        },
        [flowApi]
    );

    const createGroup = useCallback((name: string) => {
        const newGroup: HierarchyGroup = {
            id: `group-${Date.now()}`,
            name,
            expanded: true,
            children: [],
            createdAt: new Date().toISOString(),
        };
        setGroups((current) => [...current, newGroup]);
        return newGroup.id;
    }, []);

    const deleteGroup = useCallback((groupId: string) => {
        // Move items to ungrouped
        setItems((current) =>
            current.map((item) =>
                item.groupId === groupId ? { ...item, groupId: undefined } : item
            )
        );
        setGroups((current) => current.filter((g) => g.id !== groupId));
    }, []);

    const renameGroup = useCallback((groupId: string, newName: string) => {
        setGroups((current) =>
            current.map((group) =>
                group.id === groupId ? { ...group, name: newName } : group
            )
        );
    }, []);

    const toggleGroupExpand = useCallback((groupId: string) => {
        setGroups((current) =>
            current.map((group) =>
                group.id === groupId ? { ...group, expanded: !group.expanded } : group
            )
        );
    }, []);

    const moveItemToGroup = useCallback(
        (itemId: string, groupId: string | null) => {
            setItems((current) => {
                const updated = current.map((item) =>
                    item.id === itemId ? { ...item, groupId: groupId || undefined } : item
                );
                itemsRef.current = updated;
                return updated;
            });
        },
        []
    );

    return {
        groups: filteredGroups,
        items: ungroupedItems,
        allItems: filteredItems,
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
    };
}

