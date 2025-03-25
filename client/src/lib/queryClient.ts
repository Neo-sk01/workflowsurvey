import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Define the API request function
export const apiRequest = async <T>(
  endpoint: string,
  method: string = 'GET',
  data?: any,
  options?: {
    isFormData?: boolean;
    headers?: Record<string, string>;
  }
): Promise<T> => {
  const url = `${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  
  const headers: Record<string, string> = {
    ...(options?.headers || {}),
  };
  
  // Don't set Content-Type for FormData (browser will set it with boundary)
  if (!options?.isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  
  const config: RequestInit = {
    method,
    headers,
    credentials: 'include',
  };
  
  if (data) {
    if (method !== 'GET') {
      config.body = options?.isFormData ? data : JSON.stringify(data);
    }
  }
  
  const response = await fetch(url, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API request failed with status ${response.status}`);
  }
  
  return await response.json();
};

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

// Set up the query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
    mutations: {
      retry: false,
    },
  },
});
