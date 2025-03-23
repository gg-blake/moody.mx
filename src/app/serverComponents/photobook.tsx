import { useEffect, useState, use } from "react";
import EXIF from "exif-js";
import Heading from "../clientComponents/heading";
import { ImageResponse } from "next/server";
import Image from 'next/image';
import Carousel from "../clientComponents/carousel";
import PhotoEntry from "./photoEntry";
import { PhotosResponse, Photo } from "@/lib/types";








export default async function Photobook() {
    const folderId = process.env.NEXT_PUBLIC_SHARED_FOLDER_ID; // Retrieve the folder ID from the query parameter
    const apiKey = process.env.NEXT_PUBLIC_GCP_API_KEY; // Use your environment variable for the Google API key
    
    // Google Drive API endpoint to list files within a folder
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        cache: "no-store"
    };
    
    // @ts-ignore
    const response = await fetch(`https://www.googleapis.com/drive/v2/files?q='${folderId}' in parents&key=${apiKey}`, requestOptions);
    const result: PhotosResponse = await response.json();

    return (
        <div id="photos" className="flex flex-col gap-3 w-screen h-[50vh]">
            <Carousel heading="Photos">
                {result.items && result.items.map((photo: Photo, index: number) => <PhotoEntry key={index} photo={photo} />)}
            </Carousel>
        </div>
    )
}