const FILES = {
    "foo.txt": {
        "content": `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
    }
}

const COMMAND_LIST = {
    "clear": () => {
        term.clear();
    },
    "hello": () => {
        term.writeln("");
        delayed_write("Hi, how are you?", 280);
        term.prompt()
    },
    "help": () => {
        term.writeln("");
        Object.keys(COMMAND_LIST).map(cmd => term.writeln(cmd));
    },
    "ls": () => {
        term.writeln("");
        Object.keys(FILES).map(file => term.writeln(file));
    },
    "cat": ([filename, ..._]) => {
        term.writeln("");
        term.writeln(FILES[filename].content)
    },
    "hack": async (obj) => {
        if(obj[0] === "the", obj[1] === "planet") {
            await delayed_write("Hacking google.com..........", 280);
            term.write("DONE!");
            term.writeln("");
            await delayed_write("Hacking facebook.com..........", 280);
            term.write("DONE!");
            term.writeln("");
        } else {
            await delayed_write(`Hacking ${obj[0]}..............`, 280);
            term.write("DONE!");
            term.writeln("");
        }
    }
}