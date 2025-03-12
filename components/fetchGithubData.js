const requestOptions = {
    method: "GET",
    redirect: "follow",
    next: {revalidate: 3600}
  };

export default async function fetchGithubData() {
    const starredRepos = await fetch("https://api.github.com/users/gg-blake/starred", requestOptions)
        .then((response) => response.json())
        .then((values) => values.filter((val) => val.owner.login === 'gg-blake'))
        .catch((error) => console.error(error));

    const contentUrls = await Promise.all(starredRepos.map((val) => {
        return fetch(val.contents_url.replace("{+path}", "README.md"))
        .then(async (data) => {
            const d = await data.json()
            return {
                ...val,
                download_url: d.download_url
            }
        });
    }))

    const readmeData = await Promise.all(contentUrls.map((val) => {
        return fetch(val.download_url)
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
} 

/*(async () => {
    // Code that uses await
    const result = await fetchGithubData()
    console.log(result);
})();*/