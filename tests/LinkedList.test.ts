import { describe, it, expect, beforeEach } from "vitest";
import { LinkedList } from "../src/LinkedList.js";

describe("LinkedList", () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  it("should append values correctly", () => {
    list.append(10);
    list.append(20);
    expect(list.size).toBe(2);
    expect(list.head?.value).toBe(10);
    expect(list.head?.next?.value).toBe(20);
  });

  it("should prepend values correctly", () => {
    list.append(10);
    list.prepend(5);
    expect(list.size).toBe(2);
    expect(list.head?.value).toBe(5);
  });

  it("should find a value in the list", () => {
    list.append(1);
    list.append(2);
    list.append(3);
    const found = list.find(2);
    expect(found).not.toBeNull();
    expect(found?.value).toBe(2);
  });

  it("should return null if value not found", () => {
    list.append(1);
    expect(list.find(99)).toBeNull();
  });

  it("should remove a node from the middle", () => {
    list.append(1);
    list.append(2);
    list.append(3);
    const removed = list.remove(2);

    expect(removed).toBe(true);
    expect(list.size).toBe(2);
    expect(list.find(2)).toBeNull();
    expect(list.head?.next?.value).toBe(3); // 1 now points to 3
  });

  it("should remove the head node", () => {
    list.append(1);
    list.append(2);
    list.remove(1);
    expect(list.head?.value).toBe(2);
    expect(list.size).toBe(1);
  });

  it("should reverse the list order", () => {
    list.append(1);
    list.append(2);
    list.append(3);

    list.reverse();

    expect(list.head?.value).toBe(3);
    expect(list.head?.next?.value).toBe(2);
    expect(list.head?.next?.next?.value).toBe(1);
    expect(list.head?.next?.next?.next).toBeNull();
  });

  it("should update head and tail correctly after reverse", () => {
    list.append(1);
    list.append(2);
    list.append(3);

    list.reverse();

    expect(list.head?.value).toBe(3);
    expect(list.tail?.value).toBe(1); // The tail should now be the old head
    expect(list.tail?.next).toBeNull(); // The tail's next must be null
  });
});
