import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/ContextApi";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import base_url from "../services/base_url";

const Navbar = () => {
  const nav = useNavigate();
  const { setAuth } = useContext(authContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const logout = () => {
    sessionStorage.clear();
    nav("/");
    setAuth(false);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-[#080808] relative z-10 mx-auto px-5 sm:px-8 lg:px-15 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-white no-underline text-xl font-semibold tracking-tight"
          >
            project<span className="text-indigo-400">Fair</span>
          </Link>

          <div className="hidden sm:flex items-center justify-center gap-4 md:gap-6">
            <Link
              to="/projects"
              className="text-sm text-zinc-400 hover:text-indigo-400 transition no-underline cursor-pointer"
            >
              Explore
            </Link>
            {sessionStorage.getItem("profile") ? (
              <img
                src={`${base_url}/uploaded/${sessionStorage.getItem("profile")}`}
                alt="Profile"
                onClick={() => setShowProfile(true)}
                className="w-9 h-9 rounded-full object-cover border border-zinc-800 cursor-pointer"
              />
            ) : (
              <i
                className="fa-brands fa-grav text-white text-3xl md:text-4xl hover:text-indigo-400 transition-colors cursor-pointer"
                onClick={() => setShowProfile(true)}
              ></i>
            )}
            <button
              onClick={logout}
              className="text-sm text-zinc-400 hover:text-red-400 transition no-underline cursor-pointer"
            >
              Logout <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <button
            className="sm:hidden text-white text-2xl cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>

        {menuOpen && (
          <div className="sm:hidden flex flex-col items-start gap-6 mt-4 pb-2">
            <Link
              to="/explore"
              onClick={() => setMenuOpen(false)}
              className="text-sm text-zinc-400 hover:text-indigo-400 transition no-underline cursor-pointer"
            >
              Explore
            </Link>
            {sessionStorage.getItem("profile") ? (
              <img
                src={`${base_url}/uploaded/${sessionStorage.getItem("profile")}`}
                alt="Profile"
                onClick={() => setShowProfile(true)}
                className="w-9 h-9 rounded-full object-cover border border-zinc-800 cursor-pointer"
              />
            ) : (
              <i
                className="fa-brands fa-grav text-white text-3xl md:text-4xl hover:text-indigo-400 transition-colors cursor-pointer"
                onClick={() => setShowProfile(true)}
              ></i>
            )}
            <button
              onClick={logout}
              className="text-sm text-zinc-400 hover:text-red-400 transition no-underline cursor-pointer"
            >
              Logout <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        )}
      </nav>
      <Profile open={showProfile} onClose={() => setShowProfile(false)} />
    </>
  );
};

export default Navbar;
