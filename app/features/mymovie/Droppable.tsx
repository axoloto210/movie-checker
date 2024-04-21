import { useDroppable } from '@dnd-kit/core'
import React from 'react'

export function Droppable(props: any) {
  const { setNodeRef, isOver } = useDroppable({
    id: props.id
  })

  const style = {
    opacity: isOver ? 0.8 : 1,
    zIndex: isOver ? 0 : 1
  }
  return (
    <div ref={setNodeRef} className="p-4 w-300 flex-grow" style={style}>
      {props.children}
    </div>
  )
}
