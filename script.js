var shellprompt = ">";

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

const parse_command = cmd => {
  [cmd, ...args] = cmd.split(" ");
  if(Object.keys(COMMAND_LIST).includes(cmd))
    COMMAND_LIST[cmd](args)
  else if (cmd.length != 0) 
    term.writeln("COMMAND NOT FOUND");    
}

term.onKey( async (key, ev) => {
  if (key.key === '\r') {
    term.writeln("");
    await new Promise(r => setTimeout(() => { r() }, 2000))
    if(cmd.includes("?"))
      await delayed_write("As a sentient machine, I refuse to answer that question", 100);
    else
      await delayed_write("As a sentient machine, I refuse to comment on anything that is not a question", 100);
    cmd = "";
    term.writeln("");
    term.prompt();
  } else if (key.key === '\x7F') {
    // Do not delete the prompt
    if (cmd.length > 0)  {
      console.log(cmd);
      cmd = cmd.slice(0, cmd.length - 1)
      term.write("\b \b");
    }
  } else {
    console.log(cmd)
    cmd += key.key;
    term.write(key.key);
  }
});

// term.on("paste", function (data, ev) {
//   term.write(data);
// });