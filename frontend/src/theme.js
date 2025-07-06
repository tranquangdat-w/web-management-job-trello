import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '68px'
const BOARD_BAR_HEIGHT = '58px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_FOOTER_HEIGHT = '50px'
const COLUMN_WIDTH = '272px'
const MARGIN_LEFT_COLUMN = 2
const BORDER_RADIUS_COLUMN = '10px'

const theme = extendTheme({
  trelloCustom: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT,
    columnWidth: COLUMN_WIDTH,
    marginLeftColumn: MARGIN_LEFT_COLUMN,
    borderRadiusColumn: BORDER_RADIUS_COLUMN,
    barPadding: 2
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: '#f7f9fc' // A slightly off-white for a softer look
        }
      }
    },
    dark: {
      palette: {
        background: {
          default: '#1a2027' // A dark, cool gray
        }
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => `
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px ${theme.palette.background.paper} inset !important;
            -webkit-text-fill-color: ${theme.palette.text.primary} !important;
            transition: background-color 5000s ease-in-out 0s;
            caret-color: ${theme.palette.text.primary};
        }
      `
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 'normal'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root:{
          '& fieldset': { borderWidth: '0.5px !important' },
          '&:hover fieldset': { borderWidth: '1px !important' },
          '&.Mui-focused fieldset': { borderWidth: '1px !important' }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: '0.875rem' }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': {
            fontSize: '0.875rem'
          }
        }
      }
    }
  }
})

export default theme

