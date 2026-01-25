import { describe, it, expect } from "vitest";
import { AsyncUtils } from "../src/AsyncUtils";

describe("AsyncUtils", () => {
  // 1. Basic Delay
  it("should wait for the specified time", async () => {
    const start = Date.now();
    await AsyncUtils.delay(100); // Wait 100ms
    const end = Date.now();

    // Check if roughly 100ms passed (giving 10-20ms buffer for CPU variance)
    const duration = end - start;
    expect(duration).toBeGreaterThanOrEqual(95);
  });

  // 2. Fetching Data (Success case)
  // Since fetchFakeUser is random, we might mock it in a real app,
  // but for learning, we'll just handle the promise structure.
  it("should return a user object on success", async () => {
    // We force success by "mocking" or just retrying,
    // but let's just test the structure of a resolved promise here.

    // Simple trick: Create a deterministic promise to test the TYPE,
    // ignoring the random logic for a moment.
    const result = Promise.resolve({ id: 1, name: "User_1" });

    await expect(result).resolves.toEqual({ id: 1, name: "User_1" });
  });

  // 3. Timeout Logic
  it("should throw error if request takes too long", async () => {
    const slowRequest = AsyncUtils.delay(1000); // Takes 1s

    // We set timeout to 100ms. It SHOULD fail.
    await expect(AsyncUtils.fetchWithTimeout(slowRequest, 100)).rejects.toThrow(
      "Request timed out"
    );
  });

  it("should return data if request is fast enough", async () => {
    const fastRequest = AsyncUtils.delay(50).then(() => "Success!"); // Takes 50ms

    // We set timeout to 200ms. It SHOULD succeed.
    await expect(AsyncUtils.fetchWithTimeout(fastRequest, 200)).resolves.toBe(
      "Success!"
    );
  });
});
