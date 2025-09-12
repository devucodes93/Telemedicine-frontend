import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token && token !== "undefined") {
      // Save token
      localStorage.setItem("token", token);

      // Redirect to profile page
      navigate("/", { replace: true });
    } else {
      navigate("/signup", { replace: true });
    }
  }, [navigate]);

  return <p>Logging you in...</p>;
};

export default AuthSuccess;
