const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/$/, '') ?? '';

const buildUrl = (path) => `${API_BASE_URL}${path}`;

const requestJson = async (path) => {
  const url = buildUrl(path);
  let response;

  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error(`Could not connect to ${url}. Check VITE_API_BASE_URL and whether the backend is running.`);
  }

  if (!response.ok) {
    throw new Error(`Request failed for ${url}: ${response.status}`);
  }

  return response.json();
};

const unwrapCollection = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.threads)) {
    return payload.threads;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  return [];
};

const unwrapRecord = (payload) => payload?.data ?? payload?.thread ?? payload;

export const getThreadsList = async () => unwrapCollection(await requestJson('/threadsList'));

export const getThread = (threadId) =>
  requestJson(`/threads/${encodeURIComponent(threadId)}`).then(unwrapRecord);
