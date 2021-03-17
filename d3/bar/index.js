"use strict";

window.addEventListener("load", function () {
  load();
});

window.addEventListener("resize", function () {
  resizeChart();
});

const LOCAL_KEY = "gdpData";

function load() {
  resizeChart();
  const json = loadData();
  displayRaw(json);

  let gdpData = processData(json);
  draw(gdpData);
}

function resizeChart() {
  const main = document.getElementById("main");
  const e = document.getElementById("chart");
  const wpx = getComputedStyle(e).width;
  const mainWpx = getComputedStyle(main).width;
  const mainW = parseFloat(mainWpx);
  let w = parseFloat(wpx);

  if (w < 0.95 * mainW || w > mainW) {
    w = 0.95 * mainW;
  }

  const h = Math.floor(w * 9.0 / 16);
  e.style.width = `${w}px`;
  e.style.height = `${h}px`;

  let data = processData(loadData());
  draw(data);
}

function processData(json) {
  return json.data.map(v => {
    return {
      rawDate: v[0],
      date: new Date(v[0]),
      gdp: parseFloat(v[1]),
    };
  })
    .sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });

}

function loadData() {
  let downloaded = localStorage.getItem(LOCAL_KEY);
  if (downloaded !== null) {
    return downloaded;
  }

  const dataURL = "./gdp.json";
  const req = new XMLHttpRequest();
  req.open("GET", dataURL, false);
  req.send();
  const raw = req.responseText;
  return JSON.parse(raw);
}

function displayRaw(data) {
  document.getElementById("raw").textContent = JSON.stringify(data, null, "    ");
}

function getChartSize() {
  const chartStyle = getComputedStyle(document.getElementById("chart"));
  const w = parseInt(chartStyle.width);
  const h = parseInt(chartStyle.height);
  return [w, h];
}

function hideTooltip() {
  let tooltip = document.getElementById("tooltip");
  tooltip.style.visibility = "hidden";
}

function showTooltip(e, d) {
  let tooltip = document.getElementById("tooltip");
  tooltip.style.visibility = "visible";
  tooltip.setAttribute("data-date", d.rawDate);
  let quarter = d.date.getFullYear() + " Q";
  quarter += d.date.getMonth() / 3 + 1;
  tooltip.innerHTML = `<time datetime="${d.rawDate}">${quarter}</time> - $${d.gdp} Billion`;
  const offset = 10;
  tooltip.style.left = (e.clientX + offset) + "px";
  tooltip.style.top = (e.clientY + offset) + "px";
}


function draw(gdpData) {
  const [w, h] = getChartSize();
  const padding = 10;
  const xAxisHeight = 10;
  const yAxisWidth = 40;
  const latest = gdpData[gdpData.length - 1];
  const oldest = gdpData[0];

  const xScale = d3.scaleTime()
    .domain([oldest.date, latest.date])
    .range([yAxisWidth + padding, w - padding]);

  const yScale = d3.scaleLinear()
    .domain([0, latest.gdp])
    .range([h - padding - xAxisHeight, padding]);

  d3.select("#chart")
    .selectAll("svg")
    .remove();

  const svg = d3.select("#chart")
    .append("svg")
    .attr("id", "vis")
    .attr("width", w)
    .attr("height", h);

  svg
    .selectAll("rect")
    .data(gdpData)
    .enter()
    .append("rect")
    .attr("data-date", v => v.rawDate)
    .attr("data-gdp", v => v.gdp)
    .attr("x", v => xScale(v.date))
    .attr("width", (w - padding - yAxisWidth) / gdpData.length)
    .attr("y", v => yScale(v.gdp))
    .attr("height", v => h - padding - xAxisHeight - yScale(v.gdp))
    .attr("class", "bar")
    .on("mouseover", (e, d) => showTooltip(e, d))
    .on("mouseleave", hideTooltip);


  svg.append("g")
    .call(d3.axisBottom(xScale))
    .attr("height", xAxisHeight)
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${h - padding - xAxisHeight})`);


  svg.append("g")
    .call(d3.axisLeft(yScale))
    .attr("id", "y-axis")
    .attr("width", yAxisWidth)
    .attr("transform", `translate(${yAxisWidth + padding}, 0)`);
}
