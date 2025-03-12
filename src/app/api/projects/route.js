import { NextResponse } from "next/server";

//@ts-nocheck
const requestOptions = {
    method: "GET",
    redirect: "follow",
    next: {revalidate: 3600}
  };

async function fetchGithubData() {
    try {
        const starredRepos = await fetch("https://api.github.com/users/gg-blake/starred", {next: {revalidate: 3600}})
        .then((response) => response.json())
        .then((values) => values.filter((val) => val.owner.login === 'gg-blake'))
        .catch((error) => console.error(error));

        const contentUrls = await Promise.all(starredRepos.map((val) => {
            return fetch(val.contents_url.replace("{+path}", "README.md"), {next: {revalidate: 3600}})
            .then(async (data) => {
                const d = await data.json()
                return {
                    ...val,
                    download_url: d.download_url
                }
            });
        }))

        const readmeData = await Promise.all(contentUrls.map((val) => {
            return fetch(val.download_url, {next: {revalidate: 3600}})
            .then(async (data) => {
                const d = await data.text();

                return {
                    ...val,
                    description_md: d
                }
            })
            .catch(() => {
                return {
                    ...val,
                    description_md: ""
                }
            })
        }))
        return readmeData
    } catch (e) {
        return [];
    }
    
} 

/*(async () => {
    // Code that uses await
    const result = await fetchGithubData()
    console.log(result);
})();*/

export async function GET(){
  try {
    const response = await fetchGithubData();
    if (response.length != 0) {
      return NextResponse.json(response)
    } else {
      return NextResponse.json({ message: 'fetch failed!' })
    }
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error' })
  }
}