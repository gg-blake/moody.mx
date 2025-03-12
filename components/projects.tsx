"use client"
import { useEffect, useState, useRef, Dispatch, SetStateAction, createContext, useContext, use } from 'react';
import GlitchTitle from './glitch_text';
import { MovingBannerResizeable } from './moving_banner';
import ColorBlendButton from './colorblendbutton';
import { Inter } from "next/font/google";
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkBreaks from 'remark-breaks';
import ReactMarkdown from "react-markdown";
import plusJakartaSans from '../styles/fonts';
import style from '../styles/markdown-styles.module.css';
import 'highlight.js/styles/github-dark.css';

const inter = Inter({ subsets: ["latin"] });

import { Badge } from "@/components/ui/badge"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"




const EXAMPLEPROJECT2: ProjectEntry[] = [
    {
        date: "June",
        title: "Minesweeper",
        desc: "Created a minesweeper clone using the Python GUI library Pygame. Implemented a recursive floodfill algorithm to reveal all adjacent tiles when a tile with no adjacent mines is clicked. Redesigned game assets in Photoshop to create a more modern look.",
        href: "https://github.com/gg-blake/snake-ml",
        location: "Home, Swampscott, MA",
        tags: ["Python", "Pygame", "Game Development", "Algorithms", "Game Design"]
    },
    {
        date: "August",
        title: "Raspberry Pi Multipurpose Server",
        desc: "Set up a Rasperry Pi to run a multipurpose server. The server was used to host my old web portfolio. The server supported services for SSH, VPN, FTP, HTTP/S, and eventually Email.",
        href: "https://github.com/gg-blake/snake-ml",
        location: "Home, Swampscott, MA",
        tags: ["Networking", "Python", "Linux", "Ubuntu", "PHP", "HTML", "CSS", "JavaScript"]
    },
    {
        date: "June",
        title: "MBTA Train Tracker",
        desc: "Using the MBTA Rest API, create a website that displayed train information such as arrival times, delays, and station closures. Was also the first project where I used TypeScript. The project was a success and was used by many of my friends and family to track times.",
        href: "https://github.com/gg-blake/mbta-live-next",
        location: "Home, Swampscott, MA",
        tags: ["TypeScript", "Firefox", "RESTful APIs", "React", "NextJS", "PyTorch"]
    },
    {
        date: "December",
        title: "Music Transfer Tool",
        desc: "Using React, a popular JavaScript framework for developing responsive, scaleable, user interfaces, I created a web tool for access music files from my home web server. This was the first time I had developed an application for my remote web server completely remotely, while I was at university. The application ran on a NodeJS server and used SFTP for secure file transfer and streaming.",
        href: "https://github.com/gg-blake/music-transfer",
        location: "UMass Boston, 240 William T. Morrissey Blvd.",
        tags: ["TypeScript", "NextJS", "React", "SFTP", "NAS", "SSH", "NodeJS"]
    },
    {
        date: "December",
        title: "Minesweeper V2",
        desc: "To improve my skills in low-level languages, I recreated my earlier python Minesweeper clone in Rust. The game had a similar GUI to the original, but was much faster.",
        href: "https://github.com/gg-blake/rust-minesweeper",
        location: "UMass Boston, 240 William T. Morrissey Blvd.",
        tags: ["Rust", "Low-level Language", "Game Development", "Memory Management", "Game Design", "GTK"]
    },
    {
        date: "February",
        title: "Snake AI",
        desc: "Created an PyTorch-like machine-learning library using Python. Used the library to implement input and control nodes for a snake game. Tested and refined a genetic-learning algorithm to improve the snakes performance generation after generation. Created functionality for saving checkpoints of generations and their brain-states for portability.",
        href: "https://github.com/gg-blake/snake-ml",
        location: "UMass Boston, 240 William T. Morrissey Blvd.",
        tags: ["Python", "PyTorch", "Machine Learning", "Genetic Algorithm", "Python", "PyTorch", "Machine Learning", "Genetic Algorithm"]
    },
    {
        date: "May",
        title: "CSClub Website",
        desc: "",
        href: "https://github.com/gg-blake/CS-Club-Website",
        location: "UMass Boston, 240 William T. Morrissey Blvd.",
        tags: ["NextJS", "TypeScript", "React", "TailwindCSS", "HTMX", "Professionalism", "Portfolio", "Web Design"],
        commitAPIUrl: "https://api.github.com/repos/gg-blake/CS-Club-Website/commits"
    },
    {
        date: "August",
        title: "Web Portfolio",
        desc: "This is it! What do you think? I created this website using NextJS, a React framework for server-side rendering. I used TypeScript to write the code, and TailwindCSS for styling. This website once it is completed will eventually be hosted on my server back home with a custom domain name.",
        href: "https://github.com/gg-blake/portfolio",
        location: "Soka University, 1 Chome-236 Tangimachi, Hachioji, Tokyo, JP",
        tags: ["NextJS", "TypeScript", "React", "TailwindCSS", "HTMX", "Professionalism", "Portfolio", "Web Design"]
    },
]

