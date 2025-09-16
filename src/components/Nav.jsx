import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [language, setLanguage] = useState(
    localStorage.getItem("siteLanguage") || "en"
  );

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  // GSAP scroll animation for navbar
  useEffect(() => {
    if (!navRef.current) return;

    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: navRef.current,
          start: "top top",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  // GSAP for dropdown
  useEffect(() => {
    if (showDropdown) {
      gsap.fromTo(
        ".dropdown-menu",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [showDropdown]);

  const handleUser = () => setShowDropdown((prev) => !prev);
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setShowDropdown(false);
    window.location.href = "/signup";
  };

  const handlePendingProfile = () => {
    setShowDropdown(false);
    if (!user) return;
    if (user.role === "doctor") navigate("/doctor-update");
    else navigate("/patient-update");
  };

  const handleLogo = () => navigate("/");

  const getNavLinkClass = ({ isActive }) =>
    `inline-block font-semibold text-white transition-all duration-300 ${
      isActive ? "text-teal-300 underline scale-105 pb-1" : "hover:scale-105 hover:text-teal-200"
    }`;

  const menuItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    ...(!user ? [{ to: "/signup", label: "Sign Up" }] : []),
    { to: "/patient-option", label: "Emergency", className: "text-red-500" },
  ];

  const languageOptions = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "kn", label: "ಕನ್ನಡ" },
    { code: "ta", label: "தமிழ்" },
    { code: "ml", label: "മലയാളം" },
    { code: "bn", label: "বাংলা" },
    { code: "pa", label: "ਪੰਜਾਬੀ" },
    { code: "gu", label: "ગુજરાતી" },
    { code: "or", label: "ଓଡ଼ିଆ" },
    { code: "mr", label: "मराठी" },
    { code: "te", label: "తెలుగు" },
    { code: "si", label: "සිංහල" },
    { code: "ur", label: "اردو" },
    { code: "as", label: "অসমীয়া" },
    { code: "sd", label: "سنڌي" },
    { code: "ks", label: "کٲشُر" },
    { code: "ne", label: "नेपाली" },
    { code: "bo", label: "བོད་ཡིག" },
    { code: "my", label: "မြန်မာ" },
    { code: "km", label: "ខ្មែរ" },
    { code: "lo", label: "ລາວ" },
  ];

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    localStorage.setItem("siteLanguage", lang);
    window.location.reload();
  };

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-[#0f4c75] text-white shadow-lg fixed w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-20 flex justify-between items-center h-20">
        {/* Logo */}
        <div
          className="flex flex-col items-center cursor-pointer justify-center"
          onClick={handleLogo}
        >
          <img
            src="/assets/logo4.svg"
            alt="Logo"
            className="h-12 w-12 sm:h-14 sm:w-14"
          />
          <span className="text-xs sm:text-sm font-bold drop-shadow-lg">
            Care Meets Convenience
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 sm:gap-10 items-center text-base sm:text-lg font-medium">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={getNavLinkClass}>
                {item.label}
              </NavLink>
            </li>
          ))}
          {user && user.role !== "Doctor" && (
            <li>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-white text-[#0f4c75] px-3 py-1 rounded shadow-lg font-semibold transition-all hover:scale-105"
                style={{ minWidth: 130 }}
              >
                {languageOptions.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </li>
          )}
        </ul>

        {/* User + Hamburger */}
        <div className="flex items-center gap-4 relative">
          {user && (
            <>
              <motion.img
                onClick={handleUser}
                src={user.avatar || "/assets/user3.svg"}
                alt="User"
                className="h-12 w-12 rounded-full cursor-pointer border-2 border-white shadow-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              {showDropdown && (
                <motion.div
                  className="dropdown-menu absolute right-0 top-14 bg-white text-black rounded shadow-lg min-w-[160px] z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {user.role === "Doctor" &&
                    location.pathname !== "/doctor" && (
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-[#bbe1fa]"
                        onClick={() => {
                          setShowDropdown(false);
                          navigate("/doctor");
                        }}
                      >
                        Profile
                      </button>
                    )}
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-[#bbe1fa]"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                  {!user.profileUpdated && (
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-[#bbe1fa]"
                      onClick={handlePendingProfile}
                    >
                      Pending Profile
                    </button>
                  )}
                </motion.div>
              )}
            </>
          )}

          <button
            aria-label="Open Menu"
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <motion.div
        className={`fixed top-0 left-0 w-64 sm:w-72 h-full bg-[#0f4c75] shadow-xl transform z-50`}
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-end p-4">
          <button aria-label="Close Menu" onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>
        </div>

        <ul className="flex flex-col items-start gap-6 p-6 text-lg font-medium">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={getNavLinkClass}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}

          {user && user.role !== "Doctor" && (
            <li className="w-full mt-4">
              <label
                htmlFor="mobile-language-select"
                className="block mb-2 text-white font-semibold"
              >
                Change Language
              </label>
              <select
                id="mobile-language-select"
                value={language}
                onChange={handleLanguageChange}
                className="bg-white text-[#0f4c75] px-3 py-1 rounded shadow-lg font-semibold w-full"
              >
                {languageOptions.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </li>
          )}
        </ul>
      </motion.div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </motion.nav>
  );
};

export default Nav;
