"use client"
import Heading from '../clientComponents/heading';
import { Inter } from "next/font/google";
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkBreaks from 'remark-breaks';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex'
import ReactMarkdown from "react-markdown";
import plusJakartaSans from '../../../styles/fonts';
import 'highlight.js/styles/github-dark.css';
import { Project } from '@/lib/types';
import { Octokit } from "@octokit/rest";
import Image from 'next/image';
import DrawerTrigger from '../clientComponents/drawerTrigger';

const inter = Inter({ subsets: ["latin"] });

import { Badge } from "@/components/ui/badge"
import Carousel from '../clientComponents/carousel';

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
    DrawerTitle,
    DrawerTrigger as GenericDrawerTrigger,
} from "@/components/ui/drawer";

import { useQRCode } from 'next-qrcode';

export function ProjectMiniView({ project }: { project: Project }) {
    const { SVG } = useQRCode();

    return (
        <div className="rounded-none border-primary border-1 border-b-0 pb-[0.5px] flex text-left flex-col justify-between h-full relative">
            <div className="absolute top-0 right-0 p-3 border-b-1 border-l-1 border-primary bg-secondary z-100 shadow-sm mix-blend-difference">
                <SVG
                    text={project.html_url}
                    options={{
                        margin: 0,
                        width: 30,
                        scale: 5,
                        color: {
                            dark: '#000000FF',
                            light: '#FFFFFFFF',
                        },
                    }}
                />
            </div>
            <div className='flex flex-col gap-3 text-left p-3'>
                <h1 className="text-3xl font-light text-left py-0 m-0">{project.name}</h1>
                <span className='-ml-1 py-0'>
                    {project.topics.map((topic: string, index: number) =>
                        <Badge key={index} variant="outline" className='text-primary mx-1 border-primary text-[10px] rounded-none inline-block my-0'>{topic}</Badge>
                    )}
                </span>
                <p className="my-0 -mt-1 text-wrap text-start">
                    {project.description}
                </p>
            </div>
            <DrawerTrigger className="border-b-1 mb-0" label="view project details" />
        </div>
    )
}

export function ProjectExpandedView({ project }: { project: Project }) {
    return (
        <DrawerContent style={{ borderRadius: "0px" }} className="h-5/6 border-primary border-t-1 bg-secondary">
            <DrawerDescription className='flex w-full max-h-full overflow-y-auto flex-col bg-transparent'>
                <Card className='p-3 inherit rounded-none border-none col-span-2 flex-grow w-full bg-transparent'>
                    <CardHeader className={`p-3`}>
                        <Heading className='absolute'>{project.name}</Heading>
                        <a className="ml-[2px]" href={project.html_url}>Go to this repo →</a>
                        <div>
                            <Badge variant="outline" className='opacity-50 border-primary m-1 rounded-none'>Created at {new Date(project.created_at).toLocaleDateString().replaceAll("/", ".")}</Badge>
                            <Badge variant="outline" className='opacity-50 border-primary m-1 rounded-none'>Updated at {new Date(project.updated_at).toLocaleDateString().replaceAll("/", ".")}</Badge>
                            <Badge variant="outline" className='opacity-50 border-primary m-1 rounded-none'>Pushed at {new Date(project.pushed_at).toLocaleDateString().replaceAll("/", ".")}</Badge>
                            {project.topics.map((topic: string, index: number) =>
                                <Badge key={index} variant="outline" className='m-1 rounded-none border-primary'>{topic}</Badge>
                            )}</div>
                    </CardHeader>
                    <div className={`text-lg font-light text-wrap px-3 overflow-x-hidden bg-secondary ${plusJakartaSans.className}`}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
                            rehypePlugins={[rehypeHighlight, rehypeKatex]}
                        >{project.description_md}</ReactMarkdown>
                    </div>
                </Card>
            </DrawerDescription>
        </DrawerContent>
    )
}