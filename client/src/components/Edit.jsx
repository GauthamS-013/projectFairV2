import React, { useContext, useEffect, useState } from "react";
import base_url from "../services/base_url";
import { updateProjectApi } from "../services/allApi";
import { editResponseContext } from "../context/ContextApi";

function Edit({ project }) {
  const [show, setShow] = useState(false);

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    languages: "",
    github: "",
    demo: "",
    image: "",
  });

  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const { setEditResponse } = useContext(editResponseContext);

  useEffect(() => {
    if (show) {
      setProjectData({
        title: project.title || "",
        description: project.description || "",
        languages: project.languages || "",
        github: project.github || project.git || "",
        demo: project.demo || "",
        image: project.image || "",
      });

      setPreview("");
      setMessage("");
      setMessageType("");
    }
  }, [show, project]);

  useEffect(() => {
    if (!projectData.image || typeof projectData.image === "string") {
      setPreview("");
      return;
    }

    const imageUrl = URL.createObjectURL(projectData.image);
    setPreview(imageUrl);

    return () => URL.revokeObjectURL(imageUrl);
  }, [projectData.image]);

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
  };

  const handleEdit = async () => {
    if (loading) return;

    const {
      title,
      description,
      languages,
      github,
      demo,
      image,
    } = projectData;

    setMessage("");
    setMessageType("");

    if (
      !title.trim() ||
      !description.trim() ||
      !languages.trim() ||
      !github.trim() ||
      !demo.trim() ||
      !image
    ) {
      showMessage(
        "Please fill in all the fields before updating the project.",
        "error"
      );
      return;
    }

    if (
      typeof image !== "string" &&
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

      const result = await updateProjectApi(project._id, projectData);

      if (result.status === 200) {
        setEditResponse(result);

        showMessage("Project updated successfully.", "success");

        setTimeout(() => {
          handleClose();
        }, 1000);
      } else {
        showMessage(
          "Something went wrong. Project could not be updated.",
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

    setShow(false);

    setProjectData({
      title: "",
      description: "",
      languages: "",
      github: "",
      demo: "",
      image: "",
    });

    setPreview("");
    setMessage("");
    setMessageType("");
  };

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 hover:text-yellow-400 hover:border-zinc-700 transition cursor-pointer"
      >
        <i className="fa-solid fa-pen-to-square"></i>
      </button>

      {show && (
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
                  Edit Project
                </h2>

                <p className="text-xs text-zinc-500 mt-1">
                  Update your project information
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
                    htmlFor={`edit-project-image-${project._id}`}
                    className={`block ${
                      loading
                        ? "cursor-not-allowed pointer-events-none"
                        : "cursor-pointer"
                    }`}
                  >
                    <div className="aspect-square rounded-xl overflow-hidden border border-zinc-800 bg-[#080808] flex items-center justify-center">
                      {preview ? (
                        <img
                          src={preview}
                          alt={projectData.title}
                          className="w-full h-full object-cover"
                        />
                      ) : projectData.image ? (
                        <img
                          src={
                            typeof projectData.image === "string"
                              ? `${base_url}/uploaded/${projectData.image}`
                              : ""
                          }
                          alt={projectData.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mb-3">
                            <i className="fa-solid fa-cloud-arrow-up text-xl text-zinc-500"></i>
                          </div>

                          <p className="text-sm text-zinc-400">
                            Upload project image
                          </p>

                          <p className="text-xs text-zinc-600 mt-1">
                            PNG, JPG or JPEG
                          </p>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-zinc-500 text-center mt-2">
                      Click to change project image
                    </p>

                    <input
                      id={`edit-project-image-${project._id}`}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      className="hidden"
                      disabled={loading}
                      onChange={(e) =>
                        setProjectData({
                          ...projectData,
                          image: e.target.files[0],
                        })
                      }
                    />
                  </label>
                </div>

                <div className="md:w-2/3 space-y-3">
                  <input
                    type="text"
                    value={projectData.title}
                    disabled={loading}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        title: e.target.value,
                      })
                    }
                    placeholder="Project title"
                    className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition disabled:opacity-50"
                  />

                  <textarea
                    value={projectData.description}
                    disabled={loading}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Project description"
                    rows="3"
                    className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition resize-none disabled:opacity-50"
                  />

                  <input
                    type="text"
                    value={projectData.languages}
                    disabled={loading}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        languages: e.target.value,
                      })
                    }
                    placeholder="Technologies (React, Node, MongoDB...)"
                    className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition disabled:opacity-50"
                  />

                  <input
                    type="url"
                    value={projectData.github}
                    disabled={loading}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        github: e.target.value,
                      })
                    }
                    placeholder="GitHub repository link"
                    className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition disabled:opacity-50"
                  />

                  <input
                    type="url"
                    value={projectData.demo}
                    disabled={loading}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
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
                onClick={handleEdit}
                disabled={loading}
                className="px-5 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-200 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin text-xs"></i>
                  </>
                ) : (
                  <>
                    Update Project
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Edit;