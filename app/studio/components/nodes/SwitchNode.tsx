"use client";
import React from "react";
import BaseNode, { BaseNodeProps } from "./BaseNode";

/**
 * Node específico para Switch
 * Pode ser customizado conforme necessário
 */
const SwitchNode: React.FC<BaseNodeProps> = (props) => {
  return <BaseNode {...props} />;
};

export default SwitchNode;

