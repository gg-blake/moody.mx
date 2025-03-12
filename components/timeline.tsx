"use client"
import { useEffect, useRef, useState, useCallback , use } from "react";
import bg from "../public/meter-thin.png";
import GlitchTitle from "./glitch_text";
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow
  } from 'reactflow';
  
  import 'reactflow/dist/style.css';
import { on } from "events";
import { Program , Course } from "./timeline_type";
import type { InferGetStaticPropsType, GetStaticProps } from 'next'

const EXAMPLETIMELINE: TimelineEntry[] = [
    {
        "title": "BS in Computer Science",
        "subtitle": "Boston",
        "location": "Boston, MA",
        "startDate": "2021-09-06",
        "endDate": "2025-05-01",
        "description": "Since Fall of 2021, I have been studying computer science at The University of Massachusetts Boston. I have been given background in high level data structures and algorithms using languages like Python, Java and C. I have also been given early foundation in computer hardware and developing with embedded systems using  low-level languages like Assembly. In addition to development and hardware, I have also been educated in the history and importance of computer ethics.",
        "events": [
            {
                "title": "CS110",
                "subtitle": "Introduction to Computing",
                "date": "2021-09-06",
                "description": "Since Fall of 2021, I have been studying computer science at The University of Massachusetts Boston. I have been given background in high level data structures and algorithms using languages like Python, Java and C. I have also been given early foundation in computer hardware and developing with embedded systems using low-level languages like Assembly. In addition to development and hardware, I have also been educated in the history and importance of computer ethics.",
                "tags": ["Python", "Object-Oriented Programming", "Scripting"]
            },
            {
                "title": "CS210",
                "subtitle": "Intermediate to Computing and Data Structures",
                "date": "2022-09-06",
                "description": "Intermediate to Computing and Data Structures",
                "tags": ["Algorithms", "Java", "Data Structures"]
            },
            {
                "title": "CS240",
                "subtitle": "Programming in C",
                "date": "2022-09-06",
                "description": "Programming in C",
                "tags": ["C", "Low-level Programming", "Memory Management"]
            },
            {
                "title": "CS285L",
                "subtitle": "Social Issues and Ethics in Computing",
                "date": "2024-01-22",
                "description": "Social Issues and Ethics in Computing",
                "tags": ["Writing", "Research", "Ethics", "Critical Thinking"]
            },
            {
                "title": "CS341",
                "subtitle": "Computer Architecture and Organization",
                "date": "2024-01-22",
                "description": "Computer Architecture and Organization",
                "tags": ["C", "Low-level Programming", "Team Projects", "Assembly"]
            },
        ]
    },
    {
        "title": "Minor in Japanese",
        "subtitle": "Boston",
        "location": "Boston, MA",
        "startDate": "2021-09-06",
        "endDate": "2024-12-01",
        "description": "For five semesters at UMass Boston, I have completed six courses in Japanese language. Early courses consisted of basic comprehension of Hiragana and Katakana, the Japanese alphabet for writing native and foreign vocabulary. We were also given exposure to elementary kanji, the third Japanese alphabet which is inherited from Chinese. Later courses gave us exposure to casual grammar and sentence structures and focused more on expressing our own ideas in Japanese.",
        "events": [
            {
                "title": "JAPAN101",
                "subtitle": "Elementary Japanese I",
                "date": "2021-09-06",
                "description": "Elementary Japanese I",
                "tags": ["Japanese", "Language", "Writing", "Speaking"]
            },
            {
                "title": "JAPAN102",
                "subtitle": "Elementary Japanese II",
                "date": "2022-01-22",
                "description": "Elementary Japanese II",
                "tags": ["Japanese", "Language", "Writing", "Speaking"]
            },
            {
                "title": "JAPAN201",
                "subtitle": "Intermediate Japanese I",
                "date": "2022-09-06",
                "description": "Intermediate Japanese I",
                "tags": ["Japanese", "Language", "Writing", "Speaking"]
            },
            {
                "title": "JAPAN202",
                "subtitle": "Intermediate Japanese II",
                "date": "2023-01-22",
                "description": "ntermediate Japanese II",
                "tags": ["Japanese", "Language", "Writing", "Speaking"]
            },
            {
                "title": "JAPAN302",
                "subtitle": "Advanced Intermediate Japanese II",
                "date": "2022-01-22",
                "description": "Advanced Intermediate Japanese II",
                "tags": ["Japanese", "Language", "Writing", "Speaking"]
            },
        ]
    },
    {
        "title": "Japanese Language Exchange Program",
        "subtitle": "Tokyo",
        "location": "Hachioji, Tokyo, Japan",
        "startDate": "2023-08-29",
        "endDate": "2024-01-22",
        "description": "For 5 months, I attended a intensive Japanese language course at Soka University. As a continuation of my Japanese minor at UMass Boston, I was taught advanced listening comprehension, reading, writing, and casual conversation. I was also given many opportunities to learn about Japan’s culture, traditions, customs and history.\n\n     On this journey, I made numerous friends from many different countries around the world. I learned about everyday life in Japan but also gained a greater global perspective.\n\nAdditionally, stepping outside of the US was not a new experience for me, however living in a non-English speaking country for several months was. I learned how to be an independent adult and gained agency in choosing my own path. It’s a defining moment in my adulthood and a memory I will cherish for the rest of my life.",
        "events": [
            {
                "title": "GJLC113",
                "subtitle": "General Japanese I",
                "date": "2023-08-29",
                "description": "General Japanese I",
                "tags": ["Japanese", "Grammar", "Vocab", "Reading"]
            },
            {
                "title": "GJLC116",
                "subtitle": "Japanese Practice I",
                "date": "2023-08-29",
                "description": "Japanese Practice I",
                "tags": ["Japanese", "Writing"]
            },
            {
                "title": "GJLC241",
                "subtitle": "Japanese Communication I",
                "date": "2023-08-29",
                "description": "Japanese Communication I",
                "tags": ["Japanese", "Conversation", "Speaking", "Presentation", "Listening"]
            },
            {
                "title": "GJLC117",
                "subtitle": "Kanji (Elementary)",
                "date": "2023-08-29",
                "description": "Kanji (Elementary)",
                "tags": ["Japanese", "Kanji", "Writing", "Reading"]
            },
            {
                "title": "GJLC162",
                "subtitle": "Japanese Writing I",
                "date": "2023-08-29",
                "description": "Japanese Writing I",
                "tags": ["Japanese", "Essay", "Writing", "Reading", "Grammar"]
            },
            {
                "title": "GJLC152",
                "subtitle": "Japanese Listening I",
                "date": "2023-08-29",
                "description": "Japanese Listening I",
                "tags": ["Japanese", "Listening", "Writing"]
            },
            {
                "title": "GJLC118",
                "subtitle": "Japanese Traditional Culture",
                "date": "2023-08-29",
                "description": "Japanese Traditional Culture",
                "tags": ["Japanese", "Cultrue", "History", "Elective", "Listening"]
            },
        ]
    },
    {
        "title": "UMass Boston IT Help Desk",
        "subtitle": "Boston",
        "location": "Boston, MA",
        "startDate": "2021-09-30",
        "endDate": "2025-05-01",
        "description": "Worked at the UMass Boston IT Help Desk.",
        "events": []
    }
]



