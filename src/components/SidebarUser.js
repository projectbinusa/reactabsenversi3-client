import {
  faAddressCard,
  faArrowRightFromBracket,
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
  faKey,
  faLandmark,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";

const Sidebar = () => {
  const role = localStorage.getItem("role");
  // State untuk mengelola status dropdown
  const [masterDataOpen, setMasterDataOpen] = useState(false);
  const [rekapanOpen, setRekapanOpen] = useState(false);
  const [rekapanOpenPerkelas, setRekapanOpenPerkelas] = useState(false);
  const [absenOpen, setAbsenOpen] = useState(false);
  const location = useLocation();
  const isActive = (paths) => {
    return paths.some((path) => location.pathname.startsWith(path));
  };

  useEffect(() => {
    // Check if any link inside dropdown is active and open the dropdown if it is
    const isActive = (paths) => {
      return paths.some((path) => location.pathname.startsWith(path));
    };

    if (
      isActive([
        "/admin/simpel",
        "/admin/perkaryawan",
        "/admin/harian",
        "/admin/mingguan",
        "/admin/bulanan",
        "/superadmin/data-user",
        "/superadmin/absensi",
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
      return paths.some((path) => location.pathname.startsWith(path));
    };

    if (isActive(["/admin/absensi", "/admin/kehadiran"])) {
      setAbsenOpen(true);
    } else {
      setAbsenOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Check if any link inside dropdown is active and open the dropdown if it is
    const isActive = (paths) => {
      return paths.some((path) => location.pathname.startsWith(path));
    };

    if (
      isActive([
        "/admin/perkelas",
        "/admin/harian/perkelas",
        "/admin/mingguan/perkelas",
        "/admin/bulanan/perkelas",
      ])
    ) {
      setRekapanOpenPerkelas(true);
    } else {
      setRekapanOpenPerkelas(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Check if any link inside dropdown is active and open the dropdown if it is
    const isActive = (paths) => {
      return paths.some((path) => location.pathname.startsWith(path));
    };

    if (
      isActive([
        "/admin/karyawan",
        "/admin/jabatan",
        "/admin/shift",
        "/admin/lokasi",
        "/admin/organisasi",
        "/admin/kelas",
        "/superadmin/admin",
        "/superadmin/ortu",
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

  const toggleRekapanPerkelas = () => {
    setRekapanOpenPerkelas(!rekapanOpenPerkelas);
  };

  // Fungsi untuk menampilkan atau menyembunyikan dropdown absen
  const toggleAbsen = () => {
    setAbsenOpen(!absenOpen);
  };

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-72 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-blue-200 sm:translate-x-0 dark:bg-blue-800 dark:border-blue-700"
      aria-label="Sidebar">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-blue-800">
        <ul className="space-y-2 font-medium">
          {role === "ADMIN" && (
            <ul>
              <li>
                <Link
                  to="/admin/dashboard"
                  className={`${
                    isActive(["/admin/dashboard"])
                      ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                      : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                  } flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group`}>
                  <FontAwesomeIcon
                    className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                      isActive(["/admin/dashboard"])
                        ? "text-white"
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
                      ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                      : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                  } flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group`}>
                  <FontAwesomeIcon
                    className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                      isActive(["/admin/informasi"])
                        ? "text-white"
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
                  onClick={toggleMasterData}>
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
                  } py-2 space-y-2`}>
                  {/* <!-- Menu Karyawan --> */}
                  <li>
                    <Link
                      to="/admin/karyawan"
                      className={`${
                        isActive(["/admin/karyawan"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                          : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                      } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/admin/karyawan"])
                            ? "text-white"
                            : "text-blue-500"
                        }`}
                        icon={faUsersGear}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Siswa
                      </span>
                    </Link>
                  </li>

                  {/* <!-- Menu Jabatan --> */}
                  <li>
                    <Link
                      to="/admin/jabatan"
                      className={`${
                        isActive(["/admin/jabatan"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                          : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                      } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/admin/jabatan"])
                            ? "text-white"
                            : "text-blue-500"
                        }`}
                        icon={faBriefcase}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Jabatan
                      </span>
                    </Link>
                  </li>

                  {/* <!-- Menu Jam Kerja --> */}
                  <li>
                    <Link
                      to="/admin/shift"
                      className={`${
                        isActive(["/admin/shift"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                          : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                      } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/amdin/shift"])
                            ? "text-white"
                            : "text-blue-500"
                        }`}
                        icon={faBusinessTime}
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
                      className={`${
                        isActive(["/admin/lokasi"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                          : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                      } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/admin/lokasi"])
                            ? "text-white"
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
                      className={`${
                        isActive(["/admin/organisasi"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                          : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                      } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/admin/organisasi"])
                            ? "text-white"
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
                      className={`${
                        isActive(["/admin/kelas"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                          : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                      } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/admin/kelas"])
                            ? "text-white"
                            : "text-blue-500"
                        }`}
                        icon={faSchool}
                      />
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Kelas
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
                  onClick={toggleRekapan}>
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
                  } py-2 space-y-2`}>
                  {/* <!-- Menu Simpel --> */}
                  <li>
                    <Link
                      to="/admin/simpel"
                      className={`${
                        isActive(["/admin/simpel"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                          : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                      } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/admin/simpel"])
                            ? "text-white"
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
                  <li>
                    <Link
                      to="/admin/perkaryawan"
                      className={`${
                        isActive(["/admin/perkaryawan"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                          : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                      } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/admin/perkaryawan"])
                            ? "text-white"
                            : "text-blue-500"
                        }`}
                        icon={faUserPen}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Perkaryawan
                      </span>
                    </Link>
                  </li>
                  {/* <!-- Menu Perkelas --> */}
                  <li>
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
                      <li>
                        <Link
                          to="/admin/perkelas"
                          className={`${
                            isActive(["/admin/perkelas"])
                              ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                              : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                          } flex ml-3 items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 `}>
                          <FontAwesomeIcon
                            className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                              isActive(["/admin/perkelas"])
                                ? "text-white"
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
                          className={`${
                            isActive(["/admin/harian/perkelas"])
                              ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                              : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                          } flex ml-3 items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 `}>
                          <FontAwesomeIcon
                            className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                              isActive(["/admin/harian/perkelas"])
                                ? "text-white"
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
                          className={`${
                            isActive(["/admin/mingguan/perkelas"])
                              ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                              : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                          } flex ml-3 items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 `}>
                          <FontAwesomeIcon
                            className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                              isActive(["/admin/mingguan/perkelas"])
                                ? "text-white"
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
                          className={`flex ml-3 items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 ${
                            isActive(["/admin/bulanan/perkelas"])
                              ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                              : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                          }`}>
                          <FontAwesomeIcon
                            className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                              isActive(["/admin/bulanan/perkelas"])
                                ? "text-white"
                                : "text-blue-500"
                            }`}
                            icon={faCalendar}
                          />
                          <span className="flex-1 ml-3 whitespace-nowrap">
                            Bulanan
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* <!-- Menu Harian --> */}
                  <li>
                    <Link
                      to="/admin/harian"
                      className={`${
                        isActive(["/admin/harian"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                          : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                      } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/admin/harian"])
                            ? "text-white"
                            : "text-blue-500"
                        }`}
                        icon={faCalendarDay}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Harian
                      </span>
                    </Link>
                  </li>
                  {/* <!-- Menu Mingguan --> */}
                  <li>
                    <Link
                      to="/admin/mingguan"
                      className={`${
                        isActive(["/admin/mingguan"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                          : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                      } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/admin/mingguan"])
                            ? "text-white"
                            : "text-blue-500"
                        }`}
                        icon={faCalendarWeek}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Mingguan
                      </span>
                    </Link>
                  </li>
                  {/* <!-- Menu Bulanan --> */}
                  <li>
                    <Link
                      to="/admin/bulanan"
                      className={`${
                        isActive(["/admin/bulanan"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                          : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                      } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/admin/bulanan"])
                            ? "text-white"
                            : "text-blue-500"
                        }`}
                        icon={faCalendar}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Bulanan
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>

              {/* // <!-- Dropdown Absen --> */}
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-blue-900 transition duration-75 rounded-lg group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                  // aria-controls="dropdown-data"
                  // data-collapse-toggle="dropdown-data"
                  onClick={toggleAbsen}>
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
                  } py-2 space-y-2`}>
                  {/* <!-- Menu Absensi --> */}
                  <li>
                    <Link
                      to="/admin/absensi"
                      className={`${
                        isActive(["/admin/absensi"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                          : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                      } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/admin/absensi"])
                            ? "text-white"
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
                      ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                      : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
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
                      className={`${
                        isActive(["/admin/kehadiran"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                          : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                      } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/admin/kehadiran"])
                            ? "text-white"
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
                      } py-2 space-y-2`}>
                      {/* <!-- Menu Simpel --> */}
                      <li>
                        <Link
                          to="/admin/master-data"
                          className={`flex items-center p-2 rounded-lg  ml-9 pl-3 ${
                            isActive(["/admin/master-data"])
                              ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                              : "text-blue-900 transition duration-75group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                          }`}></Link>
                      </li>
                      {/* <!-- Menu Rekapan --> */}
                      <li>
                        <Link
                          to="/admin/rekapann"
                          className={`flex items-center p-2 rounded-lg  ml-9 pl-3 ${
                            isActive(["/admin/rekapann"])
                              ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                              : "text-blue-900 transition duration-75group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                          }`}></Link>
                      </li>
                      {/* <!-- Menu Perkelas --> */}
                      <li>
                        <Link
                          to="/admin/rekapann/perkelas"
                          className={`flex items-center p-2 rounded-lg  ml-9 pl-3 ${
                            isActive(["/admin/rekapann/perkelas"])
                              ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                              : "text-blue-900 transition duration-75group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                          }`}></Link>
                      </li>
                      {/* <!-- Menu Presensi --> */}
                      <li>
                        <Link
                          to="/admin/data-cuti"
                          className={`flex items-center p-2 rounded-lg  ml-9 pl-3 ${
                            isActive(["/admin/data-cuti"])
                              ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                              : "text-blue-900 transition duration-75group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                          }`}></Link>
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
                      ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                      : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
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
                      ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                      : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                  } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}>
                  <FontAwesomeIcon
                    className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                      isActive(["/user/dashboard"])
                        ? "text-white"
                        : "text-blue-500"
                    }`}
                    icon={faUserCheck}
                  />{" "}
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Kehadiran
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/user/history_absen"
                  className={`${
                    isActive(["/user/history_absen"])
                      ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                      : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                  } flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group`}>
                  <FontAwesomeIcon
                    className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                      isActive(["/user/history_absen"])
                        ? "text-white"
                        : "text-blue-500"
                    }`}
                    icon={faClock}
                  />
                  <span className="flex-1 ms-3 whitespace-nowrap ">
                    Presensi
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/user/history_cuti"
                  className={`${
                    isActive(["/user/history_cuti"])
                      ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                      : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                  } flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group`}>
                  <FontAwesomeIcon
                    className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                      isActive(["/user/history_cuti"])
                        ? "text-white"
                        : "text-blue-500"
                    }`}
                    icon={faCalendarDays}
                  />
                  <span className="flex-1 ms-3 whitespace-nowrap">Cuti</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/user/history_lembur"
                  className={`${
                    isActive(["/user/history_lembur"])
                      ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                      : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                  } flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group`}>
                  <FontAwesomeIcon
                    className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                      isActive(["/user/history_lembur"])
                        ? "text-white"
                        : "text-blue-500"
                    }`}
                    icon={faBusinessTime}
                  />
                  <span className="flex-1 ms-3 whitespace-nowrap">Lembur</span>
                </Link>
              </li>
            </ul>
          )}
          {role === "SUPERADMIN" && (
            <ul>
              <li>
                <Link
                  to="/superadmin/dashboard"
                  className={`flex items-center p-2 rounded-lg ${
                    isActive(["/superadmin/dashboard"])
                      ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                      : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                  }`}>
                  <FontAwesomeIcon
                    className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                      isActive(["/superadmin/dashboard"])
                        ? "text-white"
                        : "text-blue-500"
                    }`}
                    icon={faCube}
                  />
                  <span className="ms-3">Dashboard</span>
                </Link>
              </li>
              {/* // <!-- Dropdown Master Data --> */}
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-blue-900 transition duration-75 rounded-lg group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                  // aria-controls="dropdown-masterdata"
                  // data-dropdown-toggle="dropdown-masterdata"
                  onClick={toggleMasterData}>
                  <FontAwesomeIcon
                    className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white text-blue-500`}
                    icon={faUserTie}
                  />
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Data Admin
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
                  } py-2 space-y-2`}>
                  {/* <!-- Menu superadmin --> */}
                  <li>
                    <Link
                      to="/superadmin/admin"
                      className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                        isActive(["/superadmin/admin"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                          : "text-blue-900 transition duration-75group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                      }`}>
                      {/* // className="flex items-center w-full p-2 text-blue-900
                      transition duration-75 rounded-lg pl-11 group
                      hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"> */}
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/superadmin/admin"])
                            ? ""
                            : "text-whitetext-blue-500"
                        }`}
                        icon={faChalkboardUser}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Admin
                      </span>
                    </Link>
                  </li>
                  {/* ortu */}
                  <li>
                    <Link
                      to="/superadmin/ortu"
                      className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                        isActive(["/superadmin/ortu"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                          : "text-blue-900 transition duration-75group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                      }`}>
                      {/* // className="flex items-center w-full p-2 text-blue-900
                      transition duration-75 rounded-lg pl-11 group
                      hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"> */}
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/superadmin/ortu"])
                            ? ""
                            : "text-whitetext-blue-500"
                        }`}
                        icon={faHandsHoldingChild}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Orang Tua
                      </span>
                    </Link>
                  </li>
                  {/* <!-- Menu Organisasi --> */}
                  <li>
                    <Link
                      to="/superadmin/organisasi"
                      className={`flex items-center p-2 rounded-lg  ml-9 pl-3 ${
                        isActive(["/superadmin/organisasi"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                          : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                      }`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/superadmin/organisasi"])
                            ? "text-white"
                            : "text-blue-500"
                        }`}
                        icon={faBuilding}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Organisasi
                      </span>
                    </Link>
                  </li>
                  {/* <!-- Menu Jabatan --> */}
                  <li>
                    <Link
                      to="/superadmin/jabatan"
                      className={`flex items-center p-2 rounded-lg ml-9 pl-3   ${
                        isActive(["/superadmin/jabatan"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                          : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                      }`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/superadmin/jabatan"])
                            ? "text-white"
                            : "text-blue-500"
                        }`}
                        icon={faBriefcase}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Jabatan
                      </span>
                    </Link>
                  </li>

                  {/* <!-- Menu Jam Kerja --> */}
                  <li>
                    <Link
                      to="/superadmin/shift"
                      className={`flex items-center p-2 rounded-lg ml-9 pl-3   ${
                        isActive(["/superadmin/shift"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                          : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                      }`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/superadmin/shift"])
                            ? "text-white"
                            : "text-blue-500"
                        }`}
                        icon={faBusinessTime}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Waktu Pembelajaran
                      </span>
                    </Link>
                  </li>

                  {/* <!-- Menu Lokasi --> */}
                  <li>
                    <Link
                      to="/superadmin/lokasi"
                      className={`flex items-center p-2 rounded-lg ml-9 pl-3  ${
                        isActive(["/superadmin/lokasi"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                          : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                      }`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/superadmin/lokasi"])
                            ? "text-white"
                            : "text-blue-500"
                        }`}
                        icon={faMapLocationDot}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Lokasi
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>
              {/* <!-- Dropdown user --> */}
              <li>
                <button
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
                </button>

                <ul
                  // id="dropdown-masterdata"
                  className={`${
                    rekapanOpen ? "" : "hidden" // Tampilkan atau sembunyikan dropdown berdasarkan state masterDataOpen
                  } py-2 space-y-2`}>
                  {/* <!-- Menu Simpel --> */}
                  <li>
                    <Link
                      to="/superadmin/data-user"
                      className={`flex items-center p-2 rounded-lg  ml-9 pl-3 ${
                        isActive(["/superadmin/data-user"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                          : "text-blue-900 transition duration-75group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                      }`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/superadmin/data-user"])
                            ? "text-white"
                            : "text-blue-500"
                        }`}
                        icon={faUsers}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        User
                      </span>
                    </Link>
                  </li>
                  {/* <!-- Menu PerKaryawan --> */}
                  <li>
                    <Link
                      to="/superadmin/absensi"
                      className={`flex items-center p-2 rounded-lg  ml-9 pl-3 ${
                        isActive(["/superadmin/absensi"])
                          ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                          : "text-blue-900 transition duration-75group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                      }`}>
                      <FontAwesomeIcon
                        className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                          isActive(["/superadmin/absensi"])
                            ? "text-white"
                            : "text-blue-500"
                        }`}
                        icon={faAddressCard}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Presensi
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          )}
          {/* <li>
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              className={`${
                    isActive(["/superadmin/dashboard"])
                      ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white"
                      : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white"
                  } flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group`}
            >
              <FontAwesomeIcon
                className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${isActive(["/superadmin/admin"]) ? "text-white" : "text-blue-500"}`}
                icon={faArrowRightFromBracket}
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
            </Link>
          </li> */}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
