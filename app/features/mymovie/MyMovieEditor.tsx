'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material'
import { postFetch } from '@/lib/fetch'

type Props = {
  open: boolean
  handleCloseAction: () => void
  movieId: number
  initialTitle: string
  initialSiteURL: string
  initialImage: string | null
  initialWatchedDate?: Date | null
  initialPlannedDate?: Date | null
  isWatchedList?: boolean
}

export function MyMovieEditor(props: Props) {
  const [title, setTitle] = useState(props.initialTitle)
  const [siteURL, setSiteURL] = useState(props.initialSiteURL)
  const [image, setImage] = useState(props.initialImage || '')
  const [date, setDate] = useState(
    props.initialWatchedDate
      ? new Date(props.initialWatchedDate).toISOString().split('T')[0]
      : props.initialPlannedDate
        ? new Date(props.initialPlannedDate).toISOString().split('T')[0]
        : ''
  )

  const handleSubmit = async () => {
    await postFetch(`/updateMovie`, {
      movieId: props.movieId,
      title: title,
      siteURL: siteURL,
      image: image || null,
      watchedDate: !props.isWatchedList && date ? date : null,
      plannedDate: props.isWatchedList && date ? date : null
    })
    window.location.reload()
  }

  const handleCloseModal = () => {
    // Reset form to initial values
    setTitle(props.initialTitle)
    setSiteURL(props.initialSiteURL)
    setImage(props.initialImage || '')
    setDate(
      props.initialWatchedDate
        ? new Date(props.initialWatchedDate).toISOString().split('T')[0]
        : props.initialPlannedDate
          ? new Date(props.initialPlannedDate).toISOString().split('T')[0]
          : ''
    )
    props.handleCloseAction()
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleCloseModal}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>映画情報を編集</DialogTitle>
      <DialogContent>
        <TextField
          label="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          sx={{ mt: 2 }}
        />
        <TextField
          label="サイトURL"
          value={siteURL}
          onChange={(e) => setSiteURL(e.target.value)}
          fullWidth
          required
          sx={{ mt: 2 }}
        />
        <TextField
          label="画像URL（任意）"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <TextField
          label={props.isWatchedList ? 'みたい日（任意）' : 'みた日（任意）'}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true
          }}
          fullWidth
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>キャンセル</Button>
        <Button onClick={handleSubmit} variant="contained">
          保存
        </Button>
      </DialogActions>
    </Dialog>
  )
}
