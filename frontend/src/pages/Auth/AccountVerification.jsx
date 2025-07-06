import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { verifyUserAPI } from '~/apis'
import VerificationAccountLoading from '~/components/Loading/verificationAccountLoading'
import { Bounce, toast } from 'react-toastify'

export const AccountVerification = () => {
  let [searchParams] = useSearchParams()

  const username = searchParams.get('username')
  const token = searchParams.get('token')

  const [verified, setVerified] = useState(false)

  // Call api
  useEffect(() => {
    if (username && token) {
      verifyUserAPI({ username: username, token }).then(() => setVerified(true))
    }
  }, [token, username])

  if (!username || !token) {
    return <Navigate to="/404" />
  }

  if (!verified) {
    return <VerificationAccountLoading />
  }

  toast.success('Verify account successfully!', {
    position: 'bottom-left',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Bounce
  })

  return <Navigate to={`/login?verifiedEmail=${username}`} />
}
