"use client";

import React, { useEffect, useRef, useState } from "react";
import { useStudio } from "./studioContext";

export default function DrawingOverlay() {
    const { toolMode } = useStudio();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const isDrawingRef = useRef<boolean>(false);
    const dprRef = useRef<number>(1);

    // Resize canvas to match parent container
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;

            const { width, height } = parent.getBoundingClientRect();
            const dpr = Math.max(window.devicePixelRatio || 1, 1);
            dprRef.current = dpr;

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.scale(dpr, dpr);
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.strokeStyle = "#3AE87A";
                ctx.lineWidth = 3;
            }
        };

        resize();
        // Use ResizeObserver for more robust resizing of parent container
        const parent = canvas.parentElement;
        if (parent) {
            const resizeObserver = new ResizeObserver(() => resize());
            resizeObserver.observe(parent);
            return () => resizeObserver.disconnect();
        }

        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    const getCanvasPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current!;
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (e.button !== 0) return; // only left button
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { x, y } = getCanvasPos(e);
        isDrawingRef.current = true;
        ctx.beginPath();
        ctx.moveTo(x, y);
        e.preventDefault();
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (!isDrawingRef.current) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { x, y } = getCanvasPos(e);
        ctx.lineTo(x, y);
        ctx.stroke();
        e.preventDefault();
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (!isDrawingRef.current) return;
        isDrawingRef.current = false;
        e.preventDefault();
    };

    const handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear entire canvas
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        // Reset context state
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#3AE87A";
        ctx.lineWidth = 3;
    };

    if (toolMode !== "pen") return null;

    return (
        <div
            className="absolute inset-0 z-[50] cursor-crosshair touch-none pointer-events-auto"
        >
            <canvas
                ref={canvasRef}
                className="block w-full h-full"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                onContextMenu={handleContextMenu}
            />
        </div>
    );
}
