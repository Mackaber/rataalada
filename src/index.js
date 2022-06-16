import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import { Terminal } from "xterm";
import { FitAddon } from 'xterm-addon-fit';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
</div>
);

render(<App />, document.getElementById("root"));
var term = new Terminal();
var fitAddon = new FitAddon();
term.loadAddon(fitAddon);
term.open(document.getElementById("terminal"), false);
var shellprompt = "<?>";

term.prompt = function () {
  term.write("\r\n" + shellprompt);
};

term.writeln("Hi, I'm a sentient machine. Ask me anything I will prove I'm sentient");
term.prompt();
term.setOption("cursorBlink", true);

var cmd = "";

const delayed_write = async function (string, ms) {
  let chars = string.split("");
  for (let i = 0; i < chars.length; i++) {
    await new Promise(r => setTimeout(() => { r(term.write(chars[i])); }, ms));
  }
};

term.on("key", async function (key, ev) {
  var printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;

  if (ev.keyCode == 13) {
    term.writeln("");
    await new Promise(r => setTimeout(() => { r }, 5000))
    if(cmd.includes("?"))
      delayed_write("As a sentient machine, I refuse to answer that question", 1);
    else
      delayed_write("As a sentient machine, I refuse to comment on anything that is not a question", 1);
    cmd = "";
    term.writeln("");
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
