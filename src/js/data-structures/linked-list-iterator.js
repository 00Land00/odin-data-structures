function LinkedListIterator(linkedList) {
  let curNode = linkedList.head();

  function getNext() {
    if (hasMore()) {
      const next = curNode;
      curNode = curNode.next;
      return next;
    }
  }

  function hasMore() {
    return Boolean(curNode);
  }

  return {
    getNext,
    hasMore,
  };
}

export { LinkedListIterator };
