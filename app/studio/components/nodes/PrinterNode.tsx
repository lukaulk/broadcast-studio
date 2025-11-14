"use client";
import React from "react";
import BaseNode, { BaseNodeProps } from "./BaseNode";

/**
 * Node específico para Printer
 * Pode ser customizado conforme necessário
 */
const PrinterNode: React.FC<BaseNodeProps> = (props) => {
    return <BaseNode {...props} />;
};

export default PrinterNode;

