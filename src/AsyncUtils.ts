export class AsyncUtils {
  /**
   * 1. THE BASICS: Typed Delays
   * Simulates a network delay.
   * Returns a Promise that resolves after 'ms' milliseconds.
   */
  static delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * 2. SIMULATING AN API CALL
   * Simulates fetching a user by ID.
   * - 80% chance of success
   * - 20% chance of failure (to practice error handling)
   */
  static async fetchFakeUser(
    id: number
  ): Promise<{ id: number; name: string }> {
    // Wait 500ms to simulate network latency
    await this.delay(500);

    // Randomly fail to simulate a 500 Server Error
    const shouldFail = Math.random() < 0.2;
    if (shouldFail) {
      throw new Error(`Failed to fetch user ${id}`);
    }

    return { id, name: `User_${id}` };
  }

  /**
   * 3. RACE CONDITION (Timeout Pattern)
   * Tries to fetch data, but throws an error if it takes too long.
   * Critical for preventing hung UIs.
   */
  static async fetchWithTimeout<T>(
    promise: Promise<T>,
    timeoutMs: number
  ): Promise<T> {
    // Create a promise that rejects after X milliseconds
    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error("Request timed out"));
      }, timeoutMs);
    });

    // Promise.race returns whichever promise settles first (success or failure)
    return Promise.race([promise, timeout]);
  }
}
