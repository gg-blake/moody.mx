
import { useEffect, useState } from "react"
import ColorBlendButton from "./colorblendbutton";
import { ColorPicker, ColorPickerCompact } from './colorpicker';

export default function NavBar({ids}: {ids: string[]}) {
    const [visible, setVisible] = useState(false);
    const [isCompact, setIsCompact] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > window.innerHeight) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        })
        if (window.innerWidth < 768) {
            setIsCompact(true);
        } else {
            setIsCompact(false);
        }
    }, [])

    return (
        <div id="navbar" style={{visibility: visible ? "visible" : "hidden"}} className=" w-screen h-auto text-xs xs:text-base sm:justify-start opacity-1 overflow-x-visible p-3 flex flex-row gap-3 z-999 fixed top-0 border-b-[1px] border-primary-50 bg-primary-950 transition-opacity">
            {ids.map((id: string, i: number) => <ColorBlendButton key={`navbar-colorblendbutton-${i}`} className="relative translate-y-3" href={"#"+id}>{id}</ColorBlendButton>)}
            <ColorPicker className="bg-primary-950 shadow-md" />
        </div>
    )
}