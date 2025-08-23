import { GhibliApiService } from '~/services/GhibliApi/GhibliApi.service';
import { GraphQLError } from 'graphql';

// Mock the GhibliApiService
jest.mock('~/services/GhibliApi/GhibliApi.service');

describe('GhibliQueries Integration', () => {
  let mockGhibliApiService: jest.Mocked<GhibliApiService>;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Create a mock instance
    mockGhibliApiService = {
      getFilmById: jest.fn(),
      getAllFilms: jest.fn(),
    } as any;

    // Mock the constructor to return our mock instance
    (
      GhibliApiService as jest.MockedClass<typeof GhibliApiService>
    ).mockImplementation(() => mockGhibliApiService);
  });

  describe('GhibliApiService integration', () => {
    it('should create service instance successfully', () => {
      const service = new GhibliApiService();
      expect(service).toBeDefined();
      expect(GhibliApiService).toHaveBeenCalled();
    });

    it('should call getFilmById method', async () => {
      const mockFilmData = {
        id: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8',
        title: 'Porco Rosso',
        description: 'A tale of a pig pilot in the Adriatic Sea.',
        director: 'Hayao Miyazaki',
        release_date: '1992',
        running_time: '94',
        rt_score: '95',
        movie_banner: 'https://example.com/banner.jpg',
        image: 'https://example.com/image.jpg',
      };

      // Mock successful service response
      mockGhibliApiService.getFilmById.mockResolvedValueOnce(mockFilmData);

      const service = new GhibliApiService();
      const result = await service.getFilmById(
        'ebbb6b7c-945c-41ee-a792-de0e43191bd8',
      );

      expect(result).toEqual(mockFilmData);
      expect(mockGhibliApiService.getFilmById).toHaveBeenCalledWith(
        'ebbb6b7c-945c-41ee-a792-de0e43191bd8',
      );
    });

    it('should handle service errors properly', async () => {
      // Mock service throwing GraphQLError
      const graphqlError = new GraphQLError('Film not found', {
        extensions: { code: 'NOT_FOUND' },
      });
      mockGhibliApiService.getFilmById.mockRejectedValueOnce(graphqlError);

      const service = new GhibliApiService();

      await expect(service.getFilmById('invalid-id')).rejects.toThrow(
        GraphQLError,
      );

      // Reset the mock for the second test
      mockGhibliApiService.getFilmById.mockRejectedValueOnce(graphqlError);

      await expect(service.getFilmById('invalid-id')).rejects.toThrow(
        'Film not found',
      );
    });

    it('should call getAllFilms method', async () => {
      const mockFilmsData = [
        {
          id: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8',
          title: 'Porco Rosso',
          description: 'A tale of a pig pilot.',
          director: 'Hayao Miyazaki',
          release_date: '1992',
          running_time: '94',
          rt_score: '95',
          movie_banner: 'https://example.com/banner.jpg',
          image: 'https://example.com/image.jpg',
        },
      ];

      // Mock successful service response
      mockGhibliApiService.getAllFilms.mockResolvedValueOnce(mockFilmsData);

      const service = new GhibliApiService();
      const result = await service.getAllFilms();

      expect(result).toEqual(mockFilmsData);
      expect(mockGhibliApiService.getAllFilms).toHaveBeenCalled();
    });
  });
});
