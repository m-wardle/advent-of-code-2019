const fs = require('fs');

const data = fs.readFileSync("data.txt").toString().split("\n")

const wire1 = data[0].split(",").map(x => [x[0], parseInt(x.slice(1))])

const wire2 = data[1].split(",").map(x => [x[0], parseInt(x.slice(1))])

