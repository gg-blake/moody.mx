import styles from '../../../styles/Home.module.css';

export default function Statement(props: {children: any, src?: string}) {
    return (
        <div className="w-full h-auto p-3 text-3xl lg:text-6xl flex flex-col gap-3 sm:flex-row-reverse">
            {props.src && <div className="grow w-full h-full flex justify-right flex-row-reverse"><img className="w-full opacity-70 h-auto rounded-none border-primary border-1" src={`/${props.src}`} alt="profile-cropped.jpg" /></div>}
            <div className="grow w-full">
            <span className="inline-block "><span className="inline-block font-mono translate-y-[-10%]">{">"}</span>{props.children}<span className={`${styles.cursorblink} inline-block font-mono translate-y-[-20%] font-primary-950`}>_</span></span>
            </div>
        </div>
    )
}