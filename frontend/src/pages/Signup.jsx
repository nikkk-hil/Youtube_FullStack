import { Input, Button } from "../components/componentCollection.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { userRegistration } from "../api/user.api.js";
import { useState, useEffect } from "react";

export default function Signup() {
  const [userRegistered, setUserRegistered] = useState(false);
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [coverImage, setCoverImage] = useState(null)    
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    setUserRegistered(true);
  }

  useEffect(() => {
    if (userRegistered) navigate("/login");
  }, [userRegistered, setUserRegistered]);

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!fullName){
        setError("Name is required.")
        return;
    }
    if (!email){
        setError("Email is required.")
        return;
    }
    if (!username){
        setError("Username is required.")
        return;
    }
    if (!password){
        setError("Password is required.")
        return;
    }

    setLoading(true)
    userRegistration({fullName, email, username, password})
     .then( (res) => {
        setUserRegistered(true)
        console.log(res);
    } )
     .catch( (err) => setError(err) )
     .finally( () => setLoading(false) )
     
  }

  return (
    <div className="flex items-center justify-center bg-black h-170 w-full">
      <div className="flex justify-between bg-[#121212] rounded-3xl shadow-lg shadow-red-800/50 h-3/4 w-2/3">
        <div></div>
        <div className="flex items-center justify-center w-1/2 p-4">
          <div>
            <h1 className="font-serif text-white text-3xl text-center">
              Create Account
            </h1>
            <p className="text-gray-300 text-md font-light text-center tracking-wide mt-2 mb-4">
              Enter your details
            </p>
            <form onSubmit={handleSubmit}>
              <Input
                value={fullName}
                type="text"
                placeholder=" Full Name"
                onChange={(e) => setFullName(e.target.value)}
                className=" text-xl text-white font-light bg-[#080808] rounded-lg mb-3"
              />
              <Input
                value={email}
                type="email"
                placeholder=" Email"
                onChange={(e) => setEmail(e.target.value)}
                className=" text-xl text-white font-light bg-[#080808] rounded-lg mb-3"
              />
              <Input
                value={username}
                type="text"
                placeholder=" Username"
                onChange={(e) => setUsername(e.target.value)}
                className=" text-xl text-white font-light bg-[#080808] rounded-lg mb-3"
              />
              <Input
                value={password}
                type="password"
                placeholder=" Password"
                onChange={(e) => setPassword(e.target.value)}
                className="text-xl text-white font-light bg-[#080808] rounded-lg mb-3"
              />
              {error && (
                <p className="text-red-500 font-light text-center">{error}</p>
              )}
              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  disabled={loading}
                  className=" rounded-lg hover:bg-red-700 h-10 w-24 mt-2 p-0"
                >
                  {loading ? "Creating..." : "Signup"}
                </Button>
                <Button
                  disabled={loading}
                  bgColor=""
                  textColor="text-[#CCCCCC]"
                  className="hover:text-red-600 mt-1"
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
