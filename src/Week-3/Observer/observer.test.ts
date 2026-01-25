// src/week-3/observer/observer.test.ts
import { describe, it, expect, vi } from 'vitest';
import { TicketStore } from './ticketStore.js';

describe('TicketStore Observer Pattern', () => {
  
  it('should notify subscribers when a ticket is added', () => {
    // 1. Setup
    const store = new TicketStore();
    const spy = vi.fn(); // Creates a mock function we can track

    // 2. Subscribe
    store.subscribe(spy);

    // 3. Act
    const newTicket = { id: '1', title: 'Test Ticket', status: 'Open' as const };
    store.addTicket(newTicket);

    // 4. Assert
    // Verify the spy was called with an array containing the new ticket
    expect(spy).toHaveBeenCalledWith([newTicket]);
  });

  it('should stop notifying after unsubscribe is called', () => {
    const store = new TicketStore();
    const spy = vi.fn();

    // Capture the unsubscribe function
    const unsubscribe = store.subscribe(spy);

    // Fire once to prove subscription is active
    store.addTicket({ id: '1', title: 'First', status: 'Open' as const });
    expect(spy).toHaveBeenCalledTimes(1);

    // UNSUBSCRIBE
    unsubscribe();

    // Fire again
    store.addTicket({ id: '2', title: 'Second', status: 'Open' as const });

    // Assert: Spy should NOT have been called a second time
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should maintain state integrity (updates and removals)', () => {
    const store = new TicketStore();
    
    // Add two tickets
    store.addTicket({ id: '1', title: 'Login Bug', status: 'Open' as const });
    store.addTicket({ id: '2', title: 'Header Fix', status: 'In-Progress' as const });

    // Update one
    store.updateStatus('1', 'Done');
    
    // Verify Update
    const stateAfterUpdate = store.get();
    expect(stateAfterUpdate.find(t => t.id === '1')?.status).toBe('Done');

    // Remove one
    store.removeTicket('2');

    // Verify Removal
    const finalState = store.get();
    expect(finalState).toHaveLength(1);
    expect(finalState[0]?.id).toBe('1');
  });
});