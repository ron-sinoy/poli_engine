import { API_ORIGINS as CONFIGURED_API_ORIGINS } from '../../api.config';

const normalizeBaseUrl = (value) => value?.trim().replace(/\/$/, '') || '';

const API_ORIGINS = CONFIGURED_API_ORIGINS.map((origin) => ({
  ...origin,
  baseUrl: normalizeBaseUrl(origin.baseUrl),
})).filter((origin) => origin.baseUrl);

const buildUrl = (baseUrl, path) => `${baseUrl}${path}`;

const combineSignals = (signals) => {
  const activeSignals = signals.filter(Boolean);

  if (activeSignals.length === 0) {
    return undefined;
  }

  if (activeSignals.length === 1) {
    return activeSignals[0];
  }

  if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.any === 'function') {
    return AbortSignal.any(activeSignals);
  }

  const controller = new AbortController();
  const abortCombinedSignal = () => controller.abort();

  activeSignals.forEach((signal) => {
    if (signal.aborted) {
      abortCombinedSignal();
      return;
    }

    signal.addEventListener('abort', abortCombinedSignal, { once: true });
  });

  return controller.signal;
};

const getRequestInit = (init, controller) => ({
  ...init,
  signal: combineSignals([init?.signal, controller.signal]),
});

const getOrigins = () => {
  if (API_ORIGINS.length > 0) {
    return API_ORIGINS;
  }

  throw new Error(
    'No backend origins configured in api.config.js.',
  );
};

const fetchJsonFromOrigin = async (origin, path, init) => {
  const url = buildUrl(origin.baseUrl, path);
  let response;

  try {
    response = await fetch(url, init);
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw error;
    }

    throw new Error(`Could not connect to ${origin.key} (${url}).`);
  }

  if (!response.ok) {
    throw new Error(`Request failed for ${origin.key} (${url}): ${response.status}`);
  }

  try {
    return await response.json();
  } catch (error) {
    throw new Error(`Invalid JSON from ${origin.key} (${url}).`);
  }
};

const toCombinedError = (path, failures) =>
  new Error(
    [`All backend requests failed for ${path}.`, ...failures.map((failure) => failure.message)].join(
      ' ',
    ),
  );

export const raceJson = async (path, init) => {
  const origins = getOrigins();

  if (origins.length === 1) {
    return fetchJsonFromOrigin(origins[0], path, init);
  }

  const controllers = origins.map(() => new AbortController());
  const failures = [];

  return new Promise((resolve, reject) => {
    let settled = false;

    origins.forEach((origin, index) => {
      fetchJsonFromOrigin(origin, path, getRequestInit(init, controllers[index]))
        .then((payload) => {
          if (settled) {
            return;
          }

          settled = true;
          console.info(`[api-race] ${origin.key} won for ${path}`);

          controllers.forEach((controller, controllerIndex) => {
            if (controllerIndex !== index) {
              controller.abort();
            }
          });

          resolve(payload);
        })
        .catch((error) => {
          if (settled || error?.name === 'AbortError') {
            return;
          }

          failures.push({
            origin: origin.key,
            message: error.message || `Unknown failure from ${origin.key}.`,
          });

          if (failures.length === origins.length) {
            reject(toCombinedError(path, failures));
          }
        });
    });
  });
};
