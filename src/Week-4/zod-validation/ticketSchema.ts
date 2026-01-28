import { z } from 'zod';

// 1. Define the Schema (The Runtime Validator)
// This creates a parser that checks actual JS objects
export const TicketSchema = z.object({
  id: z.string().min(1, "ID cannot be empty"), // Validates ID exists
  title: z.string(),
  price: z.number().positive("Price must be positive"), // Validates logic
  isAvailable: z.boolean().optional() // Optional field
});

// 2. Infer the Type (The Compile-time Type)
// instead of writing 'type Ticket = ...', we let Zod generate it for us!
// This ensures your Type and your Validation logic NEVER get out of sync.
export type Ticket = z.infer<typeof TicketSchema>;

// 3. A "Safe Parse" Helper
// This wraps the Zod logic to return our familiar Result pattern
import type { Result } from '../api-utils/apiUtils.js';

export function parseTicket(unknownData: unknown): Result<Ticket> {
  // safeParse returns a specific Zod result object
  const result = TicketSchema.safeParse(unknownData);

  if (result.success) {
    return { status: 'success', data: result.data };
  } else {
    // Zod provides detailed error messages
    const errorMsg = result.error.issues.map(e => e.message).join(', ');
    return { status: 'error', error: errorMsg };
  }
}