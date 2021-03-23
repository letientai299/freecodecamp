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

const LOCAL_KEY_COUNTIES = "counties.json";
const LOCAL_KEY_EDU = "for_user_education.json";

// render the loaded data
function render(edu, counties) {
  resizeChart();
  displayRaw(edu, counties);

  edu = processDataEdu(edu);
  counties = processDataCounties(counties);
  draw(edu, counties);

  window.addEventListener("resize", function () {
    resizeChart();
    draw(edu, counties);
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

  const size = 0.9;
  if (w < size * mainW || w > mainW) {
    w = size * mainW;
  }

  const h = Math.floor((w * 9.0) / 16);
  e.style.width = `${w}px`;
  e.style.height = `${h}px`;
}

function processDataCounties(counties) {
  return counties;
}

function processDataEdu(edu) {
  let eduMap = {};
  edu
    .map((v) => {
      return {
        fips: v["fips"],
        state: v["state"],
        areaName: v["area_name"],
        education: v["bachelorsOrHigher"],
      };
    })
    .forEach((v) => (eduMap[v.fips] = v));
  return eduMap;
}

function loadData(callback) {
  let edu = JSON.parse(localStorage.getItem(LOCAL_KEY_EDU));
  let counties = JSON.parse(localStorage.getItem(LOCAL_KEY_COUNTIES));

  if (edu !== null && counties) {
    callback(edu, counties);
    return;
  }

  if (counties !== null) {
    loadDataByKey(LOCAL_KEY_EDU, function (dataEdu) {
      callback(dataEdu, counties);
    });
    return;
  }

  if (edu !== null) {
    loadDataByKey(LOCAL_KEY_COUNTIES, function (dataCounties) {
      callback(edu, dataCounties);
    });
    return;
  }

  loadDataByKey(LOCAL_KEY_EDU, function (dataEdu) {
    loadDataByKey(LOCAL_KEY_COUNTIES, function (dataCounties) {
      callback(dataEdu, dataCounties);
    });
  });
}

// noinspection DuplicatedCode
function loadDataByKey(key, fn) {
  const dataURL = "./" + key;
  const req = new XMLHttpRequest();
  req.onload = function (e) {
    if (req.readyState === 4) {
      if (req.status === 200) {
        const raw = req.responseText;
        const json = JSON.parse(raw);
        localStorage.setItem(key, JSON.stringify(json));
        fn(json);
        return;
      }

      console.error("failed to load data", req.statusText);
    }
  };

  req.open("GET", dataURL, true);
  req.send();
}

// display data in plain text
function displayRaw(edu, counties) {
  document.getElementById("raw_edu").textContent = JSON.stringify(
    edu,
    null,
    "    "
  );

  document.getElementById("raw_counties").textContent = JSON.stringify(
    counties,
    null,
    "    "
  );
}

function renderTooltip(v) {
  let html = `
<div class="tooltip-detail">
  <p class="name">${v.areaName}</p> 
  <p class="key">Area Name</p><p class="value">${v.state}</p>  
  <p class="key">Bachelors Or Higher</p>
  <p class="value">
    ${v.education.toFixed(3)}%
  </p>  
</div>`;
  return html.trim();
}

function displayTooltip(tooltip, v, d) {
  tooltip.style("visibility", "visible");
  tooltip
    .attr("data-education", v.education)
    .html(renderTooltip(v))
    .style("left", d.clientX + 10 + "px")
    .style("top", d.clientY + 10 + "px");
  tooltip.style("opacity", "0.9");
}

function hideTooltip(tooltip) {
  tooltip.style("visibility", "collapse");
  tooltip.style("opacity", "0");
}

function eduColoring(eduPercent) {
  let p = eduPercent * 2;
  if (p > 100) {
    p = 100;
  }
  return `hsl(120, ${p}%, 50%)`;
}

// noinspection DuplicatedCode
function draw(edu, counties) {
  d3.select("#chart").selectAll("svg").remove();

  let [w, h] = getChartSize();

  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("id", "vis")
    .attr("width", w)
    .attr("height", h);

  let tooltip = d3.select("#tooltip");

  let us = topojson.feature(counties, counties["objects"]["counties"]);

  // Damn, my guess is correct. geoIdentity is helpful here because the map
  // is already render nicely, we just need to use fitSize to center it
  // within the svg.
  // https://github.com/d3/d3-geo#projection_fitSize
  let path = d3.geoPath().projection(d3.geoIdentity().fitSize([w, h], us));

  // render the map
  svg
    .append("g")
    .selectAll("path")
    .data(us.features)
    .enter()
    .append("path")
    .attr("fill", (d) => eduColoring(edu[d.id].education))
    .attr("class", "county")
    .attr("d", path)
    .attr("data-fips", (d) => d.id)
    .attr("data-education", (d) => {
      return edu[d.id].education;
    })
    .on("mouseover", (d, v) => displayTooltip(tooltip, edu[v.id], d))
    .on("mouseout", () => hideTooltip(tooltip));

  // render the legend
  const legend = svg.append("g").attr("id", "legend");
  const legendWidth = w / 2;

  let numLegends = 10;
  let legendTempStep = 100 / numLegends;
  let legendValues = [];
  let padding = 20;
  w -= padding;
  for (let i = 0; i <= numLegends; i++) {
    legendValues.push(legendTempStep * i);
  }
  let legendX = d3.scaleBand().domain(legendValues).range([0, legendWidth]);

  legend
    .selectAll("rect")
    .data(legendValues)
    .enter()
    .append("rect")
    .attr("width", legendWidth / numLegends)
    .attr("height", 20)
    .attr("x", (v) => w - legendWidth + legendX(v))
    .attr("y", 0)
    .attr("fill", eduColoring);

  legend
    .append("g")
    .call(d3.axisBottom(legendX).tickFormat((v) => v.toFixed(0) + "%"))
    .attr("height", 40)
    .attr("transform", `translate(${w - legendWidth}, 0)`);
}

function getChartSize() {
  const chartStyle = getComputedStyle(document.getElementById("chart"));
  const w = parseInt(chartStyle.width);
  const h = parseInt(chartStyle.height);
  return [w, h];
}
