import { Node } from "@xyflow/react";

export type NodeType = "pc" | "router" | "switch" | "server" | "smartphone" | "cloud" | "desktop" | "printer";

export interface NetworkNodeData {
    info: string;
    label: string;
    image: string;
    dvctype: string;
    styles?: string;
    [key: string]: unknown;
}

export interface NodeConfig {
    type: NodeType;
    name: string;
    icon: string;
    dvctype: string;
    className?: string;
    defaultStyles?: string;
}

export interface NetworkNode extends Node {
    data: NetworkNodeData;
}

