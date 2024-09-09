import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../utils/api";
import NavbarAdmin from "../../../../components/NavbarAdmin";
import { Pagination } from "flowbite-react";
import SidebarNavbar from "../../../../components/SidebarNavbar";
import { SidebarProvider } from "../../../../components/SidebarContext";
import Navbar1 from "../../../../components/Navbar1";

function HarianPerkelas() {
  const [tanggal, setTanggal] = useState("");
  const [kelasId, setKelasId] = useState("");
  const [listKelas, setListKelas] = useState([]);
  const [absensiData, setAbsensiData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const adminId = localStorage.getItem("adminId");
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   getAllKelas();
  //   if (idOrganisasi !== null) {
  //     getAllKelasByOrganisasi(idOrganisasi);
  //   }
  // }, [idOrganisasi]);

  useEffect(() => {
    if (adminId) {
      getAllKelas(adminId);
    }
  }, [adminId]);

  const handleTanggalChange = (event) => {
    setTanggal(event.target.value);
    if (event.target.value && kelasId) {
      getHarianPerkelas(event.target.value, kelasId);
    } else {
      setAbsensiData([]);
    }
  };

  const handleKelasChange = (event) => {
    setKelasId(event.target.value);
    if (tanggal && event.target.value) {
      getHarianPerkelas(tanggal, event.target.value);
    } else {
      setAbsensiData([]);
    }
  };

  const getHarianPerkelas = async (tanggal, kelasId) => {
    try {
      const response = await axios.get(`${API_DUMMY}/api/absensi/by-tanggal`, {
        params: {
          tanggalAbsen: tanggal,
          kelasId: kelasId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.length === 0) {
        Swal.fire("Tidak ada", "Tidak ada yang absen hari ini", "info");
      } else {
        setAbsensiData(response.data.reverse());
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Gagal", "Gagal Mengambil data", "error");
    }
  };

  const getAllKelas = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/kelas/getAllByAdmin/${adminId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setListKelas(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  // const getAllKelasByOrganisasi = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${API_DUMMY}/api/kelas/getALlByOrganisasi/${idOrganisasi}`
  //     );
  //     console.log("list kelas by organisasi: ", response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleExportClick = (e) => {
    e.preventDefault();

    if (absensiData.length === 0) {
      Swal.fire(
        "Peringatan",
        "Data belum tersedia untuk kelas yang dipilih",
        "warning"
      );
      return;
    }

    exportPerkelas(e, tanggal, kelasId);
  };

  const exportPerkelas = async (e, tanggal, kelasId) => {
    e.preventDefault();
    if (!kelasId || !tanggal) {
      Swal.fire(
        "Peringatan",
        "Silakan pilih kelas dan tanggal terlebih dahulu",
        "warning"
      );
      return;
    }
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/export/harian/by-kelas`,
        {
          params: { kelasId, tanggal },
          responseType: "blob",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Absensi-Harian.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      Swal.fire("Berhasil", "Berhasil mengunduh data", "success");
    } catch (error) {
      Swal.fire("Error", "Gagal mengunduh data", "error");
      console.log(error);
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
    if (diffYears > 0) durationString += `${diffYears} tahun `;
    if (diffMonths > 0) durationString += `${diffMonths} bulan `;
    if (diffDays > 0) durationString += `${diffDays} hari`;

    return durationString.trim();
  };

  useEffect(() => {
    const filteredData = absensiData.filter(
      (user) =>
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.admin?.username
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTotalPages(Math.ceil(filteredData.length / limit));
  }, [searchTerm, limit, absensiData]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    setCurrentPage(1); // Reset to the first page when limit changes
    if (kelasId != null) {
      getHarianPerkelas(kelasId, 1, parseInt(event.target.value));
    }
  };

  function onPageChange(page) {
    setCurrentPage(page);
  }

  const filteredUser = absensiData.filter((user) =>
    user.user.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUser = filteredUser.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  return (
    <div className="flex flex-col h-screen">
      <SidebarProvider>
        <Navbar1 />
        <SidebarNavbar />
      </SidebarProvider>
      <div className="w-full mt-10">
        <div className="content-page flex-1 p-8 md:ml-72 mt-5 md:mt-16 text-center overflow-auto">
          <div className="tabel-absen bg-white p-5 rounded-xl shadow-xl border border-gray-300">
            <div className="md:flex justify-between">
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Rekap Harian
              </h6>
              <div className="flex md:mt-2 mt-4 items-center gap-2">
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

            <form
              method="get"
              id="filterForm"
              className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-5"
            >
              <select
                id="small"
                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={kelasId}
                onChange={handleKelasChange}
              >
                <option value="">Pilih Kelas</option>
                {listKelas.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.namaKelas}
                  </option>
                ))}
              </select>
              <input
                type="date"
                className="appearance-none block w-full bg-white border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
                id="tanggal"
                name="tanggal"
                value={tanggal}
                onChange={handleTanggalChange}
              />
              <div className="flex w-full sm:w-auto sm:flex-row gap-4 items-center justify-center">
                <button
                  type="button"
                  className="exp bg-green-500 hover:bg-green text-white font-bold py-2 px-4 rounded sm:py-2 sm:px-4"
                  onClick={handleExportClick}
                  title="Export"
                >
                  <FontAwesomeIcon icon={faCloudArrowDown} />
                </button>
              </div>
            </form>

            <div className=" overflow-x-auto shadow-md sm:rounded-lg mt-5 py-3">
              {absensiData.length === 0 ? (
                <>
                  <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mt-5 mb-3">
                    Tidak Ada Absen Hari Ini !!
                  </h1>
                  <p className="text-center">Silahkan pilih tanggal lain</p>
                </>
              ) : (
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Nama
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Tanggal
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Jam Masuk
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Foto Masuk
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Jam Pulang
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Foto Pulang
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Jam Sekolah
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Keterangan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUser.map((absensi, index) => (
                      <tr key={absensi.id}>
                        <td className="px-6 py-3 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap capitalize">
                          {absensi.user.username}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap capitalize">
                          {formatDate(absensi.tanggalAbsen)}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap capitalize">
                          {absensi.jamMasuk}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap capitalize">
                          <img src={absensi.fotoMasuk} alt="Foto Masuk" />
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap capitalize">
                          {absensi.jamPulang}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap capitalize">
                          <img src={absensi.fotoPulang} alt="Foto Pulang" />
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap capitalize">
                          {absensi.jamKerja}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap capitalize">
                          {absensi.keterangan}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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

export default HarianPerkelas;
