// A generic function type for the callback
export type Listener<T> = (data: T) => void;

// The interface ensures any Store we build adheres to this contract
export interface IObservable<T> {
  subscribe(observer: Listener<T>): () => void;
  notify(data: T): void;
}

// The Base Class
export class ObservableStore<T> implements IObservable<T> {
  // We use a Set to automatically prevent duplicate subscribers
  private listeners: Set<Listener<T>> = new Set();
  
  protected state: T;

  constructor(initialState: T) {
    this.state = initialState;
  }

  // Returns a "cleanup" function to remove the listener
  public subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);

    // Immediate return of the unsubscribe function
    return () => {
      this.listeners.delete(listener);
      // Optional: Log for debugging
      // console.log('Observer unsubscribed. Remaining:', this.listeners.size);
    };
  }

  // Broadcasts the data to all active listeners
  public notify(data: T): void {
    this.listeners.forEach((listener) => listener(data));
  }

  // Helper to get current state imperatively
  public get(): T {
    return this.state;
  }
}