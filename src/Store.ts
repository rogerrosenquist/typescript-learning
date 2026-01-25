// 1. THE CONSTRAINT
// We define an interface that enforces an 'id' exists.
// We will force our Generic T to "extend" this.
interface Identifiable {
  id: number;
}

// T extends Identifiable means: "I accept ANY type, as long as it has an .id property"
export class Store<T extends Identifiable> {
  // We use a Map for O(1) lookups, keyed by the ID
  private db: Map<number, T>;

  constructor() {
    this.db = new Map();
  }

  add(item: T): void {
    this.db.set(item.id, item);
  }

  get(id: number): T | undefined {
    return this.db.get(id);
  }

  /**
   * 2. THE UTILITY TYPE: Partial<T>
   * This allows us to pass an object that only has *some* of T's properties.
   * Use Case: Patching a user's email without requiring their name/age/address.
   */
  update(id: number, fieldsToUpdate: Partial<T>): void {
    const currentItem = this.get(id);

    if (!currentItem) {
      throw new Error(`Item with ID ${id} not found`);
    }

    // Merge the old data with the new fields
    // We use spread syntax: { ...old, ...new }
    // The 'new' fields overwrite the 'old' ones.
    const updatedItem = { ...currentItem, ...fieldsToUpdate };

    this.db.set(id, updatedItem);
  }

  getAll(): T[] {
    // Convert the Map values iterator to an Array
    return Array.from(this.db.values());
  }
}
