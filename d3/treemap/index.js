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

const LOCAL_KEY_FUNDING = "kickstarter-funding-data.json";

// render the loaded data
function render(fund) {
  resizeChart();
  displayRaw(fund);

  fund = processData(fund);
  draw(fund);

  window.addEventListener("resize", function () {
    resizeChart();
    draw(fund);
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

  const size = 1;
  if (w < size * mainW || w > mainW) {
    w = size * mainW;
  }

  const h = Math.floor((w * 9.0) / 16);
  e.style.width = `${w}px`;
  e.style.height = `${h}px`;
}

function processData(fund) {
  return fund;
}

// this is getting more and more ugly,
// thankfully, this is the last project.
// I should learn how to manage data and callback with JS
function loadData(callback) {
  let fund = JSON.parse(localStorage.getItem(LOCAL_KEY_FUNDING));

  if (fund !== null) {
    callback(fund);
    return;
  }

  // this is slow, all three should be load async,
  // but it's not important right now
  loadDataByKey(LOCAL_KEY_FUNDING, function (fund) {
    callback(fund);
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
function displayRaw(fund) {
  let access = (s) => document.getElementById(s);
  let spaces = "    ";
  access("raw_funding").textContent = JSON.stringify(fund, null, spaces);
}

function renderTooltip(v) {
  let html = `
<div class="tooltip-detail">
  <p class="name">${v.name}</p> 
  <p class="key">Category</p><p class="value">${v.category}</p>  
  <p class="key">Value</p>
  <p class="value">
    ${v.value}
  </p>  
</div>`;
  return html.trim();
}

function displayTooltip(tooltip, v, d) {
  tooltip.style("visibility", "visible");
  tooltip
    .attr("data-value", v.value)
    .html(renderTooltip(v))
    .style("left", `${d.pageX + 1}px`)
    .style("top", `${d.pageY + 1}px`);
  tooltip.style("opacity", "0.9");
}

function moveTooltip(tooltip, d) {
  tooltip.style("left", `${d.pageX + 1}px`).style("top", `${d.pageY + 1}px`);
}

function hideTooltip(tooltip) {
  tooltip.style("visibility", "collapse");
  tooltip.style("opacity", "0");
}

function genColors(fund) {
  let cats = new Set();
  fund.children.forEach((c) => {
    if (!cats.has(c.name)) {
      cats.add(c.name);
    }
  });

  cats = [...cats];
  let step = 360 / cats.length;
  let colors = {};
  for (let i = 0; i < cats.length; i++) {
    colors[cats[i]] = `hsl(${step * i}, 70%, 40%)`;
  }

  return colors;
}

// noinspection DuplicatedCode
function draw(fund) {
  d3.select("#chart").selectAll("svg").remove();

  let [w, h] = getChartSize();
  const legendHeight = 120;

  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("id", "vis")
    .attr("width", w)
    .attr("height", h);

  let tooltip = d3.select("#tooltip");

  let root = d3.hierarchy(fund).sum((d) => d.value);
  d3
    .treemap()
    .size([w, h - legendHeight])
    .padding(1)(root);

  let colors = genColors(fund);

  // render the map
  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
    .attr("class", "tile")
    .attr("data-name", (d) => d.data.name)
    .attr("data-value", (d) => d.data.value)
    .attr("data-category", (d) => d.data.category)
    .attr("x", (d) => d.x0)
    .attr("y", (d) => d.y0)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("fill", (d) => colors[d.data.category])
    .on("mouseover", (d, v) => displayTooltip(tooltip, v.data, d))
    .on("mousemove", (d, v) => moveTooltip(tooltip, d))
    .on("mouseout", () => hideTooltip(tooltip));

  const fontSize = h / 70;
  const textPadding = fontSize / 2;

  svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
    .attr("x", (d) => d.x0 + textPadding)
    .attr("y", (d) => d.y0 + 2 * textPadding)
    .attr("data-width", (d) => d.x1 - d.x0 - 2 * textPadding)
    .attr("data-height", (d) => d.x1 - d.x0 - 2 * textPadding)
    .attr("fill", "#eee")
    .attr("font-size", `${fontSize}px`)
    .text((d) => d.data.name)
    .call((d) => wrapText(d, fontSize))
    .on("mouseover", (d, v) => displayTooltip(tooltip, v.data, d))
    .on("mouseout", () => hideTooltip(tooltip));

  drawLegend(colors, svg, w, h, legendHeight, root);
}

function drawLegend(colors, svg, w, h, legendHeight, root) {
  let cats = Object.keys(colors);
  const legendRectSize = 20;
  const legendPadding = 10;
  const legendPerLine = 5;
  let legend = svg.append("g").attr("id", "legend");

  legend
    .selectAll("rect")
    .data(cats)
    .enter()
    .append("rect")
    .attr("x", (_, i) => 40 + (w / legendPerLine) * (i % legendPerLine))
    .attr("y", (_, i) => {
      let line = Math.floor(i / legendPerLine);
      return h - legendHeight + legendPadding + line * (legendRectSize + 10);
    })
    .attr("width", (_) => legendRectSize)
    .attr("height", (_) => legendRectSize)
    .attr("fill", (d) => colors[d])
    .attr("class", "legend-item")
    .attr(
      "data-value",
      (d) => root.children.filter((n) => n.data.name === d)[0].name
    );

  legend
    .selectAll("text")
    .data(cats)
    .enter()
    .append("text")
    .text((d) => {
      let c = root.children.filter((c) => c.data.name === d)[0];
      return d + ` - \$${(c.value / 1000000).toFixed(2)}M`;
    })
    .attr(
      "x",
      (_, i) =>
        40 + (w / legendPerLine) * (i % legendPerLine) + legendRectSize + 2
    )
    .attr("y", (_, i) => {
      let line = Math.floor(i / legendPerLine);
      return (
        h -
        legendHeight +
        legendPadding +
        line * (legendRectSize + 10) +
        legendRectSize / 1.4
      );
    });
}

// copy and modified from
// https://medium.com/swlh/create-a-treemap-with-wrapping-text-using-d3-and-react-5ba0216c48ce
function wrapText(d, fontSize) {
  d.each(function () {
    const node = d3.select(this);
    const rectWidth = +node.attr("data-width");
    const rectHeight = +node.attr("data-height");
    let word;
    const words = node.text().split(" ").reverse();
    let line = [];
    const x = node.attr("x");
    const y = node.attr("y");
    let tspan = node.text("").append("tspan").attr("x", x).attr("y", y);
    let lineNumber = 0;
    let overflow = false;
    while (words.length > 1 && !overflow) {
      word = words.pop();
      line.push(word);
      tspan.text(line.join(" "));
      const tspanLength = tspan.node().getComputedTextLength();

      if (tspanLength > rectWidth && line.length !== 1) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = addTspan(word);
      }

      overflow = (lineNumber + 1) * (fontSize + 2) >= rectHeight;
    }

    if (!overflow) {
      addTspan(words.pop());
    } else {
      addTspan("...");
    }

    function addTspan(text) {
      lineNumber += 1;
      return node
        .append("tspan")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", `${lineNumber * fontSize + 2}px`)
        .attr("text-length", (d) => d.x1 - d.x0)
        .text(text);
    }
  });
}

function getChartSize() {
  const chartStyle = getComputedStyle(document.getElementById("chart"));
  const w = parseInt(chartStyle.width);
  const h = parseInt(chartStyle.height);
  return [w, h];
}
