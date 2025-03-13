//@ts-nocheck
import { useEffect, useState, use } from "react";
import EXIF from "exif-js";
import Heading from "../clientComponents/heading";
import { ImageResponse } from "next/server";
import ImageFetcher from "./image-fetcher";
import Image from 'next/image';
import Carousel from "../clientComponents/carousel";


export default async function Photobook() {

    const folderId = process.env.NEXT_PUBLIC_SHARED_FOLDER_ID; // Retrieve the folder ID from the query parameter
    const apiKey = process.env.NEXT_PUBLIC_GCP_API_KEY; // Use your environment variable for the Google API key
    // Google Drive API endpoint to list files within a folder
    const endpoint = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents&key=${apiKey}`;

    const response = await fetch(endpoint);

    const data = await response.json();

    return (
        <div id="photos" className="flex flex-col gap-3">
            <Carousel heading="Photos">
                {data.files.map((image, index: number) => <Image className="border-1 border-white" key={index} src={`https://drive.google.com/uc?id=${image.id}&export`} alt={`photobook-${image.id}`}width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }} />)}
            </Carousel>
        </div>
    )
}