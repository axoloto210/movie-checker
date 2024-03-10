'use client'
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { Fragment, useId, useState } from 'react'
import { Draggable } from './Draggable'
import { Droppable } from './Droppable'
import MovieCard from './MovieCard'

type Props = {
  movies: {
    id: number
    title: string
    siteURL: string | null
    image: string | null
  }[]
}

export function MovieDnDList(props: Props) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5 //カード内でボタンクリックを有効化。5px ドラッグした時にソート機能を有効にする
    }
  })
  const sensors = useSensors(mouseSensor)

  const dndContextId = useId()
  const [movies, setMovies] = useState(props.movies)
  return (
    <div className="flex flex-wrap">
      <DndContext id={dndContextId} sensors={sensors} onDragEnd={handleDragEnd}>
        {movies.map((movie, index) => (
          <Fragment key={movie.title}>
            <Droppable key={movie.title} id={String(index)}>
              <Draggable id={String(index)}>
                <MovieCard
                  movieId={movie.id}
                  title={movie.title}
                  siteURL={movie.siteURL}
                  image={movie.image}
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
