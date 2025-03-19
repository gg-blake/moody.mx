import styles from '../styles/Home.module.css'
import Background from './background';
import Heading from './heading';
import Banner from './banner';
import PROFILE_BG from '../public/profile-cropped.jpg';
import "../../../styles/globals.css";
import { Button } from '@/components/ui/button';

//const screenbanner = "This website was meticulously designed and developed by me. To learn more about the technologies and programs used in the project, take a minute to check out my Github.".split(" ");

export default function Splash() {
    return (
        <div className={`w-full max-w-full h-screen flex items-center p-3 justify-center overflow-clip`}>

            <div className="absolute w-full h-full">
                <Background />
            </div>
            <Banner />
            <div className="w-full h-full flex flex-col items-center justify-center z-10">

                <div className="w-full font-bold h-auto text-5xl sm:text-[200px] flex justify-center absolute text-primary-50">
                    <div className="w-auto h-auto font-bold">

                        <Heading className='font-semibold text-5xl sm:text-[200px] mix-blend-exclusion'>blake</Heading>
                        <div className='opacity-20 font-bold text-white'>moody.mx</div>
                    </div>
                </div>

                <div className="absolute bottom-6 grid grid-cols-2 grid-rows-2 w-[250px] h-auto text-sm gap-3">
                    <a target="_blank" rel="noreferrer" href="https://www.instagram.com/blayyyyyk/"><Button variant="outline" className="w-full h-full rounded-none bg-black text-white">Instagram</Button></a>
                    <a target="_blank" rel="noreferrer" href="https://github.com/gg-blake"><Button variant="outline" className="w-full h-full rounded-none bg-black text-white">Github</Button></a>
                    <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/blake-moody-2626ba11b/"><Button variant="outline" className="w-full h-full rounded-none bg-black text-white">LinkedIn</Button></a>
                    <a target="_blank" rel="noreferrer" href="blake@mpsych.org"><Button variant="outline" className="w-full h-full rounded-none bg-black text-white">Email</Button></a>
                </div>
                <div className='absolute top-6 right-6'>
                </div>
            </div>

        </div>
    )
}