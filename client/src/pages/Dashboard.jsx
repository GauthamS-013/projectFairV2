import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import AddProject from "../components/AddProject";
import Edit from "../components/Edit";
import { deleteUserProjectApi, getUserProjectApi } from "../services/allApi";
import { addResponseContext, editResponseContext } from "../context/ContextApi";
import { toast } from "react-toastify";
import Profile from "../components/Profile";
import base_url from "../services/base_url";

function Dashboard() {
  const [username, setUsername] = useState("");
  const [projects, setProjects] = useState([]);

  const { addresponse } = useContext(addResponseContext);
  const { editResponse } = useContext(editResponseContext);

  const [showProfile, setShowProfile] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);

  useEffect(() => {
    getData();

    const user = sessionStorage.getItem("user");

    if (user) {
      setUsername(user);
    } else {
      setUsername("");
    }
  }, [addresponse, editResponse]);

  const getData = async () => {
    const result = await getUserProjectApi();

    if (result.status === 200) {
      setProjects(result.data);
    }
  };

  const deleteProject = async (id) => {
    const result = await deleteUserProjectApi(id);

    if (result.status === 200) {
      getData();
      toast.success("Project deleted");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <section className="mb-8">
          <p className="text-sm text-zinc-500 mb-2">Dashboard</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Welcome back,{" "}
                <span className="text-indigo-400">{username}</span>
              </h1>
              <p className="text-zinc-500 mt-2">
                Manage and organize your projects from one place.
              </p>
            </div>
            <button
              onClick={() => setShowAddProject(true)}
              className="bg-white text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-zinc-200 transition cursor-pointer"
            >
              Add Project
              <i className="fa-solid fa-plus ml-2"></i>
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="border border-zinc-800 bg-[#0d0d0d] rounded-xl p-5">
            <p className="text-sm text-zinc-500">Total Projects</p>
            <h2 className="text-3xl font-semibold mt-2">{projects.length}</h2>
            <p className="text-xs text-zinc-600 mt-2">
              Projects in your portfolio
            </p>
          </div>
          <div className="border border-zinc-800 bg-[#0d0d0d] rounded-xl p-5">
            <p className="text-sm text-zinc-500">Recently Added</p>
            <h2 className="text-3xl font-semibold mt-2">
              {
                projects.filter((project) => {
                  if (!project.createdAt) return false;

                  const projectDate = new Date(project.createdAt);
                  const currentDate = new Date();

                  return (
                    projectDate.getMonth() === currentDate.getMonth() &&
                    projectDate.getFullYear() === currentDate.getFullYear()
                  );
                }).length
              }
            </h2>
            <p className="text-xs text-zinc-600 mt-2">
              Projects added this month
            </p>
          </div>

          <div className="border border-zinc-800 bg-[#0d0d0d] rounded-xl p-5 flex flex-col justify-between">
            <div>
              <p className="text-sm text-zinc-500">Profile</p>
              <h2 className="text-lg font-medium mt-2">Manage your profile</h2>
              <p className="text-xs text-zinc-600 mt-2">
                Update your public information
              </p>
            </div>
            <button
              onClick={() => setShowProfile(true)}
              className="cursor-pointer text-sm text-indigo-400 hover:text-indigo-300 mt-4 text-left transition"
            >
              View profile →
            </button>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Your Projects</h2>
              <p className="text-sm text-zinc-500 mt-1">
                Projects you've added to ProjectFair
              </p>
            </div>
            <span className="text-sm text-zinc-600">
              {projects.length} {projects.length === 1 ? "project" : "projects"}
            </span>
          </div>
          {projects.length > 0 ? (
            <div className="space-y-3">
              {projects.map((item) => (
                <div
                  key={item._id}
                  className="group border border-zinc-800 bg-[#0d0d0d] rounded-xl p-4 hover:border-zinc-700 transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <a
                        href={item.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-900 shrink-0 block cursor-pointer"
                      >
                        <img
                          src={`${base_url}/uploaded/${item.image}`}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </a>
                      <div className="min-w-0">
                        <h3 className="text-lg font-medium truncate">
                          {item.title}
                        </h3>
                        <p className="text-sm text-zinc-500 mt-1 line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition"
                      >
                        <i className="fa-brands fa-github"></i>
                      </a>
                      <Edit project={item} />
                      <button
                        onClick={() => deleteProject(item._id)}
                        className="w-9 h-9 rounded-lg border border-zinc-800 text-zinc-500 hover:text-red-400 hover:border-red-400/30 transition cursor-pointer"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-zinc-800 rounded-xl py-16 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-zinc-900 flex items-center justify-center mb-4">
                <i className="fa-solid fa-folder-open text-zinc-600"></i>
              </div>
              <h3 className="text-lg font-medium">No projects yet</h3>
              <p className="text-sm text-zinc-500 mt-2 mb-5">
                Start building your portfolio by adding your first project.
              </p>
              <button
                onClick={() => setShowAddProject(true)}
                className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-200 transition cursor-pointer"
              >
                Add your first project
              </button>
            </div>
          )}
        </section>
      </main>
      <Profile open={showProfile} onClose={() => setShowProfile(false)} />
      <AddProject
        open={showAddProject}
        onClose={() => setShowAddProject(false)}
      />
    </div>
  );
}

export default Dashboard;
