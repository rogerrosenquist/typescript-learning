// Define the shape (similar to storing)
export interface Ticket {
  id: string;
  title: string;
  status: 'Open' | 'In-Progress' | 'Done';
  createdAt: Date;
}

export class TicketFactory {
  // Static method: We don't need to create an instance of the Factory to use it.
  // We just say TicketFactory.create(...)
  static create(title: string): Ticket {
    return {
      id: crypto.randomUUID(), // Node.js built-in ID generator
      title: title,
      status: 'Open', // Default value enforced here
      createdAt: new Date(),
    };
  }
}