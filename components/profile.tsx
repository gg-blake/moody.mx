"use client"

import styles from '../styles/Home.module.css'
import FlowFieldBG from './flow_field';
import GlitchTitle from './glitch_text';
import {MovingBannerFrame} from './moving_banner';
import PROFILE_BG from '../public/profile-cropped.jpg';
import { ColorPicker , ColorPickerCompact } from './colorpicker';
import "../styles/globals.css";

import { useEffect , useState } from 'react'
import ColorBlendButton from './colorblendbutton';

//const screenbanner = "This website was meticulously designed and developed by me. To learn more about the technologies and programs used in the project, take a minute to check out my Github.".split(" ");

export default function Profile() {
    return (
        <div className={`w-screen h-screen flex items-center p-3 justify-center overflow-clip`}>
            
            <div className="absolute w-full h-full">
                <FlowFieldBG />
            </div>
            <MovingBannerFrame/>
            
            
            <div className="w-full h-full flex flex-col items-center justify-center z-10">

                <div className="w-full font-bold h-auto text-5xl sm:text-[200px] flex justify-center absolute text-primary-50">
                    <div className="w-auto h-auto font-bold">
                    
                    <GlitchTitle className='font-semibold text-5xl sm:text-[200px] mix-blend-exclusion'>blake</GlitchTitle>
                    <div className='opacity-20 font-bold text-white'>moody.mx</div>
                    </div>
                </div>
                
                <div className="absolute bottom-3 grid grid-cols-2 grid-rows-2 w-[250px] h-auto text-sm gap-3">
                    <ColorBlendButton className="relative text-white" target="_blank" rel="noreferrer" href="https://www.instagram.com/blayyyyyk/">Instagram</ColorBlendButton>
                    <ColorBlendButton className="relative text-white" target="_blank" rel="noreferrer" href="https://github.com/gg-blake">Github</ColorBlendButton>
                    <ColorBlendButton className="relative text-white" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/blake-moody-2626ba11b/">LinkedIn</ColorBlendButton>
                    <ColorBlendButton className="relative text-white" target="_blank" rel="noreferrer" href="blake@mpsych.org">Email</ColorBlendButton>

                </div>
                <div className='absolute top-6 right-6'>
                </div>
            </div>
            
      </div>
    )
}