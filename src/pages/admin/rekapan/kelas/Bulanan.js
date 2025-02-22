import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import { API_DUMMY } from "../../../../utils/api";
import NavbarAdmin from "../../../../components/NavbarAdmin";
import { Pagination } from "flowbite-react";
import SidebarNavbar from "../../../../components/SidebarNavbar";
import { SidebarProvider } from "../../../../components/SidebarContext";
import Navbar1 from "../../../../components/Navbar1";

function BulanPerkelas() {
  const [listKelas, setListKelas] = useState([]);
  const [idKelas, setIdKelas] = useState();
  const [rekapPerbulan, setRekapPerbulan] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const adminId = localStorage.getItem("adminId");
  const token = localStorage.getItem("token");

  // Initialize data on component mount
  // useEffect(() => {
  //   getAllKelas();
  //   if (idKelas != null) {
  //     getRekapPresensiPerkelasSetiapBulan();
  //   }
  //   // getAllOrganisasi();
  //   if (idOrganisasi != null) {
  //     getAllKelasByOrganisasi(idOrganisasi);
  //   }
  //   // console.log("bulan: ", bulan);
  // }, [idOrganisasi]);

  useEffect(() => {
    if (adminId) {
      getAllKelas(adminId);
    }
  }, [adminId]);

  // useEffect(() => {
  //   if (idKelas != null) {
  //     getRekapPresensiPerkelasSetiapBulan(idKelas, currentPage);
  //   }
  // }, [idKelas, currentPage]);

  // Fetch user data
  const getAllKelas = async (adminId) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/kelas/getAllByAdmin/${adminId}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
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

  const getRekapPresensiPerkelasSetiapBulan = async (bulan, tahun) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/bulanan/kelas/${idKelas}?bulan=${bulan}&tahun=${tahun}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      //   if (response == 200) {
      setRekapPerbulan(response.data);
      console.log("list rekap perbulan: ", response.data);
      //   }
    } catch (error) {
      console.log(error);
    }
  };


  const handleDateChange = (event) => {
    const value = event.target.value;
    setSelectedDate(value);

    // const [year, month] = value.split("-");
    // getRekapPresensiPerkelasSetiapBulan(month, year);
  };

  const handleSearchClick = () => {
    if (selectedDate && idKelas) {
      const [year, month] = selectedDate.split("-");
      getRekapPresensiPerkelasSetiapBulan(month, year);
    } else {
      Swal.fire(
        "Peringatan",
        "Silakan pilih kelas dan tanggal terlebih dahulu",
        "warning"
      );
    }
  };


  function onPageChange(page) {
    setCurrentPage(page);
  }

  const handleExportClick = async (e) => {
    e.preventDefault();
    if (!selectedDate || !idKelas) {
      Swal.fire(
        "Peringatan",
        "Silakan pilih kelas dan bulan, tahun terlebih dahulu",
        "warning"
      );
      return;
    }

    if (rekapPerbulan.length === 0) {
      Swal.fire(
        "Peringatan",
        "Data belum tersedia untuk bulan yang dipilih",
        "warning"
      );
      return;
    }

    const [year, month] = selectedDate.split("-");
    await exportPerkelas(month, year);
  };

  const exportPerkelas = async (bulan, tahun) => {
    try {
        const selectedKelas = listKelas.find((kelas) => kelas.id == idKelas);

      console.log("nama_kelas: ", selectedKelas, "id_kelas: ", idKelas);

      if (!selectedKelas) {
        Swal.fire("Peringatan", "Kelas tidak ditemukan", "warning");
        return;
      }

      const isGuruKelas = selectedKelas.namaKelas.toLowerCase().includes("guru");

      const url = isGuruKelas
        ? `${API_DUMMY}/api/absensi/export/bulanan-guru/by-kelas`
        : `${API_DUMMY}/api/absensi/export/bulanan/by-kelas`;

      const response = await axios.get(url, {
        params: {
          kelasId: idKelas,
          bulan,
          tahun,
          ...(isGuruKelas && { idAdmin: adminId }), // Tambahkan idAdmin hanya jika kelas terkait guru
        },
        responseType: "blob",
        headers: {
          AuthPrs: `Bearer ${token}`,
        },
      });

      if (response.data.size === 0) {
        Swal.fire("Peringatan", "Tidak ada data untuk diunduh", "warning");
        return;
      }

      // Unduh file
      const blob = new Blob([response.data]);
      const urlBlob = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlBlob;
      link.setAttribute("download", "RekapBulananPerKelas.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(urlBlob);

      Swal.fire("Berhasil", "Berhasil mengunduh data", "success");
    } catch (error) {
      Swal.fire("Error", "Gagal mengunduh data", "error");
      console.error(error);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  // Pagination and Search Logic
  const filteredData = Object.values(rekapPerbulan)
    .flat()
    .filter((item) =>
      item.user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="flex flex-col h-screen">
      <SidebarProvider>
        <Navbar1 />
        <SidebarNavbar />
      </SidebarProvider>
      <div className="w-full mt-10">
        <div className="content-page flex-1 p-8 md:ml-72 mt-16 text-center overflow-auto">
          <div className="tabel-absen bg-white p-5 rounded-xl shadow-xl border border-gray-300">
            <div className="md:flex justify-between">
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Rekap Perbulan
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
              <select
                id="small"
                className="block w-40 sm:w-48 md:w-56 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                style={{ width: "auto" }}
                value={idKelas}
                onChange={(e) => setIdKelas(e.target.value)}>
                <option value="">Pilih Kelas</option>
                {listKelas.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.namaKelas}
                  </option>
                ))}
              </select>
              <input
                value={selectedDate}
                onChange={handleDateChange}
                type="month"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <div className="flex sm:flex-row gap-4 mx-auto items-center">
                <button
                  type="submit"
                  className="exp bg-green-500 hover:bg-green text-white font-bold py-2 px-4 rounded inline-block ml-auto"
                  onClick={handleExportClick}
                  title="Export">
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
                  {currentItems.length === 0 ? (
                    <tr>
                      <td
                        colSpan="9"
                        className="px-6 py-3 text-center text-gray-500">
                        Tidak ada Absen pada Bulan ini!
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((absensi, index) => (
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
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
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

export default BulanPerkelas;
