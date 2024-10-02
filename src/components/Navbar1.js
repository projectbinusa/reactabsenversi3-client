import React, { useEffect, useRef, useState } from "react";
import { useSidebar } from "./SidebarContext";
import logo from "../components/logo.jpg";
import { API_DUMMY } from "../utils/api";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function Navbar1() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [profileAdmin, setProfileAdmin] = useState("");
  const [profileSu, setProfileSu] = useState("");
  const [profileOrtu, setProfileOrtu] = useState([]);
  const id = localStorage.getItem("adminId");
  const id_ortu = localStorage.getItem("id_orangtua");
  const id_user = localStorage.getItem("userId");
  const id_super = localStorage.getItem("superadminId");
  const token = localStorage.getItem("token");
  const dropdownRef = useRef(null);
  const [profileUser, setProfileUser] = useState("");

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setUserMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { toggleSidebar } = useSidebar();
  const location = useLocation();

  const isActive = (paths) => {
    return paths.some((path) => location.pathname.startsWith(path));
  };

  const getSu = async () => {
    try {
      const superAdmin = await axios.get(
        `${API_DUMMY}/api/superadmin/getbyid/${id}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      setProfileSu(superAdmin.data.imageSuperAdmin);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const user = await axios.get(
        `${API_DUMMY}/api/user/getUserBy/${id_user}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      setProfileUser(user.data.fotoUser);
    } catch (error) {
      console.log(error);
    }
  };

  const getAdmin = async () => {
    try {
      const admin = await axios.get(`${API_DUMMY}/api/admin/getById/${id}`, {
        headers: {
          AuthPrs: `Bearer ${token}`,
        },
      });
      setProfileAdmin(admin.data.imageAdmin);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrtu = async () => {
    try {
      const superAdmin = await axios.get(
        `${API_DUMMY}/api/orang-tua/getbyid/${id_ortu}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      setProfileOrtu(superAdmin.data.imageOrtu);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getAdmin();
    }
    if (id_ortu) {
      getOrtu();
    }
    if (id_user) {
      getUser();
    }
    if (id_super) {
      getSu();
    }
  }, [id, id_ortu, id_user, id_super]);

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
    <>
      <nav class="bg-indigo-500 fixed top-0 z-50 w-full border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <button
            onClick={toggleSidebar}
            aria-controls="logo-sidebar"
            // aria-expanded={isOpen}
            type="button"
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-white rounded-lg sm:hidden hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-white dark:hover:bg-blue-800 dark:focus:ring-blue-800">
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
          </button>
          <div class="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              onClick={toggleUserMenu}
              id="user-menu-button"
              aria-expanded={userMenuOpen}
              aria-haspopup="true">
              {/* <span className="sr-only">Open user menu</span> */}
              {localStorage.getItem("role") == "ADMIN" ? (
                <>
                  {" "}
                  <img
                    className="w-11 h-11 rounded-full"
                    src={
                      profileAdmin
                        ? profileAdmin
                        : "https://static.vecteezy.com/system/resources/previews/007/069/364/original/3d-user-icon-in-a-minimalistic-style-user-symbol-for-your-website-design-logo-app-ui-vector.jpg"
                    }
                    alt="user photo"
                  />
                </>
              ) : localStorage.getItem("role") == "Wali Murid" ? (
                <>
                  {" "}
                  <img
                    className="w-11 h-11 rounded-full"
                    src={
                      profileOrtu
                        ? profileOrtu
                        : "https://static.vecteezy.com/system/resources/previews/007/069/364/original/3d-user-icon-in-a-minimalistic-style-user-symbol-for-your-website-design-logo-app-ui-vector.jpg"
                    }
                    alt="user photo"
                  />
                </>
              ) : localStorage.getItem("role") == "SUPERADMIN" ? (
                <>
                  {" "}
                  <img
                    className="w-11 h-11 rounded-full"
                    src={
                      profileSu
                        ? profileSu
                        : "https://static.vecteezy.com/system/resources/previews/007/069/364/original/3d-user-icon-in-a-minimalistic-style-user-symbol-for-your-website-design-logo-app-ui-vector.jpg"
                    }
                    alt="user photo"
                  />
                </>
              ) : localStorage.getItem("role") == "USER" ? (
                <>
                  {" "}
                  <img
                    className="w-11 h-11 rounded-full"
                    src={
                      profileUser
                        ? profileUser
                        : "https://static.vecteezy.com/system/resources/previews/007/069/364/original/3d-user-icon-in-a-minimalistic-style-user-symbol-for-your-website-design-logo-app-ui-vector.jpg"
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
                ref={dropdownRef}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                className="absolute right-5 top-16 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg"
                tabIndex="-1">
                {localStorage.getItem("role") === "ADMIN" ? (
                  <>
                    <Link
                      to="/admin/profil"
                      className={`block text-sm text-gray-700 dark:text-white ${
                        isActive(["/admin/profil"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                          : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                      }`}>
                      <button
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                        className={`block px-4 py-2 text-sm text-gray-700 dark:text-white ${
                          isActive(["/admin/profil"])
                            ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                            : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                        }`}>
                        Profile
                      </button>
                    </Link>
                  </>
                ) : localStorage.getItem("role") === "Wali Murid" ? (
                  <>
                    <Link
                      className={`block text-sm text-gray-700 dark:text-white ${
                        isActive(["/walimurid/profile"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                          : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                      }`}
                      to="/walimurid/profile">
                      <button
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                        className={`block px-4 py-2 text-sm text-gray-700 dark:text-white ${
                          isActive(["/walimurid/profile"])
                            ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                            : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                        }`}>
                        Profile
                      </button>
                    </Link>
                  </>
                ) : localStorage.getItem("role") === "USER" ? (
                  <>
                    <Link
                      className={`block text-sm text-gray-700 dark:text-white ${
                        isActive(["/user/profile"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                          : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                      }`}
                      to="/user/profile">
                      <button
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                        className={`block px-4 py-2 text-sm text-gray-700 dark:text-white ${
                          isActive(["/user/profile"])
                            ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                            : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                        }`}>
                        Profile
                      </button>
                    </Link>
                  </>
                ) : localStorage.getItem("role") === "SUPERADMIN" ? (
                  <>
                    <Link
                      className={`block text-sm text-gray-700 dark:text-white ${
                        isActive(["/superadmin/profile"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                          : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                      }`}
                      to="/superadmin/profile">
                      <button
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                        className={`block px-4 py-2 text-sm text-gray-700 dark:text-white ${
                          isActive(["/superadmin/profile"])
                            ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                            : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                        }`}>
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
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white w-full text-left">
                  Keluar
                </button>
              </div>
            )}
          </div>
          <div
            class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-language">
            <Link to="/" className="flex ms-2 md:me-24">
              <img src={logo} className="h-11 rounded-full me-3 text-white" alt="" />
              <span className="self-center text-xl font-semibold sm:text-xl whitespace-nowrap text-white">
                Presensi App
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar1;
