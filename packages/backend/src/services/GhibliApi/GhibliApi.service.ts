import { HttpService } from '../Http/Http.service';
import { STUDIO_GHIBLI_API, ErrorMessages } from '~/shared/constants';
import { GraphQLError } from 'graphql';

export interface FilmData {
  id: string;
  title: string;
  description: string;
  director: string;
  release_date: string;
  running_time: string;
  rt_score: string;
  movie_banner: string;
  image: string;
}

export class GhibliApiService {
  private httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
  }

  async getFilmById(id: string): Promise<FilmData> {
    try {
      const response = await this.httpService.get({
        endpoint: `${
          STUDIO_GHIBLI_API.BASE_URL
        }${STUDIO_GHIBLI_API.ENDPOINTS.FILM_BY_ID(id)}`,
      });

      if (!response.data) {
        throw new GraphQLError(ErrorMessages.FilmNotFound, {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      return response.data as FilmData;
    } catch (error: any) {
      // If it's already a GraphQL error, re-throw it
      if (error instanceof GraphQLError) {
        throw error;
      }

      // Handle different types of API errors
      if (error.response?.status === 404) {
        throw new GraphQLError(ErrorMessages.FilmNotFound, {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      if (error.response?.status >= 500) {
        throw new GraphQLError(ErrorMessages.ApiConnectionError, {
          extensions: { code: 'API_ERROR' },
        });
      }

      // Generic error for other cases
      throw new GraphQLError(ErrorMessages.ServerError, {
        extensions: { code: 'SERVER_ERROR' },
      });
    }
  }

  async getAllFilms(): Promise<FilmData[]> {
    try {
      const response = await this.httpService.get({
        endpoint: `${STUDIO_GHIBLI_API.BASE_URL}${STUDIO_GHIBLI_API.ENDPOINTS.FILMS}`,
      });

      return response.data as FilmData[];
    } catch (error: any) {
      if (error.response?.status >= 500) {
        throw new GraphQLError(ErrorMessages.ApiConnectionError, {
          extensions: { code: 'API_ERROR' },
        });
      }

      throw new GraphQLError(ErrorMessages.ServerError, {
        extensions: { code: 'SERVER_ERROR' },
      });
    }
  }
}
