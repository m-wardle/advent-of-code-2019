const fs = require("fs");
const data = fs.readFileSync("data.txt").toString().split("\n").map(x => parseInt(x));
const reducer = (acc, val) => acc + (Math.floor(val / 3) - 2);

const withFuel = (mod) => {
  let mass = (Math.floor(mod / 3) - 2);
  return (mass > 0 ? mass + withFuel(mass) : 0)
}

console.log(data.reduce((a, v) => a + withFuel(v), 0));