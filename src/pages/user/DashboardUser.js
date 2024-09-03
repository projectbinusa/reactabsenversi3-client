import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarDays,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import Navbar from "../../components/NavbarUser";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../utils/api";
import SidebarNavbar from "../../components/SidebarNavbar";
import { Link } from "react-router-dom";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [username, setUsername] = useState({});
  const [absensi, setAbsensi] = useState([]);
  const [cuti, setCuti] = useState([]);
  const [izin, setIzin] = useState([]);
  const [totalIzin, setTotalIzin] = useState(0);
  const [isAbsenMasuk, setIsAbsenMasuk] = useState(false);
  const [isPulangDisabled, setIsPulangDisabled] = useState(false);
  const [isPulangTengahHari, setIsPulangTengahHari] = useState(false);
  const [isIzinDisabled, setIsIzinDisabled] = useState(false);
  const [informasi, setInformasi] = useState([]);
  const userId = localStorage.getItem("userId");
  const adminId = localStorage.getItem("adminId");
  const [admin, setAdmin] = useState(null);

  const getUsername = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.get(
        `${API_DUMMY}/api/user/getUserBy/${userId}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );

      setUsername(response.data);
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  // const cekAbsensi = async () => {
  //   try {
  //     const absensiCheckResponse = await axios.get(
  //       `${API_DUMMY}/api/absensi/checkAbsensi/${userId}`
  //     );
  //     const isUserAlreadyAbsenToday =
  //       absensiCheckResponse.data ===
  //       "Pengguna sudah melakukan absensi hari ini.";
  //     console.log("Is User Already Absen Today:", isUserAlreadyAbsenToday);

  //     const izinCheckResponse = await axios.get(
  //       `${API_DUMMY}/api/absensi/checkIzin/${userId}`
  //     );
  //     const izin = izinCheckResponse.data;
  //     console.log(izin);
  //     let hasMiddayLeave = false;

  //     if (izin && Array.isArray(izin)) {
  //       hasMiddayLeave = izin.some((izin) => {
  //         return izin.statusAbsen === "Izin Tengah Hari"; // Check if the status is "Izin Tengah Hari"
  //       });
  //     }

  //     console.log("Has midday leave:", hasMiddayLeave);

  //     setIsPulangDisabled(izinCheckResponse);
  //     setIsIzinDisabled(isUserAlreadyAbsenToday);
  //     setIsAbsenMasuk(isUserAlreadyAbsenToday);
  //   } catch (error) {
  //     console.error("Error checking absensi or izin:", error);
  //   }
  // };

  // const getIzin = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${API_DUMMY}/api/absensi/getByUserId/${userId}`
  //     );
  //     const izinData = response.data.reverse();
  //     setIzin(izinData);
  //     setTotalIzin(izinData.length);

  //     // Check if any izin has the status "Izin Tengah Hari"
  //     const hasMiddayIzin = izinData.some((izin) => {
  //       return (
  //         izin.statusAbsen === "Izin Tengah Hari" ||
  //         izin.statusAbsen === "Izin" ||
  //         new Date(izin.tanggalAbsen).setHours(0, 0, 0, 0) <
  //           new Date().setHours(0, 0, 0, 0)
  //       );
  //     });

  //     if (hasMiddayIzin) {
  //       setIsPulangDisabled(true);
  //     } else {
  //       setIsPulangDisabled(false);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching izin:", error);
  //   }
  // };

  const cekAbsensi = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const absensiCheckResponse = await axios.get(
        `${API_DUMMY}/api/absensi/checkAbsensi/${userId}`
      );
      const isUserAlreadyAbsenToday =
        absensiCheckResponse.data ===
        "Pengguna sudah melakukan absensi hari ini.";
      console.log("Is User Already Absen Today:", isUserAlreadyAbsenToday);

      const izinCheckResponse = await axios.get(
        `${API_DUMMY}/api/absensi/checkIzin/${userId}`
      );
      const hasTakenLeave =
        izinCheckResponse.data === "Pengguna sudah melakukan izin.";
      console.log("Has taken leave:", hasTakenLeave);

      setIsPulangDisabled(hasTakenLeave);
      console.log("Is Pulang Disabled:", isPulangDisabled);

      // The 'Izin' button is disabled if the user has both 'absen masuk' and 'izin' on the same day
      setIsIzinDisabled(isUserAlreadyAbsenToday);
      console.log("tes: ", isIzinDisabled);

      // Set the 'Absen Masuk' status
      setIsAbsenMasuk(isUserAlreadyAbsenToday);
    } catch (error) {
      console.error("Error checking absensi or izin:", error);
    }
  };

  const getIzin = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/getByUserId/${userId}`
      );
      const izinData = response.data.reverse();

      // Get today's date at midnight for accurate comparison
      const today = new Date().setHours(0, 0, 0, 0);

      // Filter izin data to include both "Izin" and "Izin Tengah Hari"
      const filteredIzin = izinData.filter((izin) => {
        return (
          izin.statusAbsen === "Izin Tengah Hari" || izin.statusAbsen === "Izin"
        );
      });

      // Set the total izin count based on the filtered izin data
      setTotalIzin(filteredIzin.length);

      // Check if any "Izin" or "Izin Tengah Hari" exists for today
      const hasMiddayIzin = filteredIzin.some((izin) => {
        const izinDate = new Date(izin.tanggalAbsen).setHours(0, 0, 0, 0);
        return izinDate === today;
      });
      console.log("has : ", hasMiddayIzin);

      // Disable "Pulang" button only if there's a relevant izin today
      setIsPulangTengahHari(hasMiddayIzin);
      // console.log("tets: ", isPulangDisabled);
    } catch (error) {
      console.error("Error fetching izin:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    getUsername();
    getAbsensi();
    getCuti();
    getIzin(); // Ensure this runs to check and disable the "Pulang" button
    cekAbsensi();

    return () => clearInterval(interval);
  }, []);

  const getAbsensi = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/getByUserId/${userId}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );

      setAbsensi(response.data.reverse());
    } catch (error) {
      console.error("Error fetching absensi:", error);
    }
  };

  const getCuti = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.get(
        `${API_DUMMY}/api/cuti/getByUser/${userId}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );

      setCuti(response.data.reverse());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2026/api/user/getUserBy/${userId}`
      );
      const userData = response.data;
      setAdmin(userData.admin.id);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const Informasi = async (adminId) => {
    try {
      const response = await axios.get(
        `http://localhost:2026/api/notifications/user/getByAdmin/${adminId}`
      );
      setInformasi(response.data.reverse());
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    console.log("Admin ID:", admin);
    if (admin) {
      Informasi(admin);
    }
  }, [admin]);

  // const Informasi = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${API_DUMMY}/api/notifications/user/getByAdmin/${idAdmin}`
  //     );
  //     setInformasi(response.data.reverse());
  //   } catch (error) {
  //     console.error("Error fetching informasi:", error);
  //   }
  // };

  // useEffect(() => {
  //   Informasi();
  // }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentDateTime(new Date());
  //   }, 1000);

  //   getUsername();
  //   getAbsensi();
  //   getCuti();
  //   getIzin();
  //   cekAbsensi();

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    setUsername(username); // Setelah mendapatkan respons, atur username
  }, [username]); // Tambahkan username sebagai dependensi

  // Fungsi untuk menambah nol di depan angka jika angka kurang dari 10
  const addLeadingZero = (num) => {
    return num < 10 ? "0" + num : num;
  };

  // Mendapatkan informasi hari, tanggal, dan waktu
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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

  // Fungsi untuk memeriksa apakah tanggal acara sudah lewat
  const isEventExpired = (eventDate) => {
    const today = new Date();
    const eventDateObj = new Date(eventDate);
    return eventDateObj < today;
  };

  // Filter informasi untuk hanya menampilkan acara yang belum lewat
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
      <div className="sticky top-0 z-50">
        <SidebarNavbar />
      </div>
      <div className="flex h-full">
        <div className="sticky top-16 z-40">
          <Navbar />
        </div>
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
                  }`}
                >
                  <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                    <div className="my-auto">
                      <p
                        className={`font-bold ${
                          isAbsenMasuk ? "text-gray-400" : "text-black"
                        }`}
                      >
                        Masuk
                      </p>
                      <p
                        className={`text-lg ${
                          isAbsenMasuk ? "text-gray-400" : "text-black"
                        }`}
                      >
                        Presensi masuk.
                      </p>
                    </div>
                    <div
                      className={`my-auto ${
                        isAbsenMasuk ? "text-gray-400" : "text-black"
                      }`}
                    >
                      <FontAwesomeIcon icon={faArrowRightToBracket} size="2x" />
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                to={
                  isPulangDisabled || isPulangTengahHari ? "#" : "/user/pulang"
                }
              >
                <div
                  className={`pl-2 h-24 rounded-lg shadow-md md:w-auto ${
                    isPulangDisabled || isPulangTengahHari
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-green-500"
                  }`}
                >
                  <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                    <div className="my-auto">
                      <p
                        className={`font-bold ${
                          isPulangDisabled || isPulangTengahHari
                            ? "text-gray-400"
                            : "text-black"
                        }`}
                      >
                        Pulang
                      </p>
                      <p
                        className={`text-lg ${
                          isPulangDisabled || isPulangTengahHari
                            ? "text-gray-400"
                            : "text-black"
                        }`}
                      >
                        Presensi pulang
                      </p>
                    </div>
                    <div
                      className={`my-auto ${
                        isPulangDisabled || isPulangTengahHari
                          ? "text-gray-400"
                          : "text-black"
                      }`}
                    >
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
                  }`}
                >
                  <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                    <div className="my-auto">
                      <p
                        className={`font-bold ${
                          isIzinDisabled ? "text-gray-400" : "text-black"
                        }`}
                      >
                        Izin
                      </p>
                      <p
                        className={`text-lg ${
                          isIzinDisabled ? "text-gray-400" : "text-black"
                        }`}
                      >
                        Permohonan Izin
                      </p>
                    </div>
                    <div
                      className={`my-auto ${
                        isIzinDisabled ? "text-gray-400" : "text-black"
                      }`}
                    >
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
                    className="informasi-item p-4 bg-white border border-gray-200 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-xl"
                  >
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
