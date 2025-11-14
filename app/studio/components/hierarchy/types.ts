import { Node } from "@xyflow/react";

export interface HierarchyGroup {
    id: string;
    name: string;
    expanded: boolean;
    children: HierarchyItem[];
    createdAt: string;
}

export interface HierarchyItem {
    id: string;
    nodeId: string; // ID do node no ReactFlow
    name: string;
    type: string;
    icon: string;
    visible: boolean;
    locked: boolean;
    groupId?: string; // ID do grupo pai, se houver
    node: Node; // Referência ao node completo
}

export interface HierarchyState {
    groups: HierarchyGroup[];
    items: HierarchyItem[];
    searchQuery: string;
}

