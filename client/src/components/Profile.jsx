import React, { useState, useEffect, useContext } from "react";
import base_url from "../services/base_url";
import { updateProfileApi } from "../services/allApi";
import { authContext } from "../context/ContextApi";

function Profile({ open, onClose }) {
  const [profileData, setProfileData] = useState({
    username: "",
    github: "",
    linkdin: "",
    profile: "",
  });

  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAuth } = useContext(authContext);

  useEffect(() => {
    if (open) {
      setMessage("");
      setMessageType("");

      if (sessionStorage.getItem("token")) {
        setProfileData({
          username: sessionStorage.getItem("user") || "",
          github: sessionStorage.getItem("github") || "",
          linkdin: sessionStorage.getItem("linkdin") || "",
          profile: sessionStorage.getItem("profile") || "",
        });
      }
    }
  }, [open]);

  useEffect(() => {
    if (profileData.profile?.type) {
      const imageUrl = URL.createObjectURL(profileData.profile);
      setPreview(imageUrl);

      return () => URL.revokeObjectURL(imageUrl);
    } else {
      setPreview("");
    }
  }, [profileData.profile]);

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
  };

  const handleUpdate = async () => {
    if (loading) return;

    const { username, github, linkdin, profile } = profileData;

    setMessage("");
    setMessageType("");

    if (!username || !github || !linkdin || !profile) {
      showMessage("Please fill in all the fields.", "error");
      return;
    }

    if (
      profile.type &&
      profile.type !== "image/png" &&
      profile.type !== "image/jpg" &&
      profile.type !== "image/jpeg"
    ) {
      showMessage("Invalid image format. Use PNG, JPG or JPEG.", "error");
      return;
    }

    try {
      setLoading(true);

      const result = await updateProfileApi(profileData);

      if (result.status === 200) {
        sessionStorage.setItem("user", username);
        sessionStorage.setItem("github", github);
        sessionStorage.setItem("linkdin", linkdin);

        if (result.data?.profile) {
          sessionStorage.setItem("profile", result.data.profile);
        }

        setAuth(true);
        showMessage("Profile updated successfully.", "success");

        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        showMessage("Something went wrong. Profile update failed.", "error");
      }
    } catch (error) {
      console.error(error);

      showMessage("Something went wrong. Profile update failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white">Update Profile</h2>

            <p className="text-sm text-zinc-500 mt-1">
              Manage your public profile information
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="w-9 h-9 rounded-lg border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <label
            htmlFor="pro"
            className={`cursor-pointer relative group ${
              loading ? "pointer-events-none opacity-70" : ""
            }`}
          >
            <input
              type="file"
              id="pro"
              className="hidden"
              disabled={loading}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  profile: e.target.files[0],
                })
              }
            />

            <img
              src={
                preview
                  ? preview
                  : profileData.profile
                    ? `${base_url}/uploaded/${profileData.profile}`
                    : "https://static.vecteezy.com/system/resources/thumbnails/005/544/708/small_2x/profile-icon-design-free-vector.jpg"
              }
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border border-zinc-800"
            />

            <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <i className="fa-solid fa-camera text-white"></i>
            </div>
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-500 mb-2">Username</label>

            <input
              type="text"
              value={profileData.username}
              disabled={loading}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  username: e.target.value,
                })
              }
              placeholder="Username"
              className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-500 mb-2">GitHub</label>

            <input
              type="text"
              value={profileData.github}
              disabled={loading}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  github: e.target.value,
                })
              }
              placeholder="GitHub URL"
              className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-500 mb-2">LinkedIn</label>

            <input
              type="text"
              value={profileData.linkdin}
              disabled={loading}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  linkdin: e.target.value,
                })
              }
              placeholder="LinkedIn URL"
              className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {message && (
            <div
              className={`text-sm px-3 py-2.5 rounded-lg border ${
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

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-200 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                </>
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
