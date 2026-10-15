import React, { useState } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";

const Footer = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleFeedback = (e) => {
  e.preventDefault();

  if (!feedback.trim()) return;

  window.location.href = `mailto:gauthams779@email.com?subject=ProjectFair Feedback&body=${encodeURIComponent(
    feedback
  )}`;
};

  return (
    <>
      <footer className="border-t border-zinc-900 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-6">
              <Link
                to="/"
                className="inline-block text-xl font-semibold tracking-tight text-white no-underline"
              >
                project<span className="text-indigo-400">Fair</span>
              </Link>
              <p className="mt-5 max-w-md text-sm md:text-base leading-relaxed text-zinc-500">
                A community showcase for developers and creators to display
                their work, discover new projects, and share what they've built
                with the world.
              </p>

              <div className="flex items-center gap-5 mt-7">
                <a
                  href="https://github.com/GauthamS-013"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-zinc-600 hover:text-white transition-colors duration-200"
                >
                  <i className="fa-brands fa-github text-lg" />
                </a>
                <a
                  href="https://www.linkedin.com/in/gauthams013/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-zinc-600 hover:text-white transition-colors duration-200"
                >
                  <i className="fa-brands fa-linkedin text-lg" />
                </a>
                <a
                  href="https://www.instagram.com/gauthm_suresh?stkn=MXJna3h1ZjJoc3d2cw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="text-zinc-600 hover:text-white transition-colors duration-200"
                >
                  <i className="fa-brands fa-instagram text-lg" />
                </a>
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-600 font-medium mb-5">
                Explore
              </h3>
              <nav className="flex flex-col gap-3">
                <Link
                  to="/"
                  className="text-sm text-zinc-500 hover:text-white no-underline transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/projects"
                  className="text-sm text-zinc-500 hover:text-white no-underline transition-colors"
                >
                  Projects
                </Link>
                <button
                  onClick={() => setShowProfile(true)}
                  className="text-sm text-zinc-500 hover:text-white no-underline transition-colors text-left bg-transparent border-0 p-0 cursor-pointer"
                >
                  Profile
                </button>
                <Link
                  to="/maindev"
                  className="text-sm text-zinc-500 hover:text-white no-underline transition-colors"
                >
                  Developer
                </Link>
              </nav>
            </div>

            <div className="md:col-span-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-600 font-medium mb-5">
                Feedback
              </h3>
              <p className="text-sm leading-relaxed text-zinc-500 mb-4">
                Have an idea that could make ProjectFair better? We'd love to
                hear it.
              </p>
              <form onSubmit={handleFeedback} className="flex flex-col gap-3">
                <textarea
                  rows={3}
                  value={feedback}
                  onChange={(e) => {
                    setFeedback(e.target.value);
                    setFeedbackSent(false);
                  }}
                  placeholder="Share your thoughts..."
                  className="w-full rounded-lg border border-zinc-800 bg-[#0d0d0d] px-4 py-3 text-sm text-zinc-200 placeholder-zinc-700 outline-none resize-none transition-all duration-200 focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20"
                />
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={!feedback.trim()}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black cursor-pointer hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Send feedback
                    <i className="fa-solid fa-arrow-right text-xs" />
                  </button>
                  {feedbackSent ? (
                    <p className="text-xs text-green-400">
                      {" "}
                      Feedback sent successfully.{" "}
                    </p>
                  ) : (
                    <span></span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-900">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-zinc-700">
                © {new Date().getFullYear()} ProjectFair
              </p>
              <p className="text-xs text-zinc-700">
                Built with the MERN stack.
              </p>
            </div>
          </div>
        </div>
      </footer>
      <Profile open={showProfile} onClose={() => setShowProfile(false)} />
    </>
  );
};

export default Footer;
