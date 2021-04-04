(function() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  const bgURL = "./assets/background.jpg";

  const resizeApp = () => {
    let width = app.renderer.width;
    let height = app.renderer.height;
    const background = PIXI.TilingSprite.from(bgURL, { width, height });
    // even though we can resize the background, it still flashes a lot, not
    // nice.  and CPU heavy.
    app.stage.removeChild(background);
    app.stage.addChild(background);
  };

  const createApp = () => {
    let app = new PIXI.Application({ resizeTo: window });
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    const background = PIXI.TilingSprite.from(bgURL, { width, height });

    app.stage.addChild(background);
    return app;
  };

  const app = createApp();
  document.body.appendChild(app.view);
  window.addEventListener("resize", resizeApp);
})();