function DateNode({ date  }: { date: string }) {
    const nth = (d: number) => {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    };

    const formatDate = (date: string) => {
        const d = new Date(date);
        const month = d.toLocaleString('default', { month: 'short' });
        const day = d.getDate();
        const year = d.getFullYear();
        return `${month} ${day}${nth(day)}, ${year}`;
    }

    return (
        <span className="flex flex-row px-3 py-[1px] items-center justify-start gap-1">
            <svg className="fill-primary-50" xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 -960 960 960" width="12"><path d="M212.309-100.001q-30.308 0-51.308-21t-21-51.308v-535.382q0-30.308 21-51.308t51.308-21h55.385v-84.615h61.537v84.615h303.076v-84.615h59.999v84.615h55.385q30.308 0 51.308 21t21 51.308v535.382q0 30.308-21 51.308t-51.308 21H212.309Zm0-59.999h535.382q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463v-375.382H200v375.382q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846Z"/></svg>
            {formatDate(date)}
        </span>
    )
}

function Flow({ startDate, endDate, height, width }: {startDate: string, endDate: string, height: number, width: number}) {
    const nodeStyle = { border: "1px solid white", backgroundColor: 'black', borderRadius: '3px', padding: '0px', fontFamily: "Poppins", fontSize: "10px", color: "white", textAlign: "left", width: "auto" };
    const nth = (d: number) => {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    };

    const formatDate = (date: string) => {
        const d = new Date(date);
        const month = d.toLocaleString('default', { month: 'short' });
        const day = d.getDate();
        const year = d.getFullYear();
        return `${month} ${day}${nth(day)}, ${year}`;
    }
    
    const initialNodes = [
        {
            id: '1',
            style: nodeStyle,
            position: {x: 0, y: 0},
            type: 'input',
            sourcePosition: 'right',
            targetPosition: 'left',
            className: "nodrag",
            data: { label: <DateNode date={startDate} /> }
        },
        {
            id: '2',
            style: nodeStyle,
            position: {x: width*2, y: 0},
            sourcePosition: 'right',
            type: 'output',
            targetPosition: 'left',
            className: "nodrag",
            data: { label: <DateNode date={endDate} /> }
        }
    ]
    const initialEdges = [
        { id: 'e1-2', source: '1', target: '2', animated: true }
    ]
    //@ts-ignore
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const flowRef = useRef(null);

    
  
    const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    useEffect(() => {
        const watermark = document.getElementsByClassName("react-flow__panel react-flow__attribution bottom right");
        if (!watermark) return;
        Object.values(watermark).map((el: any) => el.style.display = "none");
    }, [])
  
    return (
      <ReactFlow  ref={flowRef}
        nodes={nodes}
        edges={edges}
        style={{width: "100%", height: "auto"}}
        onConnect={onConnect}
        panOnDrag={false}
        zoomOnScroll={false}
        panOnScroll={false}
      >
        
      </ReactFlow>
    );
  }

