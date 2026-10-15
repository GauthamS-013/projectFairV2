
import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import Navbar from "../components/Navbar";
import {
  allProjectsApi,
  getProjectTechnologiesApi,
} from "../services/allApi";
import { useNavigate } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [selectedTech, setSelectedTech] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const nav = useNavigate();

  // Fetch available technologies for the dropdown
  useEffect(() => {
    let active = true;

    const getTechnologies = async () => {
      try {
        const result = await getProjectTechnologiesApi();

        if (active && result.status === 200) {
          setTechnologies(
            Array.isArray(result.data) ? result.data : []
          );
        }
      } catch (err) {
        console.error("Failed to fetch technologies:", err);
      }
    };

    getTechnologies();

    return () => {
      active = false;
    };
  }, []);

  // Fetch projects whenever search, filters, sorting, or page changes
  useEffect(() => {
    let active = true;

    const getData = async () => {
      if (!sessionStorage.getItem("token")) {
        nav("/auth");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const result = await allProjectsApi(
          search,
          currentPage,
          selectedTech,
          sortBy
        );

        if (active && result.status === 200) {
          // Expected paginated response from the backend
          const data = result.data;

          setProjects(
            Array.isArray(data.projects) ? data.projects : []
          );
          setTotalPages(data.totalPages || 0);
          setTotalProjects(data.totalProjects || 0);
        } else if (active) {
          setProjects([]);
          setTotalPages(0);
          setTotalProjects(0);
        }
      } catch (err) {
        if (active) {
          console.error("Failed to fetch projects:", err);
          setError("Unable to load projects. Please try again.");
          setProjects([]);
          setTotalPages(0);
          setTotalProjects(0);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    getData();

    return () => {
      active = false;
    };
  }, [search, selectedTech, sortBy, currentPage, nav]);

  const clearFilters = () => {
    setSearch("");
    setSelectedTech("All");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        {/* Page heading and search */}
        <section className="mb-10">
          <p className="text-sm text-indigo-400 font-medium mb-2">
            Explore
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Discover Projects
              </h1>

              <p className="text-zinc-500 mt-2 max-w-xl">
                Explore projects built by developers and creators
                in the ProjectFair community.
              </p>
            </div>

            <div className="relative w-full lg:w-80">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />

              <input
                type="search"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search project names or technologies..."
                className="w-full bg-[#0d0d0d] border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>
        </section>

        {/* Results heading and filters button */}
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h2 className="text-lg font-medium">All Projects</h2>

            <p className="text-sm text-zinc-600 mt-1">
              {totalProjects}{" "}
              {totalProjects === 1 ? "project" : "projects"} found
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            aria-expanded={showFilters}
            className={`w-fit px-3 py-2 rounded-lg border text-sm transition ${
              showFilters
                ? "border-indigo-500 text-white"
                : "border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
            }`}
          >
            <i className="fa-solid fa-filter mr-2" />
            Filters
            <i
              className={`fa-solid fa-chevron-down ml-2 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </section>

        {/* Filter panel */}
        {showFilters && (
          <section className="mb-6 p-5 rounded-xl border border-zinc-800 bg-[#0d0d0d]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label
                  htmlFor="technology"
                  className="block text-sm text-zinc-400 mb-2"
                >
                  Technology
                </label>

                <select
                  id="technology"
                  value={selectedTech}
                  onChange={(e) => {
                    setSelectedTech(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="All">All technologies</option>

                  {technologies.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="sort"
                  className="block text-sm text-zinc-400 mb-2"
                >
                  Sort by
                </label>

                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="az">Title: A–Z</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="w-full sm:w-fit px-4 py-2.5 rounded-lg border border-zinc-800 text-sm text-zinc-400 hover:text-white hover:border-zinc-600 transition"
                >
                  <i className="fa-solid fa-rotate-left mr-2" />
                  Clear all
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Projects */}
        {loading ? (
          <div className="py-20 text-center text-zinc-500">
            <i className="fa-solid fa-spinner fa-spin mr-2" />
            Loading projects...
          </div>
        ) : error ? (
          <div className="border border-dashed border-zinc-800 rounded-xl py-20 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((item) => (
                <ProjectCard key={item._id} pro={item} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-zinc-500">
                  Showing {(currentPage - 1) * 9 + 1}–
                  {Math.min(currentPage * 9, totalProjects)} of{" "}
                  {totalProjects} projects
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((page) => page - 1)
                    }
                    className="px-3 py-2 rounded-lg border border-zinc-800 text-sm text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    <i className="fa-solid fa-chevron-left mr-2" />
                    Previous
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      aria-current={
                        currentPage === page ? "page" : undefined
                      }
                      className={`w-9 h-9 rounded-lg border text-sm transition ${
                        currentPage === page
                          ? "bg-indigo-500 border-indigo-500 text-white"
                          : "border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((page) => page + 1)
                    }
                    className="px-3 py-2 rounded-lg border border-zinc-800 text-sm text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    Next
                    <i className="fa-solid fa-chevron-right ml-2" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="border border-dashed border-zinc-800 rounded-xl py-20 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-zinc-900 flex items-center justify-center mb-4">
              <i className="fa-solid fa-folder-open text-zinc-600 text-lg" />
            </div>

            <h3 className="text-lg font-medium">No projects found</h3>

            <p className="text-sm text-zinc-500 mt-2">
              Try changing your search or filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 text-sm text-indigo-400 hover:text-indigo-300"
            >
              Clear search and filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Projects;
