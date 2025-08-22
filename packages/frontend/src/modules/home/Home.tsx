import { useQuery, useLazyQuery } from '@apollo/client';
import { Box, Typography, CircularProgress } from '@mui/material';
import { gql } from '~/graphql/gen/gql';
import { FILM_QUERY } from '~/graphql/queries';

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

  const handleButtonClick = (id: string) => {
    fetchFilm({ variables: { id } });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {films.map((film) => (
        <button
          key={film.id}
          onClick={() => handleButtonClick(film.id)}
          className={`px-4 py-2 rounded focus:outline-none ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          disabled={loading}
        >
          {loading ? 'Loading...' : film.name}
        </button>
      ))}
    </div>
  );
};

export default Home;
