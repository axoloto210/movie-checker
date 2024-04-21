'use client'

import { deleteFetch } from '@/app/lib/fetch'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Color from 'color'
import React from 'react'

const defaultColor = '#1976D2'

const StyledRoot = styled('div')<{ color?: string }>(
  ({ color = defaultColor }) => ({
    transition: '0.2s',
    position: 'relative',
    width: '100%',
    height: '100%',
    content: '""',
    display: 'block',
    borderRadius: '1rem',
    bottom: 0,
    backgroundColor: Color(color).darken(0.3).desaturate(0.2).string(),
    '&:hover': {
      '&:before': {
        bottom: -6
      },
      '& .MuiAvatar-root': {
        transform: 'scale(1.1)',
        boxShadow: '0 6px 20px 0 rgba(0,0,0,0.38)'
      }
    }
  })
)

const StyledContent = styled('div')<{ color?: string }>(
  ({ color = defaultColor }) => ({
    position: 'relative',
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: `0 6px 16px 0 ${Color(color).fade(0.5)}`,
    content: '""',
    display: 'block',
    left: 0,
    top: 1,
    background: `linear-gradient(to top, ${color}, ${Color(color)
      .rotate(24)
      .lighten(0.12)})`
  })
)

const AvatarLogo = styled(Avatar)(() => ({
  transition: '0.3s',
  width: 100,
  height: 100,
  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.24)',
  borderRadius: '1rem',
  '@media (max-width: 767px)': { width: '50px', height: '50px' } //閾値の直書きは避けるべき。
}))

const clickDeleteHandler = async (movieId: number, title: string) => {
  if (confirm(`「${title}」を削除しますか？`)) {
    await deleteFetch(`/deleteMovie/${movieId}`)
    window.location.reload()
  }
}

type Props = {
  movieId: number
  title: string
  siteURL: string
  image: string | null
}

export default function MovieCard(props: Props) {
  return (
    <>
      <Grid item>
        <StyledRoot>
          <StyledContent>
            <Box position={'relative'} className="w-25 h-25 md:w-50 md:h-50">
              <Box className="flex p-0 gap-2 flex-nowrap">
                <Box>
                  <AvatarLogo src={props.image ?? '/favicon.ico'} />
                </Box>
                <Box className="self-end">
                  <h2 className="font-fjalla md:font-sans md:text-sm text-xxs m-0 text-white">
                    {<>{props.title}</>}
                  </h2>
                </Box>
              </Box>
              <Box className="flex md:mt-8 mt-4 justify-between items-center">
                <Box
                  component="a"
                  href={props.siteURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white md:mt-12 mt-4 hover:text-green-500 text-xxs md:text-xs"
                >
                  公式サイトへ
                </Box>
                <Box
                  component="div"
                  onClick={() => clickDeleteHandler(props.movieId, props.title)}
                  className="text-white md:mt-12 mt-4 hover:text-red-500 text-xxs md:text-xs"
                >
                  削除
                </Box>
              </Box>
            </Box>
          </StyledContent>
        </StyledRoot>
      </Grid>
    </>
  )
}
