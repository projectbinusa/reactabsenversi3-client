import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import { API_DUMMY } from "../../../../utils/api";
import NavbarAdmin from "../../../../components/NavbarAdmin";

function Perkelas() {
  const [listAbsensi, setListAbsensi] = useState([]);
  const [listKelas, setListKelas] = useState([]); // Daftar kelas
  const [kelasId, setKelasId] = useState(); // ID kelas yang dipilih
  const [idOrganisasi, setIdOrganisasi] = useState(null);

  useEffect(() => {
    getAllKelas();
    if (kelasId != null) {
      getAbsensiByKelasId(kelasId);
    }
  }, [kelasId]);

  // Fetch kelas data
  const getAllKelas = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/api/kelas/kelas/all`);
      setListKelas(response.data);
      if (response.data.length > 0) {
        setIdOrganisasi(response.data[0].organisasi.id);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  // Fetch absensi data by kelas id
  const getAbsensiByKelasId = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/by-kelas/{kelasId}?kelasId=${kelasId}`
      );
      console.log("Data Absensi:", response.data); // Tambahkan log ini
      setListAbsensi(response.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  // Handle kelas selection
  const handleKelasChange = (event) => {
    const selectedKelasId = event.target.value;
    setKelasId(selectedKelasId);
    if (selectedKelasId) {
      getAbsensiByKelasId(selectedKelasId);
    } else {
      setListAbsensi([]);
    }
  };

  // Export data function
  const exportPerkelas = async () => {
    if (!kelasId) {
      Swal.fire("Peringatan", "Silakan pilih kelas terlebih dahulu", "warning");
      return;
    }
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/export/absensi-rekapan-perkelas`,
        {
          params: { kelasId },
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

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <NavbarAdmin />
      </div>
      <div className="flex h-full pt-5">
        <div className="fixed h-full">
          <Sidebar />
        </div>
        <div className="content-page flex-1 p-8 md:ml-64 mt-16 text-center overflow-auto">
          <div className="tabel-absen bg-white p-5 rounded-xl shadow-xl border border-gray-300">
            <div className="flex justify-between">
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Rekap Perkelas
              </h6>
            </div>
            <hr />
            <form className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-5">
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
                  onClick={exportPerkelas}>
                  <FontAwesomeIcon icon={faFileExport} />
                </button>
              </div>
            </form>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 py-3">
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
                        Jam Kerja
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Keterangan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listAbsensi.map((absensi, index) => (
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perkelas;