interface TimelineEntryEvent {
    title: string;
    subtitle: string;
    date: string;
    description: string;
    tags: string[];
}

interface TimelineEntry {
    title: string;
    subtitle: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    events: TimelineEntryEvent[];
}

function EventCounter({count, bubbleSize, maxItems=3, spacingX=10, spacingY=0}: {count: number, bubbleSize: number, maxItems: number, spacingX: number, spacingY: number, }) {
    const bubbleList = [];
    for (let i = 0; i < Math.min(count, maxItems); i++) {
        let currentBubble = <div style={{width: `${bubbleSize}px`, height: `${bubbleSize}px`, left: `${i * spacingX}px`, top: `${i * spacingY}px`}} className={`absolute bg-primary-950 border-primary-50 border-[1px] box-border rounded-full shadow-md`}></div>;
        if (count > maxItems && i === maxItems - 1) {
            currentBubble = <div style={{width: `${bubbleSize}px`, height: `${bubbleSize}px`, left: `${i * spacingX}px`, top: `${i * spacingY}px`}} className={`absolute bg-primary-950 border-primary-50 border-[1px] box-border rounded-full flex flex-row items-center justify-center shadow-md`}>+{count - maxItems + 1}</div>;
        }
        bubbleList.push(currentBubble);
    }

    return (
        <div className={`relative w-full h-[${bubbleSize}px] text-[.7rem]`}>
            {bubbleList}
        </div>
    )
}

