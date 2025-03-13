import styles from '../../../styles/Home.module.css';

export default function Statement(props: {children: any, src?: string}) {
    return (
        <div className="w-full h-auto p-6 text-3xl lg:text-6xl flex flex-col gap-3 sm:flex-row-reverse">
            {props.src && <div className="grow w-full h-full flex justify-right flex-row-reverse"><img className="w-full opacity-70 h-auto rounded-lg" src={`/${props.src}`} alt="profile-cropped.jpg" /><p className="text-[10px] text-primary-50 absolute right-20 border-[1px] border-t-0 px-1 py-0 leading-tight font-mono border-primary-50 bg-primary-950">Credit to Anthony Brosnan</p></div>}
            <div className="grow w-full">
            <span className="inline-block "><span className="inline-block font-mono translate-y-[-10%]">{">"}</span>{props.children}<span className={`${styles.cursorblink} inline-block font-mono translate-y-[-20%] font-primary-950`}>_</span></span>
            </div>
        </div>
    )
}