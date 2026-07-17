import { raceJson } from './race';

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

export const getThreadsList = async () => unwrapCollection(await raceJson('/threadsList'));

export const getBreakingNews = async () => unwrapCollection(await raceJson('/breaking-news'));

export const getThread = (threadId) =>
  raceJson(`/threads/${encodeURIComponent(threadId)}`).then(unwrapRecord);
