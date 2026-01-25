// Import Type only
import type { Store } from './createStore.js';

// This function takes a Store and returns a NEW, enhanced Store
export function createLogger<T>(store: Store<T>, name: string): Store<T> {
  return {
    // 1. Pass through 'get' and 'subscribe' unchanged
    get: store.get,
    subscribe: store.subscribe,

    // 2. Intercept 'set' to add behavior
    set: (newState: T) => {
      const previous = store.get();
      
      console.log(`[${name}] Previous:`, previous);
      console.log(`[${name}] Action: Updating State...`);
      
      // Call the original store's set
      store.set(newState);
      
      console.log(`[${name}] Next:`, newState);
    }
  };
}