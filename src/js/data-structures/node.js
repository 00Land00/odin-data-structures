function Node(value = null) {
  let _next = null;
  const newNode = {
    value,
    get next() {
      return _next;
    },
    set next(newNode) {
      if (newNode !== null) {
        if (typeof newNode !== "object" || !("next" in newNode)) {
          throw new TypeError("next must be a Node instance");
        }
      }
      _next = newNode;
    }
  }

  return newNode;
}

export { Node };
