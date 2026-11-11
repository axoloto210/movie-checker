const posterImage = (seed: number) =>
  `https://picsum.photos/seed/movie-checker-${seed}/200/200`

export const watchedMovies = [
  {
    id: 1,
    title: 'Interstellar',
    siteURL: 'https://example.com/interstellar',
    image: posterImage(1),
    order: 1,
    watchedDate: new Date('2026-10-01')
  },
  {
    id: 2,
    title: 'Spirited Away',
    siteURL: 'https://example.com/spirited-away',
    image: posterImage(2),
    order: 2,
    watchedDate: new Date('2026-09-15')
  },
  {
    id: 3,
    title: 'The Grand Budapest Hotel',
    siteURL: 'https://example.com/grand-budapest-hotel',
    image: posterImage(3),
    order: 3,
    watchedDate: null
  },
  {
    id: 4,
    title: 'No image movie',
    siteURL: 'https://example.com/no-image',
    image: null,
    order: 4,
    watchedDate: new Date('2026-08-20')
  }
]

export const watchList = [
  {
    id: 11,
    title: 'Dune: Part Three',
    siteURL: 'https://example.com/dune-3',
    image: posterImage(11),
    order: 1,
    plannedDate: new Date('2026-12-18')
  },
  {
    id: 12,
    title: 'A movie with a very long title that wraps over several lines',
    siteURL: 'https://example.com/long-title',
    image: posterImage(12),
    order: 2,
    plannedDate: null
  }
]
