import { useAuthContext } from "../contexts/AuthContextPro";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
