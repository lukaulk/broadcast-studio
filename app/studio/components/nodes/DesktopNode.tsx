"use client";
import React from "react";
import BaseNode, { BaseNodeProps } from "./BaseNode";

/**
 * Node específico para Desktop
 * Pode ser customizado conforme necessário
 */
const DesktopNode: React.FC<BaseNodeProps> = (props) => {
    return <BaseNode {...props} />;
};

export default DesktopNode;

