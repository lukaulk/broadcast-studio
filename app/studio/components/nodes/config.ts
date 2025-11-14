import { NodeConfig } from "./types";

export const nodeConfigs: Record<string, NodeConfig> = {
    pc: {
        type: "pc",
        name: "PC",
        icon: "/dvc/svg/laptop.svg",
        dvctype: "End Device",
    },
    router: {
        type: "router",
        name: "Router",
        icon: "/dvc/svg/router.svg",
        dvctype: "Wireless Device",
    },
    switch: {
        type: "switch",
        name: "Switch",
        icon: "/dvc/svg/switchs.svg",
        dvctype: "Connect Device",
    },
    server: {
        type: "server",
        name: "Server",
        icon: "/dvc/svg/server.svg",
        dvctype: "End Device",
        className: "scale-95",
    },
    smartphone: {
        type: "smartphone",
        name: "Smartphone",
        icon: "/dvc/svg/smartphone.svg",
        dvctype: "End Device",
    },
    cloud: {
        type: "cloud",
        name: "Cloud",
        icon: "/dvc/svg/cloud.svg",
        dvctype: "End Device",
        className: "scale-125",
    },
    desktop: {
        type: "desktop",
        name: "Desktop",
        icon: "/dvc/svg/desktop.svg",
        dvctype: "End Device",
    },
    printer: {
        type: "printer",
        name: "Printer",
        icon: "/dvc/svg/printer.svg",
        dvctype: "End Device",
        className: "scale-125",
    },
};

/**
 * Cria um objeto Node para ReactFlow baseado no tipo de node
 */
export function createNodeFromType(
    type: string,
    id: string,
    position: { x: number; y: number },
    customLabel?: string
): import("@xyflow/react").Node {
    const config = nodeConfigs[type.toLowerCase()];
    if (!config) {
        throw new Error(`Unknown node type: ${type}`);
    }

    return {
        id,
        type: type.toLowerCase(),
        position,
        data: {
            label: customLabel || `${config.name}-0${id}`,
            image: config.icon,
            dvctype: config.dvctype,
            styles: config.defaultStyles || config.className || "",
        },
    };
}

/**
 * Converte um NodeConfig para JSON (útil para serialização)
 */
export function nodeConfigToJSON(config: NodeConfig): string {
    return JSON.stringify({
        type: config.type,
        name: config.name,
        icon: config.icon,
        dvctype: config.dvctype,
        className: config.className,
        defaultStyles: config.defaultStyles,
    });
}

