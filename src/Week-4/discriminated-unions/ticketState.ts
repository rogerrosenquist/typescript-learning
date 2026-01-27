// The Domain Entity
export type Ticket = {
  id: string;
  title: string;
  price: number;
};

// The Discriminated States
// Note: Each state has a specific 'kind' literal.

export type LoadingState = {
  kind: 'loading';
};

export type ErrorState = {
  kind: 'error';
  errorMessage: string; // Only exists on error
};

export type SuccessState = {
  kind: 'success';
  data: Ticket[]; // Only exists on success
};

export type IdleState = {
  kind: 'idle';
};

// The Union (The only type our UI will ever see)
export type TicketState = LoadingState | ErrorState | SuccessState| IdleState;

// A helper to simulate a UI component render or logic handler
// This demonstrates "Exhaustiveness Checking"
export function getStatusMessage(state: TicketState): string {
  switch (state.kind) {
    case 'loading':
      return 'Loading tickets...';
    case 'error':
      return `Error: ${state.errorMessage}`;
    case 'success':
      return `Loaded ${state.data.length} tickets`;
    case 'idle':
        return 'Ready to load tickets';
    default:
      // This 'never' check ensures we handle every possible case in the Union.
      // If you add a new state but forget a case, TS will throw a compile error here.
      const _exhaustiveCheck: never = state;
      return _exhaustiveCheck;
  }
}