import { Input, Button } from "../components/componentCollection.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { userRegistration } from "../api/user.api.js";
import { useState, useEffect, useRef } from "react";


export default function Signup() {
  const avatarInputRef = useRef(null)
  const coverImageInputRef = useRef(null)
  const [userRegistered, setUserRegistered] = useState(false);
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [coverImage, setCoverImage] = useState(null)    
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [avatarLabel, setAvatarLabel] = useState("Choose a profile picture")
  const [coverImageLabel, setCoverImageLabel] = useState("Choose a cover image")
  const [avatarBrowsed, setAvatarBrowsed] = useState(false)
  const [coverImageBrowsed, setCoverImageBrowsed] = useState(false)

  const { user } = useAuth();
  const navigate = useNavigate();
  const formData = new FormData()


  if (user) {
    setUserRegistered(true);
  }

  useEffect(() => {
    if (userRegistered){
      navigate("/login");
      console.log("User Registered");
    }
  }, [userRegistered, setUserRegistered]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

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
    if (!avatar){
      setError("Profile Picture is required.")
      return
    }
    if (!coverImage){
      setError("Cover Image is required.")
      return
    }

    setLoading(true)
    formData.append("fullName", fullName)
    formData.append("email", email)
    formData.append("username", username)
    formData.append("password", password)
    formData.append("avatar", avatar)
    formData.append("coverImage", coverImage)

    userRegistration(formData)
     .then( (res) => {
        setUserRegistered(true)
        console.log(res);
    } )
     .catch( (res, err) => {
      if (res.status === 409)
        setError("Username or Email already exists")
      console.error(err);
     } )
     .finally( () => setLoading(false) )
     
  }

  const handleFile = (e, fileType) => {
    const file = e.target.files[0];

    if (fileType === "avatar"){
      setAvatar(file)
      setAvatarLabel(file.name)
      setAvatarBrowsed(true)
    }
    else{
      setCoverImage(file)
      setCoverImageLabel(file.name)
      setCoverImageBrowsed(true)
    }
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
                className="text-xl text-white font-light bg-[#080808] rounded-lg mb-3"
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
              <div className="flex justify-between border-1 rounded-xl text-gray-400 mb-2">
                <Input
                  label={avatarBrowsed ? `${avatarLabel} ✓` : avatarLabel}
                  type="file"
                  accept="image/*"
                  hidden
                  disabled={loading}
                  ref={avatarInputRef}
                  onChange={ (e) => handleFile(e, "avatar") }
                  labelClass={avatarBrowsed ? `text-green-400 font-light text-sm m-2` :`text-white font-light text-sm m-2`}
                />
                <Button 
                  onClick={() => avatarInputRef.current.click()}
                  disabled={loading}
                  bgColor={loading ? `bg-gray-600` : `bg-red-600`}
                  className={`text-xs rounded-xl`}  
                >
                  Browse
                </Button>
              </div>
              <div className="flex justify-between border-1 rounded-xl text-gray-400">
                <Input
                  label={coverImageBrowsed ? `${coverImageLabel} ✓`: coverImageLabel}
                  type="file"
                  accept="image/*"
                  hidden
                  disabled={loading}
                  ref={coverImageInputRef}
                  onChange={ (e) => handleFile(e, "cover-image") }
                  labelClass={coverImageBrowsed ? `text-green-400 font-light text-sm m-2` :`text-white font-light text-sm m-2`}
                />
                <Button 
                  onClick={() => coverImageInputRef.current.click()} 
                  disabled={loading}
                  bgColor={loading ? `bg-gray-600` : `bg-red-600`}
                  className="text-xs rounded-xl"  
                >
                  Browse
                </Button>
              </div>
              {error && (
                <p className="text-red-500 font-light text-center">{error}</p>
              )}
              <div className="flex justify-center mt-4">
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
