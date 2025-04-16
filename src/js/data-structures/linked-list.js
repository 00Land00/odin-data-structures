import { Node } from "js/data-structures/node";

function LinkedList() {
  let headNode = null;
  let tailNode = null;
  let nodeSize = 0;

  function append(value) {
    const newNode = Node(value);
    newNode.next = null;
    if (headNode === null) {
      headNode = newNode;
    }
    if (tailNode !== null) {
      tailNode.next = newNode;
    }
    tailNode = newNode;
    nodeSize++;
  }

  function prepend(value) {
    const newNode = Node(value);
    if (headNode !== null) {
      newNode.next = headNode;
    }
    if (tailNode === null) {
      tailNode = newNode;
    }
    headNode = newNode;
    nodeSize++;
  }

  function size() {
    return nodeSize;
  }

  function head() {
    return headNode;
  }

  function tail() {
    return tailNode;
  }

  function at(index) {
    if (index < 0 || index >= nodeSize) {
      return null;
    }

    let curNode = headNode;
    for (let i = 0; i < index; i++) {
      curNode = curNode.next;
    }
    return curNode;
  }

  function pop() {
    if (nodeSize === 0) {
      return null;
    }
    if (nodeSize === 1) {
      const poppedNode = headNode;
      headNode = tailNode = null;
      nodeSize = 0;
      return poppedNode;
    }

    let curNode = headNode;
    for (let i = 0; i < nodeSize - 2; i++) {
      curNode = curNode.next;
    }
    const poppedNode = curNode.next;
    curNode.next = null;
    tailNode = curNode;
    nodeSize--;
    return poppedNode;
  }

  function contains(value) {
    let curNode = headNode;
    while (curNode !== null) {
      if (curNode.value === value) {
        return true;
      }
      curNode = curNode.next;
    }
    return false;
  }

  function find(arg) {
    let curNode = headNode;
    let i = 0;

    const isPredicate = typeof arg === "function";
    while (curNode !== null) {
      const match = isPredicate ? arg(curNode.value) : curNode.value === arg; 

      if (match) return i;
      curNode = curNode.next;
      i++;
    }

    return -1;
  }

  function toString() {
    let outputStr = [];
    let curNode = headNode;
    while (curNode !== null) {
      outputStr.push(`( ${curNode.value} )`);
      curNode = curNode.next;
    }
    outputStr.push(`null`);
    return outputStr.join(` -> `);
  }

  function insertAt(value, index) {
    if (index < 0 || index > nodeSize) {
      return;
    }
    if (index === 0) {
      prepend(value);
      return;
    }
    if (index === nodeSize) {
      append(value);
      return;
    }

    const newNode = Node(value);
    let curNode = headNode;
    for (let i = 0; i < index - 1; i++) {
      curNode = curNode.next;
    }
    newNode.next = curNode.next;
    curNode.next = newNode;
    nodeSize++;
  }

  function removeAt(index) {
    if (index < 0 || index >= nodeSize) {
      return;
    }
    if (index === 0) {
      headNode = headNode.next;
      if (!headNode) {
        tailNode = null;
      }
      nodeSize--;
      return;
    }
    if (index === nodeSize - 1) {
      pop();
      return;
    }

    let curNode = headNode;
    for (let i = 0; i < index - 1; i++) {
      curNode = curNode.next;
    }
    curNode.next = curNode.next.next;
    nodeSize--;
  }

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
}

export { LinkedList };
