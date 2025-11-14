"use client";
import React from "react";
import BaseNode, { BaseNodeProps } from "./BaseNode";

/**
 * Node específico para PC/Laptop
 * Pode ser customizado conforme necessário
 */
const PCNode: React.FC<BaseNodeProps> = (props) => {
    return <BaseNode {...props} />;
};

export default PCNode;

