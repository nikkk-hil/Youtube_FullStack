import { Input, Button } from "../components/componentCollection.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { userLogin } from "../api/user.api.js";
import { useState, useEffect } from "react";

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const {user, setUser} = useAuth()
    const navigate = useNavigate()

    useEffect( () => {
        if(user)
            navigate("/")
    },[user, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        setError(null)

        const data = {
            email,
            password
        }
        userLogin(data)
         .then((res) => {
            setUser(res.data)
        })
         .catch((err) => {
            setError("Email or Password is incorrect.")
         })
    }

  return (
    <div className="flex items-center justify-center bg-black h-170 w-full">
      <div className="flex justify-between bg-[#121212] rounded-3xl shadow-lg shadow-red-800/50 h-3/4 w-2/3">
        <div></div>
        <div className="flex items-center justify-center w-1/2 p-4">
          <div>
            <h1 className="font-serif text-white text-3xl text-center">
              Login Account
            </h1>
            <p className="text-gray-300 text-md font-light text-center tracking-wide mt-2 mb-4">
              Enter your details
            </p>
            <form onSubmit={handleSubmit}>
              <Input
                value={email}
                type="email"
                placeholder=" Email"
                onChange={e => setEmail(e.target.value)}
                className=" text-xl text-white font-light bg-[#080808] rounded-lg mb-3"
              />
              <Input
                value={password}
                type="password"
                placeholder=" Password"
                onChange={e => setPassword(e.target.value)}
                className="text-xl text-white font-light bg-[#080808] rounded-lg mb-3"
              />
              {error && <p className='text-red-500 font-light text-center'>{error}</p>}
              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  className=" rounded-lg hover:bg-red-700 h-10 w-20 mt-2 p-0"
                >
                  Login
                </Button>
                <Button
                  bgColor=""
                  textColor="text-[#CCCCCC]"
                  className="hover:text-red-600 mt-1"
                >
                  Create Account
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
