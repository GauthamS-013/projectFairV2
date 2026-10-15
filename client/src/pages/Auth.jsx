import React, { useState } from "react";
import { signupApi, loginApi } from "../services/allApi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/ContextApi";

const Auth = ({ show, onClose }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const nav = useNavigate();
  const { setAuth } = useContext(authContext);

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
  };

  if (!show) return null;

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;

  const validateSignUp = () => {
    const { username, email, password, confirmPassword } = user;

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    if (!trimmedUsername || !trimmedEmail || !password || !confirmPassword) {
      return "Please enter all required fields.";
    }

    if (trimmedUsername.length < 3) {
      return "Username must be at least 3 characters long.";
    }

    if (trimmedUsername.length > 20) {
      return "Username must be under 20 characters.";
    }

    if (!USERNAME_REGEX.test(trimmedUsername)) {
      return "Username can only contain letters, numbers, and underscores.";
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return "Please enter a valid email address.";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      return "Password must contain at least one letter and one number.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return null;
  };

  const validateLogin = () => {
    const { email, password } = user;

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      return "Please enter your email and password.";
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return "Please enter a valid email address.";
    }

    return null;
  };

  const handleSignUp = async () => {
    const validationError = validateSignUp();

    if (validationError) {
      showMessage(validationError, "warning");
      return;
    }

    const { username, email, password } = user;

    try {
      setLoading(true);
      setMessage("");

      const result = await signupApi({
        username: username.trim(),
        email: email.trim(),
        password,
      });

      console.log(result);

      if (result.status === 200) {
        showMessage("Sign up successful! You can now sign in.", "success");

        setUser({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setIsLogin(true);
      } else {
        showMessage(result.response?.data || "Something went wrong.", "error");
      }
    } catch (error) {
      console.log(error);

      showMessage(error.response?.data || "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    const validationError = validateLogin();

    if (validationError) {
      showMessage(validationError, "warning");
      return;
    }

    const { email, password } = user;

    try {
      setLoading(true);
      setMessage("");

      const result = await loginApi({
        email: email.trim(),
        password,
      });

      console.log(result);

      if (result.status === 200) {
        showMessage("Welcome to ProjectFair!", "success");

        setUser({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem("user", JSON.stringify(result.data.user));
        sessionStorage.setItem("github", result.data.git ?? "");
        sessionStorage.setItem("linkdin", result.data.linkdin ?? "");
        sessionStorage.setItem("profile", result.data.profile ?? "");

        setAuth(true);
        onClose();
        nav("/");
      } else {
        showMessage(result.response?.data || "Something went wrong.", "error");
      }
    } catch (error) {
      console.log(error);

      showMessage(error.response?.data || "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setUser({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setMessage("");
    setMessageType("");
    setShowPassword(false);
    onClose();
  };

  const handleGoogleLogin = () => {
      window.location.href = "http://localhost:3000/auth/google";
  };

  const handleGithubLogin = () => {
     window.location.href = "http://localhost:3000/auth/github";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808] backdrop-blur-sm px-4"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-[#0d0d0d] p-6 shadow-2xl md:p-8"
      >
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition hover:text-white cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        <div className="mb-7">
          <h2 className="text-lg font-bold text-zinc-300">
            project<span className="text-indigo-400">Fair</span>
          </h2>
        </div>
        <div className="mb-7">
          <h1 className="text-3xl font-semibold text-white">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            {isLogin
              ? "Sign in to continue to ProjectFair."
              : "Start showcasing your projects with ProjectFair."}
          </p>
        </div>
        {message && (
          <div
            className={`mb-5 rounded-lg px-4 py-3 text-sm ${
              messageType === "success"
                ? "border border-green-500/20 bg-green-500/10 text-green-400"
                : messageType === "warning"
                  ? "border border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                  : "border border-red-500/20 bg-red-500/10 text-red-400"
            }`}
          >
            {message}
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 rounded-lg border cursor-pointer border-zinc-700 bg-zinc-900 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            <i className="fa-brands fa-google text-base"></i>
            Google
          </button>
          <button
            type="button"
            onClick={handleGithubLogin}
            className="flex items-center justify-center gap-2 rounded-lg border cursor-pointer border-zinc-700 bg-zinc-900 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            <i className="fa-brands fa-github text-lg"></i>
            GitHub
          </button>
        </div>
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-800"></div>

          <span className="text-xs text-zinc-500">OR</span>

          <div className="h-px flex-1 bg-zinc-800"></div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (isLogin) {
              handleLogin();
            } else {
              handleSignUp();
            }
          }}
          className="space-y-4"
        >
          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Username
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                value={user.username}
                onChange={(e) =>
                  setUser({
                    ...user,
                    username: e.target.value,
                  })
                }
                placeholder="Enter your username"
              />
            </div>
          )}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={user.email}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                value={user.password}
                onChange={(e) =>
                  setUser({
                    ...user,
                    password: e.target.value,
                  })
                }
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-zinc-300 cursor-pointer"
              >
                <i
                  className={`fa-solid ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </button>
            </div>
          </div>
          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Confirm Password
              </label>

              <input
                type="password"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500"
                value={user.confirmPassword}
                onChange={(e) =>
                  setUser({
                    ...user,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="Confirm your password"
              />
            </div>
          )}
          {/* {isLogin && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-zinc-400">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 accent-indigo-400"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-indigo-400 transition hover:text-indigo-300"
              >
                Forgot password?
              </button>
            </div>
          )} */}
          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full rounded-lg py-3 bg-white font-semibold text-black transition duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-zinc-400/20 cursor-pointer"
          >
            {loading
              ? isLogin
                ? "Signing in..."
                : "Creating account..."
              : isLogin
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-zinc-400">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="font-semibold text-indigo-400 transition hover:text-indigo-300 cursor-pointer"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="font-semibold text-indigo-400 transition hover:text-indigo-300 cursor-pointer"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
