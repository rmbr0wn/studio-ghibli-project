import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { FILM_QUERY } from '~/graphql/queries';
import cloudsBg from '~/assets/clouds_bg.jpg';
import rottenTomatoesLogo from '~/assets/rotten_tomatoes_logo.svg';
import '~/shared/styles/cardFlip.css';

const films = [
  {
    id: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8',
    name: 'Porco Rosso',
    bgColor: '#d79a68',
  },
  {
    id: 'ea660b10-85c4-4ae3-8a5f-41cea3648e3e',
    name: "Kiki's Delivery Service",
    bgColor: '#c24646',
  },
  {
    id: 'cd3d059c-09f4-4ff3-8d63-bc765a5184fa',
    name: "Howl's Moving Castle",
    bgColor: '#279094',
  },
  {
    id: '58611129-2dbc-4a81-a72f-77ddfc1b1b49',
    name: 'My Neighbor Totoro',
    bgColor: '#3e6cac',
  },
];

const Home = () => {
  const [fetchFilm] = useLazyQuery(FILM_QUERY);
  const [showBanner, setShowBanner] = useState<Set<string>>(new Set());
  const [showInfoPanel, setShowInfoPanel] = useState<Set<string>>(new Set());
  const [loadingFilm, setLoadingFilm] = useState<string | null>(null);
  const [filmData, setFilmData] = useState<Record<string, any>>({});

  const handleCardClick = (filmId: string) => {
    // If no film data yet, fetch it and show banner
    if (!filmData[filmId]) {
      setLoadingFilm(filmId);
      fetchFilm({
        variables: { id: filmId },
        onCompleted: (result) => {
          setLoadingFilm(null);
          if (result.film) {
            setFilmData((prev) => ({ ...prev, [filmId]: result.film }));
            setShowBanner((prev) => new Set(prev).add(filmId));
          }
        },
        onError: () => setLoadingFilm(null),
      });
    } else {
      // Toggle banner state
      setShowBanner((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(filmId)) {
          newSet.delete(filmId);
        } else {
          newSet.add(filmId);
        }
        return newSet;
      });
    }
  };

  const handleBannerHover = (filmId: string, isHovering: boolean) => {
    if (showBanner.has(filmId)) {
      setShowInfoPanel((prev) => {
        const newSet = new Set(prev);
        if (isHovering) {
          newSet.add(filmId);
        } else {
          newSet.delete(filmId);
        }
        return newSet;
      });
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center p-4 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${cloudsBg})` }}
    >
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold text-black mb-0">
          Discover Studio Ghibli Films
        </h1>
        <h2 className="text-xl text-black font-light mt-2">
          Select a film & hover to learn more
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {films.map((film) => (
          <div key={film.id} className="flex flex-col items-center w-full">
            <div className="card-container relative w-full max-w-[300px] h-[400px] perspective-1000 mx-auto">
              <div
                className={`card relative w-full h-full cursor-pointer transition-all duration-300 ${
                  !showBanner.has(film.id) ? 'hover:brightness-75' : ''
                }`}
                onClick={() => handleCardClick(film.id)}
                onMouseEnter={() => handleBannerHover(film.id, true)}
                onMouseLeave={() => handleBannerHover(film.id, false)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${film.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(film.id);
                  }
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handleCardClick(film.id);
                }}
              >
                {!showBanner.has(film.id) || loadingFilm === film.id ? (
                  /* Initial state - colored background with film name */
                  <div
                    className="absolute inset-0 w-full h-full shadow-lg overflow-hidden border-solid border-4 border-white flex flex-col justify-center items-center text-center"
                    style={{
                      backgroundColor: film.bgColor,
                      borderRadius: '8px',
                    }}
                  >
                    {loadingFilm === film.id ? (
                      <div className="text-white text-lg font-semibold">
                        Loading...
                      </div>
                    ) : (
                      <>
                        <h3 className="text-xl font-bold text-white px-4">
                          {film.name}
                        </h3>

                        {/* Arrow in circle at bottom right */}
                        <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full border-solid border-2 border-white flex items-center justify-center bg-transparent bg-opacity-20 p-5">
                          <span className="text-white text-3xl">→</span>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  /* Banner state with optional info panel */
                  <div
                    className="absolute inset-0 w-full h-full shadow-lg overflow-hidden border-solid border-4 border-white"
                    style={{ borderRadius: '8px' }}
                  >
                    {/* Movie banner background */}
                    <div
                      className="w-full h-full bg-cover bg-center relative"
                      style={{
                        backgroundImage: `url(${
                          filmData[film.id]?.image || ''
                        })`,
                      }}
                    >
                      {/* Info panel that slides up on hover */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 bg-white transition-transform duration-300 ${
                          showInfoPanel.has(film.id)
                            ? 'translate-y-0'
                            : 'translate-y-full'
                        }`}
                      >
                        <div className="p-4">
                          <p className="text-sm text-gray-800 mb-3 line-clamp-3">
                            {filmData[film.id]?.description}
                          </p>

                          <div className="space-y-1 text-sm text-black mb-6">
                            <p className="m-0">
                              Runtime:{' '}
                              <span className="font-bold">
                                {filmData[film.id]?.running_time} min
                              </span>
                            </p>
                            <p>
                              Director:{' '}
                              <span className="font-bold">
                                {filmData[film.id]?.director}
                              </span>
                            </p>
                            <p>
                              Released:{' '}
                              <span className="font-bold">
                                {filmData[film.id]?.release_date}
                              </span>
                            </p>
                          </div>

                          {/* Rotten Tomatoes score */}
                          <div className="flex items-center">
                            <img
                              src={rottenTomatoesLogo}
                              alt="Rotten Tomatoes"
                              className="w-12 h-12 mr-2"
                            />
                            {/* <img 
                              src="https://www.clipartmax.com/png/small/146-1460784_certified-fresh-rotten-tomatoes-fresh-logo.png" 
                              alt="RT Logo" 
                              className="w-12 h-12 mr-2 bg-white"
                            /> */}
                            <span
                              className="text-4xl"
                              style={{ color: '#004814' }}
                            >
                              {filmData[film.id]?.rt_score}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
