const buttons = [
  { id: "nine", text: "9" },
  { id: "eight", text: "8" },
  { id: "seven", text: "7" },
  { id: "add", text: "+" },

  { id: "six", text: "6" },
  { id: "five", text: "5" },
  { id: "four", text: "4" },

  { id: "subtract", text: "-" },
  { id: "three", text: "3" },
  { id: "two", text: "2" },
  { id: "one", text: "1" },

  { id: "multiply", text: "*" },
  { id: "decimal", text: "." },
  { id: "zero", text: "0" },
  { id: "divide", text: "/" },
  { id: "equals", text: "=" },
];

const display = document.getElementById("display");

const input = document.getElementById("input");

document.getElementById("clear").onclick = () => {
  handleClick("C");
};

const handleClick = (b) => {
  let v = input.value;
  let r = display.value;
  if (r == "0") {
    r = "";
  }
  switch (b) {
    case "C":
      display.value = 0;
      input.value = "";
      return;

    case "=":
      v = eval(r);
      r = v;
      break;

    case "+":
    case "-":
    case "*":
    case "/":
      if ("+-*/".indexOf(v[v.length - 1]) < 0) {
        // input is not an operator yet
        r += b;
        v = b;
        break;
      }

      if (b != "-") {
        // replace the last 1 or 2 operators in r with b
        while ("+-*/".indexOf(r[r.length - 1]) >= 0) {
          r = r.slice(0, r.length - 1);
        }
        r += b;
        break;
      }

      // add negative minus if r only has trailing 1 operator
      if (r.length >= 2 && "+-*/".indexOf(r[r.length - 2]) < 0) {
        r += b;
        break;
      }

      // otherwise, ignore it
      break;

    case "0":
      if (v.indexOf(".") >= 0 || v != "0" || v == "") {
        v += b;
        r += b;
      }
      break;

    case ".":
      if (v.indexOf(".") >= 0) {
        return;
      }
      r += b;
      v += b;
      break;

    default:
      if (v == "0" || "+-*/".indexOf(v) >= 0) {
        v = b;
      } else {
        v += b;
      }
      r += b;
  }

  input.value = v;
  if (r == "") {
    r = "0";
  }

  display.value = r;
};

const calc = document.getElementById("calculator");

buttons.forEach((b) => {
  const el = document.createElement("button");
  el.id = b.id;
  el.value = b.text;
  el.onclick = (ev) => handleClick(ev.target.value);
  el.className = "btn";
  el.innerText = b.text;
  calc.appendChild(el);
});

// 1h18
