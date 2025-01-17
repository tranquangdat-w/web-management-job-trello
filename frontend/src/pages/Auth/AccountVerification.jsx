import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { PageLoading } from '~/components/Loading/PageLoading'
import { verifyUserAPI } from '~/apis'

export const AccountVerification = () => {
  let [searchParams] = useSearchParams()

  const email = searchParams.get('email')
  const token = searchParams.get('token')

  const [verified, setVerified] = useState(false)

  // Call api
  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => setVerified(true))
    }
  }, [token, email])

  if (!email || !token) {
    return <Navigate to="/404" />
  }

  if (!verified) {
    return <PageLoading />
  }

  return <Navigate to={`/login?verifiedEmail=${email}`} />
}
