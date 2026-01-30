import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../api/auth.api";

type Errors = {
  fullName?: string;
  username?: string;
  password?: string;
};

const Register = () => {
  const [fullName, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const navigate = useNavigate();

  /* ---------- VALIDATION ---------- */
  const validate = () => {
    const newErrors: Errors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = "Use at least 2 characters";
    }

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 4) {
      newErrors.username = "At least 4 characters";
    } else if (/\s/.test(username)) {
      newErrors.username = "No spaces allowed";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------- SUBMIT ---------- */
  const registerNewUser = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (loading) return;

    if (!validate()) return;

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
      const message = error?.response?.data?.message;

      if (message === "Username already taken") {
        setErrors((prev) => ({
          ...prev,
          username: "This username is already in use",
        }));
      } else {
        toast.error(message || "Registration failed");
      }
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
          {/* Full name */}
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
              onChange={(e) => {
                const value = e.target.value;
                setFullname(value);
                if (errors.fullName && value.trim().length >= 2) {
                  setErrors((prev) => ({ ...prev, fullName: undefined }));
                }
              }}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-gray-500 italic">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Username */}
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
              onChange={(e) => {
                const value = e.target.value;
                setUsername(value);
                if (
                  errors.username &&
                  value.length >= 4 &&
                  !/\s/.test(value)
                ) {
                  setErrors((prev) => ({ ...prev, username: undefined }));
                }
              }}
            />
            {errors.username && (
              <p className="mt-1 text-xs text-gray-500 italic">
                {errors.username}
              </p>
            )}
          </div>

          {/* Password */}
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
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
                if (errors.password && value.length >= 6) {
                  setErrors((prev) => ({ ...prev, password: undefined }));
                }
              }}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-gray-500 italic">
                {errors.password}
              </p>
            )}
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
