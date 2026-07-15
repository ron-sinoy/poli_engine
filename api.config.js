// Render is the only live backend. The retired deployment used to be listed
// first here, which also pointed API_PROXY_TARGET -- and so the Vite dev proxy
// -- at a host that returns 404 for every route.
export const API_ORIGINS = [
  {
    key: 'render',
    baseUrl: 'https://poli-engine-backend.onrender.com',
  },
];

export const API_PROXY_TARGET = API_ORIGINS[0]?.baseUrl || '';
