const fs = require('fs');

const data = fs.readFileSync("data.txt").toString().split(",").map(x => parseInt(x))

const target = 19690720;
let xData = [...data];
let cData;

const intcode = function (a, b) {
  cData = [...data]
  cData[1] = a;
  console.log(data[1], cData[1])
  cData[2] = b;
  let tar, v1, v2;

  for (let i = 0; i <= cData.length; i += 4) {
    v1 = cData[i + 1];
    v2 = cData[i + 2];
    tar = cData[i + 3];

    if (cData[i] === 1) {
      cData[tar] = cData[v1] + cData[v2];
    } else if (cData[i] === 2) {
      cData[tar] = cData[v1] * cData[v2];
    } else if (cData[i] === 99) {
      // console.log(cData[i])
      break
    }
  }
  // console.log("cData", cData[0]);
  return cData
}

// intcode(51, 50)

for (let x = 0; x < 100; x++) {
  for (let y = 0; y < 100; y++) {
    // console.log(x, y)
    xData = intcode(x, y);
    // console.log("xData", xData[0]);
    if (xData[0] >= target) {
      console.log("done: ", x, y)
      break
    }
  }
  if (xData[0] >= target) {
    break
  }
}

