<script>
  import { shortcut } from "./shortcut.js";
  const pads = [
    {
      keyCode: 81,
      keyTrigger: "Q",
      id: "Heater-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    {
      keyCode: 87,
      keyTrigger: "W",
      id: "Heater-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    {
      keyCode: 69,
      keyTrigger: "E",
      id: "Heater-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    {
      keyCode: 65,
      keyTrigger: "A",
      id: "Heater-4",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    {
      keyCode: 83,
      keyTrigger: "S",
      id: "Clap",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    {
      keyCode: 68,
      keyTrigger: "D",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
      keyCode: 90,
      keyTrigger: "Z",
      id: "Kick-n'-Hat",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    {
      keyCode: 88,
      keyTrigger: "X",
      id: "Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
    {
      keyCode: 67,
      keyTrigger: "C",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    },
  ];

  const playSound = (ev, pad) => {
    if (
      ev.type == "click" ||
      (ev.type == "keyup" && ev.key == pad.keyTrigger)
    ) {
      const sound = document.getElementById(`${pad.keyTrigger}`);
      sound.currentTime = 0;
      sound.play();
      const display = document.getElementById(`display`);
      display.innerText = pad.id;
    }
  };
</script>

<div id="drum-machine">
  <div id="drumpads">
    {#each pads as pad}
      <button
        id="drum-pad-{pad.id}"
        class="drum-pad"
        on:keyup={(ev) => playSound(ev, pad)}
        on:click={(ev) => playSound(ev, pad)}
        use:shortcut={{ code: "Key" + pad.keyTrigger }}
      >
        <audio
          id={pad.keyTrigger}
          src={pad.url}
          class="clip"
          type="audio/mpeg"
        />
        {pad.keyTrigger}</button
      >
    {/each}
  </div>
  <div id="display">Press the key!</div>
  <hr />
  <p>
    The major achievemnet is able to compile the Svelte in browser, without a
    build step. The code, however, isn't not so good. It's just mostly
    hand-written HTML with very limited feature of Svelte. Anyways, the point of
    Svelte is to compile into effecieint JS. I'm using it the wrong way!
  </p>
</div>

<style>
  #drum-machine {
    text-align: center;
    max-width: 50%;
    background-color: white;
    border-radius: 3em;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95em 1.95em 2.6em;
    margin: auto;
    padding: 5em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #display {
    padding: 1em;
    font-size: 2em;
  }

  #drumpads {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 2px;
  }

  .drum-pad {
    font-size: 4em;
    width: 2em;
    height: 2em;
  }
</style>
