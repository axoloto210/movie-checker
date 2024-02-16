import React from 'react'
import { useDroppable } from '@dnd-kit/core'

export function Droppable(props: any) {
  const { setNodeRef } = useDroppable({
    id: props.id
  })

  return (
    <div ref={setNodeRef} className="p-4 w-300 flex-grow">
      {props.children}
    </div>
  )
}
