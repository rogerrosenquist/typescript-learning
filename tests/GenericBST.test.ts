import { describe, it, expect, beforeEach } from 'vitest';
import { GenericBST } from '../src/GenericBST.js';

describe('GenericBST', () => {
  let bst: GenericBST<number>;

  // This runs before every single test to give us a fresh tree
  beforeEach(() => {
    bst = new GenericBST<number>();
  });

  it('should insert values and find them', () => {
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);

    expect(bst.find(10)).not.toBeNull();
    expect(bst.find(5)?.value).toBe(5);
    expect(bst.find(99)).toBeNull();
  });

  it('should delete a leaf node', () => {
    bst.insert(10);
    bst.insert(5);
    bst.delete(5);
    
    expect(bst.find(5)).toBeNull();
    expect(bst.find(10)).not.toBeNull();
  });

  it('should handle deleting the root node', () => {
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.delete(10);

    expect(bst.find(10)).toBeNull();
    // Check if the tree restructures correctly
    expect(bst.root?.value).toBe(15); 
  });
});