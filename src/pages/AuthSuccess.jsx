import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <p className="text-lg sm:text-xl font-semibold text-emerald-600">
        Logging you in...
      </p>
    </motion.div>
  );
};

export default AuthSuccess;