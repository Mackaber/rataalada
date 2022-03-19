import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import Terminal from "xterm";
import "xterm/lib/xterm.css";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <Hello name="CodeSandbox" />
    <h2>Start editing to see some magic happen {"\u2728"}</h2>
  </div>
);

render(<App />, document.getElementById("root"));
var term = new Terminal();
term.open(document.getElementById("terminal"), false);
var shellprompt = "<?>";

term.prompt = function () {
  term.write("\r\n" + shellprompt);
};

term.writeln("Welcome to xterm.js");
term.writeln(
  "This is a local terminal emulation, without a real terminal in the back-end."
);
term.writeln("Type some keys and commands to play around.");
term.writeln("");
term.prompt();
term.setOption("cursorBlink", true);

var cmd = "";

const delayed_write = async function (string, ms) {
  let chars = string.split("");
  for (let i = 0; i < chars.length; i++) {
    await new Promise(r => setTimeout(() => { r(term.write(chars[i])); }, ms));
  }
};

term.on("key", function (key, ev) {
  var printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;

  if (ev.keyCode == 13) {
    if (cmd === "clear") {
      term.clear();
    }
    if (cmd === "hello") {
      term.writeln("");
      delayed_write("Hi, how are you?", 280);
    }
    cmd = "";
    term.prompt();
  } else if (ev.keyCode == 8) {
    // Do not delete the prompt
    console.log(term.rows);
    if (term.x > 2) {
      term.write("\b \b");
    }
  } else if (printable) {
    cmd += key;
    term.write(key);
  }
});

term.on("paste", function (data, ev) {
  term.write(data);
});
