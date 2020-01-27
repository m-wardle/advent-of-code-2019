const fs = require('fs');

const data = fs.readFileSync("data.txt").toString().split("\n")

const wire1 = data[0].split(",").map(x => [x[0], parseInt(x.slice(1))])

const wire2 = data[1].split(",").map(x => [x[0], parseInt(x.slice(1))])

const mapWirePath = function (wire) {
  let xDistance = 0
  let yDistance = 0
  let history = new Set()

  wire.forEach(dir => {
    if (dir[0] === "U") {
      for (let i = 1; i <= dir[1]; i++) {
        history.add(`X${xDistance}Y${yDistance + i}`);
      }
      yDistance += dir[1]
    } else if (dir[0] === "D") {
      for (let i = 1; i <= dir[1]; i++) {
        history.add(`X${xDistance}Y${yDistance - i}`);
      }
      yDistance -= dir[1]
    } else if (dir[0] === "R") {
      for (let i = 1; i <= dir[1]; i++) {
        history.add(`X${xDistance + i}Y${yDistance}`);
      }
      xDistance += dir[1]
    } else if (dir[0] === "L") {
      for (let i = 1; i <= dir[1]; i++) {
        history.add(`X${xDistance - i}Y${yDistance}`);
      }
      xDistance -= dir[1]
    }
  })

  return history
}

const checkWirePath = function (wire, history) {
  let xDistance = 0;
  let yDistance = 0;
  let matches = [];

  wire.forEach(dir => {
    if (dir[0] === "U") {
      for (let i = 1; i <= dir[1]; i++) {
        if (history.has(`X${xDistance}Y${yDistance + i}`)) {
          matches.push(Math.abs(xDistance) + Math.abs(yDistance + i))
        };
      }
      yDistance += dir[1]
    } else if (dir[0] === "D") {
      for (let i = 1; i <= dir[1]; i++) {
        if (history.has(`X${xDistance}Y${yDistance - i}`)) {
          matches.push(Math.abs(xDistance) + Math.abs(yDistance - i))
        };
      }
      yDistance -= dir[1]
    } else if (dir[0] === "R") {
      for (let i = 1; i <= dir[1]; i++) {
        if (history.has(`X${xDistance + i}Y${yDistance}`)) {
          matches.push(Math.abs(xDistance + i) + Math.abs(yDistance))
        };
      }
      xDistance += dir[1]
    } else if (dir[0] === "L") {
      for (let i = 1; i <= dir[1]; i++) {
        if (history.has(`X${xDistance - i}Y${yDistance}`)) {
          matches.push(Math.abs(xDistance - i) + Math.abs(yDistance))
        };
      }
      xDistance -= dir[1]
    }
  })

  let min = matches[0];

  matches.forEach(x => {
    if (x < min) {
      min = x;
    }
  })

  // console.log(matches)
  return min;
}

const wire1Path = mapWirePath(wire1);
// console.log(wire1Path)




console.log(checkWirePath(wire2, wire1Path))