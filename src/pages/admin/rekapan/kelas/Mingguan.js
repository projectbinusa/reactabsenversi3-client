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

function MingguanPerkelas() {
  const [listKelas, setListKelas] = useState([]);
  const [idKelas, setIdKelas] = useState();
  const [rekapPerbulan, setRekapPerbulan] = useState([]);
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const adminId = localStorage.getItem("adminId");
  const token = localStorage.getItem("token");

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
      setListKelas(response.data.reverse());
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleTanggalAwalChange = (event) => {
    const value = event.target.value;
    setTanggalAwal(value);
  };

  const handleTanggalAkhirChange = (event) => {
    const value = event.target.value;
    setTanggalAkhir(value);
  };

  const handleExportClick = async (e) => {
    e.preventDefault();

    // Check if data is available
    if (rekapPerbulan.length === 0) {
      Swal.fire("Peringatan", "Tidak ada data untuk diekspor", "warning");
      return;
    }

    // Extract year and month from selectedDate
    const [year, month] = selectedDate.split("-");

    // Call the export function
    await exportPerkelas(e, month, year);
  };

  function onPageChange(page) {
    setCurrentPage(page);
  }

  useEffect(() => {
    if (adminId) {
      getAllKelas(adminId);
    }
  }, [adminId]);

  // useEffect(() => {
  //   if (idKelas != null) {
  //     getRekapPresensiPerkelasSetiapMinggu(idKelas, tanggalAwal, tanggalAkhir);
  //   }
  // }, [idKelas, tanggalAwal, tanggalAkhir]);

  const getRekapPresensiPerkelasSetiapMinggu = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/rekap-mingguan-per-kelas?kelasId=${idKelas}&tanggalAkhir=${tanggalAkhir}&tanggalAwal=${tanggalAwal}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      //   if (response == 200) {
      const data = response.data;
      setRekapPerbulan(data);
      console.log("list rekap mingguan: ", response.data);
      //   }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchClick = () => {
    if (tanggalAwal && tanggalAkhir && idKelas) {
      getRekapPresensiPerkelasSetiapMinggu(tanggalAwal, tanggalAkhir, idKelas);
    } else {
      Swal.fire("Peringatan", "Silakan pilih kelas dan tanggal terlebih dahulu", "warning");
    }
  };

  // Export data function
  const exportPerkelas = async (e) => {
    e.preventDefault();
    if (!idKelas && !tanggalAwal && tanggalAkhir) {
      Swal.fire(
        "Peringatan",
        "Silakan pilih kelas dan bulan, tahun terlebih dahulu",
        "warning"
      );
      return;
    }
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/export/mingguan/by-kelas?kelasId=${idKelas}&tanggalAkhir=${tanggalAkhir}&tanggalAwal=${tanggalAwal}`,
        {
          responseType: "blob",
        },
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "RekapMingguanPerKelas.xlsx");
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
  // Initialize data on component mount
  // useEffect(() => {
  //   getAllKelas();
  //   if (idKelas != null) {
  //     getRekapPresensiPerkelasSetiapMinggu(idKelas, tanggalAwal, tanggalAkhir);
  //   }
  //   // getAllOrganisasi();
  //   if (idOrganisasi != null) {
  //     getAllKelasByOrganisasi(idOrganisasi);
  //   }
  //   console.log("bulan: ", bulan);
  // }, [idOrganisasi, idKelas, tanggalAwal, tanggalAkhir]);

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
                Rekap Perminggu
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
                  className="flex-shrink-0 z-10 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                >
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
                onChange={(e) => setIdKelas(e.target.value)}
              >
                <option value="">Pilih Kelas</option>
                {listKelas.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.namaKelas}
                  </option>
                ))}
              </select>

              <input
                value={tanggalAwal}
                onChange={handleTanggalAwalChange}
                type="date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <input
                value={tanggalAkhir}
                onChange={handleTanggalAkhirChange}
                type="date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {/* <Select
                options={listKelas}
                value={selectedUser}
                onChange={handleUserChange}
                placeholder="Pilih Kelas"
                className="basic-single w-full"
                classNamePrefix="select"
                styles={{
                  container: (provided) => ({
                    ...provided,
                    width: "100%", // Ensure it takes full width of parent container
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    textAlign: "left", // Align placeholder text to the left
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    textAlign: "left", // Align selected value text to the left
                  }),
                  menu: (provided) => ({
                    ...provided,
                    textAlign: "left", // Align options text to the left
                  }),
                  option: (provided) => ({
                    ...provided,
                    textAlign: "left", // Align individual option text to the left
                  }),
                }}
              /> */}
              {/* <input
                type="date"
                className="appearance-none block w-full bg-white border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
                id="tanggal"
                name="tanggal"
                value={tanggal}
                onChange={handleTanggalChange}
              /> */}
              {/* <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="bulan"
                name="bulan"
                value={bulan}
                onChange={(e) => setBulan(e.target.value)}>
                <option value="">Pilih Bulan</option>
                <option value="01">Januari</option>
                <option value="02">Februari</option>
                <option value="03">Maret</option>
                <option value="04">April</option>
                <option value="05">Mei</option>
                <option value="06">Juni</option>
                <option value="07">Juli</option>
                <option value="08">Agustus</option>
                <option value="09">September</option>
                <option value="10">Oktober</option>
                <option value="11">November</option>
                <option value="12">Desember</option>
              </select> */}

              {/* <div>
                <input
                  type="date"
                  className="appearance-none block w-full bg-white border border-gray-300 rounded py-2 px-3 text-gray-700"
                  value={tanggalAwal}
                  onChange={(e) => setTanggalAwal(e.target.value)}
                />
                <input
                  type="date"
                  className="appearance-none block w-full bg-white border border-gray-300 rounded py-2 px-3 text-gray-700"
                  value={tanggalAkhir}
                  onChange={(e) => setTanggalAkhir(e.target.value)}
                />
              </div> */}
              <div className="flex sm:flex-row gap-4 mx-auto items-center">
                {/* <button
                  type="button"
                  className="bg-indigo-500 hover:bg-indigo text-white font-bold py-2 px-4 rounded inline-block"
                  onClick={() => getAbsensiByUserId(selectedUser?.value)}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button> */}
                <button
                  type="submit"
                  className="exp bg-green-500 hover:bg-green text-white font-bold py-2 px-4 rounded inline-block ml-auto"
                  onClick={handleExportClick}
                  title="Export"
                >
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

            <div className="overflow-x-auto shadow-md sm:rounded-lg mt-5">
              {tanggalAwal && tanggalAkhir ? (
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
                          className="px-6 py-3 text-center text-gray-500"
                        >
                          Tidak ada absen pada minggu ini!
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
              ) : (
                <div className="px-6 py-3 text-center text-gray-500">
                  Silahkan Pilih Tanggal!
                </div>
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

export default MingguanPerkelas;
