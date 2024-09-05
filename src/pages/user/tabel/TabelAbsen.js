import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faSearch,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Pagination } from "flowbite-react";
import { API_DUMMY } from "../../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import SidebarNavbar from "../../../components/SidebarNavbar";
// import { useNavigate } from "react-router-dom";

function TabelAbsen() {
  const [absensi, setAbsensi] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // useNavigate

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const getAbsensi = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/getByUserId/${userId}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );

      setAbsensi(response.data.reverse());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAbsensi();
  }, []);

  useEffect(() => {
    const filteredData = absensi.filter(
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
  }, [searchTerm, limit, absensi]);

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

  const filteredAbsen = absensi.filter(
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

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <SidebarNavbar />
      </div>
      <div className="flex h-full">
        <div className="sticky top-16 z-40">
          <Navbar />
        </div>
        <div className="sm:ml-64 content-page container md:p-8 md:ml-64 mt-5">
          <div className="p-5 mt-10">
            {/* <!-- Card --> */}
            <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="md:flex justify-between">
                <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  History Presensi
                </h6>
                <div className="flex items-center gap-2 mt-5 md:mt-0">
                  <div className="relative w-full md:w-64">
                    <input
                      type="search"
                      id="search-dropdown"
                      value={searchTerm}
                      onChange={handleSearch}
                      className="block p-2.5 w-full text-sm rounded-l-md text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                      placeholder="Search name..."
                      required
                    />
                  </div>
                  <select
                    value={limit}
                    onChange={handleLimitChange}
                    className="w-auto flex-shrink-0 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
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
              <div className="overflow-x-auto mt-5">
                <table
                  id="dataKaryawan"
                  className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                >
                  {/* <!-- Tabel Head --> */}
                  <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 font-medium ">
                        NO
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium ">
                        TANGGAL
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium ">
                        JAM MASUK
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium ">
                        JAM PULANG
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium ">
                        KETERANGAN
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium ">
                        KEHADIRAN
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-center">
                        AKSI
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
                      paginatedAbsen.map((absenData, index) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 ">
                            {(currentPage - 1) * limit + index + 1}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700 capitalize">
                            {formatDate(absenData.tanggalAbsen)}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700 capitalize">
                            {absenData.jamMasuk}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700 capitalize">
                            {absenData.jamPulang}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700 capitalize">
                            {absenData.keteranganPulangAwal
                              ? absenData.keteranganPulangAwal
                              : absenData.keteranganIzin
                              ? absenData.keteranganIzin
                              : absenData.keteranganTerlambat || "-"}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700 capitalize">
                            {absenData.statusAbsen}
                          </td>
                          <td className="whitespace-nowrap text-center py-3">
                            <div className="flex items-center -space-x-4 ml-12">
                              <Link to={"/user/detail_absen/" + absenData.id}>
                                <button className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50">
                                  <span className="relative inline-block">
                                    <FontAwesomeIcon
                                      icon={faInfo}
                                      className="h-4 w-4"
                                    />
                                  </span>
                                </button>
                              </Link>
                              <Link to="/user/izin_absen">
                                <button
                                  disabled={
                                    absenData.statusAbsen === "Izin" ||
                                    absenData.statusAbsen ===
                                      "Izin Tengah Hari" ||
                                    new Date(absenData.tanggalAbsen).setHours(
                                      0,
                                      0,
                                      0,
                                      0
                                    ) < new Date(today).setHours(0, 0, 0, 0) ||
                                    absenData.jamPulang != "-"
                                  }
                                  className={`z-20 block rounded-full border-2 border-white p-4 text-red-700 active:bg-red-50 ${
                                    absenData.statusAbsen === "Izin" ||
                                    absenData.statusAbsen ===
                                      "Izin Tengah Hari" ||
                                    new Date(absenData.tanggalAbsen).setHours(
                                      0,
                                      0,
                                      0,
                                      0
                                    ) < new Date(today).setHours(0, 0, 0, 0) ||
                                    absenData.jamPulang != "-"
                                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  <span className="relative inline-block">
                                    <FontAwesomeIcon
                                      icon={faUserPlus}
                                      className={`h-4 w-4 ${
                                        absenData.statusAbsen === "Izin" ||
                                        absenData.statusAbsen ===
                                          "Izin Tengah Hari" ||
                                        new Date(
                                          absenData.tanggalAbsen
                                        ).setHours(0, 0, 0, 0) <
                                          new Date(today).setHours(
                                            0,
                                            0,
                                            0,
                                            0
                                          ) ||
                                        absenData.jamPulang != "-"
                                          ? "text-gray-500"
                                          : "text-red-700"
                                      }`}
                                    />
                                  </span>
                                </button>
                              </Link>
                            </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabelAbsen;
