import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

/**
 * Makes an authenticated call to the backend API
 * @param endpoint - API endpoint path (without leading slash)
 * @param options - Fetch options
 * @returns Response from the backend API
 */
export async function callBackendApi(
  endpoint: string,
  options: RequestInit = {}
) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.backendToken) {
    throw new Error('No backend token found. Please sign in again.');
  }
  
  const apiUrl = process.env.BACKEND_API_URL || 'http://localhost:5001';
  const url = `${apiUrl}/${endpoint}`;
  
  // Default headers
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', `Bearer ${session.user.backendToken}`);
  
  // Combine options with headers
  const fetchOptions: RequestInit = {
    ...options,
    headers
  };
  
  const response = await fetch(url, fetchOptions);
  
  // Handle authentication errors
  if (response.status === 401) {
    throw new Error('Authentication failed with the backend API');
  }
  
  if (response.status === 403) {
    throw new Error('Insufficient permissions for this operation');
  }
  
  if (!response.ok) {
    let errorMessage = `API request failed: ${response.statusText}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch {
      // If we can't parse the error response, use the default message
    }
    throw new Error(errorMessage);
  }
  
  return response.json();
}

/**
 * Makes an authenticated GET request to the backend API
 * @param endpoint - API endpoint path (without leading slash)
 * @returns Response data as JSON
 */
export async function getFromBackend<T>(endpoint: string): Promise<T> {
  return callBackendApi(endpoint, { method: 'GET' });
}

/**
 * Makes an authenticated POST request to the backend API
 * @param endpoint - API endpoint path (without leading slash)
 * @param data - Data to send in the request body
 * @returns Response data as JSON
 */
export async function postToBackend<T, R>(endpoint: string, data: T): Promise<R> {
  return callBackendApi(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

/**
 * Uploads a file to the backend API
 * @param endpoint - API endpoint path (without leading slash)
 * @param formData - FormData object containing the file and other data
 * @returns Response data as JSON
 */
export async function uploadToBackend<R>(endpoint: string, formData: FormData): Promise<R> {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.backendToken) {
    throw new Error('No backend token found. Please sign in again.');
  }
  
  const apiUrl = process.env.BACKEND_API_URL || 'http://localhost:5001';
  const url = `${apiUrl}/${endpoint}`;
  
  // Create headers without Content-Type (browser will set it with boundary)
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${session.user.backendToken}`);
  
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: formData
  });
  
  if (response.status === 401) {
    throw new Error('Authentication failed with the backend API');
  }
  
  if (response.status === 403) {
    throw new Error('Insufficient permissions for this operation');
  }
  
  if (!response.ok) {
    let errorMessage = `API upload failed: ${response.statusText}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch {
      // If we can't parse the error response, use the default message
    }
    throw new Error(errorMessage);
  }
  
  return response.json();
} 