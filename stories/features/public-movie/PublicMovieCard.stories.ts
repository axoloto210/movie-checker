import { Meta, StoryObj } from '@storybook/react'
import { PublicMovieCard } from 'app/features/public-movie/PublicMovieCard'

const meta = {
  title: 'PublicMovieCard',
  component: PublicMovieCard
} as Meta<typeof PublicMovieCard>

export default meta

export const MovieCardStory: StoryObj = {
  args: {
    publicMovie: {
      id: 1,
      title: 'Movie Checker',
      siteURL: 'https://movie-checker.com',
      image: 'no-image',
      publicationDate: '2024/01/01'
    }
  }
}

export const MovieCardImageStory: StoryObj = {
  args: {
    publicMovie: {
      id: 210,
      title: 'Movie Checker',
      siteURL: 'https://movie-checker.com',
      image: 'https://movie-checker.com/favicon.ico',
      publicationDate: '2024/01/01'
    }
  }
}