const EXAMPLEPROJECT = [
    {
        year: "2021",
        content: [
            {
                date: "June",
                title: "Minesweeper",
                desc: "Created a minesweeper clone using the Python GUI library Pygame. Implemented a recursive floodfill algorithm to reveal all adjacent tiles when a tile with no adjacent mines is clicked. Redesigned game assets in Photoshop to create a more modern look.",
                href: "https://github.com/gg-blake/snake-ml",
                location: "Home, Swampscott, MA",
                tags: [, "Python", "Pygame", "Game Development", "Algorithms", "Game Design"]
            },
            {
                date: "August",
                title: "Raspberry Pi Multipurpose Server",
                desc: "Set up a Rasperry Pi to run a multipurpose server. The server was used to host my old web portfolio. The server supported services for SSH, VPN, FTP, HTTP/S, and eventually Email.",
                href: "https://github.com/gg-blake/snake-ml",
                location: "Home, Swampscott, MA",
                tags: [, "Networking", "Python", "Linux", "Ubuntu", "PHP", "HTML", "CSS", "JavaScript"]
            }
        ]
    },
    {
        year: "2022",
        content: [


        ]
    },
    {
        year: "2023",
        content: [

        ]
    },

];


interface ProjectEntry {
    date: string;
    title: string;
    desc: string;
    href: string;
    location: string;
    tags: string[];
    commitAPIUrl?: string;
}

function ProjectItem({ date, title, desc, href, location, tags }: ProjectEntry) {
    return (
        <div className='w-[400px] overflow-y-auto overflow-x-clip h-full border-[1px] box-border relative border-primary-50'>
            <div className="w-full h-[10px] bg-primary-50"></div>
            <div className='p-3'>
                <h2 className="p-0 m-0 text-[40px] leading-none">{title}</h2>
                <span className="text-[.7rem] flex flex-row flex-wrap gap-y-3 gap-x-[3px] mt-3">
                    <span className="flex flex-row gap-[3px] items-center">
                        <svg className="fill-primary-50" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M212.309-100.001q-30.308 0-51.308-21t-21-51.308v-535.382q0-30.308 21-51.308t51.308-21h55.385v-84.615h61.537v84.615h303.076v-84.615h59.999v84.615h55.385q30.308 0 51.308 21t21 51.308v535.382q0 30.308-21 51.308t-51.308 21H212.309Zm0-59.999h535.382q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463v-375.382H200v375.382q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846Z" /></svg>

                        <h3 className="p-0 m-0">{date}</h3>
                        <span className="flex flex-row items-center gap-[3px] truncate">
                            <svg className="fill-primary-50" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480.068-485.385q29.855 0 51.047-21.26 21.192-21.26 21.192-51.115t-21.26-51.047q-21.26-21.192-51.115-21.192t-51.047 21.26q-21.192 21.26-21.192 51.115t21.26 51.047q21.26 21.192 51.115 21.192ZM480-179.461q117.384-105.076 179.654-201.577 62.269-96.5 62.269-169.039 0-109.384-69.5-179.846T480-800.385q-102.923 0-172.423 70.462t-69.5 179.846q0 72.539 62.269 169.039Q362.616-284.537 480-179.461Zm0 79.844Q329.001-230.463 253.539-343.154q-75.461-112.692-75.461-206.923 0-138.46 89.577-224.191Q357.231-859.999 480-859.999t212.345 85.731q89.577 85.731 89.577 224.191 0 94.231-75.461 206.923Q630.999-230.463 480-99.617Zm0-458.075Z" /></svg>
                            <h3 className="p-0 m-0  grow">{location}</h3>
                        </span>
                    </span>
                    <span className='flex flex-wrap text-[.6rem] gap-1'>{
                        tags.map((tag, i) => <span key={`project-tag-${i}`} className="border-[1px] border-primary-50 rounded-sm px-[3px] leading-none py-[2px]">{tag}</span>)
                    }</span>
                </span>
                <div className="p-0 mt-3 text-[15px]">{desc}</div>
                <ColorBlendButton className="absolute inline-block animate-pulse hover:animate-none" href={href}>View Project</ColorBlendButton>
            </div>
            {title === "Web Portfolio" && <MovingBannerResizeable className="absolute text-[9px] bg-primary-50 text-primary-950 font-mono rotate-[15deg] origin-top-left top-[150px]" length={110} count={7}>In progress!</MovingBannerResizeable>}
            {title === "Web Portfolio" && <MovingBannerResizeable className="absolute text-[9px] bg-primary-50 text-primary-950 font-mono rotate-[-32deg] origin-bottom-left top-[320px] border-primary-950 border-[1px]" length={110} count={8}>In progress!</MovingBannerResizeable>}
        </div>
    )
}



function YearContainer({ children, year, order, length }: { children?: any, year: string, order: number, length: number }) {
    const [focus, setFocus] = useState(false);
    const thisRef = useRef(null);

    return (
        <>
            <div id={`project-year-${year}`} ref={thisRef} className="flex flex-col h-[500px] bg-primary-950 box-border w-full border-[1px] overflow-y-clip border-primary-50 p-3 transition-[height] duration-500 gap-y-3">
                <h1 className="p-0 m-0 hover:underline active:no-underline text-[15px] h-auto font-semibold w-full">{year}</h1>
                <div className="flex relative grow gap-3 overflow-x-scroll">
                    <div className="w-auto h-full flex flex-row-reverse gap-3">{children}</div>

                </div>
            </div>
        </>
    )
}


