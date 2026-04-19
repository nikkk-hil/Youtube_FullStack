import { Input, Button } from "../componentCollection.js";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { userLogin } from "../../api/user.api.js";
import { useState, useEffect } from "react";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Both the fields are required");
      return;
    }
    setLoading(true);

    const data = {
      email,
      password,
    };
    userLogin(data)
      .then((res) => {
        setUser(res.data.data.user);
      })
      .catch((err) => {
        setError("Email or Password is incorrect.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className="auth-page pt-24">
      <div className="auth-card fade-in-up max-w-md p-8 sm:p-10">
        <h1 className="display-title text-center text-5xl text-zinc-100">Welcome Back</h1>
        <p className="mb-6 text-center text-sm tracking-wide text-zinc-400">
          Continue to your video dashboard
        </p>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <Input
            value={email}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="rounded-lg border border-rose-500/40 bg-rose-950/35 px-3 py-2 text-center text-sm text-rose-300">{error}</p>
          )}

          <div className="mt-4 flex items-center justify-between gap-2">
            <Button
              type="submit"
              disabled={loading}
              className="min-w-28"
            >
              {loading ? "Logging..." : "Log In"}
            </Button>

            <Link to="/signup">
              <Button
                type="button"
                disabled={loading}
                variant="ghost"
                className="border-zinc-600/70 text-zinc-300 hover:text-white"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
