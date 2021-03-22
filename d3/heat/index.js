"use strict";

window.addEventListener("load", function () {
  loadData(render);
});

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const LOCAL_KEY = "temperatureData";

let base; // base temperature

// render the loaded data
function render(json) {
  resizeChart();
  displayRaw(json);

  let data = processData(json);
  draw(data);

  window.addEventListener("resize", function () {
    resizeChart();
    draw(data);
  });
}

// noinspection DuplicatedCode
function resizeChart() {
  const main = document.getElementById("main");
  const e = document.getElementById("chart");
  const wpx = getComputedStyle(e).width;
  const mainWpx = getComputedStyle(main).width;
  const mainW = parseFloat(mainWpx);
  let w = parseFloat(wpx);

  if (w < 0.98 * mainW || w > mainW) {
    w = 0.98 * mainW;
  }

  const h = Math.floor((w * 6.0) / 16);
  e.style.width = `${w}px`;
  e.style.height = `${h}px`;
}

function processData(json) {
  base = parseFloat(json["baseTemperature"]);
  return json["monthlyVariance"]
    .map((v) => {
      return {
        year: v["year"],
        month: v["month"] - 1,
        temp: parseFloat(v["variance"]) + base,
        variance: parseFloat(v["variance"]),
      };
    })
    .sort((a, b) => {
      if (a.year === b.year) {
        return a.month - b.month;
      }
      return a.year - b.year;
    });
}

function loadData(callback) {
  let downloaded = localStorage.getItem(LOCAL_KEY);
  if (downloaded !== null) {
    callback(downloaded);
  }

  const dataURL = "./global-temperature.json";
  const req = new XMLHttpRequest();

  req.onload = function (e) {
    if (req.readyState === 4) {
      if (req.status === 200) {
        const raw = req.responseText;
        const json = JSON.parse(raw);
        callback(json);
        return;
      }

      console.error("failed to load data", req.statusText);
    }
  };

  req.open("GET", dataURL, true);
  req.send();
}

// display data in plain text
function displayRaw(data) {
  document.getElementById("raw").textContent = JSON.stringify(
    data,
    null,
    "    "
  );
}

function renderTooltip(v) {
  let html = `
<div class="tooltip-detail">
  <p class="key">Time</p> <p class="value">
    ${months[v.month]} ${v.year}
  </p>  
  <p class="key">Temperature</p> <p class="value">${v.temp.toFixed(3)}℃</p>  
  <p class="key">Variance</p><p class="value">${v.variance}</p>
</div>`;
  return html.trim();
}

// noinspection DuplicatedCode
function displayTooltip(tooltip, v, d) {
  tooltip.style("visibility", "visible");
  tooltip
    .attr("data-year", v.year)
    .html(renderTooltip(v))
    .style("left", d.clientX + 20 + "px")
    .style("top", d.clientY + 20 + "px");
  tooltip.style("opacity", "0.9");
}

function hideTooltip(tooltip) {
  tooltip.style("visibility", "collapse");
  tooltip.style("opacity", "0");
}

function tempColoring(temp) {
  let variance = temp - base;
  let percent = variance / base;

  // need this to amplify the color, otherwise, we can hardly see the
  // different. The value is chose arbitrary, though.
  let amplify = 2.5;
  let hue = 45 * (1 - percent * amplify);
  return `hsl(${hue}, 90%, 60%)`;
}

function draw(data) {
  d3.select("#chart").selectAll("svg").remove();

  let [w, h] = getChartSize();

  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("id", "vis")
    .attr("width", w)
    .attr("height", h);

  const legendHeight = 40;
  const padding = 10;
  const xAxisHeight = 10;
  const yAxisWidth = 50;

  // render the legend
  const legend = svg.append("g").attr("id", "legend");

  let minTemp = d3.min(data, (d) => d.temp);
  let maxTemp = d3.max(data, (d) => d.temp);
  let numLegends = 10;
  let legendTempStep = (maxTemp - minTemp) / numLegends;
  let legendValues = [];
  for (let i = 0; i < numLegends; i++) {
    legendValues.push(minTemp + legendTempStep * i);
  }
  let legendX = d3
    .scaleBand()
    .domain(legendValues)
    .range([0, w / 2]);

  legend
    .selectAll("rect")
    .data(legendValues)
    .enter()
    .append("rect")
    .attr("width", legendX.bandwidth())
    .attr("height", 20)
    .attr("x", (v) => w / 4 + legendX(v))
    .attr("y", h - padding - xAxisHeight)
    .attr("fill", tempColoring);

  legend
    .append("g")
    .call(d3.axisBottom(legendX).tickFormat((v) => v.toFixed(3)))
    .attr("height", xAxisHeight)
    .attr("transform", `translate(${w / 4}, ${h - xAxisHeight - padding})`);

  // render the rest of the chart
  h = h - legendHeight;

  let years = [...new Set(data.map((d) => d.year))].sort();
  const xScale = d3
    .scaleBand()
    .domain(years)
    .range([yAxisWidth + padding, w - padding - yAxisWidth]);

  const yScale = d3
    .scaleBand()
    .domain(months)
    .range([padding, h - padding - xAxisHeight]);

  let tooltip = d3.select("#tooltip");
  let tooltipFocused = false;

  // render the dots
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("data-year", (v) => v.year)
    .attr("data-month", (v) => v.month)
    .attr("data-temp", (v) => v.temp)
    .attr("class", "cell")
    .attr("width", xScale.bandwidth())
    .attr("height", yScale.bandwidth())
    .attr("x", (v) => xScale(v.year))
    .attr("y", (v) => yScale(months[v.month]))
    .attr("fill", (v) => tempColoring(v.temp))
    .on("mouseover", function (d, v) {
      d3.select(d.target).attr("class", "cell bordered");
      displayTooltip(tooltip, v, d);
    })
    .on("click", function (d, v) {
      displayTooltip(tooltip, v, d);
      tooltipFocused = true;
      d.preventDefault();
    })
    .on("mouseout", function (d) {
      d3.select(d.target).attr("class", "cell");
      if (!tooltipFocused) {
        hideTooltip(tooltip);
      }
    });

  document.addEventListener("click", function (d) {
    let tag = d.target.tagName;
    if (tag !== "circle") {
      tooltipFocused = false;
      hideTooltip(tooltip);
    }
  });

  // render the x-axis
  svg
    .append("g")
    .call(
      d3.axisBottom(xScale).tickValues(
        xScale.domain().filter(function (d, i) {
          return !(i % 15);
        })
      )
    )
    .attr("height", xAxisHeight)
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${h - padding - xAxisHeight})`);

  // render the y-axis
  svg
    .append("g")
    .call(d3.axisLeft(yScale))
    .attr("id", "y-axis")
    .attr("width", yAxisWidth)
    .attr("transform", `translate(${yAxisWidth + padding}, 0)`);
}

function getChartSize() {
  const chartStyle = getComputedStyle(document.getElementById("chart"));
  const w = parseInt(chartStyle.width);
  const h = parseInt(chartStyle.height);
  return [w, h];
}
