const fs = require('fs');

const data = fs.readFileSync("data.txt")

const orbits = data
  .toString()
  .split("\n")
  .map(x => x.split(`)`))
  .reduce((acc, [value, key]) => ({ ...acc, [key]: value }), {});

const getNumOrbits = (orbits, name) => (orbits[name] ? 1 + getNumOrbits(orbits, orbits[name]) : 0);

const orbitNumbers = Object.keys(orbits)
  .map(name => getNumOrbits(orbits, name))
  .reduce((acc, val) => acc + val)

// console.log(orbits)

class Graph {
  constructor(adjList) {
    this.noOfVertices = 0;
    this.adjList = {};
  }

  addNode(node) {
    this.adjList[node] = {};
    this.adjList[node]["parent"] = null;
    this.adjList[node]["children"] = [];
    this.noOfVertices++
  }

  addChild(n1, n2) {
    this.adjList[n1].children.push(n2);
  }

  addParent(n1, n2) {
    this.adjList[n1].parent = n2;
  }

  findParent(dest, visited) {
    for (let planet in this.adjList) {
      if (this.adjList[planet].children.includes(dest) && (visited ? !visited.includes(planet) : true)) {
        return (planet)
      }
    }
  }

  lca(start, end) {
    let senior = start;
    let junior = end;
    let visited = [];
    if (getNumOrbits(orbits, senior) > getNumOrbits(orbits, junior)) {
      senior = end;
      junior = start
    }

    let startAnc = [start];
    let endAnc = [end];

    let startSearch = start;
    let endSearch = end;

    while (this.findParent(startSearch, visited)) {
      startAnc.push(this.findParent(startSearch, visited));
      visited.push(startSearch)
      startSearch = this.findParent(startSearch, visited);
    }

    visited = [];

    while (this.findParent(endSearch, visited)) {
      endAnc.push(this.findParent(endSearch, visited));
      visited.push(endSearch)
      endSearch = this.findParent(endSearch, visited);
    }

    for (let i of startAnc) {
      for (let j of endAnc) {
        if (i === j) {
          console.log(i);
          return i;
        }
      }
    }
  }
}

const graph = new Graph()

for (let child in orbits) {
  let parent = orbits[child];
  if (!graph.adjList[parent]) {
    graph.addNode(parent);
  };
  graph.addChild(parent, child)
}

for (let child in orbits) {
  if (graph.findParent(orbits[child])) {
    graph.addParent(orbits[child], graph.findParent(orbits[child]))
  }
}

const startNode = graph.findParent("YOU");

const endNode = graph.findParent("SAN")


let ancNode = graph.lca(startNode, endNode)

console.log((getNumOrbits(orbits, startNode) - getNumOrbits(orbits, ancNode)) + (getNumOrbits(orbits, endNode) - getNumOrbits(orbits, ancNode)))



