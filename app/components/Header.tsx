'use client'
//以下をベースに作成
//https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu

import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'

type Route = (typeof routes)[keyof typeof routes]

const routes = { mymovie: '/mymovie', mypage: '/mypage' } as const

const pages = [
  { title: 'マイページ', route: routes.mypage },
  { title: '見た映画', route: routes.mymovie }
] as const

const menuTitle = 'メニューを開く'

type Props = {
  title?: string
}

function ResponsiveAppBar(props: Props) {
  const { data: session } = useSession()
  const router = useRouter()

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogIn = () => {
    setAnchorElUser(null)
    signIn()
  }

  const handleLogOut = () => {
    setAnchorElUser(null)
    signOut()
  }

  const handleClickMenu = (route: Route) => {
    setAnchorElUser(null)
    router.push(route)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" passHref legacyBehavior>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              MovieChecker
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            ></IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Link href="/" passHref legacyBehavior>
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              MovieChecker
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link href={page.route}>{page.title}</Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={menuTitle}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="" src={session?.user?.image ?? undefined} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {session ? (
                [
                  <MenuItem
                    key={'mypage'}
                    onClick={() => handleClickMenu(routes.mypage)}
                  >
                    <Typography textAlign="center">マイページ</Typography>
                  </MenuItem>,
                  <MenuItem
                    key={'mymovie'}
                    onClick={() => handleClickMenu(routes.mymovie)}
                  >
                    <Typography textAlign="center">見た映画</Typography>
                  </MenuItem>,
                  <MenuItem key={'logout'} onClick={handleLogOut}>
                    <Typography textAlign="center">ログアウト</Typography>
                  </MenuItem>
                ]
              ) : (
                <MenuItem key={'login'} onClick={handleLogIn}>
                  <Typography textAlign="center">ログイン</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
        {props.title && (
          <h2 className="flex justify-center items-center text-white bg-mainblue">
            {props.title}
          </h2>
        )}
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
