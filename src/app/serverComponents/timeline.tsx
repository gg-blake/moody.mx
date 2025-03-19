

import Heading from "../clientComponents/heading";
import 'reactflow/dist/style.css';
import TimelineEvent from "../clientComponents/timelineEvent";
import { Program } from "../../lib/types";

async function getCourses() {
    const sheetsId = process.env.NEXT_PUBLIC_SHARED_SHEETS_ID; // Retrieve the folder ID from the query parameter
    const apiKey = process.env.NEXT_PUBLIC_GCP_API_KEY; // Use your environment variable for the Google API key
    const table = "Courses";
    const range = "A2:G";
    const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${sheetsId}/values/${table}!${range}?key=${apiKey}`;
    try {
        const data = await fetch(endpoint, { next: { revalidate: 60 } }).then(data => data.json());
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

        const response = await fetch(endpoint, { next: { revalidate: 60 } });

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

        const response = await fetch(endpoint, { next: { revalidate: 60 } });

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

        const response = await fetch(endpoint, { next: { revalidate: 60 } });

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



export default async function Timeline() {
    const programs = await getPrograms();

    return (
        <div id="timeline" className="w-full h-auto p-3 flex flex-col gap-3 z-40">
            <div className="sticky top-[calc(70px+.75rem)] p-3 border-primary-50 border-[1px] box-border z-900 bg-primary-950">
                <Heading>Timeline</Heading>
            </div>
            {programs?.map((program: Program, i: number) => <TimelineEvent key={`timeline-entry-${i}`} program={program} courses={program["Events"]} />)}

        </div>
    )
}