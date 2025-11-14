"use client";
import React from "react";
import BaseNode, { BaseNodeProps } from "./BaseNode";

/**
 * Node específico para Cloud
 * Pode ser customizado conforme necessário
 */
const CloudNode: React.FC<BaseNodeProps> = (props) => {
  return <BaseNode {...props} />;
};

export default CloudNode;

