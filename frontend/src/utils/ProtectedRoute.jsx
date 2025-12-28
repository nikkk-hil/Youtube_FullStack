import { useAuth } from "../context/AuthContext.jsx";
import { Outlet, Navigate } from "react-router-dom";



function ProtectedRoute( ) {
  const {user, loading} = useAuth()

  if (loading){
    return(
      <div className="flex items-center justify-center">
        <h1>
          Loading...
        </h1>
      </div>
    )
  }

  if(!user)
    return <Navigate to='/login' replace/> //replaces history ex. w/o replace - home -> login but with replace home replaces to login in history preventing infinite loop
  
  return (
    <Outlet />
  )
}

export default ProtectedRoute