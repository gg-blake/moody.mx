'use client';
import { useRef, useEffect, useState } from 'react'

interface MovingBannerProps {
    children: string;
}

const bannerRotatingWords = [
    {transform: "translateX(0)"},
    {transform: "translateX(-100%)"},
]

const bannerRotatingWordsTiming = {
    duration: 20000,
    iterations: Infinity,
    easing: "linear"
}

function MovingBanner({children}: MovingBannerProps) {
    const bannerContainerRef = useRef<HTMLDivElement>(null);
    const bannerContentRef = useRef<HTMLDivElement>(null);
    const bannerContentSecondRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!bannerContainerRef.current || !bannerContentRef.current || !bannerContentSecondRef.current) return;
        const bannerContainer = bannerContainerRef.current;
        const bannerContent = bannerContentRef.current;
        const bannerContentSecond = bannerContentSecondRef.current;
        bannerContainer.style.width = `${bannerContent.offsetWidth}px`;
        bannerContainer.style.height = `${bannerContent.offsetHeight}px`;
        
        
        bannerContent.animate(bannerRotatingWords, bannerRotatingWordsTiming);
        bannerContentSecond.animate(bannerRotatingWords, bannerRotatingWordsTiming);
    }, [])


    return (
        <div ref={bannerContainerRef} className="relative w-[200px] h-[30px] overflow-clip shadow-md bg-inherit box-border">
            <div ref={bannerContentRef} className="absolute left-0 whitespace-nowrap">{children}</div>
            <div ref={bannerContentSecondRef} className="absolute left-full whitespace-nowrap">{children}</div>
        </div>
    )
}

interface MovingBannerResizeableProps {
    children: string;
    className?: string;
    length: number;
    count: number;
}

const ESTIMATED_TEXT_LENGTH = 280.267;

export function MovingBannerResizeable(props: MovingBannerResizeableProps) {
    return (
        <div className={`${props.className} flex flex-row overflow-x-clip`}>
            {[...Array(props.count)].map((_, i) => (<MovingBanner key={`moving-banner-${i}`}>{props.children}</MovingBanner>))}
        </div>
    )
}

interface Size {
    width: number;
    height: number;
}

export default function Banner() {
    
    const [windowDimensions, setWindowDimensions] = useState<Size>({width: 0, height: 0});

    useEffect(() => {
        setWindowDimensions({width: document.body.clientWidth, height: document.body.clientHeight});
        /*window.addEventListener('resize', () => {
            if (window.scrollY > window.innerHeight) return;
            location.reload();
        })*/
       console.log(windowDimensions);
    }, [])

    return (
        <div className="w-full h-full absolute top-0 left-0 overflow-clip leading-snug font-mono text-primary-50">
            <MovingBannerResizeable className="absolute text-[9px] bg-primary-950 origin-bottom bottom-0 bg-black" length={windowDimensions.width} count={Math.ceil(windowDimensions.width / ESTIMATED_TEXT_LENGTH)}>This website was meticulously designed and developed by me. To learn more about the technologies and programs used in the project, take a minute to check out my Github.</MovingBannerResizeable>
            <MovingBannerResizeable className="top-0 absolute text-[9px] bg-primary-950 origin-center rotate-180 bg-black" length={windowDimensions.width} count={Math.ceil(windowDimensions.width / ESTIMATED_TEXT_LENGTH)}>This website was meticulously designed and developed by me. To learn more about the technologies and programs used in the project, take a minute to check out my Github.</MovingBannerResizeable>
            <MovingBannerResizeable className="absolute text-[9px] bg-primary-950 origin-bottom-left rotate-90 translate-y-[-16px] bg-black" length={windowDimensions.height} count={Math.ceil(windowDimensions.height / ESTIMATED_TEXT_LENGTH)}>This website was meticulously designed and developed by me. To learn more about the technologies and programs used in the project, take a minute to check out my Github.</MovingBannerResizeable>
            <MovingBannerResizeable className="right-0 absolute text-[9px] bg-primary-950 origin-top-right rotate-[-90deg] translate-x-[-12px] bg-black" length={windowDimensions.height} count={Math.ceil(windowDimensions.height / ESTIMATED_TEXT_LENGTH)}>This website was meticulously designed and developed by me. To learn more about the technologies and programs used in the project, take a minute to check out my Github.</MovingBannerResizeable>
            <div className="w-[calc(100%_-_24px)] h-[calc(100%_-_24px)] absolute left-[12px] top-[12px] border-[1px] border-primary-50"></div>
            <div className="w-full h-full absolute left-0 top-0 border-b-[1px] border-primary-50"></div>
        </div>
    )
}