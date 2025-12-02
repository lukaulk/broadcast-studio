"use client";
import React from "react";
import BaseNode, { BaseNodeProps } from "./BaseNode";

/**
 * Node específico para Router
 * Pode ser customizado conforme necessário
 */
const RouterNode: React.FC<BaseNodeProps> = (props) => {
    return (
    <div>
        <BaseNode {...props}  />
    </div>
    );
};

export default RouterNode;

