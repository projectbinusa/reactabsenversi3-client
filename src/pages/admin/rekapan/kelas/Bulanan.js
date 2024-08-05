import React, { useState, useEffect } from "react";
import Select from "react-select";
import Navbar from "../../../../components/NavbarAdmin";
import Sidebar from "../../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExport,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import { API_DUMMY } from "../../../../utils/api";
import NavbarAdmin from "../../../../components/NavbarAdmin";

function BulanPerkelas() {
  const [listAbsensi, setListAbsensi] = useState([]);
  const [listKelas, setListKelas] = useState([]);
  const [idKelas, setIdKelas] = useState();
  const [bulan, setBulan] = useState("");
  const [rekapPerbulan, setRekapPerbulan] = useState([]);
  const [tanggal, setTanggal] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");
  const [idOrganisasi, setIdOrganisasi] = useState();

  // Fetch user data
  const getAllKelas = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/api/kelas/kelas/all`);
      //   const userOptions = usList.data.map((user) => ({
      //     value: user.id,
      //     label: user.username
      //       .split(" ")
      //       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      //       .join(" "),
      //   }));
      setListKelas(response.data);
      console.log("list kelas: ", response.data);
      console.log(
        "orpganisasi di dalam kelas: ",
        response.data.map((dt) => dt.organisasi.id)
      );
      const dataOrganisasi = response.data.map((dt) => dt.organisasi.id);

      if (dataOrganisasi.length > 0) {
        setIdOrganisasi(dataOrganisasi[0]);
        // idOrganisasi = dataOrganisasi[0];
        console.log("id organisasi: ", dataOrganisasi[0]);
        return idOrganisasi;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllKelasByOrganisasi = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/kelas/getALlByOrganisasi/${idOrganisasi}`
      );
      console.log("list kelas by organisasi: ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRekapPresensiPerkelasSetiapBulan = async (bulan, tahun) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/bulanan/kelas/${idKelas}?bulan=${bulan}&tahun=${tahun}`
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

    const [year, month] = value.split("-");
    getRekapPresensiPerkelasSetiapBulan(month, year);
  };

  const handleExportClick = (e) => {
    const [year, month] = selectedDate.split("-");
    exportPerkelas(e, month, year);
  };

  // Export data function
  const exportPerkelas = async (e, bulan, tahun) => {
    e.preventDefault();
    if (!idKelas && !selectedDate) {
      Swal.fire(
        "Peringatan",
        "Silakan pilih kelas dan bulan, tahun terlebih dahulu",
        "warning"
      );
      return;
    }
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/export/bulanan/by-kelas?bulan=${bulan}&kelasId=${idKelas}&tahun=${tahun}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "RekapPerkawryawan.xlsx");
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
  useEffect(() => {
    getAllKelas();
    getRekapPresensiPerkelasSetiapBulan();
    // getAllOrganisasi();
    if (idOrganisasi != null) {
      getAllKelasByOrganisasi(idOrganisasi);
    }
    console.log("bulan: ", bulan);
  }, [idOrganisasi]);

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
                id="small"
                class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={idKelas}
                onChange={(e) => setIdKelas(e.target.value)}>
                <option selected>Pilih Kelas</option>
                {listKelas.map((data) => (
                  <option value={data.id}>{data.namaKelas}</option>
                ))}
                {/* <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option> */}
              </select>
              <input
                value={selectedDate}
                onChange={handleDateChange}
                type="month"
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
                  onClick={handleExportClick}>
                  <FontAwesomeIcon icon={faFileExport} />
                </button>
              </div>
            </form>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
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
                  {Object.keys(rekapPerbulan).map((date) =>
                    rekapPerbulan[date].map((absensi, index) => (
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default BulanPerkelas;
