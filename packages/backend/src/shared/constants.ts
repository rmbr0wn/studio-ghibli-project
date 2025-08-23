export enum ErrorMessages {
  ServerError = 'Server error',
  FilmNotFound = 'Film not found',
  ApiConnectionError = 'Failed to connect to Studio Ghibli API',
}

export const GQL_ERROR_CODES = {
  SERVER_ERROR: 'SERVER_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  API_ERROR: 'API_ERROR',
};

export const STUDIO_GHIBLI_API = {
  BASE_URL: 'https://ghibliapi.vercel.app',
  ENDPOINTS: {
    FILMS: '/films',
    FILM_BY_ID: (id: string) => `/films/${id}`,
  },
};
