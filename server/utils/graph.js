//export default class Graph{
class Graph {
  constructor() {
    this.storage = {};
    this.size = 0;
  }
  add(value) {
    this.storage[value] = {};
    this.size++;
  }
  addConnection(fr, to) {
    this.storage[fr][to] = true;
    this.storage[to][fr] = true;
  }
  removeConnection(fr, to) {
    delete this.storage[fr][to];
    delete this.storage[to][fr];
  }
  contains(target) {
    return this.storage.hasOwnProperty(target);
  }
  hasConnection(fr, to) {
    return this.storage[fr].hasOwnProperty(to);
  }
  remove(val) {
    delete this.storage[val];
    this.size--;
    for (let key in this.storage) {
      if (this.storage[key][val]) {
        delete this.storage[key][val];
      }
    }
  }
}

const g=new Graph();
g.add("sony1");
g.add("sony2");
g.add("sony3");
g.add("sony4");
g.addConnection("sony1","sony2");
g.addConnection("sony2","sony3");

console.log(g);
