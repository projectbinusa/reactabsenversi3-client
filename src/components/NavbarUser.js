import React, { useEffect, useState } from "react";
import Logo from "../components/logo.png";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { API_DUMMY } from "../utils/api";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Navbar = ({ toggleSidebar }) => {
  const [profileUser, setProfileUser] = useState("");
  const [profileOrtu, setProfileOrtu] = useState([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const id_ortu = localStorage.getItem("id_orangtua");
  const location = useLocation();
  const isActive = (paths) => {
    return paths.some((path) => location.pathname.startsWith(path));
  };

  const role = localStorage.getItem("role");
  const id = localStorage.getItem("userId");

  const getUser = async () => {
    try {
      const user = await axios.get(`${API_DUMMY}/api/user/getUserBy/${id}`);
      setProfileUser(user.data.fotoUser);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrtu = async () => {
    try {
      const superAdmin = await axios.get(
        `${API_DUMMY}/api/orang-tua/getbyid/${id_ortu}`
      );
      setProfileOrtu(superAdmin.data.imageOrtu);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
    if (id_ortu) {
      getOrtu();
    }
  }, [id, id_ortu]);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  function logout() {
    // Tampilkan SweetAlert2 konfirmasi sebelum logout
    Swal.fire({
      title: "Logout",
      text: "Apakah Anda yakin ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        // Hapus item dari local storage saat logout
        localStorage.clear();
        Swal.fire({
          title: "Logout Berhasil",
          text: "Anda telah berhasil logout.",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          window.location.href = "/login";
        });
      }
    });
  }

  return (
    <nav className="fixed top-0 z-50 w-full bg-indigo-500 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            {role !== "SUPERADMIN" && (
              <a href="" className="flex ms-2 md:me-24">
                {/* <img src={Logo} className="h-11 me-3 text-white" alt="" /> */}
                <span className="self-center text-xl font-semibold sm:text-xl whitespace-nowrap text-white">
                  {/* Presensi App */}
                </span>
              </a>
            )}
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  onClick={toggleUserMenu}
                  id="user-menu-button"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  {localStorage.getItem("role") == "USER" ? (
                    <>
                      {" "}
                      <img
                        className="w-11 h-11 rounded-full"
                        src={
                          profileUser
                            ? profileUser
                            : "data:image/jpeg;base64,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"
                        }
                        alt="user photo"
                      />
                    </>
                  ) : localStorage.getItem("role") == "Wali Murid" ? (
                    <>
                      {" "}
                      <img
                        className="w-8 h-8 rounded-full"
                        src={
                          profileOrtu
                            ? profileOrtu
                            : "data:image/jpeg;base64,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"
                        }
                        alt="user photo"
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </button>
                {userMenuOpen && (
                  <div
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg"
                    tabIndex="-1"
                  >
                    {localStorage.getItem("role") == "USER" ? (
                      <>
                        <Link
                          to="/user/profile"
                          className={`block text-sm text-gray-700 dark:text-white ${
                            isActive(["/user/profile"])
                              ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                              : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                          }`}
                        >
                          <button
                            role="menuitem"
                            tabIndex="-1"
                            id="user-menu-item-0"
                            className={`block px-4 py-2 text-sm text-gray-700 dark:text-white ${
                              isActive(["/user/profile"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                            }`}
                          >
                            Profile
                          </button>
                        </Link>
                      </>
                    ) : localStorage.getItem("role") == "Wali Murid" ? (
                      <>
                        <Link
                          className={`block text-sm text-gray-700 dark:text-white ${
                            isActive(["/walimurid/profile"])
                              ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                              : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                          }`}
                          to="/walimurid/profile"
                        >
                          <button
                            role="menuitem"
                            tabIndex="-1"
                            id="user-menu-item-0"
                            className={`block px-4 py-2 text-sm text-gray-700 dark:text-white ${
                              isActive(["/walimurid/profile"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                            }`}
                          >
                            Profile
                          </button>
                        </Link>
                      </>
                    ) : (
                      <></>
                    )}
                    <button
                      onClick={() => logout()}
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-white w-full text-left"
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
