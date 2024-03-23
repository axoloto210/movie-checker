import { Meta, StoryObj } from '@storybook/react'
import MovieCard from '../../../app/features/mymovie/MovieCard'

const meta = {
  title: 'MovieCard',
  component: MovieCard
} as Meta<typeof MovieCard>

export default meta

export const MovieCardStory: StoryObj = {
  args: {
    movieId: 1,
    title: 'Movie Checker',
    siteURL: 'https://movie-checker.com',
    image: 'no-image'
  }
}

export const MovieCardImageStory: StoryObj = {
  args: {
    movieId: 210,
    title: 'Movie Checker',
    siteURL: 'https://movie-checker.com',
    image: 'https://movie-checker.com/favicon.ico'
  }
}
