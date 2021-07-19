const fs = require("fs");
const prompt = require("prompt-sync")();
let variables = {};
const fn = process.argv[2];
const file = fs.readFileSync(__dirname + `/${fn}`, "utf8");
const arrayoflines = file.split("\n");
arrayoflines.forEach((line) => {
  const splittedline = line.split(" ");
  if (splittedline[0] == "say") {
    if (!splittedline[1]) {
      console.log("Um..... say nothing?");
    } else if (line.includes('"')) {
      const resplit = line.split(`"`);
      console.log(resplit[1]);
    } else {
      console.log(variables[splittedline[1]]);
    }
  } else if (splittedline[0] == "let") {
    const varname = splittedline[1];
    if (splittedline[2] == "be") {
      if (splittedline[3]) {
        variables[varname] = splittedline[3];
      }
    }
  } else if (splittedline[0] == "calculate") {
    const expression = splittedline[1];
    const answer = eval(expression);
    if (splittedline[2] == "into") {
      variables[splittedline[3]] = answer;
    }
  } else if (splittedline[0] == "ask") {
    let quoted;
    if (line.includes(`"`)) {
      const quotes = line.split(`"`);
      quoted = quotes[1];
    } else {
      quoted = variables[splittedline[1]];
    }
    if (splittedline[2] == "into") {
      if (splittedline[3]) {
        variables[splittedline[3]] = prompt(quoted);
      }
    }
  }
});
