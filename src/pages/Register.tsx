import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../api/auth.api";

const Register = () => {
  const [fullName, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const registerNewUser = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      await registerUser({
        fullName,
        username,
        password,
      });

      toast.success("Account created successfully 🎉");
      navigate("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Registration failed"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
      <div className="w-full max-w-md">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center">
          Create account
        </h1>

        <p className="mt-2 text-center text-gray-600">
          Start writing and sharing your ideas.
        </p>

        {/* Form */}
        <form className="mt-10 space-y-6" onSubmit={registerNewUser}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={fullName}
              disabled={loading}
              className="mt-1 w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none disabled:opacity-50"
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="your_username"
              value={username}
              disabled={loading}
              className="mt-1 w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none disabled:opacity-50"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              disabled={loading}
              className="mt-1 w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none disabled:opacity-50"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-full py-3 text-white font-medium transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-900"
              }`}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
