import { describe, it, expect } from "vitest";
import { parseTicket } from "./ticketSchema.js";

describe("Zod Runtime Validation", () => {
  it("should validate a correct ticket object", () => {
    const validData = {
      id: "123",
      title: "Valid Concert",
      price: 50,
      isAvailable: true,
    };

    const result = parseTicket(validData);

    expect(result.status).toBe("success");
    if (result.status === "success") {
      expect(result.data.title).toBe("Valid Concert");
    }
  });

  it("should reject data with missing fields", () => {
    const missingPrice = {
      id: "123",
      title: "Free Concert",
      // price is missing!
    };

    const result = parseTicket(missingPrice);

    expect(result.status).toBe("error");
    if (result.status === "error") {
      // UPDATED: Check for the actual error description you are seeing
      expect(result.error).toContain("expected number");
    }
  });

  it("should reject invalid logical data (negative price)", () => {
    const badPrice = {
      id: "123",
      title: "Bad Price",
      price: -100, // We added a .positive() rule in the schema
    };

    const result = parseTicket(badPrice);

    expect(result.status).toBe("error");
    if (result.status === "error") {
      expect(result.error).toContain("Price must be positive");
    }
  });

  it("should strip out extra dangerous fields", () => {
    const maliciousData = {
      id: "123",
      title: "Hacker",
      price: 10,
      isAdmin: true, // This field is NOT in our schema
    };

    const result = parseTicket(maliciousData);

    if (result.status === "success") {
      // TypeScript allows us to check this, but Zod should have removed it at runtime
      // @ts-expect-error - TS knows 'isAdmin' shouldn't exist on Ticket
      expect(result.data.isAdmin).toBeUndefined();
    }
  });
});
