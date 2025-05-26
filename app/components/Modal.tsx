'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal()
    }
  }, [])

  function onDismiss() {
    router.back()
  }

  function onBackdropClick(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    if (dialogRef.current === event.target) {
      onDismiss()
    }
  }

  return createPortal(
    <div className="modal-backdrop" onClick={onBackdropClick}>
      <dialog ref={dialogRef} className="modal" onClose={onDismiss}>
        <div className="modal-content">
          {children}
          <button onClick={onDismiss} className="close-button" />
        </div>
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  )
}
