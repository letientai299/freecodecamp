const http = require("https");
const axios = require("axios");

// WARNING: this is per worker, won't work well when running this
// application in cluster mode.
let stockLikes = initMem();

function initMem() {
  return {};
}

const resetInternal = 10 * 60 * 1000;
(function resetMem() {
  stockLikes = initMem();
  setInterval(resetMem, resetInternal);
})();

// ensure all symbol exits in map
function ensure(symbols) {
  const ss = [];
  if (symbols instanceof Array) {
    ss.push(...symbols);
  } else {
    ss.push(symbols);
  }
  ss.forEach((s) => {
    s = s.toUpperCase();
    if (!stockLikes[s]) {
      stockLikes[s] = new Set();
    }
  });
}

module.exports = function (router) {
  router.route("/api/stock-prices").get(async function (req, res, next) {
    const like = req.query.like === "true";
    const symbols = req.query.stock;
    if (!symbols) {
      return res.status(400).json("need 1 or 2 stock symbols");
    }

    ensure(symbols);

    if (!(symbols instanceof Array)) {
      const data = await stockData(symbols, like, req);
      return res.json({ stockData: data });
    }

    let [a, b] = symbols;
    let data = [await stockData(a, like, req), await stockData(b, like, req)];
    let [x, y] = data;
    const relLikes = x.likes - y.likes;
    delete x.likes;
    delete y.likes;
    x["rel_likes"] = relLikes;
    y["rel_likes"] = -relLikes;
    data = [x, y];
    return res.json({ stockData: data });
  });
};

async function stockData(sym, like, req) {
  sym = sym.toUpperCase();
  if (like) {
    stockLikes[sym].add(req.ip);
  }

  const s = await quote(sym);
  const raw = s.data;
  return {
    likes: stockLikes[sym].size,
    price: raw.open,
    stock: sym,
  };
}

async function quote(sym) {
  const url = `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${sym}/quote`;
  try {
    return await axios.get(url);
  } catch (err) {
    return err;
  }
}
