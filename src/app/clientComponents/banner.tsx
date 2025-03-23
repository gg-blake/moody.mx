"use client"
import Marquee from "react-fast-marquee";

export default function Banner({ children }: { children: string}) {
    return (
        <div className='absolute top-0 left-0 w-screen h-[calc(100vh_+_1px)] bg-transparent text-xs font-mono border-b-1 border-primary'>
            <Marquee className="absolute origin-bottom-left left-0 translate-y-[-100%] bg-secondary border-t-1 border-primary" style={{ height: "auto", width: "100vh"}} direction="down" speed={5} autoFill={true}>
                <div className='rotate-90'>{children}</div>
            </Marquee>
            <Marquee className="absolute origin-bottom-right right-[calc(-100vw_+_100vh)] translate-y-[-200%] bg-secondary border-t-1 border-primary" style={{ height: "auto", width: "100vh", bottom: "0"}} direction="up" speed={5} autoFill={true}>
                <div className='-rotate-90'>{children}</div>
            </Marquee>
            <Marquee className="absolute top-0 translate-y-[-200%] bg-secondary border-b-1 border-primary" direction="left" speed={5} autoFill={true}>
                <div className="rotate-180">{children}</div>
            </Marquee>
            <Marquee className="absolute top-[100vh] translate-y-[-400%] bg-secondary border-t-1 border-primary" direction="right" speed={5} autoFill={true}>
                <div>{children}</div>
            </Marquee>
        </div>
    )
}