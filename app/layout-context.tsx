"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface GridItem {
    id: string;
}

interface LayoutContextType {
    renderedList: GridItem[];
    setRenderedList: (items: GridItem[]) => void;
    isLoading: boolean;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

const initialItems = [{ id: "hero" }, { id: "stats" }, { id: "info" }, { id: "about" }, { id: "quote" }, { id: "logo" }, { id: "banner1" }];

export function LayoutProvider({ children }: { children: ReactNode }) {
    const [renderedList, setRenderedList] = useState<GridItem[]>(initialItems);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Only run on client side
        if (typeof window !== "undefined") {
            try {
                const savedLayout = localStorage.getItem("bentoLayout");
                if (savedLayout) {
                    const parsedLayout = JSON.parse(savedLayout);
                    // Validate the saved layout has all required items
                    const hasAllItems = initialItems.every((item) => parsedLayout.some((savedItem: GridItem) => savedItem.id === item.id));
                    if (hasAllItems) {
                        setRenderedList(parsedLayout);
                    }
                }
            } catch (e) {
                console.error("Error loading saved layout:", e);
            }
            setIsInitialized(true);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        // Only save after initial load
        if (isInitialized && typeof window !== "undefined") {
            try {
                localStorage.setItem("bentoLayout", JSON.stringify(renderedList));
            } catch (e) {
                console.error("Error saving layout:", e);
            }
        }
    }, [renderedList, isInitialized]);

    return <LayoutContext.Provider value={{ renderedList, setRenderedList, isLoading }}>{children}</LayoutContext.Provider>;
}

export function useLayout() {
    const context = useContext(LayoutContext);
    if (context === undefined) {
        throw new Error("useLayout must be used within a LayoutProvider");
    }
    return context;
}
