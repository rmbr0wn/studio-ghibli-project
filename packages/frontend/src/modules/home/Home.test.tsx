import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { FILM_QUERY } from '~/graphql/queries';
import Home from '~/modules/home/Home';

const mocks = [
  {
    request: {
      query: FILM_QUERY,
      variables: { id: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8' },
    },
    result: {
      data: {
        film: {
          title: 'Porco Rosso',
          description: 'A tale of a pig pilot.',
          director: 'Hayao Miyazaki',
          release_date: '1992',
          running_time: '94',
          rt_score: '95',
          movie_banner: 'banner_url',
          image: 'image_url',
        },
      },
    },
  },
];

describe('Home Component', () => {
  it('renders film buttons and fetches data on click', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>,
    );

    const button = screen.getByText('Porco Rosso');
    fireEvent.click(button);

    expect(await screen.findByText('Porco Rosso')).toBeInTheDocument();
  });

  it('displays loading state when fetching data', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>,
    );

    const button = screen.getByText('Porco Rosso');
    fireEvent.click(button);

    expect(screen.getAllByText('Loading...').length).toBeGreaterThan(0);
  });
});
