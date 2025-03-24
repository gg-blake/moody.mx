"use client"
import {
    NavigationMenu as GenericNavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import NavigationMenuLink from "./navigationMenuLink";
import { useEffect, useRef } from "react";

export default function NavigationMenu() {
    const isMounted = useRef<boolean>(false);
    const navRef = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        if (isMounted.current) return;

        

        document.addEventListener("scroll", (event) => {
            if (window.scrollY > window.innerHeight) {
                navRef.current.style.opacity = "100%";
                navRef.current.style.display = "flex";
                return
            }

            navRef.current.style.opacity = "0%";
            navRef.current.style.display = "none";

        });
        isMounted.current = true;
    }, [])

    return (
        <GenericNavigationMenu ref={navRef} className="sticky top-0 z-[99999] bg-transparent p-3 flex flex-row gap-3">
            <NavigationMenuLink href="#timeline">Timeline</NavigationMenuLink>
            <NavigationMenuLink href="#projects">Projects</NavigationMenuLink>
            <NavigationMenuLink href="#photos">Photos</NavigationMenuLink>
        </GenericNavigationMenu>
    )
}