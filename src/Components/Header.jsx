import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogout from "../Hooks/useLogout";

const Header = () => {
    const logout = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    logout();
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-3">
        <div className="container">
          <div>
            <img src="./snyct.png" width={160} alt="" />
          </div>

          {/* Desktop Menu */}
          <div className="d-none d-lg-flex ms-auto">
            <Link to="/" style={{ textDecoration: "none" }} onClick={closeMenu}>
              <span className="me-4 text-dark text-decoration-none">Home</span>
            </Link>

            <Link
              to="/pricing"
              style={{ textDecoration: "none" }}
              onClick={closeMenu}
            >
              <span className="me-4 text-dark text-decoration-none">
                Pricing
              </span>
            </Link>

            <a
             href="https://docs.snyct.com"
             target="_blank"
             style={{textDecoration:'none'}}
              onClick={closeMenu}
            >
              <span className="me-4 text-dark text-decoration-none">
                Documentatiom
              </span>
            </a>
            <Link
              to="/dashboard"
              style={{ textDecoration: "none" }}
              onClick={closeMenu}
            >
              <span className="me-4 text-dark text-decoration-none">
                Dashboard
              </span>
            </Link>
            {token ? (
             <span className="text-dark text-decoration-none c-pointer" onClick={handleLogout}>Logout</span>
            ) : (
              <Link
                to="/login"
                style={{ textDecoration: "none" }}
                onClick={closeMenu}
              >
                <span className="text-dark text-decoration-none">Login</span>
              </Link>
            )}
          </div>

          {/* Hamburger Menu Button - Visible on mobile */}
          <button
            className="d-lg-none btn btn-link p-0 ms-auto"
            onClick={toggleMenu}
            style={{ color: "#000", textDecoration: "none" }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMenuOpen ? (
                // X icon when menu is open
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                // Hamburger icon when menu is closed
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-white`}
        style={{
          zIndex: 1050,
          transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
          visibility: isMenuOpen ? "visible" : "hidden",
        }}
      >
        {/* Drawer Header */}
        <div className="container py-3 border-bottom d-flex justify-content-between align-items-center">
          <img src="./snyct.png" width={140} alt="" />
          <button
            className="btn btn-link p-0"
            onClick={closeMenu}
            style={{ color: "#000", textDecoration: "none" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Drawer Menu Items */}
        <div className="container py-4">
          <div className="d-flex flex-column gap-4">
            <Link
              to="/"
              style={{ textDecoration: "none" }}
              onClick={closeMenu}
              className="py-2 px-3 rounded hover-bg-light"
            >
              <span className="text-dark fs-5">Home</span>
            </Link>

            <Link
              to="/pricing"
              style={{ textDecoration: "none" }}
              onClick={closeMenu}
              className="py-2 px-3 rounded hover-bg-light"
            >
              <span className="text-dark fs-5">Pricing</span>
            </Link>

            <Link
              to="/dashboard"
              style={{ textDecoration: "none" }}
              onClick={closeMenu}
              className="py-2 px-3 rounded hover-bg-light"
            >
              <span className="text-dark fs-5">Dashboard</span>
            </Link>
             <Link
              to="http://docs.snyct.com"
              style={{ textDecoration: "none" }}
              onClick={closeMenu}
              className="py-2 px-3 rounded hover-bg-light"
            >
              <span className="text-dark fs-5">Documentation</span>
            </Link>
            <Link
              to="/login"
              style={{ textDecoration: "none" }}
              onClick={closeMenu}
              className="py-2 px-3 rounded hover-bg-light"
            >
              <span className="text-dark fs-5">Login</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100"
          style={{
            background: "rgba(0,0,0,0.5)",
            zIndex: 1040,
            transition: "opacity 0.3s ease-in-out",
          }}
          onClick={closeMenu}
        />
      )}
    </div>
  );
};

export default Header;
