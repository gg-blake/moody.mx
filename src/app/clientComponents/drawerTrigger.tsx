import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerTitle,
    DrawerTrigger as GenericDrawerTrigger,
} from "@/components/ui/drawer";

import { Expand } from 'lucide-react';

export default function DrawerTrigger({ label, className, condenseForMobile = true }: { label?: string, className?: string, condenseForMobile?: boolean }) {
    return (
        <GenericDrawerTrigger className={`group w-full py-3 border-primary bg-secondary border-t-1 flex flex-row justify-center items-center hover:bg-primary gap-3 ${className}`}>
            <Expand className="w-4 h-4 stroke-primary group-hover:stroke-secondary group-hover:scale-130 group-hover:stroke-2 transition-all" />
            <span className={`text-xs md:text-sm font-light text-primary group-hover:text-secondary ${condenseForMobile == true ? "hidden md:block" : ""}`}>{label}</span>
        </GenericDrawerTrigger>
    )
}