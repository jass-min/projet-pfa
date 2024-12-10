const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://nestjs-backend:3001/api";

export async function fetchData(endpoint: string) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) throw new Error(`Error fetching ${endpoint}: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error(`Network error while fetching ${endpoint}:`, error);
    throw error;
  }
}

export async function postData<T>(endpoint: string, data: T): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Error posting to ${endpoint}: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error(`Network error while posting to ${endpoint}:`, error);
    throw error;
  }
}

export async function deleteData(endpoint: string): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, { method: "DELETE" });
    if (!response.ok) throw new Error(`Error deleting ${endpoint}: ${response.status}`);
  } catch (error) {
    console.error(`Network error while deleting ${endpoint}:`, error);
    throw error;
  }
}

export async function updateData<T>(endpoint: string, data: T): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Error updating ${endpoint}: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error(`Network error while updating ${endpoint}:`, error);
    throw error;
  }
}
