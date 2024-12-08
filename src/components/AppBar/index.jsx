import ModeSelect from '../ModeSelect'
import { Box } from '@mui/material'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from './star.svg'

const AppBar = () => {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trelloCustom.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Box>
        <AppsIcon sx={{ color: 'primary.main' }}/>

        <SvgIcon component={TrelloIcon} inheritViewBox /> 
      </Box>
      <Box>
        <ModeSelect />
      </Box>
    </Box>
  )
}

export default AppBar