async function getCourses() {
    const sheetsId = process.env.NEXT_PUBLIC_SHARED_SHEETS_ID; // Retrieve the folder ID from the query parameter
    const apiKey = process.env.NEXT_PUBLIC_GCP_API_KEY; // Use your environment variable for the Google API key
    const table = "Courses";
    const range = "A2:G";
    const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${sheetsId}/values/${table}!${range}?key=${apiKey}`;
    try {
        const data = await fetch(endpoint, {next: {revalidate: 60}}).then(data => data.json());
        const fields = await getFieldsCourses();
        // @ts-ignore
        let responseJson = [];
        // @ts-ignore
        data.values.map(course => {
            let newObj = {};
            // @ts-ignore
            course.map((item, index) => {
                
                // @ts-ignore
                newObj[fields[index]] = item;
                
            });
            responseJson.push(newObj);
        })
        //@ts-ignore
        return responseJson;
    } catch (error) {
      throw error;
    }
    


}

async function getFieldsCourses() {
  const table = "Courses";
  const range = "1:1";
  const sheetsId = process.env.NEXT_PUBLIC_SHARED_SHEETS_ID; // Retrieve the folder ID from the query parameter
  const apiKey = process.env.NEXT_PUBLIC_GCP_API_KEY; // Use your environment variable for the Google API key
  
  try {
    // Google Drive API endpoint to list files within a folder
    const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${sheetsId}/values/${table}!${range}?key=${apiKey}`;
    
    const response = await fetch(endpoint, {next: {revalidate: 60}});

    let data = await response.json().then(data => data.values[0]);

    // Return the list of files in JSON format
    return data;
  } catch (error) {
    throw error;
  }
}

async function getFields() {
  const table = "Programs";
  const range = "1:1";
  const sheetsId = process.env.NEXT_PUBLIC_SHARED_SHEETS_ID; // Retrieve the folder ID from the query parameter
  const apiKey = process.env.NEXT_PUBLIC_GCP_API_KEY; // Use your environment variable for the Google API key
  
  try {
    // Google Drive API endpoint to list files within a folder
    const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${sheetsId}/values/${table}!${range}?key=${apiKey}`;
    
    const response = await fetch(endpoint, {next: {revalidate: 60}});

    if (!response.ok) {
      return new Error('Failed to fetch files from Google Drive API');
    }

    let data = await response.json();
    
    
    
    // Return the list of files in JSON format
    return data.values[0]
  } catch (error) {
    throw new Error('Internal Server Error');
  }
}

async function getPrograms() {
  const table = "Programs";
  const range = "A2:F";
  const sheetsId = process.env.NEXT_PUBLIC_SHARED_SHEETS_ID; // Retrieve the folder ID from the query parameter
  const apiKey = process.env.NEXT_PUBLIC_GCP_API_KEY; // Use your environment variable for the Google API key
  
  try {
    // Google Drive API endpoint to list files within a folder
    const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${sheetsId}/values/${table}!${range}?key=${apiKey}`;
    
    const response = await fetch(endpoint, {next: {revalidate: 60}});
    
    if (!response.ok) {
      throw new Error(`Failed to fetch files: ${response.statusText}`);
    }

    let data = await response.json();
    const events = await getCourses();
    

    return await getFields().then((fields) => {
        // @ts-ignore
        let responseJson = [];
        data.values.map((course: any) => {
            let newObj = {};
            course.map((item: any, index: number) => {
                // @ts-ignore
                newObj[fields[index]] = item;
            });
            // @ts-ignore
            newObj["Events"] = [];
            events.map((event: any) => {
                // @ts-ignore
                if (event["Program Name"] == newObj["Program Name"]) {
                    // @ts-ignore
                    newObj["Events"].push(event);
                }
            })
            responseJson.push(newObj);
            
        })
        // @ts-ignore
        return responseJson;
    });
    
    
  } catch (error) {
    throw error;
  }
}

const fetchAllPrograms: Promise<Program[]> = new Promise((resolve, reject) => {
    const programs = getPrograms()
    .then(data => resolve(data))
    .catch(err => reject(err))
})

const fetchAllCourseByProgram = (program: Program) => new Promise((resolve, reject) => {
    const courses = fetch(`/api/files/json/courses?program=${program["Program Name"]}`)
    .then(res => res.json())
    .then(result => resolve(result))
    .catch(err => reject(err))
})

