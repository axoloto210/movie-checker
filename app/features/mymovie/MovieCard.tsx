'use client'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CardHighlight } from './CardHighlight'

type Props = {
  movieId: number
  title: string
  siteURL: string | null
}

const clickHandler = (movieId: number) => {
  console.log(movieId)
}

export default function MovieCard(props: Props) {
  return (
    <>
      {/* <Card sx={{ width: 300, height: 200 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2">{props.siteURL}</Typography>
      </CardContent>
      <CardActions>
        {props.siteURL != null && (
          <Button size="small" href={props.siteURL} target="_blank">
            公式サイトへ
          </Button>
        )}
        <Button size='small' onClick={()=>clickHandler(props.movieId)}>
          削除
        </Button>
      </CardActions>
    </Card> */}
      <CardHighlight title={props.title} />
    </>
  )
}
