import { useEffect, useState, useRef, Dispatch, SetStateAction, createContext, useContext, use } from 'react';
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
} from "@/components/ui/drawer"



interface ProjectEntry {
    date: string;
    title: string;
    desc: string;
    href: string;
    location: string;
    tags: string[];
    commitAPIUrl?: string;
}

function DrawerTrigger({ project }: { project: Project }) {
    return (
        <GenericDrawerTrigger className="rounded-none flex text-blue-400 text-left flex-col">
            <CardTitle className="text-3xl font-light text-left"><a>{project.name}</a></CardTitle>
            <span className='-ml-1 mt-3'>
            {project.topics.map((topic: string, index: number) =>
                <Badge key={index} variant="outline" className='text-white mx-1 text-[10px] rounded-none inline-block'>{topic}</Badge>
            )}
            </span>
            <CardDescription>
                {project.description}
            </CardDescription>
        </GenericDrawerTrigger>
    )
}

function ProjectEntry({ project }: { project: Project }) {
    return (
        <Card className='group bg-transparent text-white h-full rounded-none flex flex-col overflow-hidden'>
            <CardContent className="py-3">
                <Drawer>
                    <DrawerTrigger project={project} />
                    <DrawerContent className="h-5/6 border-white border-1 rounded-none bg-black z-10000">
                        <DrawerDescription className='flex w-full max-h-full overflow-y-auto z-[10000] flex-col'>
                            <Card className='p-3 inherit rounded-none border-none text-white bg-transparent col-span-2 flex-grow w-full'>
                                <CardHeader className={`p-3 ${plusJakartaSans.className}`}>
                                    <Heading className='absolute'>{project.name}</Heading>
                                    <a className="ml-[2px]" href={project.html_url}>Go to this repo →</a>
                                    <div>
                                        <Badge variant="outline" className='text-neutral-600 border-neutral-600 m-1 rounded-none'>Created at {new Date(project.created_at).toLocaleDateString().replaceAll("/", ".")}</Badge>
                                        <Badge variant="outline" className='text-neutral-600 border-neutral-600 m-1 rounded-none'>Updated at {new Date(project.updated_at).toLocaleDateString().replaceAll("/", ".")}</Badge>
                                        <Badge variant="outline" className='text-neutral-600 border-neutral-600 m-1 rounded-none'>Pushed at {new Date(project.pushed_at).toLocaleDateString().replaceAll("/", ".")}</Badge>
                                        {project.topics.map((topic: string, index: number) =>
                                            <Badge key={index} variant="outline" className='text-white m-1 rounded-none'>{topic}</Badge>
                                        )}</div>
                                </CardHeader>
                                <div className={`text-lg font-light text-wrap px-3 overflow-x-hidden ${plusJakartaSans.className}`}>
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
                                        rehypePlugins={[rehypeHighlight, rehypeKatex]}
                                    >{project.description_md}</ReactMarkdown>
                                </div>
                            </Card>
                        </DrawerDescription>
                    </DrawerContent>
                </Drawer>
            </CardContent>
            

        </Card>
    )
}



export default async function FeaturedProjects() {
    const octokit = new Octokit({
        auth: process.env.NEXT_PUBLIC_GITHUB_API_TOKEN,
        baseUrl: 'https://api.github.com',
    })

    //@ts-ignore
    const allStarredRepos = await octokit.rest.activity.listReposStarredByUser({
        username: "gg-blake",
        sort: "updated",
        direction: "desc"
    });

    //@ts-ignore
    const allStarredReposIOwn = allStarredRepos["data"].filter(val => val.owner.login === 'gg-blake')

    //@ts-ignore
    const projects: Project[] = await Promise.all(allStarredReposIOwn.map(async (repo) => {
        return await octokit.rest.repos.getContent({
            owner: 'gg-blake',
            //@ts-ignore
            repo: repo.name,
            path: "README.md",
        })
            .then(result => {
                // content will be base64 encoded
                //@ts-ignore
                const content = Buffer.from(result.data.content, 'base64').toString()
                return {
                    ...repo,
                    description_md: content
                }
            })
            .catch((error) => {
                if (error.status === 404) {
                    return ""
                }
                throw new Error("Internal Error")
            })
    }));


    return (
        <Carousel heading="Projects">
            {projects && projects
            .map((project: Project, index: number) => <ProjectEntry key={index} project={project} />
            )}
        </Carousel>
    )
}