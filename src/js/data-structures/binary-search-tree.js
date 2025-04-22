import { Node } from "js/data-structures/node";
import { Queue } from "js/data-structures/queue";

function BinarySearchTree(arr) {
  let initArr = [...new Set(arr)];
  initArr.sort((a, b) => a - b);
  let root = buildTree(initArr);
  const queue = Queue();

  function buildTree(arr) {
    if (arr.length === 0) {
      return null;
    }

    const midIndex = Math.floor(arr.length / 2);
    const leftSubArr = arr.slice(0, midIndex);
    const rightSubArr = arr.slice(midIndex + 1);

    const midNode = Node(arr[midIndex]);
    midNode.left = buildTree(leftSubArr);
    midNode.right = buildTree(rightSubArr);

    return midNode;
  }

  function _prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      _prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      _prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  function prettyPrint(prefix = "", isLeft = true) {
    _prettyPrint(root, prefix, isLeft);
  }

  function _insert(curNode, value) {
    if (curNode === null) {
      const newNode = Node(value);
      newNode.left = newNode.right = null;
      return newNode;
    }

    if (value < curNode.value) {
      curNode.left = _insert(curNode.left, value);
    } else if (value > curNode.value) {
      curNode.right = _insert(curNode.right, value);
    }
    return curNode;
  }

  function insert(value) {
    root = _insert(root, value);
  }

  function _getSuccessor(curNode) {
    while (curNode.left) {
      curNode = curNode.left;
    }
    return curNode.value;
  }

  function _removeNode(curNode) {
    if (curNode.left) {
      if (curNode.right) {
        curNode.value = _getSuccessor(curNode.right);
        curNode.right = _remove(curNode.right, curNode.value);
        return curNode;
      } else {
        return curNode.left;
      }
    } else if (curNode.right) {
      return curNode.right;
    } else {
      return null;
    }
  }

  function _remove(curNode, value) {
    if (curNode) {
      if (value < curNode.value) {
        curNode.left = _remove(curNode.left, value);
      } else if (value > curNode.value) {
        curNode.right = _remove(curNode.right, value);
      } else {
        curNode = _removeNode(curNode);
      }
    }

    return curNode;
  }

  function remove(value) {
    root = _remove(root, value);
  }

  function _find(curNode, value) {
    if (curNode) {
      if (value < curNode.value) {
        return _find(curNode.left, value);
      } else if (value > curNode.value) {
        return _find(curNode.right, value);
      }
    }

    return curNode;
  }

  function find(value) {
    return _find(root, value);
  }

  function _levelOrder(callbackFn) {
    if (queue.isEmpty()) {
      return;
    }

    const nextNode = queue.dequeue().value;
    callbackFn(nextNode);

    if (nextNode.left) {
      queue.enqueue(nextNode.left);
    }
    if (nextNode.right) {
      queue.enqueue(nextNode.right);
    }

    _levelOrder(callbackFn);
  }

  function levelOrder(callbackFn) {
    if (!callbackFn) {
      throw Error("A callback function is required");
    }
    queue.clear();
    queue.enqueue(root);
    _levelOrder(callbackFn);
  }

  function _inOrder(curNode, callbackFn) {
    if (!curNode) {
      return;
    }

    _inOrder(curNode.left, callbackFn);
    callbackFn(curNode);
    _inOrder(curNode.right, callbackFn);
  }

  function inOrder(callbackFn) {
    if (!callbackFn) {
      throw Error("A callback function is required");
    }
    return _inOrder(root, callbackFn);
  }

  function _preOrder(curNode, callbackFn) {
    if (!curNode) {
      return;
    }

    callbackFn(curNode);
    _preOrder(curNode.left, callbackFn);
    _preOrder(curNode.right, callbackFn);
  }

  function preOrder(callbackFn) {
    if (!callbackFn) {
      throw Error("A callback function is required");
    }
    return _preOrder(root, callbackFn);
  }

  function _postOrder(curNode, callbackFn) {
    if (!curNode) {
      return;
    }

    _postOrder(curNode.left, callbackFn);
    _postOrder(curNode.right, callbackFn);
    callbackFn(curNode);
  }

  function postOrder(callbackFn) {
    if (!callbackFn) {
      throw Error("A callback function is required");
    }
    return _postOrder(root, callbackFn);
  }

  function _height(curNode) {
    if (!curNode) return -1;

    const leftHeight = _height(curNode.left) + 1;
    const rightHeight = _height(curNode.right) + 1;
    return Math.max(leftHeight, rightHeight);
  }

  function height(value) {
    const targetNode = find(value);
    if (targetNode) {
      return _height(targetNode);
    }

    return null;
  }

  function _depth(curNode, value, level) {
    if (!curNode) return null;

    if (value < curNode.value) {
      return _depth(curNode.left, value, level + 1);
    } else if (value > curNode.value) {
      return _depth(curNode.right, value, level + 1);
    } else {
      return level;
    }
  }

  function depth(value) {
    return _depth(root, value, 0);
  }

  function _isBalanced(curNode) {
    if (!curNode) return -1;

    const leftHeight = _isBalanced(curNode.left);
    const rightHeight = _isBalanced(curNode.right);
    if (leftHeight === null || rightHeight === null) return null;
    if (Math.abs(leftHeight - rightHeight) > 1) return null;

    return Math.max(leftHeight + 1, rightHeight + 1);
  }

  function isBalanced() {
    return _isBalanced(root) !== null;
  }

  function rebalance() {
    const arr = [];
    function toArr(node) {
      arr.push(node.value);
    }

    inOrder(toArr);

    root = buildTree(arr);
  }

  return {
    buildTree,
    prettyPrint,
    insert,
    remove,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

export { BinarySearchTree };
