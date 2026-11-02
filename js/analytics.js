import myUrl  from "./myUrl.js";

const analytics= document.createElement("div")
const analyticsHeader = document.createElement("h3")
analytics.className = "analytics"
const anaNote = document.createElement("p")
analyticsHeader.innerHTML = "analytics (in progress)"
// anaNote.innerHTML = "under construction"
const xAxis = document.createElement("div")
const yAxis = document.createElement("div")

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
    xEntries.className = "x-entries"
    yEntries.className = "y-entries"  
    xEntries.innerHTML = userPerformance[i].date
    xAxis.append(xEntries, br)
    yAxis.append(userPerformance[i].mark)    
}
xAxislabel.className = "x-axis-label"
xAxislabel.innerHTML = "time"
yAxisLabel.className = "y-axis-label"
yAxisLabel.innerHTML = "performance"

xAxis.append(xAxislabel)
yAxis.append(yAxisLabel)
xAxis.className = "x-axis"
yAxis.className = "y-axis"
// yAxis.innerHTML = "date"

const analyticsPage = () => {
    analytics.append(analyticsHeader, anaNote, yAxis, xAxis)
        return analytics
}
export {analyticsPage}