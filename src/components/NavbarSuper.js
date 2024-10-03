import React, { useEffect, useState } from "react";
import Logo from "../components/logo_smp.png";

import axios from "axios";
import { API_DUMMY } from "../utils/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const NavbarSuper = () => {
  const [profileSu, setProfileSu] = useState([]);
  const [profileOrtu, setProfileOrtu] = useState([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const role = localStorage.getItem("role");
  const id = localStorage.getItem("superadminId");
  const id_ortu = localStorage.getItem("id_orangtua");
  const location = useLocation();
  const isActive = (paths) => {
    return paths.some((path) => location.pathname.startsWith(path));
  };

  const getSu = async () => {
    try {
      const superAdmin = await axios.get(
        `${API_DUMMY}/api/superadmin/getbyid/${id}`
      );
      setProfileSu(superAdmin.data.imageSuperAdmin);
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
      getSu();
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
        // sessionStorage.removeItem("token");
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
                <img src={Logo} className="rounded-full h-11 me-3 text-white" alt="" />
                <span className="self-center text-xl font-semibold sm:text-xl whitespace-nowrap text-white">
                  Presensi App
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
                  {localStorage.getItem("role") == "SUPERADMIN" ? (
                    <>
                      {" "}
                      <img
                        className="w-11 h-11 rounded-full"
                        src={
                          profileSu
                            ? profileSu
                            : "https://img.freepik.com/premium-photo/3d-icon-cartoon-person-profile-avatar-user-profile-3d-render-illustration_276199-466.jpg"
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
                            : "https://img.freepik.com/premium-photo/3d-icon-cartoon-person-profile-avatar-user-profile-3d-render-illustration_276199-466.jpg"
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
                    {localStorage.getItem("role") == "SUPERADMIN" ? (
                      <>
                        <Link
                          to="/superadmin/profile"
                          className={`block text-sm text-gray-700 dark:text-white ${
                            isActive(["/superadmin/profile"])
                              ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                              : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                          }`}
                        >
                          <button
                            role="menuitem"
                            tabIndex="-1"
                            id="user-menu-item-0"
                            className={`block px-4 py-2 text-sm text-gray-700 dark:text-white ${
                              isActive(["/superadmin/profile"])
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

export default NavbarSuper;
