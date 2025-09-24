"use client";
import React, { createContext, useContext, useMemo, useRef, useState } from "react";

export type EditAction = "undo" | "redo" | "cut" | "copy" | "paste" | "delete" | "select_all" | "find" | "replace";

export interface StudioEditApi {
  copy: () => void;
  cut: () => void;
  paste: () => void;
  deleteSelected: () => void;
  selectAll: () => void;
  hasSelection: () => boolean;
  canPaste: () => boolean;
}

interface StudioContextValue {
  // edit api exposed to header and others
  editApi: StudioEditApi;
  // allow Flow to register actual implementations
  setEditApiImpl: (impl: Partial<StudioEditApi>) => void;
}

const noop = () => {};

const defaultApi: StudioEditApi = {
  copy: noop,
  cut: noop,
  paste: noop,
  deleteSelected: noop,
  selectAll: noop,
  hasSelection: () => false,
  canPaste: () => false,
};

const StudioContext = createContext<StudioContextValue | null>(null);

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const apiRef = useRef<StudioEditApi>({ ...defaultApi });
  const [, force] = useState(0);

  const setEditApiImpl = (impl: Partial<StudioEditApi>) => {
    apiRef.current = { ...apiRef.current, ...impl } as StudioEditApi;
    // force consumers to re-read canPaste/hasSelection when they render conditionally
    force((v) => v + 1);
  };

  const value = useMemo<StudioContextValue>(() => ({
    editApi: apiRef.current,
    setEditApiImpl,
  }), []);

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

export function useStudio() {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error("useStudio must be used within StudioProvider");
  return ctx;
}


