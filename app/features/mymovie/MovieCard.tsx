'use client'

import React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Color from 'color'

const defaultColor = '#1976D2'
const cardWidth = 200
const cardHeight = 200

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

const StyledH2 = styled('h2')(() => ({
  fontFamily: 'Fjalla One',
  fontSize: '1rem',
  color: '#fff',
  margin: 0
}))

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
  borderRadius: '1rem'
}))

type CustomCardProps = {
  color?: string
  logo?: string
  copyRights?: string
} & Props

const CustomCard = ({ color, logo, title, siteURL }: CustomCardProps) => {
  return (
    <StyledRoot color={color}>
      <StyledContent color={color}>
        <Box position={'relative'} width={cardWidth} height={cardHeight}>
          <Box display="flex" p={0} gap={2} sx={{ flexWrap: 'nowrap' }}>
            <Box>
              <AvatarLogo src={logo} />
            </Box>
            <Box alignSelf="flex-end">
              <StyledH2>{<>{title}</>}</StyledH2>
            </Box>
          </Box>
          <Box display="flex" mt={4} alignItems={'center'}>
            <Box
              component="a"
              href={siteURL ?? '/'}
              target="_blank"
              marginTop={6}
              className="text-white hover:text-green-500 pr-4 text-xs"
            >
              公式サイトへ
            </Box>
          </Box>
        </Box>
      </StyledContent>
    </StyledRoot>
  )
}

type Props = {
  movieId: number
  title: string
  siteURL: string | null
  image: string | null
}

export default function MovieCard(props: Props) {
  return (
    <>
      <Grid item>
        <CustomCard
          color={defaultColor}
          logo={props?.image ? props.image : '/favicon.ico'}
          title={props.title}
          siteURL={props.siteURL}
          movieId={props.movieId}
          image={props.image}
        />
      </Grid>
    </>
  )
}