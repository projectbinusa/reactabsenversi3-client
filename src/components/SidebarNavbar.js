import React, { useEffect, useRef, useState } from "react";
import Logo from "../components/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import {
  faAddressCard,
  faBriefcase,
  faBuilding,
  faBusinessTime,
  faCalendar,
  faCalendarDay,
  faCalendarDays,
  faCalendarWeek,
  faChalkboardUser,
  faChevronDown,
  faChevronUp,
  faClock,
  faCube,
  faDatabase,
  faExclamation,
  faHandsHoldingChild,
  faMapLocationDot,
  faSchool,
  faSignal,
  faTable,
  faUserCheck,
  faUserGear,
  faUserPen,
  faUserPlus,
  faUserTie,
  faUsers,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import { useSidebar } from "./SidebarContext";

function SidebarNavbar() {
  const role = localStorage.getItem("role");
  const { isOpen, toggleSidebar } = useSidebar();
  const [masterDataOpen, setMasterDataOpen] = useState(false);
  const [rekapanOpen, setRekapanOpen] = useState(false);
  const [absenOpen, setAbsenOpen] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

  const isActive = (paths) => {
    return (
      Array.isArray(paths) &&
      paths.some((path) => location.pathname.startsWith(path))
    );
  };

  useEffect(() => {
    const isActive = (paths) => {
      return (
        Array.isArray(paths) &&
        paths.some((path) => location.pathname.startsWith(path))
      );
    };

    if (
      isActive([
        "/admin/simpel",
        "/admin/persiswa",
        "/admin/harian",
        "/admin/mingguan",
        "/admin/bulanan",
        "/superadmin/data-user",
        "/superadmin/absensi",
        "/admin/perkelas",
      ])
    ) {
      setRekapanOpen(true);
    } else {
      setRekapanOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Check if any link inside dropdown is active and open the dropdown if it is
    const isActive = (paths) => {
      return (
        Array.isArray(paths) &&
        paths.some((path) => location.pathname.startsWith(path))
      );
    };

    if (isActive(["/admin/absensi", "/admin/kehadiran"])) {
      setAbsenOpen(true);
    } else {
      setAbsenOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const isActive = (paths) => {
      return (
        Array.isArray(paths) &&
        paths.some((path) => location.pathname.startsWith(path))
      );
    };

    if (
      isActive([
        "/admin/siswa",
        "/admin/jabatan",
        "/admin/shift",
        "/admin/lokasi",
        "/admin/organisasi",
        "/admin/kelas",
        "/admin/ortu",
        "/superadmin/admin",
        "/superadmin/jabatan",
        "/superadmin/shift",
        "/superadmin/lokasi",
        "/superadmin/organisasi",
      ])
    ) {
      setMasterDataOpen(true);
    } else {
      setMasterDataOpen(false);
    }
  }, [location.pathname]);

  // Fungsi untuk menampilkan atau menyembunyikan dropdown master data
  const toggleMasterData = () => {
    setMasterDataOpen(!masterDataOpen);
  };

  // Fungsi untuk menampilkan atau menyembunyikan dropdown rekapan
  const toggleRekapan = () => {
    setRekapanOpen(!rekapanOpen);
  };

  // Fungsi untuk menampilkan atau menyembunyikan dropdown absen
  const toggleAbsen = () => {
    setAbsenOpen(!absenOpen);
  };

  // Fungsi untuk memeriksa apakah URL saat ini cocok dengan href
  // const isActive = (path) => location.pathname === path;

  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      // Gunakan fungsi setter untuk memperbarui state
      toggleSidebar();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <div>
      {/* <button
        onClick={toggleSidebar}
        aria-controls="logo-sidebar"
        aria-expanded={isOpen}
        type="button"
        className="relative inline-flex items-center p-2 mt-2 ms-3 text-sm text-white rounded-lg sm:hidden hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-white dark:hover:bg-blue-800 dark:focus:ring-blue-800"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button> */}

      <aside
        id="logo-sidebar"
        ref={sidebarRef}
        className={`fixed top-20 left-0 z-40 ${
          localStorage.getItem("role") == "ADMIN" && "SUPERADMIN"
            ? "w-[300px]"
            : "w-[260px]"
        } h-screen transition-transform ease-in-out duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col">
          <div className="bg-white shadow-lg shadow-blue-300 flex-1 px-3 py-4 h-full pb-4 overflow-y-auto">
            <nav className="">
              <ul className="space-y-2 font-medium">
                {role === "ADMIN" && (
                  <ul>
                    <li>
                      <Link
                        to="/admin/dashboard"
                        className={`${
                          isActive(["/admin/dashboard"])
                            ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                            : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                        } flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group`}
                      >
                        <FontAwesomeIcon
                          className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                            isActive(["/admin/dashboard"])
                              ? "text-white hover:text-black"
                              : "text-blue-500"
                          }`}
                          icon={faCube}
                        />
                        <span className="ms-3">Dashboard</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/informasi"
                        className={`${
                          isActive(["/admin/informasi"])
                            ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                            : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                        } flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group`}
                      >
                        <FontAwesomeIcon
                          className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                            isActive(["/admin/informasi"])
                              ? "text-white hover:text-black"
                              : "text-blue-500"
                          }`}
                          icon={faExclamation}
                        />
                        <span className="ms-3">Pengumuman</span>
                      </Link>
                    </li>
                    {/* // <!-- Dropdown Master Data --> */}
                    <li>
                      <button
                        type="button"
                        className="flex items-center w-full p-2 text-base text-blue-900 transition duration-75 rounded-lg group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                        // aria-controls="dropdown-masterdata"
                        // data-dropdown-toggle="dropdown-masterdata"
                        onClick={toggleMasterData}
                      >
                        <FontAwesomeIcon
                          className={`flex-shrink-0 w-5 h-5 transition duration-75 text-blue-500 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white
                    `}
                          icon={faDatabase}
                        />
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                          Master Data
                        </span>
                        <FontAwesomeIcon
                          icon={masterDataOpen ? faChevronUp : faChevronDown}
                          className="flex-shrink-0 w-4 h-4 text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        />
                      </button>
                      <ul
                        // id="dropdown-masterdata"
                        className={`${
                          masterDataOpen ? "" : "hidden" // Tampilkan atau sembunyikan dropdown berdasarkan state masterDataOpen
                        } py-2 space-y-2`}
                      >
                        <li>
                          <Link
                            to="/admin/ortu"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/ortu"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            {/* // className="flex items-center w-full p-2 text-blue-900
                          transition duration-75 rounded-lg pl-11 group
                          hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"> */}
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/ortu"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faHandsHoldingChild}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Orang Tua
                            </span>
                          </Link>
                        </li>

                        {/* <!-- Menu Jabatan --> */}
                        {/* <li>
                          <Link
                            to="/admin/jabatan"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/jabatan"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/jabatan"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faBriefcase}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Status
                            </span>
                          </Link>
                        </li> */}

                        {/* <!-- Menu Jam Sekolah --> */}
                        <li>
                          <Link
                            to="/admin/shift"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/shift"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/shift"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faBriefcase}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Waktu Pembelajaran
                            </span>
                          </Link>
                        </li>

                        {/* <!-- Menu Lokasi --> */}
                        <li>
                          <Link
                            to="/admin/lokasi"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/lokasi"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/lokasi"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faMapLocationDot}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Lokasi
                            </span>
                          </Link>
                        </li>

                        {/* <!-- Menu Organisasi --> */}
                        <li>
                          <Link
                            to="/admin/organisasi"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/organisasi"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/organisasi"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faBuilding}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Organisasi
                            </span>
                          </Link>
                        </li>
                        {/* <!-- Menu Kelas --> */}

                        <li>
                          <Link
                            to="/admin/kelas"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/kelas"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/kelas"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faSchool}
                            />
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Kelas
                            </span>
                          </Link>
                        </li>
                        {/* <!-- Menu Karyawan --> */}
                        <li>
                          <Link
                            to="/admin/siswa"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/siswa"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/siswa"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faUsersGear}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Siswa
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    {/* <!-- Dropdown Rekapan --> */}
                    <li>
                      <button
                        type="button"
                        className="flex items-center w-full p-2 text-base text-blue-900 transition duration-75 rounded-lg group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                        // aria-controls="dropdown-example"
                        // data-collapse-toggle="dropdown-example"
                        onClick={toggleRekapan}
                      >
                        <FontAwesomeIcon
                          className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white text-blue-500`}
                          icon={faSignal}
                        />
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                          Rekapan
                        </span>
                        <FontAwesomeIcon
                          icon={rekapanOpen ? faChevronUp : faChevronDown}
                          className="flex-shrink-0 w-4 h-4 text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        />
                      </button>

                      <ul
                        // id="dropdown-masterdata"
                        className={`${
                          rekapanOpen ? "" : "hidden" // Tampilkan atau sembunyikan dropdown berdasarkan state masterDataOpen
                        } py-2 space-y-2`}
                      >
                        {/* <!-- Menu Simpel --> */}
                        <li>
                          <Link
                            to="/admin/simpel"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/simpel"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/simpel"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faUserGear}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Simpel
                            </span>
                          </Link>
                        </li>
                        {/* <!-- Menu PerKaryawan --> */}
                        {/* <li>
                    <Link
                      to="/admin/persiswa"
                      className={`${
                        isActive(["/admin/persiswa"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                          : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                      } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/admin/persiswa"])
                            ? "text-white hover:text-black"
                            : "text-blue-500"
                        }`}
                        icon={faUserPen}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Persiswa
                      </span>
                    </Link>
                  </li> */}
                        {/* <!-- Menu Perkelas --> */}

                        <li>
                          <Link
                            to="/admin/perkelas"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/perkelas"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/perkelas"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faUsers}
                            />
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Kelas
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/harian/perkelas"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/harian/perkelas"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/harian/perkelas"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faCalendarDay}
                            />
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Harian
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/mingguan/perkelas"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/mingguan/perkelas"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/mingguan/perkelas"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faCalendarWeek}
                            />
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Mingguan
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/bulanan/perkelas"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/bulanan/perkelas"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/bulanan/perkelas"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faCalendar}
                            />
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Bulanan
                            </span>
                          </Link>
                        </li>
                        {/* <li>
                    <button
                      type="button"
                      onClick={toggleRekapanPerkelas}
                      className="flex gap-3 w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700">
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-0 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white text-blue-500`}
                        icon={faUsers}
                      />{" "}
                      <span className="flex-1 whitespace-nowrap">Perkelas</span>
                      <FontAwesomeIcon
                        icon={rekapanOpenPerkelas ? faChevronUp : faChevronDown}
                        className="flex-shrink-0 w-4 h-4 text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                      />
                    </button>
                    <ul
                      className={`${
                        rekapanOpenPerkelas ? "" : "hidden" // Tampilkan atau sembunyikan dropdown berdasarkan state masterDataOpen
                      } py-2 space-y-2`}>
                    </ul>
                  </li> */}
                        {/* <!-- Menu Harian --> */}
                        {/* <li>
                    <Link
                      to="/admin/harian"
                      className={`${
                        isActive(["/admin/harian"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                          : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                      } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/admin/harian"])
                            ? "text-white hover:text-black"
                            : "text-blue-500"
                        }`}
                        icon={faCalendarDay}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Harian
                      </span>
                    </Link>
                  </li> */}
                        {/* <!-- Menu Mingguan --> */}
                        {/* <li>
                    <Link
                      to="/admin/mingguan"
                      className={`${
                        isActive(["/admin/mingguan"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                          : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                      } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/admin/mingguan"])
                            ? "text-white hover:text-black"
                            : "text-blue-500"
                        }`}
                        icon={faCalendarWeek}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Mingguan
                      </span>
                    </Link>
                  </li> */}
                        {/* <!-- Menu Bulanan --> */}
                        {/* <li>
                    <Link
                      to="/admin/bulanan"
                      className={`${
                        isActive(["/admin/bulanan"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                          : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                      } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/admin/bulanan"])
                            ? "text-white hover:text-black"
                            : "text-blue-500"
                        }`}
                        icon={faCalendar}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Bulanan
                      </span>
                    </Link>
                  </li> */}
                      </ul>
                    </li>

                    {/* // <!-- Dropdown Absen --> */}
                    <li>
                      <button
                        type="button"
                        className="flex items-center w-full p-2 text-base text-blue-900 transition duration-75 rounded-lg group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                        // aria-controls="dropdown-data"
                        // data-collapse-toggle="dropdown-data"
                        onClick={toggleAbsen}
                      >
                        <FontAwesomeIcon
                          className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white text-blue-500`}
                          icon={faTable}
                        />
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                          Data Presensi
                        </span>
                        <FontAwesomeIcon
                          icon={absenOpen ? faChevronUp : faChevronDown}
                          className="flex-shrink-0 w-4 h-4 text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        />
                      </button>

                      <ul
                        id="dropdown-masterdata"
                        className={`${
                          absenOpen ? "" : "hidden" // Tampilkan atau sembunyikan dropdown berdasarkan state masterDataOpen
                        } py-2 space-y-2`}
                      >
                        {/* <!-- Menu Absensi --> */}
                        <li>
                          <Link
                            to="/admin/absensi"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/absensi"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/absensi"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faAddressCard}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Presensi
                            </span>
                          </Link>
                        </li>
                        {/* <!-- Menu Cuti --> */}
                        {/* <li>
                    <Link
                      to="/admin/cuti"
                      className={`${
                    isActive(["/superadmin/dashboard"])
                      ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                      : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                  } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}
                    >
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${isActive(["/superadmin/admin"]) ? "" : "text-whitetext-blue-500"}`}
                        icon={faCalendarDays}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Cuti
                      </span>
                    </Link>
                  </li> */}
                        {/* <!-- Menu Kehadiran --> */}
                        <li>
                          <Link
                            to="/admin/kehadiran"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/kehadiran"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/kehadiran"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faUserCheck}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Kehadiran
                            </span>
                          </Link>

                          <ul
                            // id="dropdown-masterdata"
                            className={`${
                              rekapanOpen ? "" : "hidden" // Tampilkan atau sembunyikan dropdown berdasarkan state masterDataOpen
                            } py-2 space-y-2`}
                          >
                            {/* <!-- Menu Simpel --> */}
                            <li>
                              <Link
                                to="/admin/master-data"
                                className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                                  isActive(["/admin/master-data"])
                                    ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                    : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                                }
                                }`}
                              ></Link>
                            </li>
                            {/* <!-- Menu Rekapan --> */}
                            <li>
                              <Link
                                to="/admin/rekapann"
                                className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                                  isActive(["/admin/rekapann"])
                                    ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                    : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                                }
                                }`}
                              ></Link>
                            </li>
                            {/* <!-- Menu Perkelas --> */}
                            <li>
                              <Link
                                to="/admin/rekapann/perkelas"
                                className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                                  isActive(["/admin/rekapann/perkelas"])
                                    ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                    : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                                }
                                }`}
                              ></Link>
                            </li>
                            {/* <!-- Menu Presensi --> */}
                            <li>
                              <Link
                                to="/admin/data-cuti"
                                className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                                  isActive(["/admin/data-cuti"])
                                    ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                    : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                                }
                                }`}
                              ></Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    {/* <!-- Menu Mingguan --> */}
                    {/* <li>
                    <Link
                      to="/admin/lembur"
                      className={`${
                    isActive(["/superadmin/dashboard"])
                      ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                      : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                  } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}
                    >
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${isActive(["/superadmin/admin"]) ? "" : "text-whitetext-blue-500"}`}
                        icon={faBusinessTime}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Lembur
                      </span>
                    </Link>
                  </li> */}
                  </ul>
                )}
                {role === "USER" && (
                  <ul>
                    {" "}
                    <li>
                      <Link
                        to="/user/dashboard"
                        className={`${
                          isActive(["/user/dashboard"])
                            ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                            : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                        } flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group`}
                      >
                        <FontAwesomeIcon
                          className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                            isActive(["/user/dashboard"])
                              ? "text-white hover:text-black"
                              : "text-blue-500"
                          }`}
                          icon={faCube}
                        />
                        <span className="ms-3">Dashboard</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/user/history_absen"
                        className={`${
                          isActive(["/user/history_absen"])
                            ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                            : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                        } flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group`}
                      >
                        <FontAwesomeIcon
                          className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                            isActive(["/user/history_absen"])
                              ? "text-white hover:text-black"
                              : "text-blue-500"
                          }`}
                          icon={faClock}
                        />
                        <span className="ms-3">Presensi</span>
                      </Link>
                    </li>
                    {/* <li>
                      <a
                        href="/user/history_cuti"
                        className="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group"
                      >
                        <FontAwesomeIcon
                          className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                          icon={faCalendarDays}
                        />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Cuti
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/user/history_lembur"
                        className="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group"
                      >
                        <FontAwesomeIcon
                          className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                          icon={faBusinessTime}
                        />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Lembur
                        </span>
                      </a>
                    </li> */}
                  </ul>
                )}
                {role === "SUPERADMIN" && (
                  <ul>
                    <li>
                      <Link
                        to="/superadmin/dashboard"
                        className={`flex items-center p-2 rounded-lg ${
                          isActive(["/superadmin/dashboard"])
                            ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                            : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                        }`}
                      >
                        <FontAwesomeIcon
                          className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                            isActive(["/superadmin/dashboard"])
                              ? "text-white hover:text-black"
                              : "text-blue-500"
                          }`}
                          icon={faCube}
                        />
                        <span className="ms-3">Dashboard</span>
                      </Link>
                    </li>
                    {/* <!-- Menu Admin --> */}
                    <li>
                      <Link
                        to="/superadmin/admin"
                        className={`flex items-center p-2 rounded-lg ${
                          isActive(["/superadmin/admin"])
                            ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                            : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                        }`}
                      >
                        <FontAwesomeIcon
                          className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                            isActive(["/superadmin/admin"])
                              ? "text-white hover:text-black"
                              : "text-blue-500"
                          }`}
                          icon={faChalkboardUser}
                        />
                        <span className="ms-3">Admin</span>
                      </Link>
                    </li>
                    {/* <!-- Dropdown user --> */}
                    {/* <li> */}
                    {/* <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-blue-900 transition duration-75 rounded-lg group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                  // aria-controls="dropdown-example"
                  // data-collapse-toggle="dropdown-example"
                  onClick={toggleRekapan}>
                  <FontAwesomeIcon
                    className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white text-blue-500`}
                    icon={faUserPlus}
                  />
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Data User
                  </span>
                  <FontAwesomeIcon
                    icon={rekapanOpen ? faChevronUp : faChevronDown}
                    className="flex-shrink-0 w-4 h-4 text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                  />
                </button> */}

                    {/* <ul
                  // id="dropdown-masterdata"
                  className={`${
                    rekapanOpen ? "" : "hidden" // Tampilkan atau sembunyikan dropdown berdasarkan state masterDataOpen
                  } py-2 space-y-2`}> */}
                    {/* <!-- Menu Simpel --> */}
                    {/* <li>
                    <Link
                      to="/superadmin/data-user"
                      className={`flex items-center p-2 rounded-lg  ml-9 pl-3 ${
                        isActive(["/superadmin/data-user"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                          : "text-blue-900 transition duration-75group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                      }`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/superadmin/data-user"])
                            ? "text-white hover:text-black"
                            : "text-blue-500"
                        }`}
                        icon={faUsers}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        User
                      </span>
                    </Link>
                  </li> */}
                    {/* </ul> */}
                    {/* </li> */}
                  </ul>
                )}
                {/* <li>
            <Link
              to="/login"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              className={`${
                    isActive(["/superadmin/dashboard"])
                      ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                      : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                  } flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group`}
            >
              <FontAwesomeIcon
                className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${isActive(["/superadmin/admin"]) ? "text-white hover:text-black" : "text-blue-500"}`}
                icon={faArrowRightFromBracket}
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
            </Link>
          </li> */}
              </ul>
            </nav>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default SidebarNavbar;
