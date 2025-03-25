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
} from "@/components/ui/drawer"

import { ProjectExpandedView, ProjectMiniView } from '../clientComponents/projectEntry';

interface ProjectEntry {
    date: string;
    title: string;
    desc: string;
    href: string;
    location: string;
    tags: string[];
    commitAPIUrl?: string;
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
            .map((project: Project, index: number) => 
                <Drawer key={index}>
                    <ProjectMiniView project={project} />
                    <ProjectExpandedView project={project} />
                </Drawer>
            )}
        </Carousel>
    )
}