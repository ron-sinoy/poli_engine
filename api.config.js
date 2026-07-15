export const API_ORIGINS = [
  {
    key: 'railway',
    baseUrl: 'https://poli-engine-backend-production.up.railway.app',
  },
  {
    key: 'render',
    baseUrl: 'https://poli-engine-backend.onrender.com',
  },
];

export const API_PROXY_TARGET = API_ORIGINS[0]?.baseUrl || '';
