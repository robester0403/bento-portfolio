"use client";

import { Button } from "./button";
import { useLayout } from "@/app/layout-context";

const date = new Date();
const year = date.getFullYear();

export const Footer = () => {
    const { renderedList, setRenderedList } = useLayout();

    const handleSave = () => {
        // Force a save by updating the state with the current list
        setRenderedList([...renderedList]);
    };

    return (
        <footer className="footer py-12 relative overflow-hidden">
            <div className="inner-container max-w-[512px] mx-auto wrap-px relative z-10">
                <div className="grid gap-8 text-center">
                    <div className="col-span-1">
                        <div className="logo-container ">
                            <h1 className="logo mb-4 leading-0 flex justify-center">
                                <a className="font-black text-2xl text-primary hover:text-primary-500 transition duration-500 flex items-center w-16 h-16" href="/">
                                    <img src="/android-chrome-192x192.png" alt="Alt text" className="w-full h-auto sm:object-contain lg:object-cover" />
                                </a>
                            </h1>
                            <p className="text-base">Click save to jazz it up with your layout! 🚀.</p>
                            <Button mode="button" onClick={handleSave} className="mt-6 md:mt-8">
                                Save Layout
                            </Button>
                        </div>
                    </div>
                </div>
                <section className="footer-credit relative z-10 pt-8">
                    <div className="wrap grid text-center relative">
                        <div className="footer-credit--item flex flex-wrap justify-center ">
                            <p className="my-0">
                                ©{year}. All rights reserved.{" "}
                                <span className="font-normal">
                                    Made by{" "}
                                    <a className="transition-colors duration-300 hover:underline hover:decoration-wavy font-bold" href="https://github.com/robester0403/">
                                        Robert So
                                    </a>
                                    .
                                </span>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </footer>
    );
};
