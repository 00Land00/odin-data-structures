import { LinkedList } from "js/data-structures/linked-list";
import { LinkedListIterator } from "js/data-structures/linked-list-iterator";

function Queue() {
  const queue = LinkedList();

  function enqueue(value) {
    queue.append(value);
  }

  function dequeue() {
    return queue.shift();
  }

  function peek() {
    return queue.head();
  }

  function isEmpty() {
    return queue.isEmpty();
  }

  function size() {
    return queue.size();
  }

  function clear() {
    queue.clear();
  }

  function toString() {
    const iter = LinkedListIterator(queue);

    let outputStr = [];
    while (iter.hasMore()) {
      const node = iter.getNext();
      outputStr.push(`( ${node.value} )`);
    }
    outputStr.push(`null`);
    return outputStr.join(` <- `);
  }

  return {
    enqueue,
    dequeue,
    peek,
    isEmpty,
    size,
    clear,
    toString,
  };
}

export { Queue };