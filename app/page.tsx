"use client";

import { Button } from "@/components/global/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLayout } from "./layout-context";

interface GridItem {
    id: string;
}

export default function Home() {
    const { renderedList, setRenderedList, isLoading } = useLayout();
    const [draggedId, setDraggedId] = useState<string | null>(null);
    const [dropTargetId, setDropTargetId] = useState<string | null>(null);
    const [dropPosition, setDropPosition] = useState<{ targetId: string; isAfter: boolean } | null>(null);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    const reorderItems = (currentItems: GridItem[], draggedId: string, targetId: string, isAfter: boolean): GridItem[] => {
        const draggedItem = currentItems.find((item) => item.id === draggedId);
        const targetItem = currentItems.find((item) => item.id === targetId);

        if (!draggedItem || !targetItem) return currentItems;

        let newOrder = currentItems.filter((item) => item.id !== draggedId);

        const targetIndex = newOrder.findIndex((item) => item.id === targetId);
        const insertIndex = isAfter ? targetIndex + 1 : targetIndex;

        newOrder.splice(insertIndex, 0, draggedItem);

        return newOrder;
    };

    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData("text/plain", id);
        setDraggedId(id);
        document.body.classList.add("dragging");
    };

    const handleDragEnd = () => {
        setDraggedId(null);
        setDropTargetId(null);
        setDropPosition(null);
        document.body.classList.remove("dragging");
    };

    const handleDragOver = (e: React.DragEvent, targetId: string) => {
        e.preventDefault();
        if (!draggedId || draggedId === targetId) return;

        const targetElement = e.currentTarget as HTMLElement;
        const rect = targetElement.getBoundingClientRect();
        const mouseY = e.clientY;
        const threshold = rect.top + rect.height / 2;
        const isAfter = mouseY > threshold;

        // Only update if the position has changed
        if (dropPosition?.targetId !== targetId || dropPosition?.isAfter !== isAfter) {
            setDropPosition({ targetId, isAfter });
            setDropTargetId(targetId);

            // Update preview
            const newPreviewItems = reorderItems(renderedList, draggedId, targetId, isAfter);
            setRenderedList(newPreviewItems);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDropTargetId(null);
        setDropPosition(null);
    };

    const handleDrop = (e: React.DragEvent, targetId: string) => {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData("text/plain");

        if (!draggedId || draggedId === targetId) {
            handleDragEnd();
            return;
        }

        const isAfter = dropPosition?.isAfter ?? false;

        const newItems = reorderItems(renderedList, draggedId, targetId, isAfter);
        setRenderedList(newItems);

        handleDragEnd();
    };

    const getDragIndicatorStyles = (itemId: string) => {
        let className = "transition-all duration-300 relative ";

        if (draggedId === itemId) {
            className += "opacity-50 scale-95 ring-2 ring-primary-500 ";
        }

        if (dropTargetId === itemId && draggedId !== itemId) {
            className += "ring-2 ring-primary-500 ring-offset-2 scale-[1.02] shadow-lg ";
        }

        if (dropPosition?.targetId === itemId) {
            className += dropPosition.isAfter ? "after:block " : "before:block ";
        }

        return className;
    };

    const renderGridItem = (item: GridItem) => {
        const commonProps = {
            draggable: true,
            onDragStart: (e: React.DragEvent) => handleDragStart(e, item.id),
            onDragEnd: handleDragEnd,
            onDragOver: (e: React.DragEvent) => handleDragOver(e, item.id),
            onDragLeave: handleDragLeave,
            onDrop: (e: React.DragEvent) => handleDrop(e, item.id)
        };

        const baseClassName = getDragIndicatorStyles(item.id);

        const wrapperClassName = `
            ${baseClassName}
            before:content-[''] before:absolute before:left-0 before:right-0 before:top-0 before:h-1 before:bg-primary-500 before:hidden before:rounded-full before:-translate-y-1
            after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 after:bg-primary-500 after:hidden after:rounded-full after:translate-y-1
        `;

        switch (item.id) {
            case "hero":
                return (
                    <div key={item.id} {...commonProps} className={`col-span-6 md:col-span-4 row-span-2 ${wrapperClassName}`}>
                        <div className="drag-handle cursor-move select-none absolute top-0 left-0 w-full h-8 z-20"></div>
                        <div className="flex h-full flex-wrap gap-4 content-center bg-neutral-300/20 sm:aspect-auto relative p-8 sm:p-12 border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden">
                            <div className="content flex gap-4 flex-wrap max-w-60 sm:max-w-72 md:max-w-52 lg:max-w-64 relative z-10">
                                <h2 className="font-bold text-xl sm:text-3xl md:text-2xl mb-0">Welcome to So's Bento</h2>
                                <p>I'm Robert So, a software developer with a passion for building products that help people live better lives.</p>
                                <div className="inline-flex">
                                    <Button link="https://github.com/robester0403/bento-portfolio" className="mt-4" target="_blank">
                                        Find out More!
                                    </Button>
                                </div>
                            </div>
                            <div className="image-container absolute hidden sm:flex inset-y-0 right-0 w-full md:w-auto max-w-64 md:max-w-48 lg:max-w-60 z-10">
                                <img src="/placeholder.png" alt="Alt text" className="w-full h-auto sm:object-contain lg:object-cover" />
                            </div>
                            <span className="block absolute inset-y-0 left-52 sm:left-72 md:left-[200px] w-full">
                                <span className="bg-gradient-to-r absolute from-[#e1e1e1] to-transparent block w-full h-full"></span>
                                <span className="bg-pattern two w-full block h-full bg-contain sm:bg-cover"></span>
                            </span>
                        </div>
                    </div>
                );
            case "stats":
                return (
                    <div key={item.id} {...commonProps} className={`col-span-6 sm:col-span-3 md:col-span-2 row-span-1 ${wrapperClassName}`}>
                        <div className="drag-handle cursor-move select-none absolute top-0 left-0 w-full h-8 z-20"></div>
                        <div className="flex flex-wrap h-full md:h-60 content-start bg-neutral-300/20 relative aspect-square md:aspect-auto px-4 pt-8 border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary-200 via-primary-400 to-primary-600">
                            <div className="relative h-full w-full">
                                <div className="content flex flex-wrap gap-1 text-white content-center justify-center md:max-w-64 relative z-10">
                                    <h2 className="font-bold text-xl sm:text-3xl md:text-xl mb-0 w-full text-center">My Portfolio</h2>
                                    <p className="text-center">I spend most of my time moving things around</p>
                                </div>
                                <div className="image-container absolute bottom-0">
                                    <img src="/placeholder4.png" alt="Alt text" className="w-full aspect-auto" />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "info":
                return (
                    <div key={item.id} {...commonProps} className={`col-span-6 sm:col-span-3 md:col-span-2 row-span-1 ${wrapperClassName}`}>
                        <div className="drag-handle cursor-move select-none absolute top-0 left-0 w-full h-8 z-20"></div>
                        <div className="flex flex-wrap gap-4 content-center md:content-start bg-neutral-300/20 relative aspect-square md:aspect-auto p-8 sm:p-12 border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden">
                            <div className="rounded-xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-200 via-primary-400 to-primary-600 relative z-10">
                                <img src="https://img.icons8.com/3d-fluency/94/idea.png" alt="Idea icon by Icons8." className="w-full max-w-20 md:max-w-16" />
                            </div>
                            <p className="relative z-10">What if I just made a drag and drop grid?</p>
                            <div className="absolute inset-0 w-full h-full">
                                <div className="bg-gradient-to-t absolute from-[#e1e1e1] from-40% to-transparent w-full h-full"></div>
                                <div className="bg-pattern one w-full h-full bg-contain"></div>
                            </div>
                        </div>
                    </div>
                );
            case "about":
                return (
                    <div key={item.id} {...commonProps} className={`col-span-6 sm:col-span-2 ${wrapperClassName}`}>
                        <div className="drag-handle cursor-move select-none absolute top-0 left-0 w-full h-8 z-20"></div>
                        <div className="flex flex-col gap-4">
                            <Link
                                href="https://www.linkedin.com/in/robertkso/"
                                className="flex flex-wrap gap-4 content-start bg-primary-500 relative py-4 px-12 border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden hover:bg-primary-800 transition-colors duration-300"
                            >
                                <div className="content w-full text-white text-center">
                                    <span className="font-bold">About</span>
                                </div>
                            </Link>
                            <Link
                                href="https://github.com/robester0403"
                                className="flex flex-wrap gap-4 content-start bg-neutral-300/20 relative py-4 px-12 border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden hover:bg-primary-800 hover:text-white transition-colors duration-300"
                            >
                                <div className="content w-full text-center">
                                    <span className="font-bold">Works</span>
                                </div>
                            </Link>
                            <Link
                                href="mailto:robkso@gmail.com"
                                className="flex flex-wrap gap-4 content-start bg-primary-500 relative py-4 px-12 border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden hover:bg-primary-800 transition-colors duration-300"
                            >
                                <div className="content w-full text-white text-center">
                                    <span className="font-bold">Contact</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                );
            case "logo":
                return (
                    <div key={item.id} {...commonProps} className={`col-span-6 sm:col-span-3 lg:col-span-2 ${wrapperClassName}`}>
                        <div className="drag-handle cursor-move select-none absolute top-0 left-0 w-full h-8 z-20"></div>
                        <div className="flex flex-wrap gap-4 h-full content-start bg-neutral-300/20 relative p-8 sm:p-12 border border-neutral-400/30 rounded-xl">
                            <div className="grid gap-12">
                                <a className="font-black text-2xl text-primary hover:text-primary-500 transition duration-500 flex items-center" href="/">
                                    <img src="/android-chrome-192x192.png" alt="Alt text" className="w-full h-auto sm:object-contain lg:object-cover" />
                                </a>
                                <div className="content grid gap-4">
                                    <h2 className="font-bold text-xl mb-0">Pretty cool title...</h2>
                                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "quote":
                return (
                    <div key={item.id} {...commonProps} className={`col-span-6 sm:col-span-3 lg:col-span-4 ${wrapperClassName}`}>
                        <div className="drag-handle cursor-move select-none absolute top-0 left-0 w-full h-8 z-20"></div>
                        <div className="flex flex-wrap h-full gap-4 content-start bg-neutral-300/20 relative p-8 sm:p-12 border border-neutral-400/30 rounded-xl">
                            <div className="content w-full h-full flex content-end flex-wrap">
                                <span className="text-xl md:text-2xl lg:text-3xl font-bold">
                                    Hence I created this style of portfolio, so I can drag and drop to my heart's content until the layout is just right.
                                </span>
                            </div>
                        </div>
                    </div>
                );
            case "banner1":
                return (
                    <div key={item.id} {...commonProps} className={`col-span-6 ${wrapperClassName}`}>
                        <div className="drag-handle cursor-move select-none absolute top-0 left-0 w-full h-8 z-20"></div>
                        <div className="flex flex-wrap gap-4 content-start bg-neutral-300/20 relative p-8 sm:p-12 border aspect-video md:aspect-[3/1] border-neutral-400/30 rounded-xl shadow-sm overflow-hidden">
                            <div className="image-container absolute flex w-full h-full inset-y-0 bottom-0 items-center right-0 flex-1 bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-primary-400 via-primary-800 to-primary-200">
                                <span className="block bg-pattern one"></span>
                            </div>
                        </div>
                    </div>
                );
            case "banner2":
                return (
                    <div key={item.id} {...commonProps} className={`col-span-6 ${wrapperClassName}`}>
                        <div className="drag-handle cursor-move select-none absolute top-0 left-0 w-full h-8 z-20"></div>
                        <div className="flex flex-wrap gap-4 content-start bg-neutral-300/20 relative p-8 sm:p-12 border sm:aspect-square md:aspect-auto lg:aspect-[3/1] border-neutral-400/30 rounded-xl shadow-sm overflow-hidden">
                            <div className="image-container flex w-full h-full items-center flex-1">
                                <div className="flex flex-wrap max-w-[512px] gap-8 relative z-10">
                                    <span className="block text-xl sm:text-3xl font-bold">Looking for an awesome group of people to work with.</span>
                                    <a href="#" className="block text-xl sm:text-3xl font-bold hover:underline hover:decoration-wavy text-primary-500 underline-offset-4">
                                        Let's Connect!
                                    </a>
                                </div>
                                <div className="absolute flex w-full h-full inset-y-0 right-0 max-w-96 left-40 sm:left-auto">
                                    <span className="bg-gradient-to-r absolute from-[#e1e1e1] to-transparent block w-full h-full"></span>
                                    <span className="block w-full object-contain bg-pattern one bg-contain"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className="wrap-md w-full wrap-px pt-4 mx-auto">
            <div className="grid grid-cols-6 gap-4">{renderedList.map((item, _) => renderGridItem(item))}</div>
        </section>
    );
}
