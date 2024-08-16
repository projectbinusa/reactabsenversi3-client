import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavbarSuper";
import Sidebar from "../../components/SidebarUser";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faClipboardUser,
  faUser,
  faInfo,
  faCircleInfo,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../utils/api";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function DashboardOrtu() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [userData, setUserData] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [idAdmin, setIdAdmin] = useState("");
  const [absenData, setAbsenData] = useState([]);
  const [jabatanData, setJabatanData] = useState([]);
  const [lokasiData, setLokasiData] = useState([]);
  const [organisasiData, setOrganisasiData] = useState([]);
  const [username, setUsername] = useState("");
  const [terlambat, setTerlambat] = useState("");
  const [informasi, setInformasi] = useState([]);

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id_orangtua");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const addLeadingZero = (num) => (num < 10 ? "0" + num : num);

  const day = currentDateTime.toLocaleDateString("id-ID", { weekday: "long" });
  const date = currentDateTime.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const time =
    addLeadingZero(currentDateTime.getHours()) +
    ":" +
    addLeadingZero(currentDateTime.getMinutes()) +
    ":" +
    addLeadingZero(currentDateTime.getSeconds());

  const fetchData = async (url, setter) => {
    try {
      const response = await axios.get(url);
      setter(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getUser = () =>
    fetchData(`${API_DUMMY}/api/user/get-allUser`, setUserData);
  const getAbsensi = () =>
    fetchData(`${API_DUMMY}/api/absensi/getAll`, setAbsenData);
  const getJabatan = () =>
    fetchData(`${API_DUMMY}/api/jabatan/all`, setJabatanData);
  const getLokasi = () =>
    fetchData(`${API_DUMMY}/api/lokasi/getall`, setLokasiData);
  // const getOrganisasi = () =>
  //   fetchData(`${API_DUMMY}/api/absensi/by-orang-tua/${id}`, setOrganisasiData);
  // setTerlambat(organisasiData.find((trl) => trl.statusAbsen === "Terlambat"));
  // // console.log('terlambat :', organisasiData.find((trl) => trl.statusAbsen === "Terlambat"));
  // console.log("trlmbt: ", terlambat.statusAbsen)

  const getUsername = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/orang-tua/getbyid/${id}`
      );
      setUsername(response.data.nama);
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  const getOrganisasi = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/by-orang-tua/${id}`
      );
      setOrganisasiData(response.data);
      setTerlambat(response.data.filter((trl) => trl.statusAbsen == "Terlambat"));
      console.log("data: ", response.data);
      console.log(
        "terlambat :",
        response.data.find((trl) => trl.statusAbsen === "Terlambat")
      );
      console.log("jumlah terlambat: ", terlambat.length);

    } catch (error) {
      console.error("Error fetching absensi:", error);
    }
  };

  const getAdmin = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/orang-tua/${id}/admin`
      );
      setAdmin(response.data);
      console.log("admin: ", response.data.id);
      setIdAdmin(response.data.id);
    } catch (error) {
      console.error("Error fetching admin:", error);
    }
  };

  const getInformasi = async () => {
    try {
      if (admin && admin.id) {
        const response = await axios.get(
          // `${API_DUMMY}/api/notifications`
          `${API_DUMMY}/api/notifications/user/getByAdmin/${idAdmin}`
        );
        console.log("notifikasi: ", response.data);
        setInformasi(response.data.reverse());
      }
    } catch (error) {
      console.error("Error fetching informasi:", error);
    }
  };

  const getPresensiByWaliMurid = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/by-orang-tua/${id}`
      );
      setOrganisasiData(response.data.reverse());
      console.log("list data", response.data);
    } catch (error) {
      console.error("Error fetching presensi:", error);
    }
  };

  const formatDate = (tanggal) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const isEventExpired = (eventDate) => {
    const today = new Date();
    const eventDateObj = new Date(eventDate);
    return eventDateObj < today;
  };

  const validInformasi = informasi.filter(
    (item) => !isEventExpired(item.tanggalAcara)
  );

  useEffect(() => {
    getUser();
    getAbsensi();
    getUsername();
    getJabatan();
    getLokasi();
    getAdmin();
    getOrganisasi();
    getPresensiByWaliMurid();
  }, [terlambat]);

  useEffect(() => {
    if (admin) {
      getInformasi();
    }
  }, [admin]);

  useEffect(() => {
    if (localStorage.getItem("loginSuccess") === "true") {
      Swal.fire({
        icon: "success",
        title: "Berhasil masuk!",
      });
      localStorage.removeItem("loginSuccess");
    }
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex h-full">
        <div className="content-page container p-8 ml-0 md:ml-10 mt-12">
          <div className="mt-5 w-full">
            <div className="p-4 text-center bg-indigo-300 border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4">
                Selamat Datang di Presensi
                <span> @{username}</span>
              </h2>
              <a className="profile-menu-link">{day}, </a>
              <a className="profile-menu-link active">{date} - </a>
              <a className="profile-menu-link">{time}</a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-12">
            <div className="pl-2 h-32 bg-indigo-500 rounded-lg shadow-md md:w-auto">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">Absen</p>
                  <p className="text-lg">Jumlah Absen</p>
                  <p className="text-lg">{organisasiData.length}</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faUsers} size="2x" />
                </div>
              </div>
            </div>
            <div className="pl-2 h-32 bg-indigo-500 rounded-lg shadow-md md:w-auto">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">Izin</p>
                  <p className="text-lg">Jumlah Izin</p>
                  <p className="text-lg">{admin.length}</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faClipboardUser} size="2x" />
                </div>
              </div>
            </div>
            <div className="pl-2 h-32 bg-indigo-500 rounded-lg shadow-md md:w-auto">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">Terlambat</p>
                  <p className="text-lg">Jumlah Terlambat</p>
                  <p className="text-lg">{terlambat.length}</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faUser} size="2x" />
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-announcements p-4 bg-slate-200 rounded-lg shadow-xl mt-10">
            <h2 className="text-3xl font-semibold text-black text-center">
              Pengumuman Terbaru
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {validInformasi.length > 0 ? (
                validInformasi.map((item) => (
                  <div
                    key={item.id}
                    className="informasi-item p-4 bg-white border border-gray-200 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-xl">
                    <div className="flex items-center mb-4">
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        className="h-6 w-6 text-blue-500 mr-2"
                      />
                      <h6 className="text-lg font-semibold text-gray-900 capitalize">
                        {item.namaAcara}
                      </h6>
                    </div>
                    <div className="mt-2 mb-2 flex items-center">
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        className="h-4 w-4 text-gray-600 mr-2"
                      />
                      <p className="text-sm font-semibold text-gray-800">
                        Tanggal:
                      </p>
                      <p className="text-sm text-gray-700 ml-2">
                        {formatDate(item.tanggalAcara)}
                      </p>
                    </div>
                    <div className="mt-4">
                      <Link to={"/walimurid/detail_info/" + item.id}>
                        <button className="text-blue-500 hover:underline">
                          Lihat Selengkapnya
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center col-span-3">
                  <h1 className="text-lg text-center text-gray-900 dark:text-white">
                    Tidak Ada Pengumuman !!
                  </h1>
                </div>
              )}
            </div>
          </div>

          <br />
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-10">
            <div className="flex justify-between">
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Data Presensi Siswa
              </h6>
            </div>
            <hr />

            {/* <!-- Tabel --> */}
            <div className="relative overflow-x-auto mt-5">
              <table
                id="dataKaryawan"
                className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                {/* <!-- Tabel Head --> */}
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tanggal Presensi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Jam Masuk
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Jam Pulang
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status Presensi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Aksi
                    </th>
                  </tr>
                </thead>
                {/* <!-- Tabel Body --> */}
                <tbody className="text-left">
                  {organisasiData.map((admin, index) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={index}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {index + 1}
                      </th>
                      <td className="px-6 py-4 capitalize">
                        {admin.user.username}
                      </td>
                      <td className="px-6 py-4 capitalize">
                        {admin.tanggalAbsen}
                      </td>
                      <td className="px-6 py-4 capitalize">{admin.jamMasuk}</td>
                      <td className="px-6 py-4">{admin.jamPulang}</td>
                      <td className="px-6 py-4">{admin.statusAbsen}</td>
                      <td className="px-6 py-4">
                        {" "}
                        <Link to={"/user/detail_absen/" + admin.id}>
                          <button className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50">
                            <span className="relative inline-block">
                              <FontAwesomeIcon
                                icon={faInfo}
                                className="h-4 w-4"
                              />
                            </span>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export default DashboardOrtu;
