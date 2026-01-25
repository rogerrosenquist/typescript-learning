import { describe, it, expect, beforeEach } from "vitest";
import { Store } from "../src/Store";

// Define some types to test with
interface User {
  id: number;
  name: string;
  email: string;
}

interface Ticket {
  id: number;
  title: string;
  status: "open" | "closed";
}

describe("Generic Store", () => {
  // Test Case 1: Storing Users
  describe("User Storage", () => {
    let userStore: Store<User>;

    beforeEach(() => {
      userStore = new Store<User>();
    });

    it("should add and retrieve a user", () => {
      const user: User = { id: 1, name: "Alice", email: "alice@test.com" };
      userStore.add(user);

      expect(userStore.get(1)).toEqual(user);
    });

    it("should support Partial updates", () => {
      userStore.add({ id: 1, name: "Alice", email: "old@test.com" });

      // Update ONLY the email.
      // TS allows this because the second arg is Partial<User>
      userStore.update(1, { email: "new@test.com" });

      const updated = userStore.get(1);
      expect(updated?.email).toBe("new@test.com");
      expect(updated?.name).toBe("Alice"); // Name remains unchanged
    });
  });

  // Test Case 2: Storing Tickets (proving reuse)
  describe("Ticket Storage", () => {
    it("should work with a completely different type", () => {
      const ticketStore = new Store<Ticket>();

      ticketStore.add({ id: 100, title: "Fix Bug", status: "open" });

      // Update status only
      ticketStore.update(100, { status: "closed" });

      expect(ticketStore.get(100)?.status).toBe("closed");
    });
  });

  // Test Case 3: Error Handling
  it("should throw error when updating non-existent item", () => {
    const store = new Store<User>();
    // Using a function wrapper allows expect to catch the error
    expect(() => store.update(999, { name: "Ghost" })).toThrow(
      "Item with ID 999 not found"
    );
  });
});
