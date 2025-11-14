/**
 * Exporta todos os nodes e utilitários para uso no ReactFlow
 */

// Types
export type { NodeType, NetworkNodeData, NodeConfig, NetworkNode } from "./types";

// Config
export { nodeConfigs, createNodeFromType, nodeConfigToJSON } from "./config";

// Node Components
export { default as BaseNode } from "./BaseNode";
export { default as PCNode } from "./PCNode";
export { default as RouterNode } from "./RouterNode";
export { default as SwitchNode } from "./SwitchNode";
export { default as ServerNode } from "./ServerNode";
export { default as SmartphoneNode } from "./SmartphoneNode";
export { default as CloudNode } from "./CloudNode";
export { default as DesktopNode } from "./DesktopNode";
export { default as PrinterNode } from "./PrinterNode";

// Mapeamento de tipos para componentes (para uso no ReactFlow)
import BaseNode from "./BaseNode";
import PCNode from "./PCNode";
import RouterNode from "./RouterNode";
import SwitchNode from "./SwitchNode";
import ServerNode from "./ServerNode";
import SmartphoneNode from "./SmartphoneNode";
import CloudNode from "./CloudNode";
import DesktopNode from "./DesktopNode";
import PrinterNode from "./PrinterNode";

/**
 * Mapeamento de tipos de node para seus componentes React
 * Use este objeto no nodeTypes do ReactFlow
 */
export const nodeTypes = {
  pc: PCNode,
  router: RouterNode,
  switch: SwitchNode,
  server: ServerNode,
  smartphone: SmartphoneNode,
  cloud: CloudNode,
  desktop: DesktopNode,
  printer: PrinterNode,
  // Mantém compatibilidade com o antigo customNode
  customNode: BaseNode,
} as const;

