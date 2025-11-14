"use client";
import React from "react";
import BaseNode, { BaseNodeProps } from "./BaseNode";

/**
 * Node específico para Server
 * Pode ser customizado conforme necessário
 */
const ServerNode: React.FC<BaseNodeProps> = (props) => {
  return <BaseNode {...props} />;
};

export default ServerNode;

