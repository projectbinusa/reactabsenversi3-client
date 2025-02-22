import React, { useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowDown,
  faFileExport,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../../components/NavbarAdmin";
import SidebarNavbar from "../../../components/SidebarNavbar";
import { Pagination } from "flowbite-react";
import { SidebarProvider } from "../../../components/SidebarContext";
import Navbar1 from "../../../components/Navbar1";

function Simpel() {
  const [bulan, setBulan] = useState(null); // Bulan default diubah ke null
  const [tahun, setTahun] = useState(null); // Tahun default diubah ke null
  const [absensiData, setAbsensiData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const adminId = localStorage.getItem("adminId");
  const token = localStorage.getItem("token");
  const [isDataAvailable, setIsDataAvailable] = useState(true);

  const handleSearch = async (bulan, tahun) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/admin/${adminId}`,
        {
          params: {
            bulan: bulan,
            tahun: tahun,
            tanggalAbsen: `${tahun}-${bulan}-01`, // Pastikan parameter sesuai dengan API
          },
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.reverse();
      console.log("data: ", data); // Debugging: lihat data yang diterima dari API

      if (data.length === 0) {
        setIsDataAvailable(false);
      } else {
        setIsDataAvailable(true);
        setAbsensiData(data); // Pastikan data di sini sesuai dengan filter yang diinginkan
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Gagal", "Gagal Mengambil data", "error");
    }
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setSelectedDate(value);

    // const [tahun, bulan] = value.split("-");
    // setBulan(parseInt(bulan, 10));
    // setTahun(parseInt(tahun, 10));
    // handleSearch(parseInt(bulan, 10), parseInt(tahun, 10));
  };

  const handleSearchClick = () => {
    if (selectedDate) {
      const [tahun, bulan] = selectedDate.split("-");
      setBulan(parseInt(bulan, 10));
      setTahun(parseInt(tahun, 10));
      handleSearch(parseInt(bulan, 10), parseInt(tahun, 10));
    } else {
      Swal.fire(
        "Peringatan",
        "Silakan pilih kelas dan tanggal terlebih dahulu",
        "warning"
      );
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

  const formatLamaKerja = (startKerja) => {
    const startDate = new Date(startKerja);
    const currentDate = new Date();

    const diffYears = currentDate.getFullYear() - startDate.getFullYear();

    let diffMonths = currentDate.getMonth() - startDate.getMonth();
    if (diffMonths < 0) {
      diffMonths += 12;
    }

    let diffDays = Math.floor(
      (currentDate - startDate) / (1000 * 60 * 60 * 24)
    );

    const lastDayOfLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
    if (currentDate.getDate() < startDate.getDate()) {
      diffMonths -= 1;
      diffDays -= lastDayOfLastMonth;
    }

    let durationString = "";
    if (diffYears > 0) {
      durationString += `${diffYears} tahun `;
    }
    if (diffMonths > 0) {
      durationString += `${diffMonths} bulan `;
    }
    if (diffDays > 0) {
      durationString += `${diffDays} hari`;
    }

    return durationString.trim();
  };

  function getMonthName(month) {
    const monthNames = new Intl.DateTimeFormat("id-ID", {
      month: "long",
    }).formatToParts(new Date(2000, month - 1, 1));
    if (monthNames && monthNames.length > 0) {
      return monthNames[0].value;
    }
    return "Bulan Tidak Valid";
  }

  const exportSimpel = async () => {
    // Check if there is data available
    if (absensiData.length === 0) {
      Swal.fire("Peringatan", "Tidak ada data untuk diekspor", "warning");
      return;
    }

    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/export/absensi-bulanan-simpel`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
          params: { month: bulan, year: tahun },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Absensi-Simpel ${getMonthName(bulan)}-${tahun}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      Swal.fire("Berhasil", "Berhasil mengunduh data", "success");
      // window.location.reload();
    } catch (error) {
      Swal.fire("Error", "Gagal mengunduh data", "error");
      console.log(error);
    }
  };

  const filteredData = Object.values(absensiData)
    .flat()
    .filter((item) => {
      const itemDate = new Date(item.tanggalAbsen); // Pastikan data di-filter berdasarkan tanggal
      return (
        item.user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
        itemDate.getMonth() + 1 === bulan &&
        itemDate.getFullYear() === tahun
      );
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  function onPageChange(page) {
    setCurrentPage(page);
  }

  return (
    <div className="flex flex-col h-screen">
      <SidebarProvider>
        <Navbar1 />
        <SidebarNavbar />
      </SidebarProvider>
      <div className="w-full mt-10">
        <div className="content-page flex-1 p-8 md:ml-72 mt-5 md:mt-10 text-center overflow-auto">
          <div className="tabel-absen bg-white p-5 rounded-xl shadow-xl border border-gray-300">
            <div className="md:flex block justify-between">
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Rekap Simpel
              </h6>
              <div className="flex md:mt-2 mt-4 items-center gap-2">
                <div className=" w-64">
                  <input
                    type="search"
                    id="search-dropdown"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block p-2.5 w-full z-20 text-sm rounded-l-md text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search name..."
                    required
                  />
                </div>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="flex-shrink-0 z-10 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                  {[5, 10, 20, 50].map((limit) => (
                    <option key={limit} value={limit}>
                      {limit}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <hr />
            <form className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-5">
              <input
                value={selectedDate}
                onChange={handleDateChange}
                type="month"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <div className="flex sm:flex-row gap-4 mx-auto items-center">
                <button
                  type="button"
                  onClick={exportSimpel}
                  title="Export"
                  className="exp bg-green-500 hover:bg-green text-white font-bold py-2 px-4 rounded inline-block ml-auto">
                  <FontAwesomeIcon icon={faCloudArrowDown} />
                </button>
                <button
                  type="button"
                  className="exp bg-green-500 hover:bg-green text-white font-bold py-2 px-4 rounded inline-block ml-auto"
                  onClick={handleSearchClick}
                  title="View">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </form>

            <div className=" overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table
                id="rekapSimple"
                className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                      No
                    </th>
                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                      Nama
                    </th>
                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                      Tanggal
                    </th>
                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                      Jam Masuk
                    </th>
                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                      Foto Masuk
                    </th>
                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                      Lokasi Masuk
                    </th>
                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                      Jam Pulang
                    </th>
                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                      Foto Pulang
                    </th>
                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                      Lokasi Pulang
                    </th>
                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                      Jam Sekolah
                    </th>
                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                      Keterangan
                    </th>
                  </tr>
                </thead>
                <tbody className="text-left">
                  {!isDataAvailable && (
                    <p>Data tidak ada untuk bulan dan tahun yang dipilih.</p>
                  )}
                  {currentItems.length > 0 && absensiData != null ? (
                    currentItems.map((absensi, index) => (
                      <tr key={index}>
                        <td className="px-5 py-4 whitespace-nowrap">
                          {indexOfFirstItem + index + 1}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap capitalize">
                          {absensi.user.username}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap capitalize">
                          {formatDate(absensi.tanggalAbsen)}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap capitalize">
                          {absensi.jamMasuk}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <img
                            src={absensi.fotoMasuk}
                            alt="foto masuk"
                            className="block py-2.5 px-0 w-25 max-h-32 h-25 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          />
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap capitalize">
                          {absensi.lokasiMasuk}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          {absensi.jamPulang}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <img
                            src={absensi.fotoPulang}
                            alt="Foto Pulang"
                            className="block py-2.5 px-0 w-25 max-h-32 h-25 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          />
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap capitalize">
                          {absensi.lokasiPulang}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          {absensi.user.startKerja}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap capitalize">
                          {absensi.statusAbsen}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center py-3">
                        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mt-5 mb-3">
                          Tidak Ada Absensi di Bulan Ini!!!
                        </h1>
                        <p className="text-center">
                          Silahkan pilih bulan dan tahun lain
                        </p>
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
        </div>
      </div>
    </div>
  );
}

export default Simpel;
