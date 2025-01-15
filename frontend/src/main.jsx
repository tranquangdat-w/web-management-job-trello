import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material'
import theme from './theme.js'
import { ToastContainer, Bounce } from 'react-toastify'
import { ConfirmProvider } from 'material-ui-confirm'
import { Provider } from 'react-redux'
import { store } from '~/redux/store.js'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <CssVarsProvider theme ={theme}>
        {/* Need font roboto to use, please download font roboto from goggle */}
        <ConfirmProvider defaultOptions={{
          confirmationText: 'Confirm',
          dialogProps: { maxWidth: 'xs' }
        }}>
          <CssBaseline />
          <App />
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
        </ConfirmProvider>
      </CssVarsProvider>
    </Provider>
  </BrowserRouter>
)

