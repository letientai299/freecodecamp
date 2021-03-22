(function () {
  let isHandlerDragging = false;
  let timeline = document.getElementById("timeline");
  let msgContainer = document.getElementById("message");
  let columnSizes;

  let timeElements = [...timeline.getElementsByClassName("time-wrap")];
  timeElements.push(...timeline.getElementsByClassName("time-now"));
  timeElements.push(...timeline.getElementsByClassName("time-start"));
  timeElements.forEach((te) => {
    te.addEventListener("mouseenter", function (e) {
      let cfg = calculateWorkLifeSize();
      pickAndShowMessage(cfg);
    });

    te.addEventListener("mouseleave", function (e) {
      hideMessage();
    });
  });

  timeline.addEventListener("mousedown", function (e) {
    let t = e.target;
    if (t.className.includes("time")) {
      isHandlerDragging = true;
    }
  });

  timeline.addEventListener("mousemove", function (e) {
    // Don't do anything if dragging flag is false
    if (!isHandlerDragging) {
      return false;
    }
    let cfg = calculateWorkLifeSize();
    let change = e.movementX;
    cfg.work += change;
    cfg.life -= change;
    timeline.style.gridTemplateColumns = `${cfg.work}px ${cfg.time}px ${cfg.life}px`;
    pickAndShowMessage(cfg);
  });

  timeline.addEventListener("mouseup", function (e) {
    // Turn off dragging flag when user mouse is up
    isHandlerDragging = false;
  });

  function pickAndShowMessage(cfg) {
    let total = cfg.time + cfg.work + cfg.life + cfg.gap * 2;
    let rate = (100 * (cfg.time / 2 + cfg.gap + cfg.work)) / total;
    let left = cfg.work + cfg.gap + cfg.time / 2;
    let show = (msg) => showMessage(msg, left, rate);
    if (rate === 50) {
      show("Perfectly balance, as all things should be.");
    } else if (45 < rate && rate < 55) {
      show("Still quite balance");
    } else if (35 < rate && rate <= 45) {
      show("You'll not be productive");
    } else if (25 < rate && rate <= 35) {
      show("No one will hire you");
    } else if (rate <= 25) {
      show("Are you a NEET?");
    } else if (55 <= rate && rate < 65) {
      show("That's not healthy");
    } else if (65 <= rate && rate < 75) {
      show("That's too much");
    } else {
      show("Damn!");
    }
  }

  function calculateWorkLifeSize() {
    let style = window.getComputedStyle(timeline);
    let gap = parseFloat(style.columnGap);
    console.log(gap);
    columnSizes = style.gridTemplateColumns;
    let [work, time, life] = columnSizes.split(" ").map((s) => parseFloat(s));
    return { work: work, time: time, life: life, gap: gap };
  }

  function hideMessage() {
    msgContainer.style.visibility = "hidden";
  }

  function showMessage(msg, left, rate) {
    msgContainer.innerText = msg;
    msgContainer.style.visibility = "visible";
    msgContainer.style.left = `${left}px`;
    rate = Math.abs(50 - rate);
    let light = rate;
    light = (light / 30) * 50;
    if (light > 50) {
      light = 50;
      msgContainer.style.fontWeight = `bold`;
    }
    msgContainer.style.color = `hsl(0, ${rate * 2}%, ${light}%)`;
  }
})();
