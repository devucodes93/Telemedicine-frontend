import React, { useState } from "react";
import {
  FiEye,
  FiEyeOff,
  FiUpload,
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
} from "react-icons/fi";
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
    specialization: "",
    experience: "",
    fee: "",
  });
  const [certificateFile, setCertificateFile] = useState(null);
  const [certificatePreview, setCertificatePreview] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "role") {
      localStorage.setItem("signupRole", value);
    }
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
  const handleCertificateChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCertificateFile(file);
      const reader = new FileReader();
      reader.onload = () => setCertificatePreview(reader.result);
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
      const role = localStorage.getItem("signupRole") || formData.role;

      let response;

      if (role === "Doctor") {
        // Convert avatar and certificate to base64
        const getBase64 = (file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        };

        const avatarBase64 = selectedFile ? await getBase64(selectedFile) : "";
        const certificateBase64 = certificateFile
          ? await getBase64(certificateFile)
          : "";

        const payload = {
          username: formData.username,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
          role: "Doctor",
          specialization: formData.specialization,
          experience: formData.experience,
          fee: formData.fee,
          avatar: avatarBase64,
          certification: certificateBase64,
        };

        response = await axios.post(
          "http://localhost:5000/api/auth/doctor-apply",
          payload
        );
      } else {
        // Patient — send with FormData
        const form = new FormData();
        form.append("username", formData.username);
        form.append("email", formData.email);
        form.append("phoneNumber", formData.phoneNumber);
        form.append("password", formData.password);
        form.append("role", "patient");
        if (selectedFile) form.append("avatar", selectedFile);

        response = await axios.post(
          "http://localhost:5000/api/auth/signup",
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      alert(response.data.msg || "Signup successful!");
      setFormData({
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "patient",
        specialization: "",
        experience: "",
        fee: "",
      });
      setSelectedFile(null);
      setPreviewUrl("");
<<<<<<< HEAD
      navigate("/me");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
=======
      setCertificateFile(null);
      setCertificatePreview("");
      navigate("/login");
>>>>>>> 629627631805bd070d8eb729f0825a3364f568fb
    } catch (err) {
      console.error("Error", err);
      alert(err.response?.data?.msg || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const [showGoogleRoleModal, setShowGoogleRoleModal] = useState(false);
  const [googleRole, setGoogleRole] = useState("");

  const handleGoogleSignup = () => {
    setShowGoogleRoleModal(true);
  };

  const handleGoogleRoleSelect = (role) => {
    setGoogleRole(role);
    if (role === "Doctor") {
      setTimeout(() => setShowGoogleRoleModal(false), 2000);
    } else {
      window.open("http://localhost:5000/auth/google", "_self");
      setShowGoogleRoleModal(false);
    }
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
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.username}
              </p>
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
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.email}
              </p>
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
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.phoneNumber}
              </p>
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
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700">
              Role
            </label>
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

          {/* Doctor-specific fields */}
          {formData.role === "Doctor" && (
            <>
              <div className="relative">
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="Specialization"
                  className="w-full pl-4 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 transition-all mb-2"
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Experience (years)"
                  className="w-full pl-4 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 transition-all mb-2"
                  min={0}
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="fee"
                  value={formData.fee}
                  onChange={handleChange}
                  placeholder="Consultation Fee"
                  className="w-full pl-4 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 transition-all mb-2"
                  min={0}
                />
              </div>
              {/* Certificate Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload MBBS Certificate / Identity
                </label>
                <div className="relative inline-block w-full">
                  <div className="w-full h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 hover:border-purple-500 transition-colors cursor-pointer">
                    {certificatePreview ? (
                      <img
                        src={certificatePreview}
                        alt="Certificate Preview"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <FiUpload className="w-8 h-8 text-gray-400" />
                    )}
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleCertificateChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Accepted: JPG, PNG, PDF
                  </p>
                </div>
                <div className="mt-2">
                  <span className="block text-xs text-yellow-700 bg-yellow-100 rounded px-2 py-1 font-semibold">
                    Warning: Your certificate and personal data are used only
                    for verification and will never be misused. We respect your
                    privacy.
                  </span>
                </div>
              </div>
            </>
          )}

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

        {/* Google Role Modal */}
        {showGoogleRoleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs text-center">
              <h2 className="text-lg font-bold mb-4">
                Are you registering as a Doctor or Patient?
              </h2>
              <div className="flex gap-4 justify-center mb-4">
                <button
                  className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
                  onClick={() => handleGoogleRoleSelect("Patient")}
                >
                  Patient
                </button>
                <button
                  className="px-4 py-2 rounded bg-purple-600 text-white font-semibold hover:bg-purple-700"
                  onClick={() => handleGoogleRoleSelect("Doctor")}
                >
                  Doctor
                </button>
              </div>
              {googleRole === "Doctor" && (
                <div className="text-red-600 font-semibold mt-2">
                  Google signup is not allowed for doctors. Please use the
                  regular signup form.
                </div>
              )}
              <button
                className="mt-4 text-gray-500 hover:text-gray-700 text-sm underline"
                onClick={() => setShowGoogleRoleModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <p className="text-xs sm:text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
