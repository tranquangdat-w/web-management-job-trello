import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@emotion/react'
import theme from './theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ThemeProvider theme={theme}>
      {/* Need font roboto to use, please download font roboto from goggle */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </>
)

