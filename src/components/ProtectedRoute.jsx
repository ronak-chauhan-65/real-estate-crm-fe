import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  let authObject = null;

  try {
    const storedUser = localStorage.getItem("user");
    authObject = storedUser ? JSON.parse(storedUser) : null;
  } catch (err) {
    console.error("Invalid user in localStorage:", err);
    authObject = null;
  }

  // Redirect if no user or no id
  if (!authObject || !authObject.id) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
