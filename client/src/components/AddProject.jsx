import React, { useContext, useEffect, useState } from "react";
import { addProjectApi } from "../services/allApi";
import { addResponseContext } from "../context/ContextApi";

function AddProject({ open, onClose }) {
  const [project, setProject] = useState({
    title: "",
    description: "",
    languages: "",
    git: "",
    demo: "",
    image: "",
  });

  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAddresponse } = useContext(addResponseContext);

  useEffect(() => {
    if (open) {
      setMessage("");
      setMessageType("");
    }
  }, [open]);

  useEffect(() => {
    if (!project.image) {
      setPreview("");
      return;
    }

    const imageUrl = URL.createObjectURL(project.image);
    setPreview(imageUrl);

    return () => URL.revokeObjectURL(imageUrl);
  }, [project.image]);

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
  };

  const handleSubmit = async () => {
    if (loading) return;

    const { title, description, languages, git, demo, image } = project;

    setMessage("");
    setMessageType("");

    if (
      !title.trim() ||
      !description.trim() ||
      !languages.trim() ||
      !git.trim() ||
      !demo.trim() ||
      !image
    ) {
      showMessage("Please fill in all the fields before adding the project.", "error");
      return;
    }

    if (
      image.type !== "image/jpg" &&
      image.type !== "image/png" &&
      image.type !== "image/jpeg"
    ) {
      showMessage(
        "Invalid image format. Please upload a JPG, JPEG, or PNG image.",
        "error"
      );
      return;
    }

    try {
      setLoading(true);

      const result = await addProjectApi(project);

      if (result.status === 200) {
        setAddresponse(result);
        showMessage("Project added successfully.", "success");

        setTimeout(() => {
          handleClose();
        }, 1000);
      } else {
        showMessage(
          "Something went wrong. Project could not be added.",
          "error"
        );
      }
    } catch (error) {
      showMessage(
        "Something went wrong. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;

    setProject({
      title: "",
      description: "",
      languages: "",
      git: "",
      demo: "",
      image: "",
    });

    setPreview("");
    setMessage("");
    setMessageType("");

    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl bg-[#0d0d0d] border border-zinc-800 rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Add New Project
            </h2>

            <p className="text-xs text-zinc-500 mt-1">
              Add a project to your ProjectFair portfolio
            </p>
          </div>

          <button
            onClick={handleClose}
            disabled={loading}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <label
                htmlFor="project-image"
                className={`block ${
                  loading
                    ? "cursor-not-allowed pointer-events-none"
                    : "cursor-pointer"
                }`}
              >
                <div className="aspect-square rounded-xl overflow-hidden border border-zinc-800 bg-[#080808] flex flex-col items-center justify-center">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Project preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mb-3">
                        <i className="fa-solid fa-cloud-arrow-up text-xl text-zinc-500"></i>
                      </div>

                      <p className="text-sm text-zinc-400">
                        Upload project image
                      </p>

                      <p className="text-xs text-zinc-600 mt-1">
                        PNG, JPG or JPEG
                      </p>
                    </>
                  )}
                </div>

                <p className="text-xs text-zinc-500 text-center mt-2">
                  Click to upload project image
                </p>

                <input
                  id="project-image"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="hidden"
                  disabled={loading}
                  onChange={(e) =>
                    setProject({
                      ...project,
                      image: e.target.files[0],
                    })
                  }
                />
              </label>
            </div>

            <div className="md:w-2/3 space-y-3">
              <input
                type="text"
                value={project.title}
                disabled={loading}
                onChange={(e) =>
                  setProject({
                    ...project,
                    title: e.target.value,
                  })
                }
                placeholder="Project title"
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition disabled:opacity-50"
              />

              <textarea
                value={project.description}
                disabled={loading}
                onChange={(e) =>
                  setProject({
                    ...project,
                    description: e.target.value,
                  })
                }
                placeholder="Project description"
                rows="3"
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition resize-none disabled:opacity-50"
              />

              <input
                type="text"
                value={project.languages}
                disabled={loading}
                onChange={(e) =>
                  setProject({
                    ...project,
                    languages: e.target.value,
                  })
                }
                placeholder="Technologies (React, Node, MongoDB...)"
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition disabled:opacity-50"
              />

              <input
                type="url"
                value={project.git}
                disabled={loading}
                onChange={(e) =>
                  setProject({
                    ...project,
                    git: e.target.value,
                  })
                }
                placeholder="GitHub repository link"
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition disabled:opacity-50"
              />

              <input
                type="url"
                value={project.demo}
                disabled={loading}
                onChange={(e) =>
                  setProject({
                    ...project,
                    demo: e.target.value,
                  })
                }
                placeholder="Live demo link"
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition disabled:opacity-50"
              />
            </div>
          </div>

          {message && (
            <div
              className={`mt-5 text-sm px-3 py-2.5 rounded-lg border ${
                messageType === "success"
                  ? "text-green-400 bg-green-400/5 border-green-400/20"
                  : "text-red-400 bg-red-400/5 border-red-400/20"
              }`}
            >
              <i
                className={`fa-solid mr-2 ${
                  messageType === "success"
                    ? "fa-circle-check"
                    : "fa-circle-exclamation"
                }`}
              ></i>

              {message}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-800">
          <button
            onClick={handleClose}
            disabled={loading}
            className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-200 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin text-xs"></i>
              </>
            ) : (
              <>
                Add Project
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProject;