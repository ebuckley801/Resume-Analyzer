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
  
  const apiUrl = process.env.BACKEND_API_URL || 'http://localhost:5000';
  const url = `${apiUrl}/${endpoint}`;
  
  // Default headers
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  
  // Add authorization header if we have a backend token
  if (session?.user?.backendToken) {
    headers.set('Authorization', `Bearer ${session.user.backendToken}`);
  }
  
  // Combine options with headers
  const fetchOptions: RequestInit = {
    ...options,
    headers
  };
  
  const response = await fetch(url, fetchOptions);
  
  // Handle 401 Unauthorized errors
  if (response.status === 401) {
    // This could be enhanced to refresh the token if needed
    throw new Error('Authentication failed with the backend API');
  }
  
  return response;
}

/**
 * Makes an authenticated GET request to the backend API
 * @param endpoint - API endpoint path (without leading slash)
 * @returns Response data as JSON
 */
export async function getFromBackend<T>(endpoint: string): Promise<T> {
  const response = await callBackendApi(endpoint, { method: 'GET' });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Makes an authenticated POST request to the backend API
 * @param endpoint - API endpoint path (without leading slash)
 * @param data - Data to send in the request body
 * @returns Response data as JSON
 */
export async function postToBackend<T, R>(endpoint: string, data: T): Promise<R> {
  const response = await callBackendApi(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Uploads a file to the backend API
 * @param endpoint - API endpoint path (without leading slash)
 * @param formData - FormData object containing the file and other data
 * @returns Response data as JSON
 */
export async function uploadToBackend<R>(endpoint: string, formData: FormData): Promise<R> {
  const session = await getServerSession(authOptions);
  
  const apiUrl = process.env.BACKEND_API_URL || 'http://localhost:5000';
  const url = `${apiUrl}/${endpoint}`;
  
  // Create headers without Content-Type (browser will set it with boundary)
  const headers = new Headers();
  
  // Add authorization header if we have a backend token
  if (session?.user?.backendToken) {
    headers.set('Authorization', `Bearer ${session.user.backendToken}`);
  }
  
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: formData
  });
  
  if (!response.ok) {
    throw new Error(`API upload failed: ${response.statusText}`);
  }
  
  return response.json();
} 