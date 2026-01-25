// Define the contract (Type)
export type Listener<T> = (state: T) => void;

export interface Store<T> {
  get: () => T;
  set: (newState: T) => void;
  subscribe: (listener: Listener<T>) => () => void;
}

// The Factory Function (Closure)
export function createStore<T>(initialState: T): Store<T> {
  // 1. Internal State (Private by default because it's inside the function scope)
  let state = initialState;
  const listeners = new Set<Listener<T>>();

  // 2. The Methods
  const get = () => state;

  const set = (newState: T) => {
    state = newState;
    // Notify all listeners
    listeners.forEach((l) => l(state));
  };

  const subscribe = (listener: Listener<T>) => {
    listeners.add(listener);
    // Return unsubscribe function
    return () => {
      listeners.delete(listener);
    };
  };

  // 3. Return the public interface
  return { get, set, subscribe };
}