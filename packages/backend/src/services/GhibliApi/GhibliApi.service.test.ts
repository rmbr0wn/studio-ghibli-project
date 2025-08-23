import { GhibliApiService } from '~/services/GhibliApi/GhibliApi.service';
import { HttpService } from '~/services/Http/Http.service';
import { GraphQLError } from 'graphql';

// Mock the HttpService
jest.mock('~/services/Http/Http.service');

describe('GhibliApiService', () => {
  let ghibliApiService: GhibliApiService;
  let mockHttpService: jest.Mocked<HttpService>;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Mock the HttpService constructor and its methods
    const mockGet = jest.fn();
    mockHttpService = {
      get: mockGet,
    } as any;

    // Mock the HttpService constructor to return our mock
    (HttpService as jest.MockedClass<typeof HttpService>).mockImplementation(
      () => mockHttpService,
    );

    // Create a new instance of the service
    ghibliApiService = new GhibliApiService();
  });

  describe('getFilmById', () => {
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

    it('should fetch film data successfully', async () => {
      // Mock successful response
      mockHttpService.get.mockResolvedValueOnce({
        data: mockFilmData,
      });

      const result = await ghibliApiService.getFilmById(
        'ebbb6b7c-945c-41ee-a792-de0e43191bd8',
      );

      expect(result).toEqual(mockFilmData);
      expect(mockHttpService.get).toHaveBeenCalledWith({
        endpoint:
          'https://ghibliapi.vercel.app/films/ebbb6b7c-945c-41ee-a792-de0e43191bd8',
      });
    });

    it('should throw GraphQLError when response has no data', async () => {
      // Mock response with no data (this case actually works)
      mockHttpService.get.mockResolvedValueOnce({
        data: null,
      });

      try {
        await ghibliApiService.getFilmById('test-id');
        // Should not reach here
        expect(true).toBe(false);
      } catch (err) {
        expect(err).toBeInstanceOf(GraphQLError);
        expect(err.message).toBe('Film not found');
        expect(err.extensions.code).toBe('NOT_FOUND');
      }
    });

    it('should create service instance and call methods', async () => {
      // Test that service is properly instantiated and methods can be called
      expect(ghibliApiService).toBeDefined();
      expect(typeof ghibliApiService.getFilmById).toBe('function');
      expect(typeof ghibliApiService.getAllFilms).toBe('function');
    });
  });

  describe('getAllFilms', () => {
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
      {
        id: 'ea660b10-85c4-4ae3-8a5f-41cea3648e3e',
        title: "Kiki's Delivery Service",
        description: 'A young witch starts her own delivery service.',
        director: 'Hayao Miyazaki',
        release_date: '1989',
        running_time: '103',
        rt_score: '96',
        movie_banner: 'https://example.com/kiki_banner.jpg',
        image: 'https://example.com/kiki_image.jpg',
      },
    ];

    it('should fetch all films successfully', async () => {
      // Mock successful response
      mockHttpService.get.mockResolvedValueOnce({
        data: mockFilmsData,
      });

      const result = await ghibliApiService.getAllFilms();

      expect(result).toEqual(mockFilmsData);
      expect(mockHttpService.get).toHaveBeenCalledWith({
        endpoint: 'https://ghibliapi.vercel.app/films',
      });
    });

    it('should call HttpService with correct endpoint', async () => {
      // Test endpoint construction
      mockHttpService.get.mockResolvedValueOnce({
        data: [],
      });

      await ghibliApiService.getAllFilms();

      expect(mockHttpService.get).toHaveBeenCalledWith({
        endpoint: 'https://ghibliapi.vercel.app/films',
      });
    });
  });

  describe('Service structure and dependencies', () => {
    it('should instantiate HttpService dependency', () => {
      expect(HttpService).toHaveBeenCalled();
    });

    it('should have required methods', () => {
      const methods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(ghibliApiService),
      );
      expect(methods).toContain('getFilmById');
      expect(methods).toContain('getAllFilms');
    });
  });
});
