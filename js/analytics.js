const analytics= document.createElement("div")
const analyticsHeader = document.createElement("h3")
analytics.className = "analytics"
const anaNote = document.createElement("p")
analyticsHeader.innerHTML = "analytics"
anaNote.innerHTML = "under construction"
const analyticsPage = () => {
    analytics.append(analyticsHeader, anaNote)
        return analytics
}
export {analyticsPage}