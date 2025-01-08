import React, { useState } from "react";
import Navbar from "../../../components/NavbarSuper";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import SidebarNavbar from "../../../components/SidebarNavbar";
import { SidebarProvider } from "../../../components/SidebarContext";
import Navbar1 from "../../../components/Navbar1";

function AddAdmin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const idSuperAdmin = localStorage.getItem("superadminId");
  const token = localStorage.getItem("token");

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const tambahAdmin = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();

    try {
      const response = await axios.get(`${API_DUMMY}/api/admin/all`, {
        headers: {
          AuthPrs: `Bearer ${token}`,
        },
      });
      const existingUsers = response.data;

      const isEmailExists = existingUsers.some(
        (user) =>
          user.email && user.email.toLowerCase() === trimmedEmail.toLowerCase()
      );
      const isUsernameExists = existingUsers.some(
        (user) =>
          user.username &&
          user.username.toLowerCase() === trimmedUsername.toLowerCase()
      );

      if (isEmailExists || isUsernameExists) {
        Swal.fire("Error", "Email atau Username sudah terdaftar", "error");
        return;
      }

      const newUser = {
        email: email,
        username: username,
        password: password,
      };

      await axios.post(
        `${API_DUMMY}/api/admin/register-by-superadmin/${idSuperAdmin}`,
        newUser,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: "Berhasil",
        text: "Berhasil menambahkan data",
        icon: "success",
        showConfirmButton: false,
      });

      setTimeout(() => {
        window.location.href = "/superadmin/admin";
      }, 3000);
    } catch (error) {
      console.log(error);

      const errorResponse = error.response?.data;
      const errorMessage = errorResponse?.message || error.message;

      if (errorMessage.includes("Email sudah digunakan")) {
        Swal.fire({
          icon: "error",
          title: "Email sudah terdaftar",
          text: "Gunakan email lain.",
          showConfirmButton: true,
        });
      } else if (errorMessage.includes("Username sudah digunakan")) {
        Swal.fire({
          icon: "error",
          title: "Username sudah terdaftar",
          text: "Pilih username lain.",
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Terjadi kesalahan",
          text: "Gagal menambahkan data. Coba lagi nanti.",
          showConfirmButton: true,
        });
      }
    }
  };

  // Helper function to capitalize each word, but not the character after an apostrophe
  // const capitalizeWords = (str) => {
  //   return str.replace(/\b\w/g, (char, index, input) => {
  //     // Check if the character is right after an apostrophe
  //     if (index > 0 && input[index - 1] === "'") {
  //       return char.toLowerCase(); // Keep it lowercase
  //     }
  //     return char.toUpperCase(); // Otherwise, capitalize
  //   });
  // };

  return (
    <div className="flex flex-col h-screen">
      <SidebarProvider>
        <Navbar1 />
        <SidebarNavbar />
      </SidebarProvider>
      <div className="md:w-[79%] w-full mt-14 md:mt-10"></div>
      <div className=" sm:ml-64 content-page md:p-8 md:ml-64 mb-12">
        <div className="p-4">
          <div className="p-5">
            <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between">
                <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  Tambah Admin
                </h6>
              </div>

              <hr />

              <form onSubmit={tambahAdmin}>
                <div className="mt-5 text-left">
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        autoComplete="off"
                        required
                      />
                      <label
                        htmlFor="email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Email
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        autoComplete="off"
                        required
                      />
                      <label
                        htmlFor="username"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Username
                      </label>
                    </div>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      autoComplete="off"
                      required
                    />
                    <label
                      htmlFor="password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Password
                    </label>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex">
                    <div className="text-red-500">*</div>
                    <div className="text-sm font-medium text-gray-950 dark:text-gray-950">
                      Password harus memiliki 8 karakter
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex items-center h-5">
                      <input
                        id="showpass"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        checked={showPassword}
                        onChange={handleShowPasswordChange}
                      />
                    </div>
                    <label
                      htmlFor="showpass"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Show Password
                    </label>
                  </div>
                </div>
                <div className="flex justify-between">
                  <a
                    className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    href="/superadmin/admin"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </a>
                  <button
                    type="submit"
                    className="text-white bg-indigo-500 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                  >
                    <FontAwesomeIcon icon={faFloppyDisk} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAdmin;
