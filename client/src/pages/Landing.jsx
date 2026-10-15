import React, { useState, useEffect, useContext } from "react";
import ProjectCard from "../components/ProjectCard";
import { sampleProjectsApi } from "../services/allApi";
import { Link, useNavigate } from "react-router-dom";
import Auth from "./Auth";
import { authContext } from "../context/ContextApi";

const Landing = () => {
  const { auth, setAuth } = useContext(authContext);
  const nav = useNavigate();
  const [sample, setSample] = useState([]);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await sampleProjectsApi();

      if (result.status === 200) {
        setSample(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    nav("/");
    setAuth(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-indigo-600/10 blur-[140px]" />
          <div className="absolute bottom-[-200px] right-[-150px] w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[120px]" />
        </div>
        <nav className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-6">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-white no-underline text-xl font-semibold tracking-tight"
            >
              project<span className="text-indigo-400">Fair</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/projects"
                className="text-sm text-zinc-400 hover:text-white transition-colors no-underline"
              >
                Explore
              </Link>
              {auth ? (
                <button
                  onClick={logout}
                  className="text-sm text-zinc-400 hover:text-red-400 transition-colors no-underline cursor-pointer"
                >
                  Logout <i className="fa-solid fa-arrow-right"></i>
                </button>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="text-sm text-zinc-400 hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
                >
                  Sign in
                </button>
              )}
            </div>
            <Link
              to="/projects"
              className="md:hidden text-sm text-zinc-300 hover:text-white no-underline"
            >
              Explore →
            </Link>
          </div>
        </nav>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="min-h-[calc(100vh-90px)] flex flex-col justify-center items-center text-center pb-20">
            <div className="flex items-center gap-3 mb-7">
              <span className="h-px w-8 bg-indigo-500" />
              <span className="text-xs sm:text-sm tracking-[0.25em] text-indigo-400 font-medium">
                SHOWCASE · ORGANIZE · DISCOVER
              </span>
              <span className="h-px w-8 bg-indigo-500" />
            </div>
            <h1 className="max-w-4xl text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] leading-[0.95]">
              Your projects
              <br />
              <span className="text-zinc-500">deserve a home.</span>
            </h1>
            <p className="max-w-2xl mt-8 text-base sm:text-lg md:text-xl leading-relaxed text-zinc-400">
              A community platform for developers and creators to showcase what
              they build, discover new ideas, and share their work with the
              world.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              {auth ? (
                <Link
                  to="/dash"
                  className="group flex items-center gap-3 px-6 py-3.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium no-underline transition-all duration-300"
                >
                  Go to Dashboard
                  <i className="fa-solid fa-arrow-right text-sm group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="group flex items-center gap-3 px-6 py-3.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium cursor-pointer transition-all duration-300"
                >
                  Start exploring
                  <i className="fa-solid fa-arrow-right text-sm group-hover:translate-x-1 transition-transform" />
                </button>
              )}
              <Link
                to="/projects"
                className="px-6 py-3.5 text-zinc-400 hover:text-white font-medium no-underline transition-colors"
              >
                Browse projects
              </Link>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3">
              <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-600">
                Scroll
              </span>
              <div className="w-px h-8 bg-zinc-800" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-900 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-24 md:py-32">
          <div className="max-w-2xl mb-16 md:mb-20">
            <p className="text-xs tracking-[0.25em] uppercase text-indigo-400 font-medium mb-4">
              What is ProjectFair?
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              From idea
              <span className="text-zinc-600"> to showcase.</span>
            </h2>
            <p className="mt-5 text-zinc-400 text-base md:text-lg leading-relaxed">
              Everything you need to present your work clearly, discover
              projects worth exploring, and build a collection that represents
              what you can create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="group p-7 sm:p-9 md:p-10 border-b md:border-b-0 md:border-r border-zinc-800 bg-[#0d0d0d] hover:bg-[#111111] transition-colors duration-300">
              <div className="flex items-center justify-between mb-14">
                <span className="text-xs text-zinc-600 font-mono group-hover:text-indigo-400 transition-colors">
                  01
                </span>
                <i className="fa-solid fa-diagram-project text-zinc-700 group-hover:text-indigo-400 transition-colors" />
              </div>
              <h3 className="text-xl font-medium mb-4">Showcase</h3>
              <p className="text-zinc-500 leading-relaxed">
                Present your projects with descriptions, technologies, images,
                repositories, and live demos — all in one place.
              </p>
            </div>

            <div className="group p-7 sm:p-9 md:p-10 border-b md:border-b-0 md:border-r border-zinc-800 bg-[#0d0d0d] hover:bg-[#111111] transition-colors duration-300">
              <div className="flex items-center justify-between mb-14">
                <span className="text-xs text-zinc-600 font-mono group-hover:text-indigo-400 transition-colors">
                  02
                </span>
                <i className="fa-solid fa-compass text-zinc-700 group-hover:text-indigo-400 transition-colors" />
              </div>
              <h3 className="text-xl font-medium mb-4">Organize</h3>
              <p className="text-zinc-500 leading-relaxed">
                Manage your projects from one place, keep your portfolio
                organized, and easily update your work.
              </p>
            </div>

            <div className="group p-7 sm:p-9 md:p-10 bg-[#0d0d0d] hover:bg-[#111111] transition-colors duration-300">
              <div className="flex items-center justify-between mb-14">
                <span className="text-xs text-zinc-600 font-mono group-hover:text-indigo-400 transition-colors">
                  03
                </span>
                <i className="fa-solid fa-share text-zinc-700 group-hover:text-indigo-400 transition-colors" />
              </div>
              <h3 className="text-xl font-medium mb-4">Discover</h3>
              <p className="text-zinc-500 leading-relaxed">
                Explore projects from developers and creators, find inspiration,
                and discover ideas worth building.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-900 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-24 md:py-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-indigo-400 font-medium mb-4">
                Community
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                Featured projects
              </h2>
              <p className="mt-4 text-zinc-500 max-w-xl">
                A look at what developers and creators are building with
                ProjectFair.
              </p>
            </div>
            <Link
              to="/projects"
              className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-white no-underline transition-colors"
            >
              View all projects
              <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {sample.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sample.map((item, index) => (
                <ProjectCard pro={item} key={item.id ?? index} />
              ))}
            </div>
          ) : (
            <div className="border border-zinc-800 rounded-2xl bg-[#0d0d0d] py-20 px-6 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center mb-5">
                <i className="fa-solid fa-folder-open text-zinc-500 text-xl" />
              </div>

              <h4 className="text-white text-lg font-medium">
                No projects yet
              </h4>

              <p className="text-zinc-500 text-sm mt-2 max-w-sm leading-relaxed">
                Projects from the community will appear here once they're added.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-zinc-900 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-24 md:py-32">
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#101010] px-6 sm:px-10 md:px-16 py-16 md:py-20">
            <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <p className="text-xs tracking-[0.25em] uppercase text-indigo-400 font-medium mb-5">
                Build. Share. Discover.
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
                Built something you're
                <span className="text-zinc-500"> proud of?</span>
              </h2>
              <p className="mt-5 text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl">
                Give your project a place to live. Share what you've built and
                let others discover your work.
              </p>
              <div className="mt-8">
                {auth ? (
                  <Link
                    to="/dash"
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-lg bg-white text-black font-medium no-underline hover:bg-zinc-200 transition-colors"
                  >
                    Go to Dashboard
                    <i className="fa-solid fa-arrow-right text-sm" />
                  </Link>
                ) : (
                  <button
                    onClick={() => setShowAuth(true)}
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-lg bg-white text-black font-medium cursor-pointer hover:bg-zinc-200 transition-colors"
                  >
                    Create your showcase
                    <i className="fa-solid fa-arrow-right text-sm" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Auth show={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
};

export default Landing;
