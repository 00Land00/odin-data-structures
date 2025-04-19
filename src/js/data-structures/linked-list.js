import { Node } from "js/data-structures/node";

function LinkedList() {
  let headNode = null;
  let tailNode = null;
  let nodeSize = 0;

  function append(value) {
    const newNode = Node(value);
    newNode.next = null;
    newNode.prev = null;

    if (!headNode) {
      headNode = tailNode = newNode;
    } else {
      tailNode.next = newNode;
      newNode.prev = tailNode;
      tailNode = newNode;
    }
    nodeSize++;
  }

  function prepend(value) {
    const newNode = Node(value);
    newNode.next = null;
    newNode.prev = null;

    if (!headNode) {
      headNode = tailNode = newNode;
    } else {
      newNode.next = headNode;
      headNode.prev = newNode;
      headNode = newNode;
    }
    nodeSize++;
  }

  function size() {
    return nodeSize;
  }

  function isEmpty() {
    return nodeSize === 0;
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

    let curNode, i;
    if (index <= nodeSize / 2) {
      curNode = headNode;
      for (i = 0; i < index; i++) {
        curNode = curNode.next;
      }
    } else {
      curNode = tailNode;
      for (i = nodeSize - 1; i > index; i--) {
        curNode = curNode.prev;
      }
    }

    return curNode;
  }

  function shift() {
    if (nodeSize === 0) {
      return null;
    }

    const shiftedNode = headNode;

    if (nodeSize === 1) {
      headNode = tailNode = null;
    } else {
      headNode = headNode.next;
      headNode.prev = null;
    }

    shiftedNode.next = null;

    nodeSize--;
    return shiftedNode;
  }

  function pop() {
    if (nodeSize === 0) {
      return null;
    }

    const poppedNode = tailNode;

    if (nodeSize === 1) {
      headNode = tailNode = null;
    } else {
      tailNode = tailNode.prev;
      tailNode.next = null;
    }

    poppedNode.prev = null;

    nodeSize--;
    return poppedNode;
  }

  function contains(value) {
    let headPtr = headNode;
    let tailPtr = tailNode;

    if (!headPtr || !tailPtr) {
      return false;
    }

    while (headPtr && tailPtr) {
      if (headPtr.value === value || tailPtr.value === value) return true;
      if (headPtr === tailPtr || headPtr.next === tailPtr) break;

      headPtr = headPtr.next;
      tailPtr = tailPtr.prev;
    }

    return false;
  }

  function find(arg) {
    let headPtr = headNode;
    let headIndex = 0;
    let tailPtr = tailNode;
    let tailIndex = nodeSize - 1;

    if (!headPtr || !tailPtr) {
      return -1;
    }

    const isPredicate = typeof arg === "function";
    while (headPtr && tailPtr) {
      const headMatch = isPredicate
        ? arg(headPtr.value)
        : headPtr.value === arg;
      const tailMatch = isPredicate
        ? arg(tailPtr.value)
        : tailPtr.value === arg;

      if (headMatch) return headIndex;
      if (tailMatch) return tailIndex;
      if (headPtr === tailPtr || headPtr.next === tailPtr) break;

      headPtr = headPtr.next;
      headIndex++;
      tailPtr = tailPtr.prev;
      tailIndex--;
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
    return outputStr.join(` <-> `);
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
    let curNode;
    if (index <= nodeSize / 2) {
      curNode = headNode;
      for (let i = 0; i < index - 1; i++) {
        curNode = curNode.next;
      }
      newNode.next = curNode.next;
      newNode.prev = curNode;
      newNode.next.prev = newNode;
      curNode.next = newNode;
    } else {
      curNode = tailNode;
      for (let i = nodeSize - 1; i > index; i--) {
        curNode = curNode.prev;
      }
      newNode.prev = curNode.prev;
      newNode.next = curNode;
      newNode.prev.next = newNode;
      curNode.prev = newNode;
    }

    nodeSize++;
  }

  function removeAt(index) {
    if (index < 0 || index >= nodeSize) {
      return;
    }
    if (index === 0) {
      shift();
      return;
    }
    if (index === nodeSize - 1) {
      pop();
      return;
    }

    let curNode;
    if (index <= nodeSize / 2) {
      curNode = headNode;
      for (let i = 0; i < index; i++) {
        curNode = curNode.next;
      }
    } else {
      curNode = tailNode;
      for (let i = nodeSize - 1; i > index; i--) {
        curNode = curNode.prev;
      }
    }

    curNode.prev.next = curNode.next;
    curNode.next.prev = curNode.prev;
    curNode.next = curNode.prev = null;

    nodeSize--;
  }

  function clear() {
    headNode = null;
    tailNode = null;
    nodeSize = 0;
  }

  return {
    append,
    prepend,
    size,
    isEmpty,
    head,
    tail,
    at,
    shift,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
    clear,
  };
}

export { LinkedList };
