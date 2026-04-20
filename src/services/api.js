const BASE_URL = import.meta.env.VITE_API_URL || '';

export const fetchCache = async () => {
  const response = await fetch(`${BASE_URL}/cache`);
  if (!response.ok) throw new Error('Failed to fetch cache');
  return response.json();
};

export const fetchThreadsList = async () => {
  const response = await fetch(`${BASE_URL}/threadsList`);
  if (!response.ok) throw new Error('Failed to fetch threads list');
  return response.json();
};

export const fetchThreadDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/threads/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch thread details for ${id}`);
  return response.json();
};
