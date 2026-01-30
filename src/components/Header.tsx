import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { logoutUser } from "../api/auth.api";

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="mx-auto max-w-6xl p-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-semibold">
        MyBlog
      </Link>

      <nav className="flex items-center gap-6 text-sm font-medium">
        {user ? (
          <>
            <Link to="/posts">Posts</Link>
            <Link to="/create">Write</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
