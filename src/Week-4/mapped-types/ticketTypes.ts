// Import the "Master" type from Day 3
import type { Ticket } from '../zod-validation/ticketSchema.js';

// Omit: For creation, we don't have an ID yet.
// "Take Ticket, but remove 'id'"
export type CreateTicketInput = Omit<Ticket, 'id'>;

// Partial: For updates, every field is optional.
// "Take Ticket, make everything optional, but we MUST have the ID to know what to update"
// We use a specific utility called 'Pick' to get the ID, and 'Partial' for the rest.
type TicketProps = Partial<Omit<Ticket, 'id'>>; // All props optional
type TicketId = Pick<Ticket, 'id'>;             // ID is required

// Combine them (Intersection)
export type UpdateTicketInput = TicketId & TicketProps;

// Readonly: For UI display props (Functional Programming - Immutability)
// "Make every property readonly so we can't accidentally mutate state"
export type ReadonlyTicket = Readonly<Ticket>;

// A function to demonstrate these types in action
export function updateTicketPrice(
  original: ReadonlyTicket, 
  newPrice: number
): ReadonlyTicket {
  // original.price = newPrice; //  Error: Cannot assign to 'price' because it is read-only.
  
  // We must return a NEW object (Immutability)
  return {
    ...original,
    price: newPrice
  };
}