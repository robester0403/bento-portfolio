"use client";

import { Button } from "./button";
import { useLayout } from "@/app/layout-context";

export const Header = () => {
    const { renderedList, setRenderedList } = useLayout();

    const handleSave = () => {
        // Force a save by updating the state with the current list
        setRenderedList([...renderedList]);
    };

    return (
        <header className="header py-4 relative z-10 w-100">
            <div className="inner-header-container wrap-md mx-auto wrap-px flex items-center justify-between">
                <div className="header-logo--container flex items-center">
                    <h1 className="logo mb-0 leading-0 flex">
                        <a className="font-black text-2xl text-primary hover:text-primary-500 transition duration-500 flex items-center w-16 h-16" href="/">
                            <img src="/android-chrome-192x192.png" alt="Alt text" className="w-full h-auto sm:object-contain lg:object-cover" />
                        </a>
                    </h1>
                </div>
                <div className="inline-flex items-center gap-2 list-none space-x-2">
                    <Button mode="button" onClick={handleSave}>
                        Save Layout
                    </Button>
                </div>
            </div>
        </header>
    );
};
