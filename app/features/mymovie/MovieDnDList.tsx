'use client'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Draggable } from './Draggable'
import { Droppable } from './Droppable'
import { Fragment, useState } from 'react'
import Image from 'next/image'

type Props = {
  movies: {
    title: string
    image: string | null
    siteURL: string | null
  }[]
}

export function MovieDnDList(props: Props) {
  const [movies, setMovies] = useState(props.movies)
  return (
    <DndContext onDragEnd={handleDragEnd}>
      {movies.map((movie, index) => (
        <Fragment key={movie.title}>
          <Droppable key={movie.title} id={String(index)}>
            <Draggable id={String(index)}>
              <Image
                id={String(index)}
                src={movie.image ?? ''}
                alt={movie.title}
                width={120}
                height={180}
                unoptimized={true}
              />
            </Draggable>
          </Droppable>
        </Fragment>
      ))}
    </DndContext>
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
