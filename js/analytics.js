import myUrl  from "./myUrl.js";

const analytics= document.createElement("div")
const analyticsHeader = document.createElement("h3")
analytics.className = "analytics"
const anaNote = document.createElement("p")
analyticsHeader.innerHTML = "analytics (in progress)"
// anaNote.innerHTML = "under construction"
const aboveX = document.createElement("div")
const xAxis = document.createElement("div")
const yAxis = document.createElement("div")

aboveX.className = "above-x"
xAxis.className = "x-axis"
yAxis.className = "y-axis"

const userId = localStorage.getItem("workoutUserId")

const getUserPerformance = async () => {
    const response = await fetch(`${myUrl}/performance`, {
      method: "GET",
    });
    const data = await response.json();
    const filteredData = data.filter((entry) => entry.userId === userId);
    return filteredData;
};

const userPerformance = await getUserPerformance();
console.log(userPerformance)
const xAxislabel = document.createElement("p")
const yAxisLabel = document.createElement("p")

for (let i = 0; i < userPerformance.length; i++) {
    const xEntries = document.createElement("p")
    const yEntries = document.createElement("p")
    const br = document.createElement("br")
    const perf = userPerformance[i]
    console.log(perf)
    xEntries.className = "x-entries"
    xEntries.innerHTML = `${perf.date.substring(0, 10)}`
    yEntries.className = "y-entries"  
    yEntries.innerHTML = `${perf.mark}`
    
    xAxis.append(xEntries)
    yAxis.append(yEntries)   
    yAxis.style.rowGap = '2rem' 
    xAxis.style.columnGap = '2rem'
    // xAxis.style.position = "absolute"
}
xAxislabel.className = "x-axis-label"
xAxislabel.innerHTML = "time"
yAxisLabel.className = "y-axis-label"
yAxisLabel.innerHTML = "performance"
aboveX.append(xAxislabel)

// xAxis.append(xAxislabel)
yAxis.append(yAxisLabel)

// yAxis.innerHTML = "date"

const analyticsPage = () => {
    analytics.append(analyticsHeader, anaNote, yAxis, aboveX, xAxis)
        return analytics
}
export {analyticsPage}