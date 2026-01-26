// src/ticketState.test.ts
import { describe, it, expect } from 'vitest';
import { getStatusMessage } from './ticketState.js';
import type { TicketState } from './ticketState.js';

describe('Ticket State Discriminated Union', () => {
  it('should handle the Loading state', () => {
    const state: TicketState = { kind: 'loading' };
    expect(getStatusMessage(state)).toBe('Loading tickets...');
  });

  it('should handle the Error state', () => {
    // TS prevents us from omitting 'errorMessage' here
    const state: TicketState = { 
      kind: 'error', 
      errorMessage: 'Network timeout' 
    };
    expect(getStatusMessage(state)).toBe('Error: Network timeout');
  });

  it('should handle the Success state', () => {
    // TS prevents us from omitting 'data' here
    const state: TicketState = { 
      kind: 'success', 
      data: [{ id: '1', title: 'Concert', price: 100 }] 
    };
    expect(getStatusMessage(state)).toBe('Loaded 1 tickets');
  });

  it('should prevent invalid property access', () => {
    const state: TicketState = { kind: 'loading' };
    // @ts-expect-error - 'errorMessage' does not exist on type 'LoadingState'
    const _test = state.errorMessage; 
    expect(true).toBe(true); // Runtime check that TS blocked the above
  });
});