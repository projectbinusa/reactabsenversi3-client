import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/NavbarSuper";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faClipboardUser,
  faUser,
  faInfo,
  faCircleInfo,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../utils/api";
import { Pagination } from "flowbite-react";
import { Link } from "react-router-dom";

function DashboardOrtu() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [admin, setAdmin] = useState([]);
  const [idAdmin, setIdAdmin] = useState("");
  const [absensiData, setAbsensiData] = useState([]);
  const [username, setUsername] = useState("");
  const [terlambat, setTerlambat] = useState("");
  const [izinData, setIzinData] = useState("");
  const [informasi, setInformasi] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const id = localStorage.getItem("id_orangtua");
  const token = localStorage.getItem("token");
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const addLeadingZero = (num) => (num < 10 ? "0" + num : num);

  const day = currentDateTime.toLocaleDateString("id-ID", { weekday: "long" });
  const date = currentDateTime.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const time =
    addLeadingZero(currentDateTime.getHours()) +
    ":" +
    addLeadingZero(currentDateTime.getMinutes()) +
    ":" +
    addLeadingZero(currentDateTime.getSeconds());

  const getUsername = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/orang-tua/getbyid/${id}`,
         {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      setUsername(response.data.nama);
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  }, [id]);

  const getAbsensi = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/by-orang-tua/${id}`,
        {
         headers: {
           AuthPrs: `Bearer ${token}`,
         },
       }
      );
      setAbsensiData(response.data);

      setTerlambat(
        response.data.filter((trl) => trl.statusAbsen === "Terlambat")
      );

      setIzinData(
        response.data.filter(
          (trl) =>
            trl.statusAbsen === "Izin" || trl.statusAbsen === "Izin Tengah Hari"
        )
      );
    } catch (error) {
      console.error("Error fetching absensi:", error);
    }
  }, [id]);

  const getAdmin = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/orang-tua/${id}/admin`,
        {
         headers: {
           AuthPrs: `Bearer ${token}`,
         },
       }
      );
      setAdmin(response.data);
      setIdAdmin(response.data.id);
    } catch (error) {
      console.error("Error fetching admin:", error);
    }
  }, [id]);

  const getInformasi = useCallback(async () => {
    try {
      if (admin && admin.id) {
        const response = await axios.get(
          `${API_DUMMY}/api/notifications/user/getByAdmin/${idAdmin}`,
          {
           headers: {
             AuthPrs: `Bearer ${token}`,
           },
         }
        );
        setInformasi(response.data.reverse());
      }
    } catch (error) {
      console.error("Error fetching informasi:", error);
    }
  }, [admin, idAdmin]);

  const formatDate = (tanggal) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const isEventExpired = (eventDate) => {
    const today = new Date();
    const eventDateObj = new Date(eventDate);
    return eventDateObj < today;
  };

  const validInformasi = informasi.filter(
    (item) => !isEventExpired(item.tanggalAcara)
  );

  useEffect(() => {
    getAbsensi();
    getUsername();
    getAdmin();
  }, [getAbsensi, getUsername, getAdmin]);

  useEffect(() => {
    if (admin) {
      getInformasi();
    }
  }, [admin, getInformasi]);

  useEffect(() => {
    if (localStorage.getItem("loginSuccess") === "true") {
      Swal.fire({
        icon: "success",
        title: "Berhasil masuk!",
      });
      localStorage.removeItem("loginSuccess");
    }
  }, []);

  useEffect(() => {
    const filteredData = absensiData.filter(
      (absenData) =>
        (absenData.jamMasuk?.toLowerCase().includes(searchTerm.toLowerCase()) ??
          false) ||
        (absenData.jamPulang
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ??
          false) ||
        (absenData.statusAbsen
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ??
          false) ||
        (absenData.keterangan
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ??
          false) ||
        (formatDate(absenData.tanggalAbsen)
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ??
          false)
    );
    setTotalPages(Math.ceil(filteredData.length / limit));
  }, [searchTerm, limit, absensiData]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    setCurrentPage(1); // Reset to the first page when limit changes
  };

  function onPageChange(page) {
    setCurrentPage(page);
  }

  const filteredAbsen = absensiData.filter(
    (absenData) =>
      (absenData.jamMasuk?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false) ||
      (absenData.jamPulang?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false) ||
      (absenData.statusAbsen
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ??
        false) ||
      (absenData.keteranganIzin
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ??
        false) ||
      (formatDate(absenData.tanggalAbsen)
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ??
        false)
  );

  const paginatedAbsen = filteredAbsen.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex h-full">
        <div className="content-page container p-8 ml-0 md:ml-10 mt-12">
          <div className="mt-5 w-full">
            <div className="p-4 text-center bg-indigo-300 border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4">
                Selamat Datang di Presensi
                <span> @{username}</span>
              </h2>
              <button className="profile-menu-link">{day},</button>
              <button className="profile-menu-link active">{date} -</button>
              <button className="profile-menu-link">{time}</button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-12">
            <div className="pl-2 h-32 bg-indigo-500 rounded-lg shadow-md md:w-auto">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">Absen</p>
                  <p className="text-lg">Jumlah Absen</p>
                  <p className="text-lg">{absensiData.length}</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faUsers} size="2x" />
                </div>
              </div>
            </div>
            <div className="pl-2 h-32 bg-indigo-500 rounded-lg shadow-md md:w-auto">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">Izin</p>
                  <p className="text-lg">Jumlah Izin</p>
                  <p className="text-lg">{izinData.length}</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faClipboardUser} size="2x" />
                </div>
              </div>
            </div>
            <div className="pl-2 h-32 bg-indigo-500 rounded-lg shadow-md md:w-auto">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">Terlambat</p>
                  <p className="text-lg">Jumlah Terlambat</p>
                  <p className="text-lg">{terlambat.length}</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faUser} size="2x" />
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-announcements p-4 bg-slate-200 rounded-lg shadow-xl mt-10">
            <h2 className="text-3xl font-semibold text-black text-center">
              Pengumuman Terbaru
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {validInformasi.length > 0 ? (
                validInformasi.map((item) => (
                  <div
                    key={item.id}
                    className="informasi-item p-4 bg-white border border-gray-200 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-xl"
                  >
                    <div className="flex items-center mb-4">
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        className="h-6 w-6 text-blue-500 mr-2"
                      />
                      <h6 className="text-lg font-semibold text-gray-900 capitalize">
                        {item.namaAcara}
                      </h6>
                    </div>
                    <div className="mt-2 mb-2 flex items-center">
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        className="h-4 w-4 text-gray-600 mr-2"
                      />
                      <p className="text-sm font-semibold text-gray-800">
                        Tanggal:
                      </p>
                      <p className="text-sm text-gray-700 ml-2">
                        {formatDate(item.tanggalAcara)}
                      </p>
                    </div>
                    <div className="mt-4">
                      <Link to={"/walimurid/detail_info/" + item.id}>
                        <button className="text-blue-500 hover:underline">
                          Lihat Selengkapnya
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center col-span-3">
                  <h1 className="text-lg text-center text-gray-900 dark:text-white">
                    Tidak Ada Pengumuman !!
                  </h1>
                </div>
              )}
            </div>
          </div>

          <br />
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-10">
            <div className="flex flex-col md:flex-row justify-between">
              <h6 className="mb-2 text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                Data Presensi Siswa
              </h6>
              <div className="mt-5 md:mt-2 flex flex-col md:flex-row items-center gap-2">
                <div className="relative w-full md:w-64">
                  <input
                    type="search"
                    id="search-dropdown"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="block p-2.5 w-full z-20 text-sm rounded-l-md text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search name..."
                    required
                  />
                </div>
                <select
                  value={limit}
                  onChange={handleLimitChange}
                  className="w-full md:w-auto flex-shrink-0 z-10 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="5">05</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
            <br />
            <hr />
            {/* <!-- Tabel --> */}
            <div className="relative overflow-x-auto mt-5">
              <table
                id="dataKaryawan"
                className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
              >
                {/* <!-- Tabel Head --> */}
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 md:px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-4 md:px-6 py-3">
                      Nama
                    </th>
                    <th scope="col" className="px-4 md:px-6 py-3">
                      Tanggal Presensi
                    </th>
                    <th scope="col" className="px-4 md:px-6 py-3">
                      Jam Masuk
                    </th>
                    <th scope="col" className="px-4 md:px-6 py-3">
                      Jam Pulang
                    </th>
                    <th scope="col" className="px-4 md:px-6 py-3">
                      Status Presensi
                    </th>
                    <th scope="col" className="px-4 md:px-6 py-3">
                      Aksi
                    </th>
                  </tr>
                </thead>
                {/* <!-- Tabel Body --> */}
                <tbody className="text-left">
                  {paginatedAbsen.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-4 text-gray-700"
                      >
                        Tidak ada data yang ditampilkan
                      </td>
                    </tr>
                  ) : (
                    paginatedAbsen.map((absen, index) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        key={index}
                      >
                        <th
                          scope="row"
                          className="px-4 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {(currentPage - 1) * limit + index + 1}
                        </th>
                        <td className="px-4 md:px-6 py-4 capitalize">
                          {absen.user.username}
                        </td>
                        <td className="px-4 md:px-6 py-4 capitalize">
                          {formatDate(absen.tanggalAbsen)}
                        </td>
                        <td className="px-4 md:px-6 py-4 capitalize">
                          {absen.jamMasuk}
                        </td>
                        <td className="px-4 md:px-6 py-4">{absen.jamPulang}</td>
                        <td className="px-4 md:px-6 py-4">
                          {absen.statusAbsen}
                        </td>
                        <td className="px-4 md:px-6 py-4">
                          <Link to={"/user/detail_absen/" + absen.id}>
                            <button className="block rounded-full border-2 border-white bg-blue-100 p-2 md:p-4 text-blue-700 active:bg-blue-50">
                              <span className="relative inline-block">
                                <FontAwesomeIcon
                                  icon={faInfo}
                                  className="h-4 w-4"
                                />
                              </span>
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
              className="mt-5"
              layout="table"
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              showIcons
              previousLabel=""
              nextLabel=""
            />
          </div>

          <br />
        </div>
      </div>
    </div>
  );
}

export default DashboardOrtu;
