import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("user");
  // or use context/auth hook

  const authObject = JSON.parse(isAuthenticated);

  if (!authObject.id) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
