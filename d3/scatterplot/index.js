"use strict";

window.addEventListener("load", function () {
  loadData(render);
});

const LOCAL_KEY = "cyclistData";

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

  if (w < 0.95 * mainW || w > mainW) {
    w = 0.95 * mainW;
  }

  const h = Math.floor((w * 9.0) / 16);
  e.style.width = `${w}px`;
  e.style.height = `${h}px`;
}

function processData(json) {
  return json
    .map((v) => {
      return {
        time: v["Time"],
        place: v["Place"],
        seconds: v["Seconds"],
        name: v["Name"],
        year: v["Year"],
        nationality: v["Nationality"],
        doping: v["Doping"],
        url: v["URL"],
      };
    })
    .sort((a, b) => {
      return a.year - b.year;
    });
}

function loadData(callback) {
  let downloaded = localStorage.getItem(LOCAL_KEY);
  if (downloaded !== null) {
    callback(downloaded);
  }

  const dataURL = "./cyclist.json";
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

function toDate(second) {
  return new Date(0, 0, 0, 0, Math.floor(second / 60), second % 60, 0);
}

function renderTooltip(v) {
  let html = `
<div class="biker">
  <p class="name">${v.name}</p>  
  <p class="key">Place</p> <p class="value">${v.place}</p>  
  <p class="key">Time (m:s)</p> <p class="value">${v.time}</p>  
  <p class="key">Year</p> <p class="value">${v.year}</p>`;
  if (v.doping !== "") {
    html += `
  <p class="key">Doping</p>
  <p class="value"><a href="${v.url}" target="_blank">${v.doping}</a></p>
`;
  }
  html += `</div>`;
  return html.trim();
}

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

function draw(data) {
  const [w, h] = getChartSize();
  const padding = 40;
  const xAxisHeight = 10;
  const yAxisWidth = 50;

  let first = data[0];
  let last = data[data.length - 1];
  const xScale = d3
    .scaleLinear()
    // minus one to avoid the axis origin point
    .domain([first.year - 1, last.year])
    .range([yAxisWidth + padding, w - padding - yAxisWidth]);

  let seconds = data.map((d) => d.seconds);
  const yScale = d3
    .scaleTime()
    .domain(d3.extent(seconds.map((s) => toDate(s))))
    .range([padding, h - padding - xAxisHeight]);

  let tooltip = d3.select("#tooltip");
  let tooltipFocused = false;

  d3.select("#chart").selectAll("svg").remove();

  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("id", "vis")
    .attr("width", w)
    .attr("height", h);

  // render the dots
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("data-xvalue", (v) => v.year)
    // toISOString() is really important, because Date.toString() format
    // can't be parsed correctly with new Date("string").
    // This burn my 2h.
    .attr("data-yvalue", (v) => toDate(v.seconds).toISOString())
    .attr("r", 5)
    .attr("class", (v) => (v.doping === "" ? "dot no-doping" : "dot"))
    .attr("cx", (v) => xScale(v.year))
    .attr("cy", (v) => yScale(toDate(v.seconds)))
    .on("mouseover", function (d, v) {
      displayTooltip(tooltip, v, d);
    })
    .on("click", function (d, v) {
      displayTooltip(tooltip, v, d);
      tooltipFocused = true;
      d.preventDefault();
    })
    .on("mouseout", function () {
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
    .call(d3.axisBottom(xScale).tickFormat((v) => (v < first.year ? "" : v)))
    .attr("height", xAxisHeight)
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${h - padding - xAxisHeight})`);

  svg
    .append("text")
    .text("Year")
    .attr("class", "axis-label")
    .attr("id", "x-axis-label")
    .attr("transform", `translate(${w / 2 - 10}, ${h - padding + 30})`);

  // render the y-axis
  svg
    .append("g")
    .call(d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S")))
    .attr("id", "y-axis")
    .attr("width", yAxisWidth)
    .attr("transform", `translate(${yAxisWidth + padding}, 0)`);

  svg
    .append("text")
    .text("Time in minutes")
    .attr("id", "y-axis-label")
    .attr("class", "axis-label")
    .attr("x", padding - h / 2)
    .attr("y", padding)
    .attr("transform", `rotate(-90, ${padding}, ${padding})`);

  // render the legend
  let legendContainer = svg.append("g").attr("id", "legend");

  let legend = legendContainer
    .selectAll("#legend")
    .data([true, false])
    .enter()
    .append("g")
    .attr("class", "legend-label")
    .attr("transform", function (d, i) {
      return "translate(0," + (h / 3 - i * 20) + ")";
    });

  legend
    .append("rect")
    .attr("x", w - padding - 200)
    .attr("width", 10)
    .attr("height", 10)
    .style("fill", (d) => (d ? "red" : "green"));

  legend
    .append("text")
    .attr("x", w - padding - 180)
    .attr("y", 5)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function (d) {
      if (d) {
        return "Doping allegations";
      } else {
        return "No doping allegations";
      }
    });
}

function getChartSize() {
  const chartStyle = getComputedStyle(document.getElementById("chart"));
  const w = parseInt(chartStyle.width);
  const h = parseInt(chartStyle.height);
  return [w, h];
}
