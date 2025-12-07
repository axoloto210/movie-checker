'use client'
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { Fragment, useId, useState } from 'react'
import { Draggable } from './Draggable'
import { Droppable } from './Droppable'
import MovieCard from './MovieCard'
import { putFetch } from '@/lib/fetch'
import { RankIcon } from '@/components/RankIcon'

const rankLimit = 3 as const

type Props = {
  movies: {
    id: number
    title: string
    siteURL: string | null
    image: string | null
    order: number
    watchedDate?: Date | null
    plannedDate?: Date | null
  }[]
  isWatchList?: boolean
  userEmail?: string
}

export function MovieDnDList(props: Props) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5 //カード内でボタンクリックを有効化。5px ドラッグした時にソート機能を有効にする
    }
  })

  const touchSensor = useSensor(TouchSensor, {
    // <delay>ms <tolerance>pxの範囲内でタッチし続けるとドラッグ可能に。
    activationConstraint: {
      delay: 200,
      tolerance: 5
    }
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  const dndContextId = useId()
  const [movies, setMovies] = useState(props.movies)

  const clickHandlerUpdateOrder = async () => {
    const moviesOrder = movies.map((movie, index) => {
      return {
        id: movie.id,
        order: index + 1
      }
    })
    const body = {
      moviesOrder
    }

    await putFetch<object, typeof body>('/updateMoviesOrder', body)
      .then(() => {
        alert('ランキングの順番を保存しました。')
      })
      .catch(() =>
        alert('エラーが発生しました。時間をあけて再度お試しください。')
      )
  }

  return (
    <>
      <button
        className="blue-button mt-4 ml-4"
        onClick={clickHandlerUpdateOrder}
      >
        ランキングを保存
      </button>
      <div className="flex flex-wrap">
        <DndContext
          id={dndContextId}
          sensors={sensors}
          onDragEnd={handleDragEnd}
        >
          {movies.map((movie, index) => (
            <Fragment key={movie.id}>
              <Droppable key={movie.id} id={String(index)}>
                <Draggable id={String(index)}>
                  {index < rankLimit ? (
                    <RankIcon order={index + 1} width="20px" height="20px" />
                  ) : null}
                  <MovieCard
                    movieId={movie.id}
                    title={movie.title}
                    siteURL={movie.siteURL ?? '/'}
                    image={movie.image}
                    userEmail={props.userEmail}
                    isWatchedList={props.isWatchList}
                    watchedDate={movie.watchedDate}
                    plannedDate={movie.plannedDate}
                  />
                </Draggable>
              </Droppable>
            </Fragment>
          ))}
        </DndContext>
      </div>
    </>
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    const draggedId = Number(active.id)
    const droppedId = Number(over?.id)

    if (draggedId != null && droppedId != null) {
      const draggedMovie = movies[draggedId]

      const sortedMovies = movies
        .toSpliced(draggedId, 1) //remove dragged movie
        .toSpliced(droppedId, 0, draggedMovie) //insert dragged movie

      setMovies(sortedMovies)
    }
  }
}
