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
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const role = localStorage.getItem("role");
  // State untuk mengelola status dropdown
  const [masterDataOpen, setMasterDataOpen] = useState(false);
  const [rekapanOpen, setRekapanOpen] = useState(false);
  const [rekapanOpenPerkelas, setRekapanOpenPerkelas] = useState(false);
  const [absenOpen, setAbsenOpen] = useState(false);
  const location = useLocation();

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

  // Fungsi untuk memeriksa apakah URL saat ini cocok dengan href
  const isActive = (path) => location.pathname === path;

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-blue-200 sm:translate-x-0 dark:bg-blue-800 dark:border-blue-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-blue-800">
        <ul className="space-y-2 font-medium">
          {role === "ADMIN" && (
            <ul>
              <li>
                <a
                  href="/admin/dashboard"
                  className={`flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group ${
                    isActive("/admin/dashboard")
                      ? "bg-blue-100 dark:bg-blue-700"
                      : ""
                  }`}
                >
                  <FontAwesomeIcon
                    className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                    icon={faCube}
                  />
                  <span className="ms-3">Dashboard</span>
                </a>
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
                    className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
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
                  {/* <!-- Menu Karyawan --> */}
                  <li>
                    <a
                      href="/admin/karyawan"
                      className={`flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 ${
                        isActive("/admin/karyawan")
                          ? "bg-blue-100 dark:bg-blue-700"
                          : ""
                      }`}
                    >
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faUsersGear}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Siswa
                      </span>
                    </a>
                  </li>

                  {/* <!-- Menu Jabatan --> */}
                  <li>
                    <a
                      href="/admin/jabatan"
                      className={`flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 ${
                        isActive("/admin/jabatan")
                          ? "bg-blue-100 dark:bg-blue-700"
                          : ""
                      }`}
                    >
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faBriefcase}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Jabatan
                      </span>
                    </a>
                  </li>

                  {/* <!-- Menu Jam Kerja --> */}
                  <li>
                    <a
                      href="/admin/shift"
                      className={`flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 ${
                        isActive("/admin/shift")
                          ? "bg-blue-100 dark:bg-blue-700"
                          : ""
                      }`}
                    >
                      {" "}
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faBusinessTime}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Waktu Pembelajaran
                      </span>
                    </a>
                  </li>

                  {/* <!-- Menu Lokasi --> */}
                  <li>
                    <a
                      href="/admin/lokasi"
                      className={`flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 ${
                        isActive("/admin/lokasi")
                          ? "bg-blue-100 dark:bg-blue-700"
                          : ""
                      }`}
                    >
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faMapLocationDot}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Lokasi
                      </span>
                    </a>
                  </li>

                  {/* <!-- Menu Organisasi --> */}
                  <li>
                    <a
                      href="/admin/organisasi"
                      className={`flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 ${
                        isActive("/admin/organisasi")
                          ? "bg-blue-100 dark:bg-blue-700"
                          : ""
                      }`}
                    >
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faBuilding}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Organisasi
                      </span>
                    </a>
                  </li>
                  {/* <!-- Menu Kelas --> */}

                  <li>
                    <a
                      href="/admin/kelas"
                      className={`flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 ${
                        isActive("/admin/kelas")
                          ? "bg-blue-100 dark:bg-blue-700"
                          : ""
                      }`}
                    >
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faSchool}
                      />
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Kelas
                      </span>
                    </a>
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
                    className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
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
                    <a
                      href="/admin/simpel"
                      className={`flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 ${isActive('/admin/simpel') ? 'bg-blue-100 dark:bg-blue-700' : ''}`}>
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faUserGear}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Simpel
                      </span>
                    </a>
                  </li>
                  {/* <!-- Menu PerKaryawan --> */}
                  <li>
                    <a
                      href="/admin/perkaryawan"
                      className={`flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 ${isActive('/admin/perkaryawan') ? 'bg-blue-100 dark:bg-blue-700' : ''}`}>
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faUserPen}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Perkaryawan
                      </span>
                    </a>
                  </li>
                  {/* <!-- Menu Perkelas --> */}
                  {/* <li> */}
                  <button
                    type="button"
                    onClick={toggleRekapanPerkelas}
                    className="flex gap-3 w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                  >
                    <FontAwesomeIcon
                      className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                      icon={faLandmark}
                    />{" "}
                    <span className="flex-1 whitespace-nowrap">Perkelas</span>
                    <FontAwesomeIcon
                      icon={rekapanOpenPerkelas ? faChevronUp : faChevronDown}
                      className="flex-shrink-0 w-4 h-4 text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                    />
                  </button>
                  {/* </li> */}
                  <ul
                    className={`${
                      rekapanOpenPerkelas ? "" : "hidden" // Tampilkan atau sembunyikan dropdown berdasarkan state masterDataOpen
                    } py-2 space-y-2`}
                  >
                    <li>
                      <a
                        href="/admin/perkelas"
                        className={`flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 ${isActive('/admin/perkelas') ? 'bg-blue-100 dark:bg-blue-700' : ''}`}>
                        <FontAwesomeIcon
                          className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                          icon={faUsers}
                        />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                          Kelas
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/harian/perkelas"
                        className={`flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 ${isActive('/admin/harian/perkelas') ? 'bg-blue-100 dark:bg-blue-700' : ''}`}>
                        <FontAwesomeIcon
                          className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                          icon={faCalendarDay}
                        />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                          Harian
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/mingguan/perkelas"
                        className={`flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 ${isActive('/admin/mingguan/perkelas') ? 'bg-blue-100 dark:bg-blue-700' : ''}`}>
                        <FontAwesomeIcon
                          className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                          icon={faCalendarWeek}
                        />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                          Mingguan
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/bulanan/perkelas"
                        className={`flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 ${isActive('/admin/bulanan/perkelas') ? 'bg-blue-100 dark:bg-blue-700' : ''}`}>
                        <FontAwesomeIcon
                          className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                          icon={faCalendar}
                        />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                          Bulanan
                        </span>
                      </a>
                    </li>
                  </ul>
                  {/* <!-- Menu Harian --> */}
                  <li>
                    <a
                      href="/admin/harian"
                      className={`flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 ${isActive('/admin/harian') ? 'bg-blue-100 dark:bg-blue-700' : ''}`}>
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faCalendarDay}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Harian
                      </span>
                    </a>
                  </li>
                  {/* <!-- Menu Mingguan --> */}
                  <li>
                    <a
                      href="/admin/mingguan"
                      className={`flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 ${isActive('/admin/mingguan') ? 'bg-blue-100 dark:bg-blue-700' : ''}`}>
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faCalendarWeek}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Mingguan
                      </span>
                    </a>
                  </li>
                  {/* <!-- Menu Bulanan --> */}
                  <li>
                    <a
                      href="/admin/bulanan"
                      className={`flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 ${isActive('/admin/bulanan') ? 'bg-blue-100 dark:bg-blue-700' : ''}`}>
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faCalendar}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Bulanan
                      </span>
                    </a>
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
                  onClick={toggleAbsen}
                >
                  <FontAwesomeIcon
                    className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
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
                    <a
                      href="/admin/absensi"
                      className={`flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 ${isActive('/admin/absensi') ? 'bg-blue-100 dark:bg-blue-700' : ''}`}>
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faAddressCard}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Presensi
                      </span>
                    </a>
                  </li>
                  {/* <!-- Menu Cuti --> */}
                  {/* <li>
                    <a
                      href="/admin/cuti"
                      className="flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                    >
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faCalendarDays}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Cuti
                      </span>
                    </a>
                  </li> */}
                  {/* <!-- Menu Kehadiran --> */}
                  <li>
                    <a
                      href="/admin/kehadiran"
                      className={`flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 ${isActive('/admin/kehadiran') ? 'bg-blue-100 dark:bg-blue-700' : ''}`}>
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faUserCheck}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Kehadiran
                      </span>
                    </a>
                  </li>
                  {/* <!-- Menu Mingguan --> */}
                  {/* <li>
                    <a
                      href="/admin/lembur"
                      className="flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                    >
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faBusinessTime}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Lembur
                      </span>
                    </a>
                  </li> */}
                </ul>
              </li>
            </ul>
          )}
          {role === "USER" && (
            <ul>
              {" "}
              <li>
                <a
                  href="/user/dashboard"
                  className="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group"
                >
                  <FontAwesomeIcon
                    className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                    icon={faCube}
                  />
                  <span className="ms-3">Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="/user/history_absen"
                  className={`flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700 ${isActive('/user/history_absen') ? 'bg-blue-100 dark:bg-blue-700' : ''}`}>
                  <FontAwesomeIcon
                    className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                    icon={faClock}
                  />
                  <span className="flex-1 ms-3 whitespace-nowrap ">
                    Presensi
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/user/history_cuti"
                  className="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group"
                >
                  <FontAwesomeIcon
                    className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                    icon={faCalendarDays}
                  />
                  <span className="flex-1 ms-3 whitespace-nowrap">Cuti</span>
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
                  <span className="flex-1 ms-3 whitespace-nowrap">Lembur</span>
                </a>
              </li>
            </ul>
          )}
          {role === "SUPERADMIN" && (
            <ul>
              <li>
                <a
                  href="/superadmin/dashboard"
                  className="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group"
                >
                  <FontAwesomeIcon
                    className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                    icon={faCube}
                  />
                  <span className="ms-3">Dashboard</span>
                </a>
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
                    className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
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
                  } py-2 space-y-2`}
                >
                  {/* <!-- Menu superadmin --> */}
                  <li>
                    <a
                      href="/superadmin/admin"
                      className="flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                    >
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faChalkboardUser}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Admin
                      </span>
                    </a>
                  </li>
                  {/* <!-- Menu Organisasi --> */}
                  <li>
                    <a
                      href="/superadmin/organisasi"
                      className="flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                    >
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faBuilding}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Organisasi
                      </span>
                    </a>
                  </li>
                  {/* <!-- Menu Jabatan --> */}
                  <li>
                    <a
                      href="/superadmin/jabatan"
                      className="flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                    >
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faBriefcase}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Jabatan
                      </span>
                    </a>
                  </li>

                  {/* <!-- Menu Jam Kerja --> */}
                  <li>
                    <a
                      href="/superadmin/shift"
                      className="flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                    >
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faBusinessTime}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Waktu Pembelajaran
                      </span>
                    </a>
                  </li>

                  {/* <!-- Menu Lokasi --> */}
                  <li>
                    <a
                      href="/superadmin/lokasi"
                      className="flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                    >
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faMapLocationDot}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Lokasi
                      </span>
                    </a>
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
                  onClick={toggleRekapan}
                >
                  <FontAwesomeIcon
                    className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
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
                  } py-2 space-y-2`}
                >
                  {/* <!-- Menu Simpel --> */}
                  <li>
                    <a
                      href="/superadmin/data-user"
                      className="flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                    >
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faUsers}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        User
                      </span>
                    </a>
                  </li>
                  {/* <!-- Menu PerKaryawan --> */}
                  <li>
                    <a
                      href="/superadmin/absensi"
                      className="flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                    >
                      <FontAwesomeIcon
                        className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        icon={faAddressCard}
                      />{" "}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Presensi
                      </span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          )}
          {/* <li>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              className="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group"
            >
              <FontAwesomeIcon
                className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                icon={faArrowRightFromBracket}
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
            </a>
          </li> */}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
