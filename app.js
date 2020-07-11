import { Graph } from './graph.js'
import { Range } from './range.js'
import {getWordCount, fetchAPI} from './utils.js'
import { Store } from './store.js'

// Initialize the Graph Canvas
Graph.init({
    hostEL: document.getElementById('graph-host')
})

// Refernce of Element to attach Event: <Document.Element>
const postBtn = document.getElementById('show-post')
const pageBtn = document.getElementById('show-page')
const fetchBtn = document.getElementById('fetch-btn')
const playArea = document.getElementById('play-area')
const loadingArea = document.getElementById('loading-area')
const rangeEL = document.getElementById('change-range')
const updatePlot = document.getElementById('update-plot')

updatePlot.onclick = plotData

postBtn.addEventListener('click', ({target}) => {
    Store.set('active', Store.get('post'))
    plotData(500,10)
    target.className = "action-btn active"
    target.parentElement.lastElementChild.className = "action-btn"
})

pageBtn.addEventListener('click', ({target}) => {
    Store.set('active', Store.get('page'))
    plotData(500,10)
    target.className = "action-btn active"
    target.parentElement.firstElementChild.className = "action-btn"
    
})

rangeEL.addEventListener('change', ({target}) => {
    const value = parseInt(target.value) * 100
    target.parentElement.firstElementChild.innerHTML = `0-${value}`
    Store.set('variance', value)
})

fetchBtn.addEventListener('click', ({target}) => {
    target.innerHTML = "Fetching..."
    const promiseStack = []
    promiseStack.push(fetchAPI("https://www.vdocipher.com/blog/wp-json/wp/v2/posts?per_page=100"))
    promiseStack.push(fetchAPI("https://www.vdocipher.com/blog/wp-json/wp/v2/pages?per_page=100"))
    Promise.all(promiseStack)
    .then(data =>  {
        loadingArea.style.display = "none"
        playArea.style.display = "flex"
        Store.set('page', data[0])
        Store.set('post', data[1])
        Store.set('active', Store.get('page'))
        plotData(500,10)
        pageBtn.className = "action-btn active"
    })
    .catch(console.error)
})

/**
 * Plot the Graph from the value stored in Store 
 * Range: 0-100,100-200...n
 * Length: number of item in Range (n)
 * Always takes the data from the 'active' key in Store, to track weather to plot post or page
 */
function plotData() {
    const data = Store.get('active')
    const variance = Store.get('variance')
    const length = Store.get('length')

    // Reset the Canvas for Fresh Plot
    Graph.reset()
    
    // Regenerates the Range and count 
    Range.init(variance, length)
    data.forEach(({ content: { rendered } }) => Range.updateCount(getWordCount(rendered)))
    console.table(Range.get())
    const range = Range.get()
    Graph.render({
        data: Object.values(range),
        label: Object.keys(range),
        margin: 70,
        width: 30,
        color: '#488EFF'
    })
}


console.log("[::Assignment: (Purushottam : sp13purushottam@gmail.com) ::]")
