const formatQuote = (q) => {
  let tweet = `"${q.text}"-- ${q.author}

via https://letientai.io/freecodecamp solutions
`;
  return encodeURI(tweet);
};

const QuoteBox = (p) => {
  const progressStyle = {
    // required for first load animation,
    // before setInterval in App kicks in.
    animationDuration: p.duration + "ms",
  };

  const tweetLink = `https://twitter.com/intent/tweet?text=${formatQuote(
    p.quote
  )}&hashtags=freeCodeCamp`;
  return (
    <div id="quote-box">
      <p id="text">{p.quote.text}</p>
      <p id="author">{p.quote.author}</p>
      <div id="buttons">
        <div id="progress" style={progressStyle} />
        <a id="new-quote" onClick={p.reload} href="#" alt="New quote">
          <img src="./icons8-refresh.svg" alt="New quote button" />
        </a>
        <a id="tweet-quote" href={tweetLink} target="_blank" alt="Tweet">
          <img src="./icons8-twitter.svg" alt="Tweet quote button" />
        </a>
      </div>
    </div>
  );
};

const loadQuote = (cb) => {
  fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((data) => {
      cb({
        text: data.content,
        author: data.author,
      });
    });
};

const App = () => {
  const [quote, setQuote] = React.useState({});
  const duration = 10000;

  const progress = document.getElementById("progress");
  if (progress) {
    progress.style.animation = "none";
    progress.offsetHeight; // trigger reflow to restart animation
    progress.style.animation = null;
    progress.style.animationDuration = duration + "ms";
  }

  const reload = () => {
    const progress = document.getElementById("progress");
    progress.style.animationPlayState = "paused";
    loadQuote(setQuote);
  };

  React.useEffect(() => {
    const id = setInterval(reload, duration);
    return () => clearInterval(id);
  }, [quote]);

  if (!quote || !quote.text) {
    loadQuote(setQuote);
    return;
  }

  return (
    <div id="quote-box">
      <QuoteBox quote={quote} reload={reload} duration={duration} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
