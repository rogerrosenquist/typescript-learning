// Generic Discriminated Unions
// <T> acts as a placeholder for whatever data type we pass in later.
export type Success<T> = { 
  status: 'success'; 
  data: T; 
};

export type Failure = { 
  status: 'error'; 
  error: string; 
};

export type Result<T> = Success<T> | Failure;

// A Generic Mock Fetcher
// We use <T extends object> to ENFORCE that API responses must be objects (not primitives).
export async function mockApiCall<T extends object>(
  shouldSucceed: boolean,
  payload: T,
  errorMessage: string = 'API Failed'
): Promise<Result<T>> {
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 50));

  if (shouldSucceed) {
    return { status: 'success', data: payload };
  }

  return { status: 'error', error: errorMessage };
}