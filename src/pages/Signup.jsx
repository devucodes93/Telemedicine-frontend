import React, { useState } from "react";
import { FiEye, FiEyeOff, FiUpload, FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "patient",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const dataToSend = new FormData();
      dataToSend.append("username", formData.username);
      dataToSend.append("email", formData.email);
      dataToSend.append("phoneNumber", formData.phoneNumber);
      dataToSend.append("password", formData.password);
      dataToSend.append("role", formData.role);
      if (selectedFile) dataToSend.append("avatar", selectedFile);

      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        dataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert(response.data.msg || "Signup successful!");
      setFormData({
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "patient",
      });
      setSelectedFile(null);
      setPreviewUrl("");
      navigate("/login");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Signup failed");
      navigate("/signup");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Signup
        </h1>

        {/* Avatar Upload */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-100 hover:border-gray-500 transition-colors">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FiUpload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Upload profile picture
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Username */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
            </div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className={`w-full pl-10 pr-4 py-3 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full pl-10 pr-4 py-3 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiPhone className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
            </div>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className={`w-full pl-10 pr-4 py-3 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full pl-10 pr-12 py-3 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <FiEyeOff className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
              ) : (
                <FiEye className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="patient">Patient</option>
              <option value="Doctor">Doctor</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 sm:py-4 font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* OR */}
        <div className="flex items-center justify-center my-4">
          <span className="w-1/5 border-b border-gray-300"></span>
          <span className="px-2 text-gray-500 text-sm sm:text-base">OR</span>
          <span className="w-1/5 border-b border-gray-300"></span>
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          className="flex items-center justify-center w-full py-2 sm:py-3 mt-2 space-x-2 font-semibold text-gray-700 bg-gray-100 border rounded-lg hover:bg-gray-200"
        >
          <FcGoogle size={24} />
          <span className="text-sm sm:text-base">Sign up with Google</span>
        </button>

        <p className="text-xs sm:text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
