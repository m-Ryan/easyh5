import { INodeItem } from '@/components/templete/templete.type';

export class TreeNode {
  public key: string;
  public node: INodeItem;
  public left: TreeNode | null;
  public right: TreeNode | null;
  constructor(key: string, node: INodeItem) {
    this.key = key;
    this.node = node;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  private root: TreeNode | null;
  constructor() {
    this.root = null;
  }

  public insert(key: string, node: INodeItem) {
    const newNode = new TreeNode(key, node);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  public insertNode(node: TreeNode, newNode: TreeNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  };

  // 中序遍历
  public inOrderTraversen(callback: (newNode: TreeNode | null) => void) {
    var inOrderTraverseNode = function (node: TreeNode | null, callback: (newNode: TreeNode) => void) {
      if (node !== null) {
        inOrderTraverseNode(node.left, callback);
        callback(node);
        inOrderTraverseNode(node.right, callback);
      }
    };
    inOrderTraverseNode(this.root, callback);
  };



  // 先序遍历

  public preOrderTraverse(callback: (newNode: TreeNode | null) => void) {
    var preOrderTraverseNode = function (node: TreeNode | null, callback: (newNode: TreeNode) => void) {
      if (node !== null) {
        callback(node);
        preOrderTraverseNode(node.left, callback);
        preOrderTraverseNode(node.right, callback);
      }
    };
    preOrderTraverseNode(this.root, callback);
  };


  // 后序遍历
  public postOrderTraverse(callback: (newNode: TreeNode | null) => void) {
    var postOrderTraverseNode = function (node: TreeNode | null, callback: (newNode: TreeNode) => void) {
      if (node !== null) {
        postOrderTraverseNode(node.left, callback);
        postOrderTraverseNode(node.right, callback);
        callback(node);
      }
    };
    postOrderTraverseNode(this.root, callback);
  };


  public min() {
    const minNode = function (node: TreeNode | null) {
      if (node) {
        while (node && node.left !== null) {
          node = node.left;
        }
        return node.key;
      }
      return null;
    };
    return minNode(this.root);
  };

  public max() {
    const maxNode = function (node: TreeNode | null) {
      if (node) {
        while (node && node.right !== null) {
          node = node.right;
        }
        return node.key;
      }
      return null;
    };
    return maxNode(this.root);
  };

  public search(key: string) {
    var searchNode = function (node: TreeNode | null, key: string): boolean {
      if (node === null) {
        return false;
      }
      if (key < node.key) {
        return searchNode(node.left, key);
      } else if (key > node.key) {
        return searchNode(node.right, key);
      } else {
        return true;
      }
    };
    return searchNode(this.root, key);
  };

  public remove(key: string) {
    var findMinNode = function (node: TreeNode) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node;
    };
    var findMinNode = function (node: TreeNode) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node;
    };

    var removeNode = function (node: TreeNode | null, key: string) {
      if (node === null) { // {2}
        return null;
      }
      if (key < node.key) { // {3}
        node.left = removeNode(node.left, key); // {4} 
        return node; // {5}
      } else if (key > node.key) { // {6}
        node.right = removeNode(node.right, key); // {7}
        return node; // {8}
      } else { // 键等于node.key
        // 第一种情况——一个叶节点
        if (node.left === null && node.right === null) { // {9}
          node = null; // {10}
          return node; // {11}
        }
        // 第二种情况——一个只有一个子节点的节点
        if (node.left === null) { // {12}
          node = node.right; // {13}
          return node; // {14}
        } else if (node.right === null) { // {15}
          node = node.left; // {16}
          return node; // {17}
        }
        // 第三种情况——一个有两个子节点的节点
        const aux = findMinNode(node.right); // {18}
        node.key = aux.key; // {19}
        node.right = removeNode(node.right, aux.key); // {20}
        return node; // {21}
      }
    };

    this.root = removeNode(this.root, key);
  }

}