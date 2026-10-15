import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/ContextApi";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(authContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const user = params.get("user");
    const git = params.get("git");
    const linkdin = params.get("linkdin");
    const profile = params.get("profile");

    if (token) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("github", git || "");
      sessionStorage.setItem("linkdin", linkdin || "");
      sessionStorage.setItem("profile", profile || "");

      setAuth(true);

      navigate("/");
    } else {
      navigate("/");
    }
  }, [navigate, setAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-xl font-semibold">
        Signing you in...
      </h2>
    </div>
  );
};

export default OAuthSuccess;