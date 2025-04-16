let nextIndex = 0;

function Node(value = null) {
  const newNode = {
    id: nextIndex++,
    value,
  };

  return newNode;
}

export { Node };
