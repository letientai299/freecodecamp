const seconds = 60;

const Clock = (p) => {
  const format = (t) => {
    const m = Math.floor(t / 60);
    const s = t - m * 60;
    return `${("" + m).padStart(2, "0")}:${("" + s).padStart(2, "0")}`;
  };

  return (
    <div>
      <label id={"timer-label"}>{p.title}</label>
      <p id="time-left">{format(p.remain)}</p>
    </div>
  );
};

const Control = (p) => {
  return (
    <div>
      <button id="start_stop" onClick={p.startStop}>
        {p.running ? "Pause" : "Start"}
      </button>
      <button id="reset" onClick={p.reset}>
        Reset
      </button>
    </div>
  );
};

const Setting = (p) => {
  const id = p.name.toLowerCase();
  return (
    <div>
      <label id={id + "-label"}>{p.name} Length</label>
      <p id={id + "-length"}>{p.minutes}</p>
      <button id={id + "-increment"} onClick={p.inc}>
        ^
      </button>
      <button id={id + "-decrement"} onClick={p.dec}>
        v
      </button>
    </div>
  );
};

const App = () => {
  const [broke, setBreak] = React.useState(5);
  const [session, setSession] = React.useState(25);
  const [running, setRunning] = React.useState(false);
  const [isSession, setIsSession] = React.useState(true);
  const [remain, setRemain] = React.useState(
    isSession ? session * seconds : broke * seconds
  );

  React.useEffect(() => {
    setRemain(isSession ? session * seconds : broke * seconds);
  }, [isSession, session, broke]);

  React.useEffect(() => {
    if (!running) {
      return;
    }

    const t = setInterval(() => {
      setRemain((v) => {
        if (v == 0) {
          document.getElementById("beep").play();
          let sess = isSession;
          setIsSession((v) => {
            sess = !v;
            return !v;
          });
          return sess ? session * seconds : broke * seconds;
        }

        return v - 1;
      });
    }, 1000);
    return () => {
      clearInterval(t);
    };
  }, [running, isSession, session, broke]);

  const startStop = () => {
    setRunning((v) => !v);
  };

  const reset = () => {
    setRunning(false);
    setBreak(5);
    setSession(25);
    setIsSession(true);
    setRemain(25 * seconds);
    const beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0;
  };

  return (
    <div>
      <Clock remain={remain} title={isSession ? "Session" : "Break"} />
      <Control reset={reset} startStop={startStop} running={running} />
      <Setting
        name="Break"
        minutes={broke}
        inc={() => setBreak((v) => (v >= 60 ? v : v + 1))}
        dec={() => setBreak((v) => (v > 1 ? v - 1 : v))}
      />

      <Setting
        name="Session"
        minutes={session}
        inc={() => setSession((v) => (v >= 60 ? v : v + 1))}
        dec={() => setSession((v) => (v > 1 ? v - 1 : v))}
      />
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
