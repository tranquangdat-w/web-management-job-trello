import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material'
import theme from './theme.js'
import { ToastContainer, Bounce } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <CssVarsProvider theme ={theme}>
      {/* Need font roboto to use, please download font roboto from goggle */}
      <CssBaseline />
      <App />
      <ToastContainer />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </CssVarsProvider>
  </>
)

