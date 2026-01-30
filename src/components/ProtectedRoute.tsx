import { useContext, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <p className="text-center py-10">Checking auth…</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
