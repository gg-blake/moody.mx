"use client"
import "../../styles/Home.module.css";
import plusJakartaSans from '../../styles/fonts';
import Profile from '../../components/profile';
import Timeline from '../../components/timeline';
import Photobook from '../../components/photobook'
import Projects from '../../components/projects'
import NavBar from '../../components/navbar'
import Statement from '../../components/statement';


export default function Home() {
  return (
    <div className={`w-screen overflow-y-visible bg-primary-950 text-primary-50 overflow-x-hidden ${plusJakartaSans.className}`}>
      <NavBar ids={["timeline", "projects", "photos", "contact"]} />
      <Profile />
      <Statement src="profile-cropped.jpg">A full-time student and part-time developer based in Boston, Massachusetts. Interests in full-stack, mobile development. Pursuing a degree in Computer Science at UMass Boston.</Statement>
      <Timeline />
      <Statement>I am skilled in Python and TypeScript. Additonally, I have years of experience with modern web frameworks, primarily React. Please check out my projects on <a className='text-blue-400 underline' href="https://www.github.com/gg-blake" target="_blank" rel="noreferrer">Github.</a> </Statement>
      <Projects />
      <Statement>{"In my spare time, I also practice photography. Recently, I've been documenting my adventures while studying abroad at Soka University, in Japan. If you get the chance, check out "}<a className='text-blue-400 underline' href="https://www.instagram.com/picsover9000/" target="_blank" rel="noreferrer">@picsover9000</a> on Instagram.</Statement>
      <Photobook />
      <Statement>For all business related inquiries, please email <a className="text-blue-400 underline" href="blake@moody.mx" target="_blank" rel="noreferrer">blake@moody.mx</a> directly.</Statement>
      <div className="w-full h-[400px]"></div>
    </div>
  )
}
