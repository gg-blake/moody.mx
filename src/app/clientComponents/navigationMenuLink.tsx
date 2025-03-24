import {
    NavigationMenuLink as GenericNavigationMenuLink
} from "@/components/ui/navigation-menu";
import { Link } from 'lucide-react';

export default function NavigationMenuLink({ children, href }: { children: string, href: string }) {
    return (
        <GenericNavigationMenuLink className="group text-primary bg-secondary hover:bg-primary hover:text-secondary text-sm font-light rounded-none border-1 shadow-lg p-3 m-0 border-primary" href={href}>
            <span className="flex items-center w-auto gap-3">
                <Link className="stroke-primary group-hover:stroke-secondary w-auto h-full" />
                { children }
            </span>
        </GenericNavigationMenuLink>
    )
}