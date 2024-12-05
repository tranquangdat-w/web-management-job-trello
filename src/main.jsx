import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material'
import theme from './theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <CssVarsProvider theme ={theme}>
      <CssBaseline />
      {/* Need font roboto to use, please download font roboto from goggle */}
      <App />
    </CssVarsProvider>
  </>
)

