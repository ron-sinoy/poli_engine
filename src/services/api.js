import { raceJson } from '../api/race';

export const fetchCache = () => raceJson('/cache');

export const fetchThreadsList = () => raceJson('/threadsList');

export const fetchThreadDetails = (id) => raceJson(`/threads/${encodeURIComponent(id)}`);
