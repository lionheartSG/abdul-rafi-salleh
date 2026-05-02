"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type PointerNorm = { x: number; y: number };

export type PointerClient = { x: number; y: number };

type PortfolioHoverContextValue = {
  hoveredNodeId: string | null;
  setHoveredNodeId: (id: string | null) => void;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  focusedNodeId: string | null;
  setFocusedNodeId: (id: string | null) => void;
  pointerNorm: PointerNorm;
  pointerClient: PointerClient;
  setPointerFromClient: (clientX: number, clientY: number) => void;
};

const PortfolioHoverContext = createContext<PortfolioHoverContextValue | null>(
  null,
);

export function PortfolioHoverProvider({ children }: { children: ReactNode }) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);
  const [pointerNorm, setPointerNorm] = useState<PointerNorm>({
    x: 0,
    y: 0,
  });
  const [pointerClient, setPointerClient] = useState<PointerClient>({
    x: 0,
    y: 0,
  });

  const setPointerFromClient = useCallback(
    (clientX: number, clientY: number) => {
      if (typeof window === "undefined") return;
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = -((clientY / window.innerHeight) * 2 - 1);
      setPointerNorm({ x, y });
      setPointerClient({ x: clientX, y: clientY });
    },
    [],
  );

  const value = useMemo(
    () => ({
      hoveredNodeId,
      setHoveredNodeId,
      selectedNodeId,
      setSelectedNodeId,
      focusedNodeId,
      setFocusedNodeId,
      pointerNorm,
      pointerClient,
      setPointerFromClient,
    }),
    [
      hoveredNodeId,
      selectedNodeId,
      focusedNodeId,
      pointerClient,
      pointerNorm,
      setPointerFromClient,
    ],
  );

  return (
    <PortfolioHoverContext.Provider value={value}>
      {children}
    </PortfolioHoverContext.Provider>
  );
}

export function usePortfolioHover() {
  const ctx = useContext(PortfolioHoverContext);
  if (!ctx) {
    throw new Error(
      "usePortfolioHover must be used within PortfolioHoverProvider",
    );
  }
  return ctx;
}
