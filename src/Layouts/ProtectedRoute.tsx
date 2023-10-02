import { ReactNode } from "react"
import { useAppSelector } from "../store/hooks"
import {  Navigate } from "react-router-dom"

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isAuthenticated = useAppSelector(
    (state) => state.userAuth.isAuthenticated
  )
  console.log(isAuthenticated)

  if (isAuthenticated === false) {
    return <Navigate to='/login'/>
  }

  return <div>{children}</div>
}
export default ProtectedRoute
