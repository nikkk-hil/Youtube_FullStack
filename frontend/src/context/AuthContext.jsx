import { getUser } from "../api/user.api.js"
import { createContext, useContext, useEffect, useState } from "react"

/*
    AuthProvider = long-lived React component
    that:
    - lives at top of app
    - runs ONCE on mount
    - stores auth state
    - exposes it to entire app

    AuthProvider is infrastructure, not logic.
*/


/*
    An AuthProvider must:
    - Create a context 
    - Hold auth state (user, loading)
    - Call /me once on app load
    - Handle success & failure
    - Expose values to children
    - Render children only after auth check
*/
const AuthContext = createContext(null)

const AuthProvider = function( {children} ){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        getUser()
         .then( (res) => setUser(res.data) ) //200
         .catch( (err) => setUser(null) )  //401
         .finally( () => setLoading(false) )
    },[])

    if (loading)
        return(
            <h1>
                Loading....
            </h1>
        )

    return (
        <AuthContext.Provider value={{user, loading, setUser}}>
            { children }
        </AuthContext.Provider>
    )
}

// custome hook to recieve states
const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context)
        throw new Error("use auth must be used inside AuthProvider")

    return context
}

export {
    AuthProvider,
    useAuth
}
