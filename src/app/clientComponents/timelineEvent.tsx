"use client"
import { useState, use } from "react";
import { Program, Course } from "../../components/timeline_type";

function CourseEvent({ course, index, focusedEvent, onClick, onReset }: { course: Course, index: number, focusedEvent: number, onClick: () => void, onReset: () => void }) {
    const visibility = (focusedEvent == index || focusedEvent == -1) ? "visible" : "hidden";
    const height = focusedEvent == index ? "100%" : "auto";

    // <div style={{visibility: visibility}} className="hidden md:visible md:mb-1 mt-2 md:flex flex-wrap text-[.6rem] gap-1">{event.tags.map((tag, i) => <span key={`event-tag-${i}`} className="border-[1px] box-border border-primary-50 px-[3px] leading-none py-[2px]">{tag}</span>)}</div>

    return (
        <>
            {
                visibility == "visible" &&
                <div onClick={focusedEvent == -1 ? onClick : undefined} className="group relative lg:hover:w-[calc(100%_+_30px)] pr-0 lg:hover:pr-[30px] border-[1px] border-primary-50 transition-all flex flex-col h-auto min-w-[calc(100%_-_30px)] lg:min-w-[calc(min(calc(100%_-_30px),270px))] z-40">
                    <div className="w-full h-[10px] bg-primary-50 z-50"></div>
                    <div className="p-3 w-full">
                        <h2 className="text-xs font-bold leading-tight z-50 opacity-80">{course["Course ID"]}</h2>
                        <h3 className="text-lg font-bold leading-tight z-50 group-hover:underline">{course["Course Name"]}</h3>

                        <svg className="absolute visible fill-primary-50 transition-all md:hidden right-[3px] top-3 scale-50 animate-pulse" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M419-80q-28 0-52.5-12T325-126L107-403l19-20q20-21 48-25t52 11l74 45v-328q0-17 11.5-28.5T340-760q17 0 29 11.5t12 28.5v472l-97-60 104 133q6 7 14 11t17 4h221q33 0 56.5-23.5T720-240v-160q0-17-11.5-28.5T680-440H461v-80h219q50 0 85 35t35 85v160q0 66-47 113T640-80H419ZM167-620q-13-22-20-47.5t-7-52.5q0-83 58.5-141.5T340-920q83 0 141.5 58.5T540-720q0 27-7 52.5T513-620l-69-40q8-14 12-28.5t4-31.5q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 17 4 31.5t12 28.5l-69 40Zm335 280Z" /></svg>
                        <div className="hidden absolute border-t-[10px] border-primary-50 right-0 top-0 w-[30px] h-full group-hover:opacity-1 opacity-0 transition-opacity md:visible md:flex justify-center items-center">
                            <svg className="fill-primary-50 transition-all" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" /></svg>
                        </div>
                        {index == focusedEvent && <p className="text-sm font-normal text-left sm:text-justify">{course["Description"]}</p>}
                        {index == focusedEvent && <div onClick={focusedEvent != -1 ? onReset : undefined} className="group p-[2px] border-[1px] border-primary-50 inline-block mt-3 active:bg-primary-50 transition-colors">
                            <svg className="fill-primary-50 transition-all group-active:fill-primary-950" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                        </div>}
                    </div>
                </div>
            }
        </>
    )
}

export default function TimelineEvent({ program, courses }: { program: Program, courses: Course[] }) {
    const [focusedEvent, setFocusedEvent] = useState<number>(-1);
    // {props.length > 0 && <div className="mt-3"><EventCounter count={props.events.length} bubbleSize={30} maxItems={3} spacingX={15} spacingY={0} /></div>}

    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full sm:max-w-[400px] h-auto p-3 box-border border-[1px] border-primary-50 flex flex-col gap-[5px]">
                <h2 className="text-primary-50 opacity-80 text-sm font-bold p-[3px] m-0">{program["Location"]}</h2>
                <h1 className="text-primary-50 text-4xl font-bold p-[3px] m-0">{program["Program Name"]}</h1>
                <div className="text-base font-normal p-[3px] m-0 w-full text-left sm:text-justify">{program["Program Description"]}</div>
            </div>
            <div style={{ maxWidth: focusedEvent != -1 ? "min(600px, 100%)" : "300px" }} className="w-auto h-auto max-w-full lg:max-w-[300px] flex flex-col gap-3">{courses?.map((course: Course, i: number) => <CourseEvent key={`event-item-${i}`} index={i} course={course} focusedEvent={focusedEvent} onClick={() => setFocusedEvent(i)} onReset={() => setFocusedEvent(-1)} />)}</div>

        </div>
    )
}