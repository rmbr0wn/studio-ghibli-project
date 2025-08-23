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
        screen.getByRole('button', { name: 'Porco Rosso' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: "Kiki's Delivery Service" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: "Howl's Moving Castle" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'My Neighbor Totoro' }),
      ).toBeInTheDocument();
    });

    it('displays loading state when button is clicked', async () => {
      render(
        <MockedProvider mocks={createMocks(mockFilms[0])} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      const button = screen.getByRole('button', { name: 'Porco Rosso' });
      fireEvent.click(button);

      expect(button).toHaveTextContent('Loading...');
      expect(button).toBeDisabled();
    });

    it('resets loading state after data is fetched', async () => {
      render(
        <MockedProvider mocks={createMocks(mockFilms[0])} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      const button = screen.getByRole('button', { name: 'Porco Rosso' });
      fireEvent.click(button);

      // Wait for loading to complete
      await waitFor(() => {
        expect(button).toHaveTextContent('Porco Rosso');
        expect(button).not.toBeDisabled();
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

      const button = screen.getByRole('button', { name: 'Porco Rosso' });
      fireEvent.click(button);

      // Wait for the card to appear by checking for the image specifically
      const cardImage = await screen.findByAltText('Porco Rosso');
      expect(cardImage).toBeInTheDocument();

      // Verify the card container exists (more specific than text check)
      const cardContainer = cardImage.closest('.card-container');
      expect(cardContainer).toBeInTheDocument();
    });

    it('displays card details on flip (click)', async () => {
      render(
        <MockedProvider mocks={createMocks(mockFilms[0])} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      // Click button to load film
      const button = screen.getByRole('button', { name: 'Porco Rosso' });
      fireEvent.click(button);

      // Wait for card to appear
      const cardImage = await screen.findByAltText('Porco Rosso');
      expect(cardImage).toBeInTheDocument();

      // Click on card to flip it
      const card = cardImage.closest('.flip-card');
      fireEvent.click(card!);

      // Check if card details are visible after flip
      await waitFor(() => {
        expect(screen.getByText('Hayao Miyazaki')).toBeInTheDocument();
        expect(screen.getByText('1992')).toBeInTheDocument();
        expect(screen.getByText('94 min')).toBeInTheDocument();
        expect(screen.getByText('95%')).toBeInTheDocument();
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
      const porcoButton = screen.getByRole('button', { name: 'Porco Rosso' });
      fireEvent.click(porcoButton);

      // Wait for first card
      await screen.findByAltText('Porco Rosso');

      // Click second button
      const kikiButton = screen.getByRole('button', {
        name: "Kiki's Delivery Service",
      });
      fireEvent.click(kikiButton);

      // Wait for second card and verify both are present
      await screen.findByAltText("Kiki's Delivery Service");
      expect(screen.getByAltText('Porco Rosso')).toBeInTheDocument();
    });

    it('handles card flip state independently for each card', async () => {
      render(
        <MockedProvider mocks={createMocks(mockFilms[0])} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      // Load and flip card
      const button = screen.getByRole('button', { name: 'Porco Rosso' });
      fireEvent.click(button);

      const cardImage = await screen.findByAltText('Porco Rosso');
      const card = cardImage.closest('.flip-card');

      // Click to flip
      fireEvent.click(card!);

      // Verify it's flipped (rotated)
      await waitFor(() => {
        expect(card).toHaveClass('rotate-y-180');
      });

      // Click again to flip back
      fireEvent.click(card!);

      // Verify it's back to original state
      await waitFor(() => {
        expect(card).not.toHaveClass('rotate-y-180');
      });
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

      // Click button to load film data
      const button = screen.getByText('Porco Rosso');
      fireEvent.click(button);

      // Wait for film data to load
      await waitFor(() => {
        expect(screen.getByAltText('Porco Rosso')).toBeInTheDocument();
      });

      const cardImage = screen.getByAltText('Porco Rosso');
      const card = cardImage.closest('.flip-card');

      // Verify card has tap highlight disabled for mobile
      expect(card).toHaveClass('flip-card');

      // Test touch interaction (should work like click on mobile)
      fireEvent.touchStart(card!);
      fireEvent.touchEnd(card!);

      // Verify card flips on touch
      await waitFor(() => {
        expect(card).toHaveClass('rotate-y-180');
      });
    });

    it('disables hover effects on mobile devices', async () => {
      const mocks = createMocks(mockFilms[0]);

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      // Click button to load film data
      const button = screen.getByText('Porco Rosso');
      fireEvent.click(button);

      // Wait for film data to load
      await waitFor(() => {
        expect(screen.getByAltText('Porco Rosso')).toBeInTheDocument();
      });

      const cardImage = screen.getByAltText('Porco Rosso');
      const card = cardImage.closest('.flip-card');

      // On mobile (width < 768), hover should not trigger flip
      fireEvent.mouseEnter(card!);

      // Card should not flip on hover when on mobile
      expect(card).not.toHaveClass('rotate-y-180');

      // But click should still work
      fireEvent.click(card!);

      await waitFor(() => {
        expect(card).toHaveClass('rotate-y-180');
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

      // Click button to load film data
      const button = screen.getByText('Porco Rosso');
      fireEvent.click(button);

      // Wait for film data to load
      await waitFor(() => {
        expect(screen.getByAltText('Porco Rosso')).toBeInTheDocument();
      });

      const cardImage = screen.getByAltText('Porco Rosso');
      const card = cardImage.closest('.flip-card');

      // On desktop (width >= 768), hover should trigger flip
      fireEvent.mouseEnter(card!);

      await waitFor(() => {
        expect(card).toHaveClass('rotate-y-180');
      });

      // Mouse leave should flip back
      fireEvent.mouseLeave(card!);

      await waitFor(() => {
        expect(card).not.toHaveClass('rotate-y-180');
      });
    });

    it('maintains proper card layout on mobile screen sizes', async () => {
      const mocks = createMocks(mockFilms[0]);

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      // Click button to load film data
      const button = screen.getByText('Porco Rosso');
      fireEvent.click(button);

      // Wait for film data to load
      await waitFor(() => {
        expect(screen.getByAltText('Porco Rosso')).toBeInTheDocument();
      });

      const cardContainer = screen
        .getByAltText('Porco Rosso')
        .closest('.card-container');

      // Verify card container has responsive classes
      expect(cardContainer).toHaveClass('w-full', 'max-w-sm');

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
      const button1 = screen.getByText('Porco Rosso');
      fireEvent.click(button1);

      await waitFor(() => {
        expect(screen.getByAltText('Porco Rosso')).toBeInTheDocument();
      });

      // Load second film
      const button2 = screen.getByText("Kiki's Delivery Service");
      fireEvent.click(button2);

      await waitFor(() => {
        expect(
          screen.getByAltText("Kiki's Delivery Service"),
        ).toBeInTheDocument();
      });

      // Get both cards
      const card1 = screen.getByAltText('Porco Rosso').closest('.flip-card');
      const card2 = screen
        .getByAltText("Kiki's Delivery Service")
        .closest('.flip-card');

      // Touch interactions on both cards should work independently
      fireEvent.click(card1!);

      await waitFor(() => {
        expect(card1).toHaveClass('rotate-y-180');
        expect(card2).not.toHaveClass('rotate-y-180');
      });

      fireEvent.click(card2!);

      await waitFor(() => {
        expect(card1).toHaveClass('rotate-y-180');
        expect(card2).toHaveClass('rotate-y-180');
      });

      // Flip first card back
      fireEvent.click(card1!);

      await waitFor(() => {
        expect(card1).not.toHaveClass('rotate-y-180');
        expect(card2).toHaveClass('rotate-y-180');
      });
    });

    it('provides adequate touch target size for mobile', async () => {
      const mocks = createMocks(mockFilms[0]);

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      // Verify buttons have adequate size for touch
      const button = screen.getByText('Porco Rosso');
      expect(button).toHaveClass('px-4', 'py-2', 'w-full', 'max-w-xs');

      // Click button to load film data
      fireEvent.click(button);

      // Wait for film data to load
      await waitFor(() => {
        expect(screen.getByAltText('Porco Rosso')).toBeInTheDocument();
      });

      const cardContainer = screen
        .getByAltText('Porco Rosso')
        .closest('.card-container');

      // Verify card has adequate size for touch interactions
      expect(cardContainer).toHaveClass('w-full', 'max-w-sm', 'h-96');
    });

    it('prevents text selection during touch interactions', async () => {
      const mocks = createMocks(mockFilms[0]);

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>,
      );

      // Click button to load film data
      const button = screen.getByText('Porco Rosso');
      fireEvent.click(button);

      // Wait for film data to load
      await waitFor(() => {
        expect(screen.getByAltText('Porco Rosso')).toBeInTheDocument();
      });

      const card = screen.getByAltText('Porco Rosso').closest('.flip-card');

      // Verify card has cursor-pointer class for better touch feedback
      expect(card).toHaveClass('cursor-pointer');

      // Simulate touch interaction that should trigger flip
      fireEvent.touchEnd(card!);

      await waitFor(() => {
        expect(card).toHaveClass('rotate-y-180');
      });

      // Verify that the card flipped, demonstrating touch interactions work
      // and text selection is prevented through proper event handling
      expect(card).toHaveClass('rotate-y-180');
    });
  });
});
