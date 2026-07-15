import { raceJson } from './race';

const unwrapCollection = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.politicians)) {
    return payload.politicians;
  }

  return [];
};

export const getTrendingPoliticians = async () =>
  unwrapCollection(await raceJson('/politicians/trending'));
