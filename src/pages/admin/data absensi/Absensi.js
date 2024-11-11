  import React, { useEffect, useState } from "react";
  import Navbar from "../../../components/NavbarAdmin";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faCloudArrowDown, faInfo } from "@fortawesome/free-solid-svg-icons";
  import axios from "axios";
  import { Pagination } from "flowbite-react";
  import { API_DUMMY } from "../../../utils/api";
  import { useNavigate } from "react-router-dom";
  import Swal from "sweetalert2";
  import SidebarNavbar from "../../../components/SidebarNavbar";
  import { SidebarProvider } from "../../../components/SidebarContext";
  import Navbar1 from "../../../components/Navbar1";

  function Absensi() {
    const [absensi, setAbsensi] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [limit, setLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const token = localStorage.getItem("token");
    const adminId = localStorage.getItem("adminId");

    const getAllAbsensi = async () => {
      try {
        const response = await axios.get(`${API_DUMMY}/api/absensi/admin/${adminId}`, {
          headers: { AuthPrs: `Bearer ${token}` },
        });
        setAbsensi(response.data.reverse());
        console.log("abensi: ", response.data)
        console.log("username : ", response.data.map((dt) => dt.user.username))
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      getAllAbsensi();
    });

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    useEffect(() => {
      const filteredData = absensi.filter((item) =>
        item.user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.statusAbsen?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formatDate(item.tanggalAbsen)?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setTotalPages(Math.ceil(filteredData.length / limit));
    }, [searchTerm, limit, absensi]);

    const handleSearch = (event) => setSearchTerm(event.target.value);
    const handleLimitChange = (event) => {
      setLimit(parseInt(event.target.value));
      setCurrentPage(1);
    };
    const onPageChange = (page) => setCurrentPage(page);

    const filteredAbsensi = absensi.filter((item) =>
      item.user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.statusAbsen?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatDate(item.tanggalAbsen)?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedAbsensi = filteredAbsensi.slice(
      (currentPage - 1) * limit,
      currentPage * limit
    );

    const exportAbsensi = async () => {
      if (absensi.length === 0) {
        Swal.fire("Error", "Tidak ada data untuk diekspor", "error");
        return;
      }
      try {
        const response = await axios.get(
          `${API_DUMMY}/api/absensi/rekap-perkaryawan/export`,
          {
            headers: { AuthPrs: `Bearer ${token}` },
            responseType: "blob",
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `absensi.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        Swal.fire({
          title: "Berhasil",
          text: "Berhasil mengunduh data",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire("Error", "Gagal mengunduh data", "error");
        console.log(error);
      }
    };

    return (
      <div className="flex flex-col h-screen">
        <SidebarProvider>
          <Navbar1 />
          <SidebarNavbar />
        </SidebarProvider>
        <div className="w-full mt-10 md:mt-0">
          <div className="content-page flex-1 p-8 md:ml-72 mt-5 md:mt-20 text-center overflow-auto">
            <div className="tabel-absen bg-white p-5 rounded-xl shadow-xl border border-gray-300">
              <div className="md:flex justify-between">
                <h6 className="text-xl font-bold">Detail History Presensi</h6>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-64 p-2.5 text-sm rounded-l-md bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Search name..."
                  />
                  <select
                    value={limit}
                    onChange={handleLimitChange}
                    className="z-10 py-2.5 px-4 text-sm rounded-r-md bg-gray-100 border-gray-300 dark:bg-gray-700"
                  >
                    <option value="5">05</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                  <a
                    onClick={exportAbsensi}
                    title="Export"
                    className="exp bg-green-500 text-white font-bold py-2 px-4 rounded ml-auto cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faCloudArrowDown} />
                  </a>
                </div>
              </div>
              <hr className="mt-3" />
              <div className="overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3">No</th>
                      <th className="px-4 py-3">Nama Siswa</th>
                      <th className="px-4 py-3">Tanggal</th>
                      <th className="px-4 py-3">Kehadiran</th>
                      <th className="px-4 py-3">Jam Masuk</th>
                      <th className="px-4 py-3">Foto Masuk</th>
                      <th className="px-4 py-3">Jam Pulang</th>
                      <th className="px-4 py-3">Foto Pulang</th>
                      <th className="px-4 py-3">Jam Sekolah</th>
                      <th className="px-4 py-3">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAbsensi.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="px-4 py-4 text-center text-gray-500">
                          Tidak ada data yang ditampilkan
                        </td>
                      </tr>
                    ) : (
                      paginatedAbsensi.map((item, index) => (
                        <tr key={index} className="bg-white dark:bg-gray-800 hover:bg-gray-50">
                                <th
                            scope="row"
                            className="px-4 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            {(currentPage - 1) * limit + index + 1}
                          </th>
                          <td className="px-4 py-2 text-gray-700 text-center capitalize whitespace-nowrap">
                            {item.user.username}
                          </td>
                          <td className="px-4 py-2 text-gray-700 text-center capitalize whitespace-nowrap">
                            {formatDate(item.tanggalAbsen)}
                          </td>
                          <td className="px-4 py-2 text-gray-700 text-center capitalize whitespace-nowrap">
                            {item.statusAbsen}
                          </td>
                          <td className="px-4 py-2 text-gray-700 text-center capitalize">
                            {item.jamMasuk}
                          </td>
                          <td className="px-4 py-2 text-gray-700 text-center capitalize">
                            <img
                              src={item.fotoMasuk ? item.fotoMasuk : "-"}
                              alt="Foto Masuk"
                              className="block py-2.5 px-0 w-25 max-h-32 h-25 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              id="foto_masuk"
                            />
                          </td>
                          <td className="px-4 py-4">{item.jamPulang}</td>
                          <td className="px-4 py-4">
                            <img
                              src={item.fotoPulang ? item.fotoPulang : "-"}
                              alt="Foto Pulang"
                              className="block py-2.5 px-0 w-25 max-h-96 h-25 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              id="foto_pulang"
                            />
                          </td>
                          <td className="px-4 py-2 text-gray-700 text-center capitalize">
                            00 jam 00 menit
                          </td>
                          <td className="px-4 py-2 text-gray-700 text-center capitalize">
                            <a href={`/admin/detailA/${item.id}`}>
                              <button className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50">
                                <span className="inline-block">
                                  <FontAwesomeIcon
                                    icon={faInfo}
                                    className="h-4 w-4"
                                  />
                                </span>
                              </button>
                            </a>
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
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Absensi;
