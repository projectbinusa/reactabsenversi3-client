import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../../components/NavbarUser";
import Webcam from "react-webcam";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import SidebarNavbar from "../../../components/SidebarNavbar";
import "../css/AbsenMasuk.css";
import { SidebarProvider } from "../../../components/SidebarContext";
import Navbar1 from "../../../components/Navbar1";

function AbsenPulang() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const webcamRef = useRef(null);
  const [error, setError] = useState("");
  console.log(error);
  const userId = localStorage.getItem("userId");
  const [address, setAddress] = useState("");
  const [fetchingLocation, setFetchingLocation] = useState(true);
  const [keteranganPulangAwal, setKeteranganPulangAwal] = useState("");
  const [waktuPulang, setWaktuPulang] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // rmh
  //   const allowedCoordinates = {
  //     northWest: { lat: -6.9686335, lon: 110.2521534 },
  //     northEast: { lat: -6.9686335, lon: 110.2522446 },
  //     southWest: { lat: -6.9687235, lon: 110.2521534 },
  //     southEast: { lat: -6.9687235, lon: 110.2522446 },
  // };

  // exc
  const allowedCoordinates = {
    northWest: { lat: -6.982580885, lon: 110.404028235 },
    northEast: { lat: -6.982580885, lon: 110.404118565 },
    southWest: { lat: -6.982670715, lon: 110.404028235 },
    southEast: { lat: -6.982670715, lon: 110.404118565 },
  };

  const isWithinAllowedCoordinates = (lat, lon) => {
    const { northWest, northEast, southWest } = allowedCoordinates;
    const tolerance = 0.00001; // adding a small tolerance

    return (
      lat >= southWest.lat - tolerance &&
      lat <= northWest.lat + tolerance &&
      lon >= southWest.lon - tolerance &&
      lon <= northEast.lon + tolerance
    );
  };

  const getShift = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/shift/getShift-byUserId/${userId}`
      );

      if (response.data && response.data.waktuPulang) {
        setWaktuPulang(response.data.waktuPulang);
      } else {
        console.error(
          "Data shift tidak ditemukan atau tidak memiliki properti waktuPulang."
        );
      }
    } catch (error) {
      console.error("Error saat mengambil data shift:", error);
    }
  };

  useEffect(() => {
    getShift();
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    let watchId;

    async function requestPermissions() {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });

        watchId = navigator.geolocation.watchPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
            console.log("latitude: ", latitude);
            console.log("longitude: ", longitude);

            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
              );
              const data = await response.json();
              const address = data.display_name;
              setAddress(address);
            } catch (error) {
              console.error("Error:", error);
              setError("Gagal mendapatkan alamat");
            }
            setFetchingLocation(false);
          },
          (error) => {
            console.error("Error:", error);
            setError("Gagal mendapatkan lokasi");
            setFetchingLocation(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 1000, // Menggunakan cache hingga 1 detik untuk hasil yang lebih cepat.
          }
        );
      } catch (err) {
        console.error("Error meminta akses kamera:", err);
        setError("Gagal mendapatkan akses kamera");
      }
    }

    requestPermissions();

    return () => {
      // Bersihkan watchPosition saat komponen dilepas.
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  // Fungsi untuk menambahkan nol di depan angka jika angka kurang dari 10
  const tambahkanNolDepan = (num) => {
    return num < 10 ? "0" + num : num;
  };

  // Dapatkan jam saat ini untuk menentukan waktu hari
  const jamSekarang = currentDateTime.getHours();

  // Tentukan ucapan berdasarkan waktu hari
  let ucapan;
  if (jamSekarang < 10) {
    ucapan = "Selamat Pagi";
  } else if (jamSekarang < 15) {
    ucapan = "Selamat Siang";
  } else if (jamSekarang < 18) {
    ucapan = "Selamat Sore";
  } else {
    ucapan = "Selamat Malam";
  }

  const handleCaptureAndSubmitPulang = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const imageBlob = await fetch(imageSrc).then((res) => res.blob());
    setFetchingLocation(true);

    // Check if the current location is within allowed coordinates
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // const latitude = position.coords.latitude;
        // const longitude = position.coords.longitude;
        console.log("latitude: ", latitude, "longitude: ", longitude);

        if (!isWithinAllowedCoordinates(latitude, longitude)) {
          Swal.fire(
            "Error",
            "Lokasi Anda di luar batas yang diizinkan untuk absensi",
            "error"
          );
          setFetchingLocation(false);
          return;
        }

        try {
          const absensiCheckResponse = await axios.get(
            `${API_DUMMY}/api/absensi/checkAbsensi/${userId}`
          );
          const isUserAlreadyAbsenToday =
            absensiCheckResponse.data ===
            "Pengguna sudah melakukan absensi hari ini.";

          if (!isUserAlreadyAbsenToday) {
            Swal.fire(
              "Info",
              "Anda belum melakukan absensi masuk hari ini.",
              "info"
            );
            setFetchingLocation(false);
            return;
          }

          const currentTime = new Date();
          const currentHours = currentTime.getHours();
          const currentMinutes = currentTime.getMinutes();
          const [shiftHours, shiftMinutes] = waktuPulang.split(":").map(Number);

          if (
            currentHours < shiftHours ||
            (currentHours === shiftHours && currentMinutes < shiftMinutes)
          ) {
            if (!keteranganPulangAwal) {
              Swal.fire(
                "Info",
                `Anda tidak bisa melakukan absensi pulang sebelum pukul ${waktuPulang} tanpa memberikan keterangan. Mohon isi keterangan pulang awal.`,
                "info"
              );
              setFetchingLocation(false);
              return;
            }
          }

          const formData = new FormData();
          formData.append("image", imageBlob, "image.jpeg");

          // Proceed with the absensi pulang request
          await axios.put(
            `${API_DUMMY}/api/absensi/pulang/${userId}?keteranganPulangAwal=${encodeURIComponent(
              keteranganPulangAwal || ""
            )}&lokasiPulang=${encodeURIComponent(address)}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Berhasil Pulang",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.href = "/user/history_absen";
          }, 1500);
        } catch (err) {
          console.error("Error:", err);
          Swal.fire("Error", "Gagal Absen", "error");
        } finally {
          setFetchingLocation(false);
        }
      },
      (error) => {
        console.error("Error:", error);
        Swal.fire("Error", "Gagal mendapatkan lokasi", "error");
        setError("Gagal mendapatkan lokasi");
        setFetchingLocation(false);
      }
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <SidebarProvider>
      <Navbar1 />
      <SidebarNavbar />
    </SidebarProvider>
      <div className="md:w-[78%] w-full mt-10 md:mt-0">
        <div className="content-page max-h-screen container p-8 min-h-screen ml-0 lg:ml-64">
          <div className="add-izin mt-12 bg-white p-5 rounded-xl shadow-lg border border-gray-300">
            <h1 className="text-lg sm:text-2xl font-medium mb-4 sm:mb-7">
              Absen Pulang
            </h1>
            <div className="text-base text-center mt-2">
              {currentDateTime.toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              -{" "}
              {tambahkanNolDepan(currentDateTime.getHours()) +
                ":" +
                tambahkanNolDepan(currentDateTime.getMinutes()) +
                ":" +
                tambahkanNolDepan(currentDateTime.getSeconds())}
            </div>
            <div className="text-base text-center mt-2">{ucapan}</div>
            <form onSubmit={""}>
              <p className="font-bold text-center mt-8">Foto:</p>
              <div className="flex justify-center webcam-container">
                <Webcam audio={false} ref={webcamRef} />
              </div>
              <div className="flex justify-center mt-6">
                {fetchingLocation ? (
                  <p>Mendapatkan lokasi...</p>
                ) : (
                  <p id="address">Alamat: {address}</p>
                )}
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  onClick={() => {
                    if (!fetchingLocation) {
                      handleCaptureAndSubmitPulang();
                    } else {
                      Swal.fire(
                        "Tunggu Sebentar",
                        "Sedang mendapatakan lokasi",
                        "info"
                      );
                    }
                  }}
                  className="block w-32 sm:w-40 bg-blue-500 text-white rounded-lg py-3 text-sm sm:text-xs font-medium"
                >
                  Ambil Foto
                </button>
              </div>
              <div className="relative mb-3 mt-5">
                <input
                  type="text"
                  id="keterangan"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5"
                  placeholder="Keterangan Pulang Awal"
                  value={keteranganPulangAwal}
                  onChange={(e) => setKeteranganPulangAwal(e.target.value)}
                  required
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AbsenPulang;
