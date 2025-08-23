import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { FILM_QUERY } from '~/graphql/queries';
import '~/shared/styles/cardFlip.css';

const films = [
  { id: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8', name: 'Porco Rosso' },
  {
    id: 'ea660b10-85c4-4ae3-8a5f-41cea3648e3e',
    name: "Kiki's Delivery Service",
  },
  { id: 'cd3d059c-09f4-4ff3-8d63-bc765a5184fa', name: "Howl's Moving Castle" },
  { id: '58611129-2dbc-4a81-a72f-77ddfc1b1b49', name: 'My Neighbor Totoro' },
];

const Home = () => {
  const [fetchFilm, { loading, data }] = useLazyQuery(FILM_QUERY);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [loadingFilm, setLoadingFilm] = useState<string | null>(null);
  const [filmData, setFilmData] = useState<Record<string, any>>({});

  const handleButtonClick = (id: string) => {
    setLoadingFilm(id);
    fetchFilm({
      variables: { id },
      onCompleted: (result) => {
        setLoadingFilm(null);
        if (result.film) {
          setFilmData((prev) => ({ ...prev, [id]: result.film }));
        }
      },
      onError: () => setLoadingFilm(null),
    });
  };

  const handleCardFlip = (cardId: string) => {
    setFlippedCard(flippedCard === cardId ? null : cardId);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-4 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {films.map((film) => (
          <div key={film.id} className="flex flex-col items-center w-full">
            <button
              onClick={() => handleButtonClick(film.id)}
              className={`film-button px-4 py-2 rounded mb-4 focus:outline-none w-full max-w-xs ${
                loadingFilm === film.id
                  ? 'bg-gray-400 cursor-not-allowed loading-pulse'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              disabled={loadingFilm === film.id}
            >
              {loadingFilm === film.id ? 'Loading...' : film.name}
            </button>
            {filmData[film.id] && (
              <div className="card-container relative w-full max-w-sm h-96 perspective-1000 mx-auto">
                <div
                  className={`flip-card relative w-full h-full transform-style-preserve-3d cursor-pointer ${
                    flippedCard === filmData[film.id].title
                      ? 'rotate-y-180'
                      : ''
                  }`}
                  onClick={() => handleCardFlip(filmData[film.id].title || '')}
                  onMouseEnter={() =>
                    window.innerWidth >= 768 &&
                    handleCardFlip(filmData[film.id].title || '')
                  }
                  onMouseLeave={() =>
                    window.innerWidth >= 768 && setFlippedCard(null)
                  }
                >
                  {/* Front of card */}
                  <div className="card-front absolute inset-0 w-full h-full backface-hidden bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="card-shimmer absolute inset-0"></div>
                    <img
                      src={filmData[film.id].image || ''}
                      alt={filmData[film.id].title || 'Film image'}
                      className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 transition-colors duration-200">
                        {filmData[film.id].title}
                      </h3>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div className="card-back absolute inset-0 w-full h-full backface-hidden bg-gradient-to-b from-blue-600 to-purple-700 rounded-lg shadow-lg overflow-hidden rotate-y-180">
                    <div
                      className="w-full h-32 bg-cover bg-center opacity-30 transition-opacity duration-300"
                      style={{
                        backgroundImage: `url(${
                          filmData[film.id].movie_banner || ''
                        })`,
                      }}
                    />
                    <div className="p-4 text-white">
                      <h3 className="text-lg font-bold mb-2 transform transition-transform duration-300">
                        {filmData[film.id].title}
                      </h3>
                      <p className="text-sm mb-2 line-clamp-3 opacity-90">
                        {filmData[film.id].description}
                      </p>
                      <div className="space-y-1 text-xs">
                        <p className="transition-opacity duration-200 hover:opacity-100">
                          <span className="font-semibold">Director:</span>{' '}
                          {filmData[film.id].director}
                        </p>
                        <p className="transition-opacity duration-200 hover:opacity-100">
                          <span className="font-semibold">Release:</span>{' '}
                          {filmData[film.id].release_date}
                        </p>
                        <p className="transition-opacity duration-200 hover:opacity-100">
                          <span className="font-semibold">Runtime:</span>{' '}
                          {filmData[film.id].running_time} min
                        </p>
                        <div className="flex items-center mt-2">
                          <span className="font-semibold">RT Score:</span>
                          <span className="ml-1 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold transition-transform duration-200 hover:scale-110">
                            {filmData[film.id].rt_score}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
