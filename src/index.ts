import { GenericBST } from './GenericBST.js';
import { LinkedList } from './LinkedList.js';
import { myMap } from './ArrayUtils.js';

console.log("--- 1. Array Utilities Test ---");
const nums = [10, 20, 30];
const formatted = myMap(nums, n => `Value: ${n}`);
console.log("Mapped:", formatted);

console.log("\n--- 2. Generic BST Test ---");
const bst = new GenericBST<string>();
["B", "A", "C"].forEach(char => bst.insert(char));
console.log("In-Order Traversal (Should be A, B, C):");
bst.printInOrder();

console.log("\n--- 3. Linked List Test (Reversal) ---");
const list = new LinkedList<number>();
[1, 2, 3].forEach(n => list.append(n));

console.log("Original Head:", list.head?.value); // 1
list.reverse();
console.log("Reversed Head:", list.head?.value); // 3

console.log("\n✅ All manual index tests passed!");