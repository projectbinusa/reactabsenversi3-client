
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Logo from "../components/logo.jpg"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { API_DUMMY } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("rememberMe")) {
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");
      if (storedEmail) setEmail(storedEmail);
      if (storedPassword) setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${API_DUMMY}/api/login`, {
        email: email,
        password: password,
      });

      const { token } = data.token;

      if (rememberMe) {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("adminId", data.data.id);
        localStorage.setItem("userId", data.data.id);
        localStorage.setItem("id_orangtua", data.data.id);
        localStorage.setItem("superadminId", data.data.id);
        localStorage.setItem("rememberMe", true);
      } else {
        sessionStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("adminId", data.data.id);
        localStorage.setItem("userId", data.data.id);
        localStorage.setItem("id_orangtua", data.data.id);
        localStorage.setItem("superadminId", data.data.id);
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("password");
        localStorage.removeItem("rememberMe");
      }
      localStorage.setItem("role", data.data.role);
      localStorage.setItem("email", email);
      localStorage.setItem("token", data.token);
      localStorage.setItem("adminId", data.data.id);
      localStorage.setItem("userId", data.data.id);
      localStorage.setItem("id_orangtua", data.data.id);
      localStorage.setItem("superadminId", data.data.id);
      localStorage.setItem("loginSuccess", "true");
      window.location.href = "/";
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Email atau Password yang Anda masukan salah",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };

  const handleForgotPasswordChange = (event) => {
    const selectedRole = event.target.value;
    switch (selectedRole) {
      case "user":
        window.location.href = "/forgotpass";
        break;
      case "admin":
        window.location.href = "/forgotpass-admin";
        break;
      case "superadmin":
        window.location.href = "/forgotpassSup";
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-5 sm:p-2">
          <div>
            <img src={Logo} className="rounded-full w-32 mx-auto" />
          </div>
          <div className="mt-8 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign in</h1>
            <p className="text-base align-baseline mt-6">Sistem Absensi Berbasis Elektronik</p>
            <div className="w-full flex-1 mt-8">
              <form action="" onSubmit={login} method="POST">
                <div className="mx-auto max-w-xs">
                  <input
                    className="w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="relative mt-2">
                    <input
                      className="w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      placeholder="Password*"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)} // Mengubah state showPassword ketika ikon diklik
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}{" "}
                      {/* Menampilkan ikon view atau hide password sesuai dengan state showPassword */}
                    </span>
                  </div>
                  <div class="flex items-center mt-2">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="default-checkbox"
                      class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Remember Me
                    </label>
                  </div>
                  <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">Sign In</span>
                  </button>
                  <div className="text-center mt-5">
                    <a
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                      onClick={() => setShowForgot(true)}>
                      Tidak ingat kata sandi?
                    </a>
                    {showForgot && (
                      <>
                        <select
                          className="w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                          onChange={handleForgotPasswordChange}
                          required>
                          <option value="" disabled selected>
                            Pilih Role Untuk Forgot Password
                          </option>
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                          <option value="superadmin">Super Admin</option>
                        </select>
                        <br />
                      </>
                    )}
                    <br />
                    <Link
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                      to="/registerUser">
                      Tidak memiliki akun? Register
                    </Link>
                  </div>
                  {/* <p className="mt-6 text-base text-gray-600 text-center">
                    Tidak memiliki akun?
                    <a
                      href="/registerUser"
                      className="border-b border-gray-500 text-indigo-500 border-dotted"
                    >
                      Register
                    </a>
                  </p> */}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
