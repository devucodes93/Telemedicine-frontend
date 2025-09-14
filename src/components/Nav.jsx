import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [nav, setNav] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [language, setLanguage] = useState(
    localStorage.getItem("siteLanguage") || "en"
  );
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleUser = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setShowDropdown(false);
    window.location.href = "/signup";
  };

  const handlePendingProfile = () => {
    setShowDropdown(false);
    if (!user) return;
    if (user.role === "doctor") {
      navigate("/doctor-update");
    } else {
      navigate("/patient-update");
    }
  };

  const handleLogo = () => {
    navigate("/");
  };

  const getNavLinkClass = ({ isActive }) => {
    const baseClasses =
      "inline-block font-semibold text-white transition-all duration-300";

    return isActive
      ? `${baseClasses} text-cyan-300 underline scale-105 pb-1`
      : `${baseClasses} hover:scale-105 hover:text-gray-300}`;
  };

  // Only show signup if not logged in
  const menuItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    ...(!user ? [{ to: "/signup", label: "Sign Up" }] : []),
  ];

  // Language options
  const languageOptions = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "kn", label: "ಕನ್ನಡ" },
    { code: "ta", label: "தமிழ்" },
    { code: "ml", label: "മലയാളം" },
    { code: "bn", label: "বাংলা" },
  ];

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    localStorage.setItem("siteLanguage", lang);
    window.location.reload();
  };
  useEffect(() => {
    window.location.href === "/call/:id" && setNav(false);
  }, [location.pathname]);
  return (
    <nav className="bg-blue-500 text-white shadow-m relative top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-20 flex justify-between items-center h-20">
        {/* Logo */}
        <div
          className="flex flex-col items-center cursor-pointer justify-center"
          onClick={handleLogo}
        >
          <img
            src="/assets/logo4.svg"
            alt="Logo"
            className="h-10 sm:h-12 w-10 sm:w-12"
          />
          <span className="text-xs sm:text-sm">Care Meets Convenience</span>
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
          {/* Language dropdown for patients only */}
          {user && user.role !== "Doctor" && (
            <li>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-white text-blue-600 px-2 py-1 rounded shadow focus:outline-none font-semibold"
                style={{ minWidth: 120 }}
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

        {/* User Icon + Mobile Hamburger */}
        <div className="flex items-center gap-4 relative">
          {user && (
            <>
              <img
                onClick={handleUser}
                src={user.avatar ? user.avatar : "/assets/user3.svg"}
                alt="User"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full cursor-pointer border-2 border-white"
              />
              {showDropdown && (
                <div className="absolute right-0 top-14 bg-white text-black rounded shadow-lg min-w-[160px] z-50">
                  {/* Doctor Profile Option if not on /doctor */}
                  {user.role === "Doctor" &&
                    location.pathname !== "/doctor" && (
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                        onClick={() => {
                          setShowDropdown(false);
                          navigate("/doctor");
                        }}
                      >
                        Profile
                      </button>
                    )}
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                  {!user.profileUpdated && (
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                      onClick={handlePendingProfile}
                    >
                      Pending Profile
                    </button>
                  )}
                </div>
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
      <div
        className={`fixed top-0 left-0 w-64 sm:w-72 h-full bg-blue-500 shadow-xl transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            aria-label="Close Menu"
            onClick={() => setIsOpen(false)}
            className="focus:outline-none"
          >
            <X size={28} />
          </button>
        </div>

        {/* Sidebar Menu */}
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
          {/* Language dropdown for patients only (mobile sidebar) */}
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
                className="bg-white text-blue-600 px-2 py-1 rounded shadow focus:outline-none font-semibold w-full"
                style={{ minWidth: 120 }}
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
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Nav;
