"use client"

import { Photo, ImageMediaMetadata } from "@/lib/types";
import { ReactNode, Suspense, useEffect, useState, useRef } from 'react';
import * as THREE from 'three'
import { Skeleton } from "@/components/ui/skeleton";
import plusJakartaSans from '../../../styles/fonts';
import Image from 'next/image';
import React from 'react';
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, Html, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Dialog } from "radix-ui";
import { useGLTF, shaderMaterial } from '@react-three/drei';
import '../globals.css';

import {
    Drawer,
    DrawerClose,
    DrawerContent as GenericDrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { metadata } from "../layout";

function LoadingImage() {
    return (
        <div className="w-screen max-w-full h-[50vh] flex flex-col gap-3 h-full min-h-[200px] absolute top-0">
            <Skeleton className="h-full w-full flex-grow rounded-none" />
            <Skeleton className="h-[40px] w-full flex-grow rounded-none" />
        </div>
    )
}

function PhotoMetadataMiniView({ metadata }: { metadata: ImageMediaMetadata }) {
    return (
        <span className="flex flex-wrap w-full h-auto text-[.6rem] font-normal gap-3">
            <svg className="fill-white inline-block" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"><path d="M480-275.386q68.846 0 116.73-47.884T644.614-440q0-68.846-47.884-116.73T480-604.614q-68.846 0-116.73 47.884T315.386-440q0 68.846 47.884 116.73T480-275.386Zm0-59.998q-44.308 0-74.462-30.154-30.154-30.154-30.154-74.462 0-44.308 30.154-74.462 30.154-30.154 74.462-30.154 44.308 0 74.462 30.154 30.154 30.154 30.154 74.462 0 44.308-30.154 74.462-30.154 30.154-74.462 30.154ZM172.309-140.001q-30.308 0-51.308-21t-21-51.308v-455.382q0-30.308 21-51.308t51.308-21h122.153l74-80h223.076l74 80h122.153q30.308 0 51.308 21t21 51.308v455.382q0 30.308-21 51.308t-51.308 21H172.309Z"/></svg>
            {metadata.cameraMake + " " + metadata.cameraModel || "Unknown"}
            <svg className="fill-white inline-block" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"><path d="M212.309-140.001q-30.308 0-51.308-21t-21-51.308V-360H200v147.691q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846H360v59.999H212.309Zm387.691 0V-200h147.691q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463V-360h59.999v147.691q0 30.308-21 51.308t-51.308 21H600ZM140.001-600v-147.691q0-30.308 21-51.308t51.308-21H360V-760H212.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463V-600h-59.999ZM760-600v-147.691q0-4.616-3.846-8.463-3.847-3.846-8.463-3.846H600v-59.999h147.691q30.308 0 51.308 21t21 51.308V-600H760Z"/></svg>
            {metadata && `${metadata.width} x ${metadata.height}`}
            <span className="flex flex-wrap gap-3 items-center">
                <svg className="fill-white inline-block" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"><path d="M447.615-613.845 582.23-845.768q86 22.462 154 84.923t98.846 147H447.615Zm-101.384 96.538L213.463-750.384q52.461-51.461 120.691-80.538Q402.385-859.999 480-859.999q14.154 0 32.5 1.693 18.346 1.692 30.423 3.692L346.231-517.307ZM112.232-385.385q-6-24.769-9.115-48.038-3.116-23.27-3.116-46.577 0-67.154 22.231-127.846 22.231-60.692 63.846-112.307l192.769 334.768H112.232Zm268.076 271.922q-88.307-23.231-157.384-86.077-69.077-62.846-98.384-147.769h389.537L380.308-113.463ZM480-100.001q-15 0-31.462-2-16.461-2-28.923-4l195.692-334.384 131.615 230.384q-52.077 51.461-120.692 80.73-68.615 29.27-146.23 29.27Zm293.922-139.846L581.153-575.384h266.615q5.615 23.615 8.923 47.653 3.308 24.039 3.308 47.731 0 67.307-22.962 128.23-22.961 60.923-63.115 111.923Z"/></svg>
                {`${metadata.exposureTime}s` || "Unknown"}
                <div className="w-[4px] h-[4px] rounded-full bg-white" />
                <span>
                    <span className="font-serif italic inline-block font-thin pt-0">f&nbsp;</span>
                    {`${metadata.aperture}` || "Unknown"}
                </span>
                <div className="w-[4px] h-[4px] rounded-full bg-white" />
                <span>{`${metadata.focalLength}mm` || "Unknown"}</span>
                <div className="w-[4px] h-[4px] rounded-full bg-white" />
                <span>{`ISO${metadata.isoSpeed}` || "Unknown"}</span>
            </span>
        </span>
    )
}

const ColorShiftMaterial = shaderMaterial(
    { time: 0, color: new THREE.Color(0.2, 0.0, 0.1) },
    // vertex shader
    /*glsl*/`
      varying vec2 vUv;
      varying vec4 _pos;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        _pos = gl_Position;
      }
    `,
    // fragment shader
    /*glsl*/`
      uniform float time;
      
      varying vec2 vUv;

      varying vec4 _pos;

      void main() {
        float f  = fract (_pos.y * 25.0);
        float df = fwidth(_pos.z * 10.0);

        float g = smoothstep(df * 1.0, df * 3.0, f);

        float c = g;

        gl_FragColor = vec4((1.0 - c) * 0.5, (1.0 - c) * 0.5, (1.0 - c) * 0.5, 1.0);
      }
    `
)

// declaratively
extend({ ColorShiftMaterial })

const Model = () => {
    const gltf = useGLTF("/a7.glb");
    const matRef = useRef<THREE.Mesh>(null!)

    useFrame(({ clock }) =>{
        if(matRef.current) {
            matRef.current.rotation.x = Math.PI / 2;
            matRef.current.rotation.z += 0.0025;
        }
    })

    // @ts-ignore
    return (<><mesh ref={matRef} geometry={gltf.meshes.model_2.geometry} scale={0.002} position={[0, -2, 0]}><colorShiftMaterial time={1} /></mesh></>
        
    );
};

function PhotoMetadataExpandedView({ metadata }: { metadata: ImageMediaMetadata & { fileSize: number, fileExtension: string } }) {
    

    const Entry = ({title, value, children}: {title: string, value: number | string, children?: ReactNode}) => {
        return (
            <div className="w-auto flex flex-row p-1 gap-3 items-center justify-center">
                {children}
                {title}
                {title != ""  && <span className="w-[10px] h-[10px] rounded-full bg-white scale-[50%]"></span>}
                {value}
            </div>
        )
    }

    return (
        <Card className="w-full h-full bg-black border-none relative">
            <DrawerTitle className="hidden">
                Hello
            </DrawerTitle>
            <div className="grid grid-rows-2 h-full relative">
                <CardContent className="flex flex-col text-center lg:items-end text-white bg-transparent font-light">
                    <Entry title="" value={ metadata.date?.replace(":", "/").replace(":", "/") || "unknown"}>
                        <Image src="/date.svg" alt="date.svg" width={15} height={15} />
                    </Entry>
                    <Entry title="" value={(metadata.width || "unknown") + " x " + (metadata.height || "unknown")}>
                        <Image src="/dimensions.svg" alt="dimensions.svg" width={15} height={15} />
                    </Entry>
                    <Entry title="" value={(metadata.cameraMake || "unknown") + " " + (metadata.cameraModel || "unknown")}>
                        <Image src="/camera_model.svg" alt="camera_model.svg" width={15} height={15} />
                    </Entry>
                    <Entry title="aperture" value={"f/" + metadata.aperture || "unknown"}>
                        <Image src="/aperture.svg" alt="aperture.svg" width={15} height={15} />
                    </Entry>
                    <Entry title="shutter speed" value={metadata.exposureTime + "s" || "unknown"}>
                        <Image src="/shutter_speed.svg" alt="shutter_speed.svg" width={15} height={15} />
                    </Entry>
                    <Entry title="" value={metadata.whiteBalance || "unknown"}>
                        <div className="bg-white border-1 border-black text-black text-[10px] px-1 leading-0.5 font-bold">ISO</div>
                    </Entry>
                    <Entry title="focal length" value={metadata.focalLength + "mm" || "unknown"}>
                        <svg className="fill-white inline-block" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"><path d="M447.615-613.845 582.23-845.768q86 22.462 154 84.923t98.846 147H447.615Zm-101.384 96.538L213.463-750.384q52.461-51.461 120.691-80.538Q402.385-859.999 480-859.999q14.154 0 32.5 1.693 18.346 1.692 30.423 3.692L346.231-517.307ZM112.232-385.385q-6-24.769-9.115-48.038-3.116-23.27-3.116-46.577 0-67.154 22.231-127.846 22.231-60.692 63.846-112.307l192.769 334.768H112.232Zm268.076 271.922q-88.307-23.231-157.384-86.077-69.077-62.846-98.384-147.769h389.537L380.308-113.463ZM480-100.001q-15 0-31.462-2-16.461-2-28.923-4l195.692-334.384 131.615 230.384q-52.077 51.461-120.692 80.73-68.615 29.27-146.23 29.27Zm293.922-139.846L581.153-575.384h266.615q5.615 23.615 8.923 47.653 3.308 24.039 3.308 47.731 0 67.307-22.962 128.23-22.961 60.923-63.115 111.923Z"/></svg>
                    </Entry>
                    <Entry title="white balance" value={metadata.whiteBalance || "unknown"}>
                        <Image src="/white_balance.svg" alt="white_balance.svg" width={15} height={15} />
                    </Entry>
                    <Entry title="exposure mode" value={metadata.exposureMode || "unknown"}>
                        <Image src="/white_balance.svg" alt="white_balance.svg" width={15} height={15} />
                    </Entry>
                    
                    <Entry title="color space" value={ metadata.colorSpace || "unknown"}>
                        <Image src="/color_space.svg" alt="color_space.svg" width={15} height={15} />
                    </Entry>
                    <Entry title="file type" value={ metadata.fileExtension || "unknown"}>
                        <Image src="/file_extension.svg" alt="file_extension.svg" width={15} height={15} />
                    </Entry>
                    <Entry title="size" value={ Math.trunc(metadata.fileSize / 10000) / 100 + "MB" || "unknown"}>
                        <Image src="/file_size.svg" alt="file_size.svg" width={15} height={15} />
                    </Entry>
                    
                </CardContent>
                <div className="w-full">
                    <Canvas>
                        <ambientLight intensity={Math.PI / 2} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                        <Model />
                    </Canvas>
                </div>
                
            </div>
        </Card>
    )
}

function PhotoExpandedView({ photo }: { photo: Photo }) {
    const [windowDim, setWindowDim] = useState<{width: number, height: number}>({width: 0, height: 0});
    
    useEffect(() => {
        setWindowDim({width: window.innerWidth, height: window.innerHeight});
    }, [])

    return (
        <GenericDrawerContent className="h-5/6 w-full bg-black">
            <div className="flex flex-col lg:flex-row-reverse overflow-y-scroll mt-3 lg:h-full ">
                <Image src={photo.webContentLink} alt={`photobook-${photo.webContentLink}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{width: windowDim.width < 1024 ? "100%" : "auto", height: windowDim.width < 1024 ? "auto" : "100%"}}
                    />
                <PhotoMetadataExpandedView metadata={{
                    ...photo.imageMediaMetadata,
                    fileSize: photo.fileSize as unknown as number,
                    fileExtension: photo.fileExtension
                }} />
            </div>
        </GenericDrawerContent>
    )
}

function PhotoMiniView({ photo }: { photo: Photo }) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <DrawerTrigger>
            <div className="border-1 border-white flex flex-col">
                <Image className="border-1 border-white transition-all duration-1000" src={photo.webContentLink} alt={`photobook-${photo.webContentLink}`}
                    onLoad={() => setIsLoaded(true)}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto', opacity: isLoaded ? "1" : "0" }} />
                <PhotoMetadataMiniView metadata={photo.imageMediaMetadata} />
            </div>
            {!isLoaded && <LoadingImage />}
        </DrawerTrigger>
    )

}

export default function PhotoEntry({ photo }: { photo: Photo }) {
    

    return (
        <Drawer>
            <PhotoMiniView photo={photo} />
            <PhotoExpandedView photo={photo} />
        </Drawer>
        
        
    )
}