const fetchProjectEntries: Promise<any[]> = new Promise((resolve, reject) => {
    fetch('http://www.moody.mx/api/projects')
        .then((response) => response.json())
        .then(result => resolve(result))
        .catch(err => reject(err))
})

function ProjectEntry({ entry }: { entry: any }) {
    const [s, setS] = useState([Math.floor(Math.random() * 20), Math.floor(Math.random() * 80)])
    const elementRef = useRef<HTMLDivElement>(null!);
    const [windowDimensions, setWindowDimensions] = useState<{width: number, height: number}>({width: 0, height: 0});

    useEffect(() => {
        if (!elementRef.current) return;
        setWindowDimensions({width: elementRef.current.offsetWidth, height: elementRef.current.offsetHeight});
    }, [])

    return (
        <Card className='group bg-transparent text-white h-full rounded-none flex flex-col overflow-hidden'>
            <CardHeader className='pb-3'>
                <CardTitle className="text-3xl font-light">{entry.name}</CardTitle>
                <div>
                    {entry.topics.map((topic: string, index: number) => 
                    <Badge key={index} variant="outline" className='text-white m-1 text-[10px] rounded-none inline-block'>{topic}</Badge>
                )}</div>
                
            </CardHeader>
            <CardContent >
                <CardDescription>
                    {entry.description}
                </CardDescription>
            </CardContent>
            <CardFooter className='flex flex-col items-start px-0 gap-0'>
                
                <CardContent className='flex flex-row gap-3'>
                <a href={entry.html_url}>{entry.name}.git</a>
                <Separator orientation='vertical' className='opacity-50' />
                <Drawer>
                    
                    <DrawerTrigger className="rounded-none">
                        <a>README.md</a>
                    </DrawerTrigger>
                    <DrawerContent className="h-5/6 border-white border-1 rounded-none bg-black z-10000">
                        <DrawerDescription className='flex w-full max-h-full overflow-y-auto z-[10000] flex-col'>
                            <Card className='p-3 inherit rounded-none border-none text-white bg-transparent col-span-2 flex-grow w-full'>
                                <CardHeader className={`p-3 ${plusJakartaSans.className}`}>
                                    <GlitchTitle className='absolute'>{entry.name}</GlitchTitle>
                                    <a className="ml-[2px]" href={entry.html_url}>Go to this repo →</a>
                                    <div>
                                        <Badge variant="outline" className='text-neutral-600 border-neutral-600 m-1 rounded-none'>Created at {new Date(entry.created_at).toLocaleDateString().replaceAll("/", ".")}</Badge>
                                        <Badge variant="outline" className='text-neutral-600 border-neutral-600 m-1 rounded-none'>Updated at {new Date(entry.updated_at).toLocaleDateString().replaceAll("/", ".")}</Badge>
                                        <Badge variant="outline" className='text-neutral-600 border-neutral-600 m-1 rounded-none'>Created at {new Date(entry.pushed_at).toLocaleDateString().replaceAll("/", ".")}</Badge>
                                        {entry.topics.map((topic: string, index: number) => 
                                        <Badge key={index} variant="outline" className='text-white m-1 rounded-none'>{topic}</Badge>
                                    )}</div>
                                </CardHeader>
                                <div className={`text-lg font-light text-wrap px-3 ${plusJakartaSans.className}`}>
                                    <ReactMarkdown 
                                        remarkPlugins={[remarkGfm, remarkBreaks]}
                                        rehypePlugins={[rehypeHighlight]}
                                        >{entry.description_md}</ReactMarkdown>
                                </div>
                            </Card>
                        </DrawerDescription>
                    </DrawerContent>
                </Drawer>
                </CardContent>
                <CardContent className='text-[10px] text-neutral-600 flex flex-row justify-between w-full flex-grow h-full'>
                    
                </CardContent>
            </CardFooter>
            
        </Card>
    )
}

export default function FeaturedProjects() {
    
    const projects = use(fetchProjectEntries);

    return (
        <div className='p-3 flex flex-col gap-y-3 h-screen'>
            <GlitchTitle className='border-white border-1 p-3 text-wrap'>Featured Projects</GlitchTitle>
            <div className='font-inherit w-screen px-12 flex flex-col h-auto'>
                <Carousel orientation='horizontal' className="relative flex w-[calc(100%-24px)] gap-3  box-border h-full">
                    <CarouselContent className="-ml-1 h-full">
                        {projects
                        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
                        .map((entry: any, index: number) =>
                            <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/3">
                                <ProjectEntry entry={entry} />
                            </CarouselItem>
                        )}
                    </CarouselContent>
                    <CarouselPrevious className='bg-transparent rounded-none h-full' />
                    <CarouselNext className='bg-transparent rounded-none h-full' />
                </Carousel>
            </div>
        </div>
    )
}