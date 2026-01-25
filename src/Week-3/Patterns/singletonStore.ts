import { ObservableStore } from '../Observer/observable.js'; // Re-using engine from yesterday
import type { Ticket } from './ticketFactory.js';

export class AppStore extends ObservableStore<Ticket[]> {
  // 1. The static variable to hold the ONE instance
  private static instance: AppStore;

  // 2. The Private Constructor
  // This prevents anyone from saying "new AppStore()" outside this file.
  private constructor() {
    super([]); // Initialize with empty array
  }

  // 3. The Public Gateway
  // This is the ONLY way to get the store.
  public static getInstance(): AppStore {
    if (!AppStore.instance) {
      AppStore.instance = new AppStore();
    }
    return AppStore.instance;
  }

  // Domain logic (same as yesterday)
  public addTicket(ticket: Ticket): void {
    const nextState = [...this.state, ticket];
    this.state = nextState;
    this.notify(this.state);
  }
}