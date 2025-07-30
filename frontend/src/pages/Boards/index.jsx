import { useTheme } from '@emotion/react'
import { Box, Button, Grid, LinearProgress, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import AppBar from '~/components/AppBar/AppBar'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import LayersIcon from '@mui/icons-material/Layers'
import Pagination from '@mui/material/Pagination'
import BoardCreateModal from './create'
import { createBoard, getBoards } from '~/apis'
import { ITEMS_PER_PAGE } from '~/utils/constants'
import { Bounce, toast } from 'react-toastify'

const Boards = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const [modalOpen, setModalOpen] = useState(false)

  const pageNumber = searchParams.get('page')

  let navigate = useNavigate()
  const theme = useTheme()
  const location = useLocation()
  const [value, setValue] = useState(location.pathname)
  const [page, setPage] = useState(parseInt(pageNumber) || 1)
  const [pageCount, setPageCount] = useState(0)
  const [displayedBoards, setDisplayedBoards] = useState(null)

  useEffect(() => {
    getBoards(page).then((res) => {
      setDisplayedBoards(res.boardData)
      const totalBoards = res.metadata[0]?.totalCount
      const pageCount = totalBoards ? Math.ceil(totalBoards / ITEMS_PER_PAGE) : 0
      setPageCount(pageCount)
    })
  }, [page])


  const handleTabChange = (_event, newValue) => {
    if (newValue === '/templates') {
      navigate('/templates')
      return
    }

    setValue('/boards')
    navigate('/boards')
  }

  const handlePageChange = async (_event, newPage) => {
    if (newPage == page) {
      return
    }

    if (newPage != 1) {
      searchParams.set('page', newPage)
      setSearchParams(searchParams)
    } else {
      searchParams.delete('page')
      setSearchParams(searchParams)
    }

    setPage(newPage)
  }

  const handleCreateBoard = (boardData) => {
    if (boardData?.description == '') {
      delete boardData.description
    }

    createBoard(boardData).then(() => {
      getBoards(page).then((res) => {
        setDisplayedBoards(res.boardData)
        const totalBoards = res.metadata[0]?.totalCount
        const pageCount = totalBoards ? Math.ceil(totalBoards / ITEMS_PER_PAGE) : 0
        setPageCount(pageCount)
      })
    }).then(() => {
      toast.success('Created board successfully', {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseonhover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce
      })
    })


    setModalOpen(false)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
      <AppBar />
      <Box
        sx={{
          height: `calc(100vh - ${theme.trelloCustom.appBarHeight})`,
          display: 'flex',
          justifyContent: 'center'
        }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', pt: 5 }}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleTabChange}
            sx={{ height: 'auto' }}
            TabIndicatorProps={{ style: { display: 'none' } }}>
            <Tab value="/boards" label="Boards" icon={<DashboardIcon />} iconPosition='start' />
            <Tab value="/templates" label="Templates" icon={<LayersIcon />} iconPosition='start' />
          </Tabs>
          <Button variant="contained" onClick={() => setModalOpen(true)} sx={{ mt: 2, ml: 2 }}>
            Create New Board
          </Button>
        </Box>
        <Box
          sx={{
            width: '960px',
            padding: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
          <Grid
            container
            spacing={2} >
            {displayedBoards == null
              &&
              <Box sx={{ paddingTop: 5, width: '100%' }}>
                <Typography
                  variant='h6'
                  display='block'
                  textAlign='center'
                  sx={{ color: 'text.secondary' }} >
                  Loading page {page}. Please wait for a moment
                </Typography>
                <LinearProgress />
              </Box>}
            {displayedBoards != null && displayedBoards.length == 0
              &&
              <Box paddingTop={5}>
                <Typography variant='h4' sx={{ color: 'text.secondary' }}>
                  Not found any board
                </Typography>
              </Box>
            }
            {displayedBoards != null && displayedBoards.map((board) => (
              <Grid
                item xs={12}
                sm={6}
                md={4}
                lg={3}
                key={board._id}
                component={Link}
                to={`/boards/${board._id}`}
                sx={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    '&:hover .image-box': {
                      filter: 'brightness(0.7)'
                    },
                    cursor: 'pointer'
                  }}>
                  <Box
                    className='image-box'
                    sx={{
                      height: '80px',
                      bgcolor: 'primary.main',
                      borderTopLeftRadius: 3,
                      borderTopRightRadius: 3,
                      transition: 'filter 0.3s ease'
                    }}
                  />
                  <Box
                    sx={{
                      borderRight: '0.5px solid gray',
                      borderLeft: '0.5px solid gray',
                      borderBottom: '0.5px solid gray',
                      p: 1,
                      borderBottomLeftRadius: 3,
                      borderBottomRightRadius: 3,
                      bgcolor: (theme) => theme.palette.mode == 'dark' ? 'gray' : 'white',
                      padding: '14px 8px'
                    }}>
                    <Typography
                      variant="subtitle2"
                      noWrap
                      sx={{
                        userSelect: 'none',
                        color: (theme) => theme.palette.mode == 'dark' ? 'white' : 'black'
                      }}
                    >
                      {board.title}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          {pageCount > 1
            &&
            <Stack spacing={2} sx={{ mt: 2, alignItems: 'center' }}>
              <Pagination count={pageCount} page={page} onChange={handlePageChange} variant="outlined" color="primary" />
            </Stack>
          }
        </Box>
      </Box>
      <BoardCreateModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleCreateBoard} />
    </Box>
  )
}

export default Boards
