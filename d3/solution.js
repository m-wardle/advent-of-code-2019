const fs = require('fs');

const data = fs.readFileSync("data.txt").toString().split("\n")

const wire1 = data[0].split(",").map(x => [x[0], parseInt(x.slice(1))])

const wire2 = data[1].split(",").map(x => [x[0], parseInt(x.slice(1))])

const mapWirePath = function (wire) {
  let xDistance = 0;
  let yDistance = 0;
  let counter = 0;
  let history = {};

  wire.forEach(dir => {
    if (dir[0] === "U") {
      for (let i = 1; i <= dir[1]; i++) {
        counter++
        history[`X${xDistance}Y${yDistance + i}`] = history[`X${xDistance}Y${yDistance + i}`] || counter;
      }
      yDistance += dir[1]
    } else if (dir[0] === "D") {
      for (let i = 1; i <= dir[1]; i++) {
        counter++
        history[`X${xDistance}Y${yDistance - i}`] = history[`X${xDistance}Y${yDistance - i}`] || counter;
      }
      yDistance -= dir[1]
    } else if (dir[0] === "R") {
      for (let i = 1; i <= dir[1]; i++) {
        counter++
        history[`X${xDistance + i}Y${yDistance}`] = history[`X${xDistance + i}Y${yDistance}`] || counter;
      }
      xDistance += dir[1]
    } else if (dir[0] === "L") {
      for (let i = 1; i <= dir[1]; i++) {
        counter++
        history[`X${xDistance - i}Y${yDistance}`] = history[`X${xDistance - i}Y${yDistance}`] || counter;
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
  let counter = 0;

  wire.forEach(dir => {
    if (dir[0] === "U") {
      for (let i = 1; i <= dir[1]; i++) {
        counter++;
        if (history[`X${xDistance}Y${yDistance + i}`]) {
          matches.push([Math.abs(xDistance) + Math.abs(yDistance + i), history[`X${xDistance}Y${yDistance + i}`], counter])
        };
      }
      yDistance += dir[1]
    } else if (dir[0] === "D") {
      for (let i = 1; i <= dir[1]; i++) {
        counter++;
        if (history[`X${xDistance}Y${yDistance - i}`]) {
          matches.push([Math.abs(xDistance) + Math.abs(yDistance - i), history[`X${xDistance}Y${yDistance - i}`], counter])
        };
      }
      yDistance -= dir[1]
    } else if (dir[0] === "R") {
      for (let i = 1; i <= dir[1]; i++) {
        counter++;
        if (history[`X${xDistance + i}Y${yDistance}`]) {
          matches.push([Math.abs(xDistance + i) + Math.abs(yDistance), history[`X${xDistance + i}Y${yDistance}`], counter])
        };
      }
      xDistance += dir[1]
    } else if (dir[0] === "L") {
      for (let i = 1; i <= dir[1]; i++) {
        counter++;
        if (history[`X${xDistance - i}Y${yDistance}`]) {
          matches.push([Math.abs(xDistance - i) + Math.abs(yDistance), history[`X${xDistance - i}Y${yDistance}`], counter])
        };
      }
      xDistance -= dir[1]
    }
  })

  let min = (matches[0][1] + matches[0][2]);

  matches.forEach(x => {
    let steps = x[1] + x[2]
    if (steps < min) {
      min = steps;
    }
  })

  // console.log(matches)
  return min;
}

const wire1Path = mapWirePath(wire1);

console.log(checkWirePath(wire2, wire1Path))