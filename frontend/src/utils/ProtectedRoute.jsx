import { useAuth } from "../context/AuthContext.jsx";
import { Outlet, useNavigate } from "react-router-dom";



function ProtectedRoute( ) {
  const {user, loading} = useAuth()
  const navigate = useNavigate()

  if(!user)
    navigate("/login")

  if (loading){
    return(
      <div className="flex items-center justify-center">
        <h1>
          Loading...
        </h1>
      </div>
    )
  }
  
  return (
    <Outlet />
  )
}

export default ProtectedRoute