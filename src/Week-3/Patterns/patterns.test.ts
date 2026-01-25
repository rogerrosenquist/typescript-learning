import { describe, it, expect } from 'vitest';
import { AppStore } from './singletonStore.js';
import { TicketFactory } from './ticketFactory.js';

describe('Design Patterns', () => {
  
  it('Factory should create consistent tickets with defaults', () => {
    const t1 = TicketFactory.create('Fix Login');
    
    expect(t1.title).toBe('Fix Login');
    expect(t1.status).toBe('Open');
    expect(t1.id).toBeDefined();
    expect(t1.createdAt).toBeInstanceOf(Date);
  });

  it('Singleton should return the exact same instance', () => {
    // 1. Get the instance twice
    const storeA = AppStore.getInstance();
    const storeB = AppStore.getInstance();

    // 2. Prove they are the same memory reference
    expect(storeA).toBe(storeB);
  });

  it('Singleton data should be shared', () => {
    const storeA = AppStore.getInstance();
    const storeB = AppStore.getInstance();

    // 1. Add data to "A"
    const ticket = TicketFactory.create('Shared Ticket');
    storeA.addTicket(ticket);

    // 2. Read data from "B"
    // If they are the same, B should see what A added.
    const stateB = storeB.get();
    
    expect(stateB).toHaveLength(1);
    expect(stateB[0]?.title).toBe('Shared Ticket');
  });
});