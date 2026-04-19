import { useAuth } from "../context/AuthContext.jsx";
import { Outlet, Navigate } from "react-router-dom";
import Loading from "../components/Loading.jsx";



function ProtectedRoute( ) {
  const {user, loading} = useAuth()

  if (loading){
    return <Loading message="Verifying session..." fullScreen={false} className="min-h-[40vh]" />
  }

  if(!user)
    return <Navigate to='/login' replace/> //replaces history ex. w/o replace - home -> login but with replace home replaces to login in history preventing infinite loop
  
  return (
    <Outlet />
  )
}

export default ProtectedRoute