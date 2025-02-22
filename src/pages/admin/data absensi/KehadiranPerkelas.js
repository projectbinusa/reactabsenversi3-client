import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "flowbite-react";
import { API_DUMMY } from "../../../utils/api";
import SidebarNavbar from "../../../components/SidebarNavbar";
import { SidebarProvider } from "../../../components/SidebarContext";
import Navbar1 from "../../../components/Navbar1";
import Swal from "sweetalert2";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function KehadiranPerkelas() {
  const [tanggal, setTanggal] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [kehadiran, setKehadiran] = useState([]);
  const [allAbsensi, setAllAbsensi] = useState([]);
  const idAdmin = localStorage.getItem("adminId");
  const adminId = localStorage.getItem("adminId");
  const token = localStorage.getItem("token");
  const [lateCount, setLateCount] = useState(0);
  const [earlyCount, setEarlyCount] = useState(0);
  const [permissionCount, setPermissionCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAllKaryawanUser = async (
    tanggal = new Date().toISOString().split("T")[0]
  ) => {
    try {
      const all = await axios.get(
        `${API_DUMMY}/api/absensi/rekap/harian/all-kelas/per-hari?tanggal=${tanggal}&idAdmin=${idAdmin}`,
        {
          headers: { AuthPrs: `Bearer ${token}` },
        }
      );
      setKehadiran(all.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAbsensiByAdmin = async () => {
    try {
      const abs = await axios.get(`${API_DUMMY}/api/absensi/admin/${adminId}`, {
        headers: {
          AuthPrs: `Bearer ${token}`,
        },
      });
      setAllAbsensi(abs.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllKaryawanUser(tanggal); // Fetch data based on the selected date
    getAllAbsensiByAdmin();
  }, [tanggal]); // Re-fetch on date change

  useEffect(() => {
    const userAbsensiCounts = kehadiran.map((user) => ({
      userId: user.id,
      lateCount: getAbsensiByUserId(user.id, "Terlambat"),
      earlyCount: getAbsensiByUserId(user.id, "Lebih Awal"),
      permissionCount: getAbsensiByUserId(user.id, "Izin"),
      totalMasuk: getTotalMasukPerBulan(user.id),
    }));

    setKehadiran((prevUsers) =>
      prevUsers.map((user) => {
        const updatedCounts = userAbsensiCounts.find(
          (u) => u.userId === user.id
        );
        return updatedCounts ? { ...user, ...updatedCounts } : user;
      })
    );
  }, [allAbsensi]);

  const getAbsensiByUserId = (userId, status) => {
    return allAbsensi.filter(
      (abs) => abs.user.id === userId && abs.statusAbsen === status
    ).length;
  };

  const getTotalMasukPerBulan = (userId) => {
    const currentMonth = new Date().getMonth() + 1;
    return allAbsensi.filter(
      (abs) =>
        abs.user.id === userId &&
        (abs.statusAbsen === "Lebih Awal" || abs.statusAbsen === "Terlambat") &&
        new Date(abs.tanggalAbsen).getMonth() + 1 === currentMonth
    ).length;
  };

  useEffect(() => {
    const filteredData = kehadiran.filter(
      (kehadiran) => kehadiran.kelasName?.includes(searchTerm) ?? false
    );
    setTotalPages(Math.ceil(filteredData.length / limit));
  }, [searchTerm, kehadiran, limit, currentPage]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleTanggalChange = (event) => {
    setTanggal(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    setCurrentPage(1);
  };

  function onPageChange(page) {
    setCurrentPage(page);
  }

  const filteredKehadiran = kehadiran.filter(
    (kehadiran) => kehadiran.kelasName?.includes(searchTerm) ?? false
  );

  const paginatedKehadiran = filteredKehadiran.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const exportPerkelas = async (e, tanggal) => {
    e.preventDefault();
    if (!tanggal) {
      Swal.fire(
        "Peringatan",
        "Silakan pilih tanggal terlebih dahulu",
        "warning"
      );
      return;
    }
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/export/harian/all-kelas/per-hari`,
        {
          params: { idAdmin, tanggal },
          responseType: "blob",
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Absensi-Kelas-Harian.xlsx");
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

  const handleExportClick = (e) => {
    e.preventDefault();

    if (kehadiran.length === 0) {
      Swal.fire(
        "Peringatan",
        "Data belum tersedia untuk kelas yang dipilih",
        "warning"
      );
      return;
    }

    exportPerkelas(e, tanggal);
  };

  return (
    <div className="flex flex-col h-screen">
      <SidebarProvider>
        <Navbar1 />
        <SidebarNavbar />
      </SidebarProvider>
      <div className="md:w-[78%] w-full mt-10 md:mt-0">
        <div className="sm:ml-64 content-page container md:p-8 ml-0 md:ml-64 md:mt-10 mt-5">
          <div className="p-4">
            <div className="p-5">
              <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="md:flex justify-between">
                  <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Data Kehadiran Perkelas
                  </h6>
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
                    <button
                      type="button"
                      className="exp bg-green-500 hover:bg-green text-white font-bold py-2 px-4 rounded sm:py-2 sm:px-4"
                      onClick={handleExportClick}
                      title="Export"
                    >
                      <FontAwesomeIcon icon={faCloudArrowDown} />
                    </button>
                  </div>
                </div>
                <br />
                <div>
                  <input
                    type="date"
                    className="appearance-none block w-full bg-white border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
                    id="tanggal"
                    name="tanggal"
                    value={tanggal}
                    onChange={handleTanggalChange}
                  />
                </div>
                <hr className="mt-3" />
                <div className="overflow-x-auto mt-5">
                  <table
                    id="dataKehadiran"
                    className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                  >
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          No
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Kelas
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Jumlah Siswa
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Hadir
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Tidak Hadir
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Persentase Kehadiran
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-left">
                      {paginatedKehadiran.length === 0 ? (
                        <tr>
                          <td
                            colSpan="7"
                            className="px-6 py-4 text-center text-gray-500"
                          >
                            Tidak ada data yang ditampilkan
                          </td>
                        </tr>
                      ) : (
                        paginatedKehadiran.map((kehadiran, index) => {
                          const persentaseKehadiran =
                            kehadiran.jumlahSiswa > 0
                              ? (
                                  (kehadiran.hadir / kehadiran.jumlahSiswa) *
                                  100
                                ).toFixed(2)
                              : "0";
                          return (
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
                              <td className="px-6 py-4 text-gray-700 capitalize">
                                {kehadiran.kelasName || "0"}
                              </td>
                              <td className="px-6 py-4 text-gray-700 capitalize">
                                {kehadiran.jumlahSiswa || "0"}
                              </td>
                              <td className="px-6 py-4 text-gray-700 capitalize">
                                {kehadiran.hadir || "0"}
                              </td>
                              <td className="px-6 py-4 text-gray-700 capitalize">
                                {kehadiran.tidakHadir || "0"}
                              </td>
                              <td className="px-6 py-4 text-gray-700 capitalize">
                                {persentaseKehadiran} %
                              </td>
                            </tr>
                          );
                        })
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
    </div>
  );
}

export default KehadiranPerkelas;
