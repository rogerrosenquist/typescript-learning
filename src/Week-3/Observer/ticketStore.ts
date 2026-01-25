import { ObservableStore } from './observable.js';

// 1. Define the shape of a Ticket
export interface Ticket {
  id: string;
  title: string;
  status: 'Open' | 'In-Progress' | 'Done';
}

// 2. Create the Store extending the generic Observable
export class TicketStore extends ObservableStore<Ticket[]> {
  constructor() {
    // Initialize with an empty array of tickets
    super([]);
  }

  // Action: Add a new ticket
  public addTicket(ticket: Ticket): void {
    // Immutability: Create a NEW array instead of pushing to the old one
    const nextState = [...this.state, ticket];
    
    this.state = nextState;
    this.notify(this.state);
  }

  // Action: Update a ticket's status
  public updateStatus(id: string, status: Ticket['status']): void {
    const nextState = this.state.map((t) => 
      t.id === id ? { ...t, status } : t
    );

    this.state = nextState;
    this.notify(this.state);
  }
  
  // Action: Remove a ticket (Extra utility)
  public removeTicket(id: string): void {
    const nextState = this.state.filter(t => t.id !== id);
    
    this.state = nextState;
    this.notify(this.state);
  }
}