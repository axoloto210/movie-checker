'use client'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Draggable } from './Draggable'
import { Droppable } from './Droppable'
import { Fragment, useId, useState } from 'react'
import MovieCard from './MovieCard'

type Props = {
  movies: {
    id: number
    title: string
    siteURL: string | null
  }[]
}

export function MovieDnDList(props: Props) {
  const dndContextId = useId()
  const [movies, setMovies] = useState(props.movies)
  return (
    <div className="flex flex-wrap">
      <DndContext id={dndContextId} onDragEnd={handleDragEnd}>
        {movies.map((movie, index) => (
          <Fragment key={movie.title}>
            <Droppable key={movie.title} id={String(index)}>
              <Draggable id={String(index)}>
                <MovieCard
                  movieId={movie.id}
                  title={movie.title}
                  siteURL={movie.siteURL}
                />
              </Draggable>
            </Droppable>
          </Fragment>
        ))}
      </DndContext>
    </div>
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    const sortedMovies = [...movies]

    const draggedId = active.id
    const droppedId = over?.id

    if (draggedId != null && droppedId != null) {
      sortedMovies[Number(draggedId)] = movies[Number(droppedId)]
      sortedMovies[Number(droppedId)] = movies[Number(draggedId)]

      setMovies(sortedMovies)
    }
  }
}
