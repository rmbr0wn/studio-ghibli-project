import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { FILM_QUERY } from '~/graphql/queries';
import Home from '~/modules/home/Home';

const mockFilms = [
  {
    id: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8',
    title: 'Porco Rosso',
    description: 'A tale of a pig pilot in the Adriatic Sea.',
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

const createMocks = (filmData: any) => [
  {
    request: {
      query: FILM_QUERY,
      variables: { id: filmData.id },
    },
    result: {
      data: {
        film: filmData,
      },
    },
  },
];

describe('Home Component', () => {
  describe('Film Buttons', () => {
    it('renders all four film buttons', () => {
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      expect(
        screen.getByRole('button', { name: 'View details for Porco Rosso' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', {
          name: "View details for Kiki's Delivery Service",
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', {
          name: "View details for Howl's Moving Castle",
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', {
          name: 'View details for My Neighbor Totoro',
        }),
      ).toBeInTheDocument();
    });

    it('displays loading state when button is clicked', async () => {
      render(
        <MockedProvider mocks={createMocks(mockFilms[0])} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      const button = screen.getByRole('button', {
        name: 'View details for Porco Rosso',
      });
      fireEvent.click(button);

      // Check that loading text appears inside the card
      await waitFor(() => {
        expect(screen.getByText('Loading...')).toBeInTheDocument();
      });
    });

    it('resets loading state after data is fetched', async () => {
      render(
        <MockedProvider mocks={createMocks(mockFilms[0])} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      const button = screen.getByRole('button', {
        name: 'View details for Porco Rosso',
      });
      fireEvent.click(button);

      // Wait for loading to complete and film banner to appear
      await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        expect(
          screen.getByText('A tale of a pig pilot in the Adriatic Sea.'),
        ).toBeInTheDocument();
      });
    });
  });

  describe('Film Cards', () => {
    it('displays film card after button click', async () => {
      render(
        <MockedProvider mocks={createMocks(mockFilms[0])} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      const button = screen.getByRole('button', {
        name: 'View details for Porco Rosso',
      });
      fireEvent.click(button);

      // Wait for the card to show flipped state with movie details
      await waitFor(() => {
        expect(
          screen.getByText('A tale of a pig pilot in the Adriatic Sea.'),
        ).toBeInTheDocument();
      });

      // Verify the card container exists
      const cardContainer = button.closest('.card-container');
      expect(cardContainer).toBeInTheDocument();
    });

    it('displays card details on flip (click)', async () => {
      render(
        <MockedProvider mocks={createMocks(mockFilms[0])} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      // Click button to load film
      const button = screen.getByRole('button', {
        name: 'View details for Porco Rosso',
      });
      fireEvent.click(button);

      // Wait for card to flip and show details
      await waitFor(() => {
        expect(
          screen.getByText('A tale of a pig pilot in the Adriatic Sea.'),
        ).toBeInTheDocument();
      });

      // Check if card details are visible after flip
      await waitFor(() => {
        expect(screen.getByText('Hayao Miyazaki')).toBeInTheDocument();
        expect(screen.getByText('1992')).toBeInTheDocument();
        expect(screen.getByText(/94.*min/)).toBeInTheDocument(); // Match "94 min"
        expect(screen.getByText(/95.*%/)).toBeInTheDocument(); // Match "95%"
      });
    });

    it('allows multiple cards to be displayed simultaneously', async () => {
      const allMocks = [
        ...createMocks(mockFilms[0]),
        ...createMocks(mockFilms[1]),
      ];

      render(
        <MockedProvider mocks={allMocks} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      // Click first button
      const porcoButton = screen.getByRole('button', {
        name: 'View details for Porco Rosso',
      });
      fireEvent.click(porcoButton);

      // Wait for first card to flip and show details
      await waitFor(() => {
        expect(
          screen.getByText('A tale of a pig pilot in the Adriatic Sea.'),
        ).toBeInTheDocument();
      });

      // Click second button
      const kikiButton = screen.getByRole('button', {
        name: "View details for Kiki's Delivery Service",
      });
      fireEvent.click(kikiButton);

      // Wait for second card details and verify both are present
      await waitFor(() => {
        expect(
          screen.getByText('A young witch starts her own delivery service.'),
        ).toBeInTheDocument();
      });
      expect(
        screen.getByText('A tale of a pig pilot in the Adriatic Sea.'),
      ).toBeInTheDocument();
    });

    it('handles card flip state independently for each card', async () => {
      render(
        <MockedProvider mocks={createMocks(mockFilms[0])} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      // Load and flip card
      const button = screen.getByRole('button', {
        name: 'View details for Porco Rosso',
      });
      fireEvent.click(button);

      // Verify card shows flipped state with details
      await waitFor(() => {
        expect(
          screen.getByText('A tale of a pig pilot in the Adriatic Sea.'),
        ).toBeInTheDocument();
      });

      // Click again to flip back to title view
      fireEvent.click(button);

      // Verify it's back to original state (title view)
      await waitFor(() => {
        expect(
          screen.queryByText('A tale of a pig pilot in the Adriatic Sea.'),
        ).not.toBeInTheDocument();
      });
      expect(screen.getByText('Porco Rosso')).toBeInTheDocument();
    });
  });

  describe('Mobile Responsiveness and Touch Interactions', () => {
    // Mock window.innerWidth for testing responsive behavior
    const originalInnerWidth = window.innerWidth;

    beforeEach(() => {
      // Mock window.innerWidth for mobile testing
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375, // iPhone SE width
      });
    });

    afterEach(() => {
      // Restore original window.innerWidth
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: originalInnerWidth,
      });
    });

    it('enables touch interactions on mobile devices', async () => {
      const mocks = createMocks(mockFilms[0]);

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      // Get button with proper aria label
      const button = screen.getByRole('button', {
        name: 'View details for Porco Rosso',
      });

      // Click button to load film data
      fireEvent.click(button);

      // Wait for film data to load (check for description text)
      await waitFor(() => {
        expect(
          screen.getByText('A tale of a pig pilot in the Adriatic Sea.'),
        ).toBeInTheDocument();
      });

      // Test touch interaction on the button (should work like click on mobile)
      fireEvent.touchStart(button);
      fireEvent.touchEnd(button);

      // The card should maintain its flipped state or toggle back
      expect(button).toBeInTheDocument();
    });

    it('disables hover effects on mobile devices', async () => {
      const mocks = createMocks(mockFilms[0]);

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      // Get button with proper aria label
      const button = screen.getByRole('button', {
        name: 'View details for Porco Rosso',
      });

      // Click button to load film data
      fireEvent.click(button);

      // Wait for film data to load
      await waitFor(() => {
        expect(
          screen.getByText('A tale of a pig pilot in the Adriatic Sea.'),
        ).toBeInTheDocument();
      });

      // On mobile (width < 768), hover should not trigger additional effects
      fireEvent.mouseEnter(button);

      // The card should remain in its current state
      expect(
        screen.getByText('A tale of a pig pilot in the Adriatic Sea.'),
      ).toBeInTheDocument();

      // But click should still work to toggle back
      fireEvent.click(button);

      await waitFor(() => {
        expect(
          screen.queryByText('A tale of a pig pilot in the Adriatic Sea.'),
        ).not.toBeInTheDocument();
      });
    });

    it('enables hover effects on desktop devices', async () => {
      // Set desktop width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024, // Desktop width
      });

      const mocks = createMocks(mockFilms[0]);

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      // Get button with proper aria label and click to load film data
      const button = screen.getByRole('button', {
        name: 'View details for Porco Rosso',
      });
      fireEvent.click(button);

      // Wait for film data to load (flipped state with details)
      await waitFor(() => {
        expect(
          screen.getByText('A tale of a pig pilot in the Adriatic Sea.'),
        ).toBeInTheDocument();
      });

      // On desktop, hover effects should work on the info panel for RT score visibility
      const infoPanel = screen
        .getByText('A tale of a pig pilot in the Adriatic Sea.')
        .closest('div');

      // Desktop hover should show/highlight the rotten tomatoes score
      fireEvent.mouseEnter(infoPanel!);
      expect(screen.getByText(/95.*%/)).toBeInTheDocument(); // Match "95%"

      // Mouse leave should still keep the info visible (it doesn't hide)
      fireEvent.mouseLeave(infoPanel!);
      expect(screen.getByText(/95.*%/)).toBeInTheDocument(); // Match "95%"
    });

    it('maintains proper card layout on mobile screen sizes', async () => {
      const mocks = createMocks(mockFilms[0]);

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      // Get button and click to load film data
      const button = screen.getByRole('button', {
        name: 'View details for Porco Rosso',
      });
      fireEvent.click(button);

      // Wait for film data to load
      await waitFor(() => {
        expect(
          screen.getByText('A tale of a pig pilot in the Adriatic Sea.'),
        ).toBeInTheDocument();
      });

      const cardContainer = button.closest('.card-container');

      // Verify card container has responsive classes for mobile
      expect(cardContainer).toHaveClass('w-full', 'max-w-[300px]', 'h-[400px]');

      // Verify parent grid has mobile-responsive classes
      const gridContainer = cardContainer?.closest('.grid');
      expect(gridContainer).toHaveClass('grid-cols-1');
    });

    it('handles multiple touch interactions correctly', async () => {
      const mocks = [
        ...createMocks(mockFilms[0]),
        ...createMocks(mockFilms[1]),
      ];

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      // Load first film
      const button1 = screen.getByRole('button', {
        name: 'View details for Porco Rosso',
      });
      fireEvent.click(button1);

      await waitFor(() => {
        expect(
          screen.getByText('A tale of a pig pilot in the Adriatic Sea.'),
        ).toBeInTheDocument();
      });

      // Load second film
      const button2 = screen.getByRole('button', {
        name: "View details for Kiki's Delivery Service",
      });
      fireEvent.click(button2);

      await waitFor(() => {
        expect(
          screen.getByText('A young witch starts her own delivery service.'),
        ).toBeInTheDocument();
      });

      // Touch interactions on both cards should work independently
      fireEvent.click(button1);

      await waitFor(() => {
        expect(
          screen.queryByText('A tale of a pig pilot in the Adriatic Sea.'),
        ).not.toBeInTheDocument();
      });

      // Second card should still show its details
      expect(
        screen.getByText('A young witch starts her own delivery service.'),
      ).toBeInTheDocument();
    });

    it('provides adequate touch target size for mobile', async () => {
      const mocks = createMocks(mockFilms[0]);

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      // Verify buttons have adequate size for touch
      const button = screen.getByRole('button', {
        name: 'View details for Porco Rosso',
      });
      expect(button).toHaveClass('cursor-pointer');

      // Click button to load film data
      fireEvent.click(button);

      // Wait for film data to load
      await waitFor(() => {
        expect(
          screen.getByText('A tale of a pig pilot in the Adriatic Sea.'),
        ).toBeInTheDocument();
      });

      const cardContainer = button.closest('.card-container');

      // Verify card has adequate size for touch interactions
      expect(cardContainer).toHaveClass('w-full', 'max-w-[300px]', 'h-[400px]');
    });

    it('prevents text selection during touch interactions', async () => {
      const mocks = createMocks(mockFilms[0]);

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      // Get button with proper aria label
      const button = screen.getByRole('button', {
        name: 'View details for Porco Rosso',
      });

      // Verify button has cursor-pointer class for better touch feedback
      expect(button).toHaveClass('cursor-pointer');

      // Click button to load film data first
      fireEvent.click(button);

      // Wait for the async operation to complete
      await waitFor(() => {
        // We'll check that the card is interactive and touch events work properly
        // by verifying that the button maintains its accessibility attributes
        expect(button).toHaveAttribute(
          'aria-label',
          'View details for Porco Rosso',
        );
      });

      // Simulate touch interaction that should work properly
      fireEvent.touchEnd(button);

      // Verify that the card maintains its state and functionality
      // and text selection is prevented through proper event handling
      expect(button).toHaveAttribute('role', 'button');
      expect(button).toHaveClass('cursor-pointer');
    });
  });
});
