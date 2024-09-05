import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../../components/NavbarUser";
import Webcam from "react-webcam";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import { API_DUMMY } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import SidebarNavbar from "../../../components/SidebarNavbar";
import "../css/AbsenMasuk.css";

function AbsenMasuk() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const webcamRef = useRef(null);
  const [keteranganTerlambat, setKeteranganTerlambat] = useState("");
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [fetchingLocation, setFetchingLocation] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // // Batas koordinat yang diizinkan
  const allowedCoordinates = {
    northWest: { lat: -6.982580885, lon: 110.404028235 },
    northEast: { lat: -6.982580885, lon: 110.404118565 },
    southWest: { lat: -6.982670715, lon: 110.404028235 },
    southEast: { lat: -6.982670715, lon: 110.404118565 },
  };

  // const allowedCoordinates = {
  //   northWest: { lat: -6.968697419671277, lon: 110.25208956395724 },
  //   northEast: { lat: -6.968697419671277, lon: 110.25231003604275 },
  //   southWest: { lat: -6.968878380328723, lon: 110.25208956395724 },
  //   southEast: { lat: -6.968878380328723, lon: 110.25231003604275 },
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let watchId;

    async function requestPermissions() {
      try {
        // Cek apakah izin sudah pernah diminta sebelumnya
        const cameraPermission = localStorage.getItem("cameraPermission");
        const locationPermission = localStorage.getItem("locationPermission");

        if (!cameraPermission) {
          await navigator.mediaDevices.getUserMedia({ video: true });
          localStorage.setItem("cameraPermission", "granted");
        }

        if (!locationPermission) {
          const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          };

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
              console.error("Error mendapatkan lokasi:", error);
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  setError("Izin lokasi ditolak. Harap izinkan akses lokasi.");
                  break;
                case error.POSITION_UNAVAILABLE:
                  setError("Lokasi tidak tersedia. Harap coba lagi.");
                  break;
                case error.TIMEOUT:
                  setError("Permintaan lokasi timeout. Coba lagi.");
                  break;
                default:
                  setError("Gagal mendapatkan lokasi. Coba lagi.");
                  break;
              }
              setFetchingLocation(false);
            },
            options
          );
          localStorage.setItem("locationPermission", "granted");
        }
      } catch (err) {
        console.error("Error meminta akses kamera atau lokasi:", err);
        setError("Gagal mendapatkan akses kamera atau lokasi");
      }
    }

    requestPermissions();

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const tambahkanNolDepan = (num) => {
    return num < 10 ? "0" + num : num;
  };

  const jamSekarang = currentDateTime.getHours();
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // validasi
  const isWithinAllowedCoordinates = (lat, lon) => {
    const { northWest, northEast, southWest, southEast } = allowedCoordinates;
    const tolerance = 0.00001;

    return (
      lat >= southWest.lat - tolerance &&
      lat <= northWest.lat + tolerance &&
      lon >= southWest.lon - tolerance &&
      lon <= northEast.lon + tolerance
    );
  };

  const handleCaptureAndSubmitMasuk = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const imageBlob = await fetch(imageSrc).then((res) => res.blob());

    if (!latitude || !longitude) {
      Swal.fire("Error", "Lokasi belum tersedia", "error");
      return;
    }

    console.log("latitude: ", latitude, "longitude: ", longitude);

    if (isWithinAllowedCoordinates(latitude, longitude)) {
      try {
        const absensiCheckResponse = await axios.get(
          `${API_DUMMY}/api/absensi/checkAbsensi/${userId}`
        );
        const isUserAlreadyAbsenToday =
          absensiCheckResponse.data ===
          "Pengguna sudah melakukan absensi hari ini.";
        if (isUserAlreadyAbsenToday) {
          Swal.fire("Info", "Anda sudah melakukan absensi hari ini.", "info");
        } else {
          const formData = new FormData();
          formData.append("image", imageBlob);
          formData.append("lokasiMasuk", `${address}`);
          formData.append("keteranganTerlambat", keteranganTerlambat || "-");

          const response = await axios.post(
            `${API_DUMMY}/api/absensi/masuk/${userId}`,
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
            title: "Berhasil Absen",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.href = "/user/history_absen";
          }, 1500);
        }
      } catch (err) {
        console.error("Error:", err);
        Swal.fire("Error", "Gagal Absen", "error");
      }
    } else {
      Swal.fire(
        "Error",
        "Lokasi Anda di luar batas yang diizinkan untuk absensi",
        "error"
      );
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex flex-col h-screen">
        <div className="sticky top-0 z-50">
          <SidebarNavbar />
        </div>
        <div className="flex h-full">
          <div className="sticky top-16 z-40">
            <Navbar />
          </div>
          <div className="content-page max-h-screen container p-8 min-h-screen ml-0 lg:ml-64">
            <div className="add-izin mt-12 bg-white p-5 rounded-xl shadow-lg border border-gray-300">
              <h1 className="text-lg sm:text-2xl font -medium mb-4 sm:mb-7">
                Absen Masuk
              </h1>
              <div className="text-base text-center mt-2">
                {currentDateTime.toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                -
                {tambahkanNolDepan(currentDateTime.getHours()) +
                  ":" +
                  tambahkanNolDepan(currentDateTime.getMinutes()) +
                  ":" +
                  tambahkanNolDepan(currentDateTime.getSeconds())}
              </div>
              <div className="text-base text-center mt-2">{ucapan}</div>
              {error && <div className="text-red-500">{error}</div>}
              <form onSubmit={(e) => e.preventDefault()}>
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
                        handleCaptureAndSubmitMasuk();
                      } else {
                        Swal.fire(
                          "Tunggu Sebentar",
                          "Sedang mendapatakan lokasi",
                          "info"
                        );
                      }
                    }}
                    className="block w-32 sm:w-40 bg-blue-500 text-white rounded-lg py-3 text-sm sm:text-xs font-medium">
                    {loading ? "Loading..." : "Ambil Foto"}
                  </button>
                </div>
                <div className="relative mb-3 mt-5">
                  <input
                    type="text"
                    id="keterangan_terlambat"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5"
                    placeholder="Keterangan Terlambat"
                    value={keteranganTerlambat}
                    onChange={(e) => setKeteranganTerlambat(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AbsenMasuk;
