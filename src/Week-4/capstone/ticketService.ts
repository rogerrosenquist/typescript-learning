// Imports from previous days
import type { Result } from '../api-utils/apiUtils.js';
import type { Ticket } from '../zod-validation/ticketSchema.js';
import { TicketSchema } from '../zod-validation/ticketSchema.js'; // The Runtime Validator
import type { CreateTicketInput } from '../mapped-types/ticketTypes.js';

// The Service Class
export class TicketService {
  // Simulating a database in memory
  private db: Ticket[] = [];

  // FEATURE 1: Create (Using Mapped Types + Generics)
  // We accept 'CreateTicketInput' (no ID required), but return a full 'Ticket'
  async createTicket(input: CreateTicketInput): Promise<Result<Ticket>> {
    // Simulate async DB delay
    await new Promise(r => setTimeout(r, 50));

    // validation (Even though input is typed, we validate runtime values)
    // We construct the full object to validate it against the schema
    const newTicket = {
      ...input,
      id: Math.random().toString(36).substr(2, 9), // Generate fake ID
    };

    // Zod Validation (Runtime Safety)
    const validation = TicketSchema.safeParse(newTicket);

    if (!validation.success) {
      return { 
        status: 'error', 
        error: validation.error.issues[0]!.message 
      };
    }

    // "Save" to DB
    const validTicket = validation.data;
    this.db.push(validTicket);

    return { status: 'success', data: validTicket };
  }

  // FEATURE 2: Read (Using Generics)
  async getTicket(id: string): Promise<Result<Ticket>> {
    await new Promise(r => setTimeout(r, 50));

    const ticket = this.db.find(t => t.id === id);

    if (!ticket) {
      return { status: 'error', error: 'Ticket not found' };
    }

    return { status: 'success', data: ticket };
  }
}