import { LinkedList } from "js/data-structures/linked-list";
import { LinkedListIterator } from "js/data-structures/linked-list-iterator";

function HashSet() {
  const MAX_LOAD_FACTOR = 0.75;
  const MIN_LOAD_FACTOR = 0.25;
  const MIN_CAPACITY = 16;
  let count = 0;
  let capacity = MIN_CAPACITY;
  let hashSet = Array(capacity)
    .fill(null)
    .map(() => LinkedList());

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  function resize() {
    const keyArr = keys();
    clear();

    keyArr.forEach((key) => {
      set(key);
    });
  }

  function grow() {
    capacity *= 2;
    resize();
  }

  function set(key) {
    if (has(key)) {
      return;
    }

    const hashCode = hash(key);
    const linkedList = hashSet[hashCode];
    linkedList.prepend(key);
    count++;

    if (count > MAX_LOAD_FACTOR * capacity) {
      grow();
    }
  }

  function shrink() {
    capacity /= 2;
    resize();
  }

  function remove(key) {
    if (!has(key)) {
      return false;
    }

    const hashCode = hash(key);
    const linkedList = hashSet[hashCode];
    linkedList.removeAt(linkedList.find(key));
    count--;

    if (count < MIN_LOAD_FACTOR * capacity && capacity > MIN_CAPACITY) {
      shrink();
    }

    return true;
  }

  function get(key) {
    const hashCode = hash(key);
    const linkedList = hashSet[hashCode];
    const iter = LinkedListIterator(linkedList);
    while (iter.hasMore()) {
      const next = iter.getNext();
      if (next.value === key) {
        return next.value;
      }
    }
    return null;
  }

  function has(key) {
    return Boolean(get(key));
  }

  function length() {
    return count;
  }

  function clear() {
    count = 0;
    hashSet = Array(capacity)
      .fill(null)
      .map(() => LinkedList());
  }

  function keys() {
    const keyArr = [];
    hashSet.forEach((linkedList) => {
      if (!linkedList.isEmpty()) {
        const iter = LinkedListIterator(linkedList);
        while (iter.hasMore()) {
          const node = iter.getNext();
          keyArr.push(node.value);
        }
      }
    });
    return keyArr;
  }

  return {
    set,
    has,
    remove,
    length,
    clear,
    keys,
  };
}

export { HashSet };
