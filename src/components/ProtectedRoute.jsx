import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContextPro";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate("/");
      }
    },
    [isAuthenticated, navigate]
  );
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
