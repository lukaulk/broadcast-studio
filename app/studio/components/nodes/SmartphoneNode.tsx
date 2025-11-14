"use client";
import React from "react";
import BaseNode, { BaseNodeProps } from "./BaseNode";

/**
 * Node específico para Smartphone
 * Pode ser customizado conforme necessário
 */
const SmartphoneNode: React.FC<BaseNodeProps> = (props) => {
    return <BaseNode {...props} />;
};

export default SmartphoneNode;

