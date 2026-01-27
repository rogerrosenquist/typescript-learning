import { describe, it, expect } from 'vitest';
import { mockApiCall } from './apiUtils.js'; 
import type { Ticket } from '../discriminated-unions/ticketState.js'; // 

// Define a second type to prove reusability
type User = {
  id: number;
  username: string;
};

describe('Generic API Utilities', () => {
  
  it('should handle Ticket data correctly', async () => {
    const ticketMock: Ticket = { id: '1', title: 'Concert', price: 50 };
    
    // Explicitly passing <Ticket> helps TS validate the payload input
    const response = await mockApiCall<Ticket>(true, ticketMock);

    // Because of the discriminated union, we can check status
    if (response.status === 'success') {
      expect(response.data.title).toBe('Concert');
      expect(response.data.price).toBe(50);
    } else {
      // This path should not happen in this test
      expect.fail('Should have succeeded');
    }
  });

  it('should handle User data correctly (Reusability)', async () => {
    const userMock: User = { id: 99, username: 'dev_user' };
    
    // Reusing the SAME function for a different type
    const response = await mockApiCall<User>(true, userMock);
    
    if (response.status === 'success') {
      expect(response.data.username).toBe('dev_user');
    }
  });

  it('should handle errors for any type', async () => {
    const ticketMock: Ticket = { id: '1', title: 'Fail', price: 0 };
    
    const response = await mockApiCall<Ticket>(false, ticketMock, 'Database Error');

    expect(response.status).toBe('error');
    if (response.status === 'error') {
      expect(response.error).toBe('Database Error');
    }
  });
});