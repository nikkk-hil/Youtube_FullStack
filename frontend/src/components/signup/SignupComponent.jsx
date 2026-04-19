import { Input, Button } from "../componentCollection.js";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { userRegistration } from "../../api/user.api.js";
import { useState, useEffect, useRef } from "react";

export default function SignupComponent() {
  const avatarInputRef = useRef(null);
  const coverImageInputRef = useRef(null);
  const [userRegistered, setUserRegistered] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [avatarLabel, setAvatarLabel] = useState("Choose a profile picture");
  const [coverImageLabel, setCoverImageLabel] = useState(
    "Choose a cover image"
  );
  const [avatarBrowsed, setAvatarBrowsed] = useState(false);
  const [coverImageBrowsed, setCoverImageBrowsed] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();
  const formData = new FormData();

  useEffect(() => {
    if (user) {
      setUserRegistered(true);
      navigate("/login");
      console.log("User Registered");
    }
  }, [user, userRegistered, setUserRegistered]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!fullName) {
      setError("Name is required.");
      return;
    }
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!username) {
      setError("Username is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }
    if (!avatar) {
      setError("Profile Picture is required.");
      return;
    }
    if (!coverImage) {
      setError("Cover Image is required.");
      return;
    }

    setLoading(true);
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("avatar", avatar);
    formData.append("coverImage", coverImage);

    userRegistration(formData)
      .then((res) => {
        setUserRegistered(true);
        console.log(res);
      })
      .catch((err) => {
        if (err?.response?.status === 409) setError("Username or Email already exists");
        else setError("Unable to register right now. Please try again.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const handleFile = (e, fileType) => {
    const file = e.target.files[0];

    if (fileType === "avatar") {
      setAvatar(file);
      setAvatarLabel(file.name);
      setAvatarBrowsed(true);
    } else {
      setCoverImage(file);
      setCoverImageLabel(file.name);
      setCoverImageBrowsed(true);
    }
  };

  return (
    <section className="auth-page pt-24">
      <div className="auth-card fade-in-up max-w-xl p-7 sm:p-10">
        <h1 className="display-title text-center text-5xl text-zinc-100">Create Account</h1>
        <p className="mb-6 text-center text-sm tracking-wide text-zinc-400">
          Start uploading and sharing your stream moments
        </p>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <Input
            value={fullName}
            type="text"
            placeholder="Full Name"
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            value={email}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            value={username}
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between rounded-xl border border-zinc-700/80 bg-zinc-900/70 px-3 py-2">
            <Input
              label={avatarBrowsed ? `${avatarLabel} (selected)` : avatarLabel}
              type="file"
              accept="image/*"
              hidden
              disabled={loading}
              ref={avatarInputRef}
              onChange={(e) => handleFile(e, "avatar")}
              labelClass={avatarBrowsed ? `!m-0 text-emerald-300` : `!m-0 text-zinc-300`}
            />
            <Button
              type="button"
              onClick={() => avatarInputRef.current.click()}
              disabled={loading}
              variant="secondary"
              className="px-3 py-1 text-xs"
            >
              Browse
            </Button>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-zinc-700/80 bg-zinc-900/70 px-3 py-2">
            <Input
              label={
                coverImageBrowsed ? `${coverImageLabel} (selected)` : coverImageLabel
              }
              type="file"
              accept="image/*"
              hidden
              disabled={loading}
              ref={coverImageInputRef}
              onChange={(e) => handleFile(e, "cover-image")}
              labelClass={coverImageBrowsed ? `!m-0 text-emerald-300` : `!m-0 text-zinc-300`}
            />
            <Button
              type="button"
              onClick={() => coverImageInputRef.current.click()}
              disabled={loading}
              variant="secondary"
              className="px-3 py-1 text-xs"
            >
              Browse
            </Button>
          </div>

          {error && (
            <p className="rounded-lg border border-rose-500/40 bg-rose-950/35 px-3 py-2 text-center text-sm text-rose-300">{error}</p>
          )}

          <div className="mt-4 flex items-center justify-center gap-2">
            <Button
              type="submit"
              disabled={loading}
              className="min-w-28"
            >
              {loading ? "Creating..." : "Signup"}
            </Button>
            <Link to='/login'>
              <Button
                type="button"
                disabled={loading}
                variant="ghost"
                className="border-zinc-600/70 text-zinc-300 hover:text-white"
              >
                Login
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
