import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarDays,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../utils/api";
import SidebarNavbar from "../../components/SidebarNavbar";
import { Link } from "react-router-dom";
import { SidebarProvider } from "../../components/SidebarContext";
import Navbar1 from "../../components/Navbar1";

function Dashboard() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [username, setUsername] = useState({});
  const [absensi, setAbsensi] = useState([]);
  const [totalIzin, setTotalIzin] = useState(0);
  const [isAbsenMasuk, setIsAbsenMasuk] = useState(false);
  const [isPulangDisabled, setIsPulangDisabled] = useState(false);
  const [isPulangTengahHari, setIsPulangTengahHari] = useState(false);
  const [isIzinDisabled, setIsIzinDisabled] = useState(false);
  const [informasi, setInformasi] = useState([]);
  const [admin, setAdmin] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      // Parallel fetching of data
      const [userResponse, absensiResponse, izinResponse] =
        await Promise.all([
          axios.get(`${API_DUMMY}/api/user/getUserBy/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          axios.get(`${API_DUMMY}/api/absensi/getByUserId/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          axios.get(`${API_DUMMY}/api/absensi/checkAbsensi/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
        ]);

        console.log("testinggggggg");
        
      setUsername(userResponse.data);
      console.log("user: ", userResponse.data);
      setAbsensi(absensiResponse.data.reverse());
      console.log("absensi response: ", absensiResponse.data);

      // Cek apakah user sudah melakukan absen masuk
      const isUserAlreadyAbsenToday =
        izinResponse.data === "Pengguna sudah melakukan absensi hari ini.";

      // Cek apakah user sudah melakukan absen pulang
      const isUserAlreadyAbsenPulang = absensiResponse.data.some(
        (absen) => absen.statusAbsen === "Pulang"
      );

      // Cek apakah user sudah melakukan izin
      const hasIzinToday = absensiResponse.data.some(
        (izin) => izin.statusAbsen === "Izin"
      );

      // Atur logika validasi tombol sesuai permintaan
      setIsAbsenMasuk(isUserAlreadyAbsenToday || hasIzinToday);
      setIsPulangDisabled(isUserAlreadyAbsenPulang || hasIzinToday);
      setIsIzinDisabled(
        isUserAlreadyAbsenToday || isUserAlreadyAbsenPulang || hasIzinToday
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/user/getUserBy/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAdmin(response.data.admin.id);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getIzin = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/getizin/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotalIzin(response.data.length);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUserData();
    getIzin();
    console.log("token: ", token);


    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (admin) {
      (async () => {
        try {
          const response = await axios.get(
            `${API_DUMMY}/api/notifications/user/getByAdmin/${admin}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setInformasi(response.data.reverse());
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      })();
    }
  }, [admin]);

  // Function to add leading zero to numbers < 10
  const addLeadingZero = (num) => (num < 10 ? "0" + num : num);

  // Get current date, day, and time
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

  // Function to format date
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  // Function to check if the event date has passed
  const isEventExpired = (eventDate) => new Date(eventDate) < new Date();

  // Filter information to show only events that have not expired
  const validInformasi = informasi.filter(
    (item) => !isEventExpired(item.tanggalAcara)
  );

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
      <SidebarProvider>
        <Navbar1 />
        <SidebarNavbar />
      </SidebarProvider>
      <div className="md:w-[78%] w-full mt-10 md:mt-0">
        <div className="content-page container p-8 min-h-screen ml-0 md:ml-64 mt-2 md:mt-8">
          <div className="mt-2 md:mt-8 bg-slate-200 p-5 rounded-xl shadow-xl">
            <h1 className="judul text-3xl font-semibold text-center capitalize">
              Selamat Datang @{username.username}
            </h1>

            <div className="text-lg text-center mt-2 text-black">
              {day}, {date} - {time}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-7">
              <Link to={isAbsenMasuk ? "#" : "/user/absen"}>
                <div
                  className={`pl-2 h-24 rounded-lg shadow-md md:w-auto ${
                    isAbsenMasuk
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-500"
                  }`}>
                  <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                    <div className="my-auto">
                      <p
                        className={`font-bold ${
                          isAbsenMasuk ? "text-gray-400" : "text-black"
                        }`}>
                        Masuk
                      </p>
                      <p
                        className={`text-lg ${
                          isAbsenMasuk ? "text-gray-400" : "text-black"
                        }`}>
                        Presensi masuk.
                      </p>
                    </div>
                    <div
                      className={`my-auto ${
                        isAbsenMasuk ? "text-gray-400" : "text-black"
                      }`}>
                      <FontAwesomeIcon icon={faArrowRightToBracket} size="2x" />
                    </div>
                  </div>
                </div>
              </Link>

              <Link to={isPulangTengahHari ? "#" : "/user/pulang"}>
                <div
                  className={`pl-2 h-24 rounded-lg shadow-md md:w-auto ${
                    isPulangTengahHari
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-green-500"
                  }`}>
                  <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                    <div className="my-auto">
                      <p
                        className={`font-bold ${
                          isPulangTengahHari ? "text-gray-400" : "text-black"
                        }`}>
                        Pulang
                      </p>
                      <p
                        className={`text-lg ${
                          isPulangTengahHari ? "text-gray-400" : "text-black"
                        }`}>
                        Presensi pulang
                      </p>
                    </div>
                    <div
                      className={`my-auto ${
                        isPulangTengahHari ? "text-gray-400" : "text-black"
                      }`}>
                      <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        size="2x"
                      />
                    </div>
                  </div>
                </div>
              </Link>

              <Link to={isIzinDisabled ? "#" : "/user/izin"}>
                <div
                  className={`pl-2 h-24 rounded-lg shadow-md md:w-auto ${
                    isIzinDisabled
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-orange-500"
                  }`}>
                  <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                    <div className="my-auto">
                      <p
                        className={`font-bold ${
                          isIzinDisabled ? "text-gray-400" : "text-black"
                        }`}>
                        Izin
                      </p>
                      <p
                        className={`text-lg ${
                          isIzinDisabled ? "text-gray-400" : "text-black"
                        }`}>
                        Permohonan Izin
                      </p>
                    </div>
                    <div
                      className={`my-auto ${
                        isIzinDisabled ? "text-gray-400" : "text-black"
                      }`}>
                      <FontAwesomeIcon icon={faCircleXmark} size="2x" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="flex justify-center mt-3 gap-4 flex-col md:flex-row"></div>
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
                      <Link to={"/user/detail_info/" + item.id}>
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

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mt-12 mb-10">
            <div className="bg-blue-500 rounded-lg shadow-md p-4 md:w-full lg:w-auto">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-bold text-lg">Total Presensi</p>
                  <p className="text-white text-md">
                    Jumlah Presensi yang tercatat
                  </p>
                </div>
                <div className="text-white text-2xl font-semibold">
                  {absensi.length}
                </div>
              </div>
            </div>

            <div className="bg-red-500 rounded-lg shadow-md p-4 md:w-full lg:w-auto">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-bold text-lg">Total Izin</p>
                  <p className="text-white text-md">
                    Jumlah izin yang diajukan
                  </p>
                </div>
                <div className="text-white text-2xl font-semibold">
                  {totalIzin}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
