(function () {
  let isHandlerDragging = false;
  let timeline = document.getElementById("timeline");
  let columnSizes;

  document.addEventListener("mousedown", function (e) {
    let t = e.target;
    if (t.className.includes("time")) {
      isHandlerDragging = true;
    }
  });

  document.addEventListener("mousemove", function (e) {
    // Don't do anything if dragging flag is false
    if (!isHandlerDragging) {
      return false;
    }

    columnSizes = window.getComputedStyle(timeline).gridTemplateColumns;
    let [w, t, l] = columnSizes.split(" ").map((s) => parseFloat(s));
    let change = e.movementX;
    w += change;
    l -= change;
    timeline.style.gridTemplateColumns = `${w}px ${t}px ${l}px`;
  });

  document.addEventListener("mouseup", function (e) {
    // Turn off dragging flag when user mouse is up
    isHandlerDragging = false;
  });
})();
