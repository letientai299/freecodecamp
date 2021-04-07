var MaxHeap = function() {
  this.heap = [null];
  this.insert = (ele) => {
    var index = this.heap.length;
    var arr = [...this.heap];
    arr.push(ele);
    while (ele > arr[Math.floor(index / 2)] && index > 1) {
      arr[index] = arr[Math.floor(index / 2)];
      arr[Math.floor(index / 2)] = ele;
      index = arr[Math.floor(index / 2)];
    }
    this.heap = arr;
  }
  this.print = () => {
    return this.heap.slice(1);
  }
  // Only change code below this line

  // Only change code above this line
};

// TODO