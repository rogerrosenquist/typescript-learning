// src/BST.ts

export class TreeNode {
    value: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;

    constructor(value: number) {
        this.value = value;
    }
}

export class BinarySearchTree {
    root: TreeNode | null = null;

    insert(value: number): void {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    private insertNode(node: TreeNode, newNode: TreeNode): void {
        if (newNode.value < node.value) {
            if (!node.left) node.left = newNode;
            else this.insertNode(node.left, newNode);
        } else {
            if (!node.right) node.right = newNode;
            else this.insertNode(node.right, newNode);
        }
    }

    find(value: number): TreeNode | null {
        let current = this.root;
        while (current) {
            if (value === current.value) return current;
            // If value is less, go left. If greater, go right.
            current = value < current.value ? current.left : current.right;
        }

        return null; // Not found
    }

    // Prints all values from smallest to largest
    printInOrder(node: TreeNode | null = this.root): void {
        if (node !== null) {
            this.printInOrder(node.left);   // Visit left side
            console.log(node.value);        // Visit self
            this.printInOrder(node.right);  // Visit right side
        }
    }

    getMin(): number | null {
        if (!this.root) return null;
        let current = this.root;
        while (current.left) current = current.left;
        return current.value;
    }

    getMax(): number | null {
        if (!this.root) return null;
        let current = this.root;
        while (current.right) current = current.right;
        return current.value;
    }

    // Public method for the user to call
    delete(value: number): void {
        this.root = this.deleteNode(this.root, value);
    }

    // Recursive helper to find and remove the node
    private deleteNode(node: TreeNode | null, value: number): TreeNode | null {
        if (node === null) return null;

        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
        } else {
            // We found the node to delete!

            // Case 1 & 2: No child or one child
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            // Case 3: Two children
            // Get the smallest value from the right side
            node.value = this.getMinFromNode(node.right);
            // Delete that smallest node from the right side
            node.right = this.deleteNode(node.right, node.value);
        }
        return node;
    }

    // Helper to find the smallest value in a specific subtree
    private getMinFromNode(node: TreeNode): number {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current.value;
    }
}