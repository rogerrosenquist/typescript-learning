import { describe, it, expect, vi } from 'vitest';
import { createStore } from './createStore.js'; // Remember: .js if needed, but standard vitest might not needs .js for local unless specific config
import { createLogger } from './logger.js';

describe('Functional Store Pattern', () => {
  
  it('should hold state and notify listeners (Closure behavior)', () => {
    // 1. Create a simplified number store
    const store = createStore<number>(0);
    const spy = vi.fn();

    // 2. Subscribe
    store.subscribe(spy);

    // 3. Act
    store.set(10);

    // 4. Assert
    expect(store.get()).toBe(10);
    expect(spy).toHaveBeenCalledWith(10);
  });

  it('Logger middleware should intercept updates', () => {
    const store = createStore<string>('initial');
    
    // Wrap the store
    const loggedStore = createLogger(store, 'TestStore');
    
    // Spy on console.log
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Act
    loggedStore.set('updated');

    // Assert
    // 1. The state should still change
    expect(loggedStore.get()).toBe('updated');
    
    // 2. The console should have fired logic from the wrapper
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Action: Updating State...'));
    
    // Cleanup
    consoleSpy.mockRestore();
  });
});