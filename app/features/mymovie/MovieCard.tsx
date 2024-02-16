'use client'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

type Props = {
  title: string
  siteURL: string | null
}

export default function MovieCard(props: Props) {
  return (
    <Card sx={{ width: 300, height: 200 }}>
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
      </CardActions>
    </Card>
  )
}
