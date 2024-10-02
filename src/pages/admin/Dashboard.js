import React, { useEffect, useState } from "react";
import Sidebar from "../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faClipboardUser,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/NavbarAdmin";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../utils/api";
import SidebarNavbar from "../../components/SidebarNavbar";
import { Pagination } from "flowbite-react";
import { SidebarProvider } from "../../components/SidebarContext";
import Navbar1 from "../../components/Navbar1";

function Dashboard() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [userData, setUserData] = useState([]);
  const [absenData, setAbsenData] = useState([]);
  const [lokasiData, setLokasiData] = useState([]);
  const [organisasiData, setOrganisasiData] = useState([]);
  const [username, setUsername] = useState("");
  const idAdmin = localStorage.getItem("adminId");
  const token = localStorage.getItem("token");
  const [karyawan, setKaryawan] = useState("");

  const getallUser = async () => {
    try {
      const res = await axios.get(`${API_DUMMY}/api/user/${idAdmin}/users`, {
        headers: {
          AuthPrs: `Bearer ${token}`,
        },
      });
      setKaryawan(res.data.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

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

  const fetchData = async (url, setData, options = {}) => {
    try {
      const response = await axios.get(url, options);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getUser = () =>
    fetchData(`${API_DUMMY}/api/user/${idAdmin}/users`, setUserData, {
      headers: {
        AuthPrs: `Bearer ${token}`,
      },
    });

  const getAbsensi = () =>
    fetchData(`${API_DUMMY}/api/absensi/admin/${idAdmin}`, setAbsenData, {
      headers: {
        AuthPrs: `Bearer ${token}`,
      },
    });

  const getLokasi = () =>
    fetchData(`${API_DUMMY}/api/lokasi/get-admin/${idAdmin}`, setLokasiData, {
      headers: {
        AuthPrs: `Bearer ${token}`,
      },
    });

  const getOrganisasi = () =>
    fetchData(
      `${API_DUMMY}/api/organisasi/all-by-admin/${idAdmin}`,
      setOrganisasiData,
      {
        headers: {
          AuthPrs: `Bearer ${token}`,
        },
      }
    );

  const getUsername = async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("adminId");

    try {
      const response = await axios.get(`${API_DUMMY}/api/admin/getById/${id}`, {
        headers: {
          AuthPrs: `Bearer ${token}`,
        },
      });
      setUsername(response.data.username);
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  useEffect(() => {
    getUser();
    getAbsensi();
    getUsername();
    getLokasi();
    getOrganisasi();
    getallUser();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("loginSuccess") === "true") {
      Swal.fire({
        icon: "success",
        title: "Berhasil masuk!",
      });
      localStorage.removeItem("loginSuccess");
    }
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const filteredData = absenData.filter(
      (absensi) =>
        absensi.user?.username
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        absensi.statusAbsen?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (formatDate(absensi.tanggalAbsen)
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ??
          false)
    );
    setTotalPages(Math.ceil(filteredData.length / limit));
  }, [searchTerm, limit, absenData]);

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

  const filteredAbsensi = absenData.filter(
    (absensi) =>
      absensi.user?.username
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      absensi.statusAbsen?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (formatDate(absensi.tanggalAbsen)
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ??
        false)
  );

  const paginatedAbsensi = filteredAbsensi.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const [searchTerm2, setSearchTerm2] = useState("");
  const [limit2, setLimit2] = useState(5);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [totalPages2, setTotalPages2] = useState(1);

  useEffect(() => {
    const filteredData = lokasiData.filter(
      (lokasi) =>
        lokasi.namaLokasi?.toLowerCase().includes(searchTerm2.toLowerCase()) ||
        lokasi.alamat?.toLowerCase().includes(searchTerm2.toLowerCase()) ||
        lokasi.organisasi?.namaOrganisasi
          ?.toLowerCase()
          .includes(searchTerm2.toLowerCase())
    );
    setTotalPages(Math.ceil(filteredData.length / limit2));
  }, [searchTerm2, limit2, lokasiData]);

  const handleSearch2 = (event) => {
    setSearchTerm2(event.target.value);
  };

  const handleLimitChange2 = (event) => {
    setLimit2(parseInt(event.target.value));
    setCurrentPage2(1); // Reset to the first page when limit changes
  };

  function onPageChange2(page) {
    setCurrentPage2(page);
  }

  const filteredLokasi = lokasiData.filter(
    (lokasi) =>
      lokasi.namaLokasi?.toLowerCase().includes(searchTerm2.toLowerCase()) ||
      lokasi.alamat?.toLowerCase().includes(searchTerm2.toLowerCase()) ||
      lokasi.organisasi?.namaOrganisasi
        ?.toLowerCase()
        .includes(searchTerm2.toLowerCase())
  );

  const paginatedLokasi = filteredLokasi.slice(
    (currentPage2 - 1) * limit2,
    currentPage2 * limit2
  );

  const [searchTerm3, setSearchTerm3] = useState("");
  const [limit3, setLimit3] = useState(5);
  const [currentPage3, setCurrentPage3] = useState(1);
  const [totalPages3, setTotalPages3] = useState(1);

  useEffect(() => {
    const filteredData = organisasiData.filter(
      (organisasi) =>
        organisasi.namaOrganisasi
          ?.toLowerCase()
          .includes(searchTerm3.toLowerCase()) ||
        organisasi.alamat?.toLowerCase().includes(searchTerm3.toLowerCase()) ||
        organisasi.nomerTelepon
          ?.toLowerCase()
          .includes(searchTerm3.toLowerCase()) ||
        organisasi.emailOrganisasi
          ?.toLowerCase()
          .includes(searchTerm3.toLowerCase())
    );
    setTotalPages(Math.ceil(filteredData.length / limit3));
  }, [searchTerm3, limit3, organisasiData]);

  const handleSearch3 = (event) => {
    setSearchTerm3(event.target.value);
  };

  const handleLimitChange3 = (event) => {
    setLimit3(parseInt(event.target.value));
    setCurrentPage3(1); // Reset to the first page when limit changes
  };

  function onPageChange3(page) {
    setCurrentPage3(page);
  }

  const filteredOrganisasi = organisasiData.filter(
    (organisasi) =>
      organisasi.namaOrganisasi
        ?.toLowerCase()
        .includes(searchTerm3.toLowerCase()) ||
      organisasi.alamat?.toLowerCase().includes(searchTerm3.toLowerCase()) ||
      organisasi.nomerTelepon
        ?.toLowerCase()
        .includes(searchTerm3.toLowerCase()) ||
      organisasi.emailOrganisasi
        ?.toLowerCase()
        .includes(searchTerm3.toLowerCase())
  );

  const paginatedOrganisasi = filteredOrganisasi.slice(
    (currentPage3 - 1) * limit3,
    currentPage3 * limit3
  );

  return (
    <div className="flex flex-col h-screen">
      {/* <div className="top-16"> */}
      {/* <SidebarNavbar /> */}
      {/* </div> */}
      <SidebarProvider>
        <Navbar1 />
        <SidebarNavbar />
        nav
      </SidebarProvider>
      <div className="md:w-[77%] w-full mt-10 md:mt-0">
        {/* <div className=""> */}
        {/* <Navbar /> */}
        {/* </div> */}
        <div className="content-page container p-8 md:ml-72">
          <div className="mt-2 md:mt-12 w-full">
            <div className="p-4 text-center bg-indigo-300 border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4">
                Selamat Datang di Presensi
                <span> @{username}</span>
              </h2>
              <a className="profile-menu-link">{day}, </a>
              <a className="profile-menu-link active">{date} - </a>
              <a className="profile-menu-link">{time}</a>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 mt-5 md:mt-12">
            <div className="pl-2 h-32 bg-indigo-500 rounded-lg shadow-md flex-1">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">User</p>
                  <p className="text-lg">Jumlah User</p>
                  <p className="text-lg">{userData.length}</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faUsers} size="2x" />
                </div>
              </div>
            </div>
            <div className="pl-2 h-32 bg-indigo-500 rounded-lg shadow-md flex-1">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">Presensi</p>
                  <p className="text-lg">Jumlah Presensi</p>
                  <p className="text-lg">{absenData.length}</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faClipboardUser} size="2x" />
                </div>
              </div>
            </div>
          </div>

          <br />

          {/* Tabel Absensi */}
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="md:flex justify-between">
              <h6 className="text-xl font-bold"> History Presensi</h6>
              <div className="flex items-center gap-2 mt-2">
                <div className=" w-64">
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
                  className="flex-shrink-0 z-10 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="5">05</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
            <hr className="mt-3" />
            <hr />
            <div className="overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-left text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tanggal
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Jam Masuk
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Jam Pulang
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Kehadiran
                    </th>
                  </tr>
                </thead>
                <tbody className="text-left">
                  {paginatedAbsensi.length > 0 ? (
                    paginatedAbsensi.map((absen, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {(currentPage - 1) * limit + index + 1}
                        </th>
                        <td className="px-6 py-4 capitalize whitespace-nowrap">
                          {absen.user.username}
                        </td>
                        <td className="px-6 py-4 capitalize whitespace-nowrap">
                          {formatDate(absen.tanggalAbsen)}
                        </td>
                        <td className="px-6 py-4 capitalize whitespace-nowrap">
                          {absen.jamMasuk || "-"}
                        </td>
                        <td className="px-6 py-4 capitalize whitespace-nowrap">
                          {absen.jamPulang || "-"}
                        </td>
                        <td className="px-6 py-4 capitalize whitespace-nowrap">
                          {absen.statusAbsen}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        Tidak ada data yang ditampilkan
                      </td>
                    </tr>
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

          {/* Tabel Lokasi */}
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="md:flex justify-between">
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Data Lokasi
              </h6>
              <div className="flex items-center gap-2 mt-2">
                <div className=" w-64">
                  <input
                    type="search"
                    id="search-dropdown"
                    value={searchTerm2}
                    onChange={handleSearch2}
                    className="block p-2.5 w-full z-20 text-sm rounded-l-md text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search name..."
                    required
                  />
                </div>
                <select
                  value={limit2}
                  onChange={handleLimitChange2}
                  className="flex-shrink-0 z-10 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="5">05</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
            <hr className="mt-3" />
            <div className="overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-left text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Nama Lokasi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Alamat
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Jumlah Siswa
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Organisasi
                    </th>
                  </tr>
                </thead>
                <tbody className="text-left">
                  {paginatedLokasi.length > 0 ? (
                    paginatedLokasi.map((lokasi, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {(currentPage2 - 1) * limit2 + index + 1}
                        </th>
                        <td className="px-6 py-4 capitalize whitespace-nowrap">
                          {lokasi.namaLokasi}
                        </td>
                        <td className="px-6 py-4 capitalize whitespace-nowrap">
                          {lokasi.alamat}
                        </td>
                        <td className="px-6 py-4 capitalize">{karyawan}</td>
                        <td className="px-6 py-4 capitalize whitespace-nowrap">
                          {lokasi.organisasi.namaOrganisasi}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        Tidak ada data yang ditampilkan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
              className="mt-5"
              layout="table"
              currentPage={currentPage2}
              totalPages={totalPages2}
              onPageChange={onPageChange2}
              showIcons
              previousLabel=""
              nextLabel=""
            />
          </div>

          <br />

          {/* Tabel Organisasi */}
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="md:flex justify-between">
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Data Organisasi
              </h6>
              <div className="flex items-center gap-2 mt-2">
                <div className=" w-64">
                  <input
                    type="search"
                    id="search-dropdown"
                    value={searchTerm3}
                    onChange={handleSearch3}
                    className="block p-2.5 w-full z-20 text-sm rounded-l-md text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search name..."
                    required
                  />
                </div>
                <select
                  value={limit3}
                  onChange={handleLimitChange3}
                  className="flex-shrink-0 z-10 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="5">05</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
            <hr className="mt-3" />
            <div className="overflow-x-auto shadow-md sm:rounded-lg mt-8 mb-8">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-left text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Nama Organisasi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Alamat
                    </th>
                  </tr>
                </thead>
                <tbody className="text-left">
                  {paginatedOrganisasi.length > 0 ? (
                    paginatedOrganisasi.map((organisasi, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {(currentPage3 - 1) * limit3 + index + 1}
                        </th>
                        <td className="px-6 py-4 capitalize whitespace-nowrap">
                          {organisasi.namaOrganisasi}
                        </td>
                        <td className="px-6 py-4 capitalize whitespace-nowrap">
                          {organisasi.alamat}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        Tidak ada data yang ditampilkan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
              className="mt-5"
              layout="table"
              currentPage={currentPage3}
              totalPages={totalPages3}
              onPageChange={onPageChange3}
              showIcons
              previousLabel=""
              nextLabel=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
