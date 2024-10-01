let dates = [];
let visits = [];
let uniqueVisits = [];
async function fetchVisits() {
    const response = await fetch("https://cws.auckland.ac.nz/nzsl/api/Log");
    const data = await response.json();
    data.forEach(obj => {
        dates.push(obj.date);
        visits.push(obj.visits);
        uniqueVisits.push(obj.uniqueVisits);
    });
    generateGraph(dates, visits, uniqueVisits);
}
fetchVisits();


const visitGraph = document.getElementById("visitGraph");
function generateGraph(dates, visits, uniqueVisits) {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 800 500");
    svg.classList.add("svg");

    const min = Math.min(...uniqueVisits);
    const max = Math.max(...visits);
    const length = dates.length;
    const xSpacing = 700 / (length - 1);
    const ySpacing = 300 / (max - min);
    const startDate = dates[0];
    const endDate = dates[length - 1];

    const xAxis = document.createElementNS(svgNS, "line");
    xAxis.setAttribute("x1", "50");
    xAxis.setAttribute("y1", "350");
    xAxis.setAttribute("x2", "750");
    xAxis.setAttribute("y2", "350");
    xAxis.setAttribute("stroke", "black");
    svg.appendChild(xAxis);

    const xAxisTop = document.createElementNS(svgNS, "line");
    xAxisTop.setAttribute("x1", "50");
    xAxisTop.setAttribute("y1", "50");
    xAxisTop.setAttribute("x2", "750");
    xAxisTop.setAttribute("y2", "50");
    xAxisTop.setAttribute("stroke", "black");
    svg.appendChild(xAxisTop);

    const xText1 = document.createElementNS(svgNS, "text");
    const xText2 = document.createElementNS(svgNS, "text");

    xText1.setAttribute("x", "25");
    xText1.setAttribute("y", "375");
    xText1.textContent = startDate;

    xText2.setAttribute("x", "700");
    xText2.setAttribute("y", "375");
    xText2.textContent = endDate;
    svg.appendChild(xText1);
    svg.appendChild(xText2);

    const yAxis = document.createElementNS(svgNS, "line");
    yAxis.setAttribute("x1", "50");
    yAxis.setAttribute("y1", "50");
    yAxis.setAttribute("x2", "50");
    yAxis.setAttribute("y2", "350");
    yAxis.setAttribute("stroke", "black");
    svg.appendChild(yAxis);

    const yAxisRight = document.createElementNS(svgNS, "line");
    yAxisRight.setAttribute("x1", "750");
    yAxisRight.setAttribute("y1", "50");
    yAxisRight.setAttribute("x2", "750");
    yAxisRight.setAttribute("y2", "350");
    yAxisRight.setAttribute("stroke", "black");
    svg.appendChild(yAxisRight);

    const yTextMin = document.createElementNS(svgNS, "text");
    const yTextMax = document.createElementNS(svgNS, "text");

    yTextMin.setAttribute("x", "15");
    yTextMin.setAttribute("y", "355");
    yTextMin.textContent = min.toString();

    yTextMax.setAttribute("x", "15");
    yTextMax.setAttribute("y", "55");
    yTextMax.textContent = max.toString();

    svg.appendChild(yTextMin);
    svg.appendChild(yTextMax);

    let visitPoints = "";
    let uniqueVisitPoints = "";
    for (let i = 0; i < length; i++) {
        const x = 50 + i * xSpacing;
        const visitY = 350 - (visits[i] - min) * ySpacing;
        const uniqueVisitY = 350 - (uniqueVisits[i] - min) * ySpacing;
        visitPoints += `${x},${visitY} `;
        uniqueVisitPoints += `${x},${uniqueVisitY} `;
    }

    const visitLine = document.createElementNS(svgNS, "polyline");
    visitLine.setAttribute("points", visitPoints);
    visitLine.setAttribute("stroke", "red");
    visitLine.setAttribute("stroke-width", "2");
    visitLine.setAttribute("fill", "none");
    svg.appendChild(visitLine);

    const uniqueVisitLine = document.createElementNS(svgNS, "polyline");
    uniqueVisitLine.setAttribute("points", uniqueVisitPoints.trim());
    uniqueVisitLine.setAttribute("fill", "none");
    uniqueVisitLine.setAttribute("stroke", "green");
    uniqueVisitLine.setAttribute("stroke-width", "2");
    svg.appendChild(uniqueVisitLine);

    const legendLine = document.createElementNS(svgNS, "text");
    legendLine.setAttribute("y", "420");
    legendLine.setAttribute("x", "50");
    legendLine.textContent = "Legend: "
    svg.appendChild(legendLine);

    const legendVisit = document.createElementNS(svgNS, "line");
    const legendUniqueVisit = document.createElementNS(svgNS, "line");
    const legendVisitText = document.createElementNS(svgNS, "text");
    const legendUniqueVisitText = document.createElementNS(svgNS, "text");

    legendVisit.setAttribute("stroke", "red");
    legendVisit.setAttribute("stroke-width", "2");
    legendVisit.setAttribute("x1", "120");
    legendVisit.setAttribute("y1", "415");
    legendVisit.setAttribute("x2", "200");
    legendVisit.setAttribute("y2", "415");
    svg.appendChild(legendVisit);

    legendUniqueVisit.setAttribute("stroke", "green");
    legendUniqueVisit.setAttribute("stroke-width", "2");
    legendUniqueVisit.setAttribute("x1", "270");
    legendUniqueVisit.setAttribute("y1", "415");
    legendUniqueVisit.setAttribute("x2", "350");
    legendUniqueVisit.setAttribute("y2", "415");
    svg.appendChild(legendUniqueVisit);

    legendVisitText.setAttribute("y", "420");
    legendVisitText.setAttribute("x", "210");
    legendVisitText.textContent = "Visits"
    svg.appendChild(legendVisitText);

    legendUniqueVisitText.setAttribute("y", "420");
    legendUniqueVisitText.setAttribute("x", "360");
    legendUniqueVisitText.textContent = "Unique Visits"
    svg.appendChild(legendUniqueVisitText);

    const visitList = document.createElementNS(svgNS, "text");
    const uniqueVisitList = document.createElementNS(svgNS, "text");
    visitList.textContent = visits.toString();
    uniqueVisitList.textContent = uniqueVisits.toString();

    visitList.setAttribute("x", "200");
    visitList.setAttribute("y", "450");
    visitList.setAttribute("font-size", "10px");
    uniqueVisitList.setAttribute("x", "200");
    uniqueVisitList.setAttribute("y", "470");
    uniqueVisitList.setAttribute("font-size", "10px");

    svg.appendChild(visitList);
    svg.appendChild(uniqueVisitList);

    visitGraph.appendChild(svg);
}

