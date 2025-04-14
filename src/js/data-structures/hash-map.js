import { LinkedList } from "js/data-structures/linked-list";
import { LinkedListIterator } from "js/linked-list-iterator";

function HashMap() {
  const MAX_LOAD_FACTOR = 0.8;
  const MIN_LOAD_FACTOR = 0.2;
  const MIN_CAPACITY = 16;
  let count = 0;
  let capacity = MIN_CAPACITY;
  let hashMap = Array(capacity)
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
    const entryArr = entries();
    clear();

    entryArr.forEach(([key, value]) => {
      set(key, value);
    });
  }

  function grow() {
    capacity *= 2;
    resize();
  }

  function set(key, value) {
    if (has(key)) {
      const node = get(key);
      node.value = value;
      return;
    }

    const hashCode = hash(key);
    const linkedList = hashMap[hashCode];
    linkedList.prepend({ key, value });
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
    const linkedList = hashMap[hashCode];
    linkedList.removeAt(linkedList.find(nodeValue => nodeValue.key === key));
    count--;

    if (count < MIN_LOAD_FACTOR * capacity && capacity > MIN_CAPACITY) {
      shrink();
    }

    return true;
  }

  function get(key) {
    const hashCode = hash(key);
    const linkedList = hashMap[hashCode];
    const iter = LinkedListIterator(linkedList);
    while (iter.hasMore()) {
      const next = iter.getNext();
      if (next.value.key === key) {
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
    hashMap = Array(capacity)
      .fill(null)
      .map(() => LinkedList());
  }

  function keys() {
    const keyArr = entries().map((keyVal) => keyVal[0]);
    return keyArr;
  }

  function values() {
    const valueArr = entries().map((keyVal) => keyVal[1]);
    return valueArr;
  }

  function entries() {
    const entryArr = [];
    hashMap.forEach((linkedList) => {
      if (linkedList.size() > 0) {
        const iter = LinkedListIterator(linkedList);
        while (iter.hasMore()) {
          const node = iter.getNext();
          entryArr.push([node.value.key, node.value.value]);
        }
      }
    });

    return entryArr;
  }

  return {
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
  };
}

export { HashMap };
