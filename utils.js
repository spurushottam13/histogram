export const fetchAPI = (url) => new Promise((resolve, reject) => {
    fetch(url)
        .then(r => r.json())
        .then(resolve)
        .catch(reject)
})
export const getWordCount = (htmlString) => htmlString.replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, ' ')
    .trim()
    .split(" ").length