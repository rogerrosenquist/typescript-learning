import { describe, it, expectTypeOf } from 'vitest';
import type { CreateTicketInput, UpdateTicketInput, ReadonlyTicket } from './ticketTypes.js';
import type { Ticket } from '../zod-validation/ticketSchema.js';

describe('Mapped Types', () => {
  
  it('should not require ID for creation', () => {
    // This object matches CreateTicketInput (no ID required)
    const newTicket: CreateTicketInput = {
      title: 'New Event',
      price: 100
      // id is missing, and that is valid!
    };
    
    // Vitest helper to assert types match
    expectTypeOf(newTicket).toMatchTypeOf<CreateTicketInput>();
  });

  it('should allow partial updates', () => {
    // Valid: Only updating the price, but ID is required
    const updatePayload: UpdateTicketInput = {
      id: '123',
      price: 99
    };

    expectTypeOf(updatePayload).toMatchTypeOf<UpdateTicketInput>();
  });

  it('should prevent mutation on Readonly types', () => {
    const ticket: ReadonlyTicket = {
      id: '1', 
      title: 'Show', 
      price: 10 
    };

    // This is a "Type-level" test. 
    // If you uncomment the line below, the test file itself should fail to compile.
    // ticket.price = 20; 

    expectTypeOf(ticket).toMatchTypeOf<Readonly<Ticket>>();
  });
});