import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ROUTES } from '../../index'

function useRole() {
  const [role, setRole] = useState(null)
  const location = useLocation().pathname

  useEffect(() => {
    if (
      location === ROUTES.ACCESS_COMPUTE ||
      location === ROUTES.COMPUTE_STATUS ||
      location === ROUTES.DASHBOARD
    ) {
      setRole('ACCESSOR')
    } else if (location === ROUTES.PROVIDE_COMPUTE) {
      setRole('PROVIDER')
    }
  }, [location])

  return { role }
}

export default useRole
