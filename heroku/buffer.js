const { Stream } = require("stream");
const bufferSize = 1024 * 1024; // 1MB
const enc = "ascii";

class BufferedStream extends Stream {
  constructor(out) {
    super();
    this.out = out;
    this.cap = bufferSize;
    this.current = 0;
    this.buffer = Buffer.alloc(bufferSize);
    flushOnExit(this);
  }

  write(chunk) {
    // console.log(this.cap - this.current, chunk.length);
    if (chunk.length > this.cap - this.current) {
      const b = this.buffer.slice(0, this.current);
      const s = b.toString(enc);
      this.out.write(s);
      this.current = 0;
    }

    this.buffer.fill(chunk, this.current);
    this.current += chunk.length;
  }

  flush() {
    const b = this.buffer.slice(0, this.current);
    this.current = 0;
    const s = b.toString(enc);
    this.out.write(s);
    console.log("flushed");
  }
}

function flushOnExit(log) {
  const cleanExits = ["SIGINT", "exit", "SIGUSR1", "SIGUSR2", "SIGTERM"];

  cleanExits.forEach((e) =>
    process.on(e, (e) => {
      log.write(`server shutdown due to event=${e}\n`);
      log.flush();
      process.exit(0);
    })
  );
}

module.exports = { BufferedStream };
