import "../../styles/Home.module.css";
import plusJakartaSans from '../../styles/fonts';
import Profile from './clientComponents/splash';
import Timeline from './serverComponents/timeline';
import Photobook from './serverComponents/photobook'
import Projects from './serverComponents/featuredProjects'
import Statement from './clientComponents/statement';


export default function Home() {
  return (
    <div className={`w-full overflow-y-visible bg-secondary text-primary overflow-x-hidden z-0 font-mono`}>
      
      <Profile />
      <Statement src="profile-cropped.jpg">{"A full-time student and part-time developer based in Boston, Massachusetts. Currently doing research in Machine Learning and Artificial Intelligence, focusing in LLM research and design while pursuing a degree in Computer Science at UMass Boston. Here's my "}<a className='text-blue-400 underline' href="https://www.moody.mx/api/files/resume" target="_blank" rel="noreferrer">resume</a>{"as an API route to sync with Google Drive."}</Statement>
      <Timeline />
      <Statement>{"Recently, I've been honing my skills in Tensorflow, Pytorch. Additonally, I have extensive personal experience working with React and it's TypeScript framework, Next JS. I have a strong foundation in networking, graduating from Essex North Shore and Agricultural High School with a concentration in Information Technology. Additonally, I have years of experience with modern web frameworks, primarily React. Please check out my projects on "}<a className='text-blue-400 underline' href="https://www.github.com/gg-blake" target="_blank" rel="noreferrer">Github.</a>{"Click on the README.md links under here to get live view of my favorite Github repos. I'm very proud of my most recent project snake-ml. Please check it out!"}</Statement>
      <Projects />
      <Statement>{"In my spare time, I also practice photography. Recently, I've been documenting my adventures while studying abroad at Soka University, in Japan. If you get the chance, check out."}<a className='text-blue-400 underline' href="https://www.instagram.com/picsover9000/" target="_blank" rel="noreferrer">@picsover9000</a> on Instagram.</Statement>
      <Photobook />
      
      <div className="w-full h-[400px]"></div>
    </div>
  )
}