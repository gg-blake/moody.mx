import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerTitle,
    DrawerTrigger as GenericDrawerTrigger,
} from "@/components/ui/drawer";

import { ArrowUp } from "lucide-react";

export default function DrawerTrigger({ label }: { label?: string }) {
    return (
        <GenericDrawerTrigger className="group w-full py-3 border-primary border-t-1 border-b-1 flex flex-row justify-center items-center hover:bg-primary gap-3">
            <ArrowUp className="w-4 h-4 stroke-primary group-hover:stroke-secondary group-hover:rotate-90 transition-all" />
            <span className='hidden md:block text-sm font-light text-primary group-hover:text-secondary'>{label}</span>
        </GenericDrawerTrigger>
    )
}