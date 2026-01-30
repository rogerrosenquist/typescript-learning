import { describe, it, expect, beforeEach } from 'vitest';
import { TicketService } from './ticketService.js';
import type { CreateTicketInput } from '../mapped-types/ticketTypes.js';

describe('Ticket Domain Capstone', () => {
  let service: TicketService;

  beforeEach(() => {
    service = new TicketService();
  });

  it('should successfully create and retrieve a ticket', async () => {
    // Prepare Input (using our Mapped Type)
    const input: CreateTicketInput = {
      title: 'Final Capstone Event',
      price: 150
    };

    // Create
    const createResult = await service.createTicket(input);

    expect(createResult.status).toBe('success');
    
    if (createResult.status === 'success') {
      const newTicket = createResult.data;
      
      // Verify ID was generated
      expect(newTicket.id).toBeDefined();
      expect(newTicket.title).toBe(input.title);

      // Retrieve (Verify persistence)
      const getResult = await service.getTicket(newTicket.id);
      
      expect(getResult.status).toBe('success');
      if (getResult.status === 'success') {
        expect(getResult.data).toEqual(newTicket);
      }
    }
  });

  it('should fail validation if we try to sneak in bad data', async () => {
    const badInput = {
      title: 'Invalid Event',
      price: -50 // Negative price!
    } as CreateTicketInput; // Casting to force the error in this test

    const result = await service.createTicket(badInput);

    expect(result.status).toBe('error');
    if (result.status === 'error') {
      expect(result.error).toContain('positive'); // Zod error message
    }
  });

  it('should return error for non-existent ID', async () => {
    const result = await service.getTicket('fake-id');
    
    expect(result.status).toBe('error');
    if (result.status === 'error') {
      expect(result.error).toBe('Ticket not found');
    }
  });
});