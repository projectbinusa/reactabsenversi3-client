import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import { API_DUMMY } from "../../../../utils/api";
import NavbarAdmin from "../../../../components/NavbarAdmin";
import { Pagination } from "flowbite-react";
import SidebarNavbar from "../../../../components/SidebarNavbar";
import { SidebarProvider } from "../../../../components/SidebarContext";
import Navbar1 from "../../../../components/Navbar1";

function Perkelas() {
  const [listAbsensi, setListAbsensi] = useState([]);
  const [listKelas, setListKelas] = useState([]); // Daftar kelas
  const [kelasId, setKelasId] = useState(); // ID kelas yang dipilih
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const adminId = localStorage.getItem("adminId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (adminId) {
      getAllKelas(adminId);
    }
  }, [adminId]);

  // useEffect(() => {
  //   if (kelasId != null) {
  //     getAbsensiByKelasId(kelasId, currentPage, limit);
  //   }
  // }, [kelasId, currentPage, limit]);

  // Fetch kelas data
  const getAllKelas = async (adminId) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/kelas/getAllByAdmin/${adminId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setListKelas(response.data); // Hapus reverse di sini
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };
  // Fetch absensi data by kelas id
  const getAbsensiByKelasId = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/by-kelas/{kelasId}?kelasId=${kelasId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data Absensi:", response.data); // Tambahkan log ini
      setListAbsensi(response.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const handleSearchClick = () => {
    if (kelasId) {
      getAbsensiByKelasId(kelasId);
    } else {
      Swal.fire("Peringatan", "Silakan pilih kelas terlebih dahulu", "warning");
    }
  };

  // Handle kelas selection
  // const handleKelasChange = (event) => {
  //   const selectedKelasId = event.target.value;
  //   setKelasId(selectedKelasId);
  //   if (selectedKelasId) {
  //     getAbsensiByKelasId(selectedKelasId);
  //   } else {
  //     setListAbsensi([]);
  //   }
  // };

  const exportPerkelas = async () => {
    if (!kelasId) {
      Swal.fire("Peringatan", "Silakan pilih kelas terlebih dahulu", "warning");
      return;
    }

    if (listAbsensi.length === 0) {
      Swal.fire("Peringatan", "Tidak ada data untuk diekspor", "warning");
      return;
    }

    try {
      const response = await axios.get(
        `${API_DUMMY}/api/export/absensi/by-kelas/${kelasId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "RekapPerkelas.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      Swal.fire("Berhasil", "Berhasil mengunduh data", "success");
    } catch (error) {
      console.error("Error exporting data:", error);
      Swal.fire("Error", "Gagal mengunduh data", "error");
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

  useEffect(() => {
    const filteredData = listAbsensi.filter(
      (user) =>
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.admin?.username
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTotalPages(Math.ceil(filteredData.length / limit));
  }, [searchTerm, limit, listAbsensi]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    setCurrentPage(1); // Reset to the first page when limit changes
    if (kelasId != null) {
      getAbsensiByKelasId(kelasId, 1, parseInt(event.target.value));
    }
  };

  function onPageChange(page) {
    setCurrentPage(page);
  }

  const filteredUser = listAbsensi.filter((user) =>
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
        <div className="content-page flex-1 p-8 md:ml-72 mt-5 text-center overflow-auto md:mt-16">
          <div className="tabel-absen bg-white p-5 rounded-xl shadow-xl border border-gray-300">
            <div className="md:flex justify-between">
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Rekap Perkelas
              </h6>
              <div className="flex md:mt-2 mt-4 items-center gap-2">
                <div className="w-64">
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
                  className="flex-shrink-0 z-10 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                  <option value="5">05</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
            <hr className="mt-3" />
            <form className="flex justify-center items-center gap-4 mt-5">
              <select
                id="kelas"
                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={kelasId}
                onChange={(e) => setKelasId(e.target.value)}>
                <option>Pilih Kelas</option>
                {listKelas.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.namaKelas}
                  </option>
                ))}
              </select>
              <div className="flex sm:flex-row gap-4 mx-auto items-center">
                <button
                  type="button"
                  className="exp bg-green-500 hover:bg-green text-white font-bold py-2 px-4 rounded inline-block ml-auto"
                  onClick={exportPerkelas}
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
            <div className=" overflow-x-auto shadow-md sm:rounded-lg mt-5 py-3">
              {listAbsensi.length === 0 ? (
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
                          <img
                            src={absensi.fotoMasuk}
                            alt="Foto Masuk"
                            className="w-16 h-16 object-cover"
                          />
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap capitalize">
                          {absensi.jamPulang}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap capitalize">
                          <img
                            src={absensi.fotoPulang}
                            alt="Foto Pulang"
                            className="w-16 h-16 object-cover"
                          />
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

export default Perkelas;