const fetchAllCourses: Promise<any> = new Promise((resolve, reject) => {
    const programs = fetch(`http://localhost:3000/api/files/json/formatted`)
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(err => reject(err))
})

function CourseEvent({course, index, focusedEvent, onClick, onReset}: {course: Course, index: number, focusedEvent: number, onClick: () => void, onReset: () => void}) {
    const visibility = (focusedEvent == index || focusedEvent == -1) ? "visible" :  "hidden";
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
            
            <svg className="absolute visible fill-primary-50 transition-all md:hidden right-[3px] top-3 scale-50 animate-pulse" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M419-80q-28 0-52.5-12T325-126L107-403l19-20q20-21 48-25t52 11l74 45v-328q0-17 11.5-28.5T340-760q17 0 29 11.5t12 28.5v472l-97-60 104 133q6 7 14 11t17 4h221q33 0 56.5-23.5T720-240v-160q0-17-11.5-28.5T680-440H461v-80h219q50 0 85 35t35 85v160q0 66-47 113T640-80H419ZM167-620q-13-22-20-47.5t-7-52.5q0-83 58.5-141.5T340-920q83 0 141.5 58.5T540-720q0 27-7 52.5T513-620l-69-40q8-14 12-28.5t4-31.5q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 17 4 31.5t12 28.5l-69 40Zm335 280Z"/></svg>
            <div className="hidden absolute border-t-[10px] border-primary-50 right-0 top-0 w-[30px] h-full group-hover:opacity-1 opacity-0 transition-opacity md:visible md:flex justify-center items-center">
                <svg className="fill-primary-50 transition-all" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
            </div>
            {index == focusedEvent && <p className="text-sm font-normal text-left sm:text-justify">{course["Description"]}</p>}
            {index == focusedEvent && <div onClick={focusedEvent != -1 ? onReset : undefined} className="group p-[2px] border-[1px] border-primary-50 inline-block mt-3 active:bg-primary-50 transition-colors">
                <svg className="fill-primary-50 transition-all group-active:fill-primary-950" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                </div>}
            </div>
            </div>
        }
        </>
    )
}

function ProgramEvent({program, courses}: {program: Program, courses: Course[]}) {
    const [focusedEvent, setFocusedEvent] = useState<number>(-1);
    // {props.length > 0 && <div className="mt-3"><EventCounter count={props.events.length} bubbleSize={30} maxItems={3} spacingX={15} spacingY={0} /></div>}

    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full sm:max-w-[400px] h-auto p-3 box-border border-[1px] border-primary-50 flex flex-col gap-[5px]">
                <h2 className="text-primary-50 opacity-80 text-sm font-bold p-[3px] m-0">{program["Location"]}</h2>
                <h1 className="text-primary-50 text-4xl font-bold p-[3px] m-0">{program["Program Name"]}</h1>
                <div className="text-base font-normal p-[3px] m-0 w-full text-left sm:text-justify">{program["Program Description"]}</div>
            </div>
            <div style={{maxWidth: focusedEvent != -1 ? "min(600px, 100%)" : "300px"}} className="w-auto h-auto max-w-full lg:max-w-[300px] flex flex-col gap-3">{courses?.map((course: Course, i: number) => <CourseEvent key={`event-item-${i}`} index={i} course={course} focusedEvent={focusedEvent} onClick={() => setFocusedEvent(i)} onReset={() => setFocusedEvent(-1)} />)}</div>
            
        </div>
    )
}



export default function Timeline() {
    
    
    const [focusedEvent, setFocusedEvent] = useState<number>(-1);

    const programs = use(fetchAllPrograms);
    
    
    return (
        <div id="timeline" className="w-screen h-auto p-3 flex flex-col gap-3 z-40">
            <div className="sticky top-[calc(70px+.75rem)] p-3 border-primary-50 border-[1px] box-border z-900 bg-primary-950">
                <GlitchTitle>Timeline</GlitchTitle>
            </div>
            { programs?.map((program: Program, i: number) => <ProgramEvent key={`timeline-entry-${i}`} program={program} courses={program["Events"]} /> )}
            
        </div>
    )
}