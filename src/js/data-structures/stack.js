import { LinkedList } from "js/data-structures/linked-list";
import { LinkedListIterator } from "js/data-structures/linked-list-iterator";

function Stack() {
  const stack = LinkedList();

  function push(value) {
    stack.prepend(value);
  }

  function pop() {
    return stack.shift();
  }

  function peek() {
    return stack.head();
  }

  function isEmpty() {
    return stack.isEmpty();
  }

  function size() {
    return stack.size();
  }

  function clear() {
    stack.clear();
  }

  function toString() {
    const iter = LinkedListIterator(stack);

    let outputStr = [];
    while (iter.hasMore()) {
      const node = iter.getNext();
      outputStr.push(`( ${node.value} )`);
    }
    outputStr.push(`null`);
    return outputStr.join(` <- `);
  }

  return {
    push,
    pop,
    peek,
    isEmpty,
    size,
    clear,
    toString,
  };
}

export { Stack };
