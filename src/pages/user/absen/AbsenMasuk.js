import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import SidebarNavbar from "../../../components/SidebarNavbar";
import "../css/AbsenMasuk.css";
import { SidebarProvider } from "../../../components/SidebarContext";
import Navbar1 from "../../../components/Navbar1";

function AbsenMasuk() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const webcamRef = useRef(null);
  const [keteranganTerlambat, setKeteranganTerlambat] = useState("");
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [loading] = useState(false);
  const [address, setAddress] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [fetchingLocation, setFetchingLocation] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const allowedCoordinates = {
    northWest: { lat: -6.988985050934718, lon: 110.40435783994 },
    northEast: { lat: -6.989424872078232, lon: 110.40505158383749 },
    southWest: { lat: -6.99016918383492, lon: 110.4050114830342 },
    southEast: { lat: -6.989554231156763, lon: 110.40406710911383 },
  };

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
        await navigator.mediaDevices.getUserMedia({ video: true });

        watchId = navigator.geolocation.watchPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);

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
            maximumAge: 1000,
          }
        );
      } catch (err) {
        console.error("Error meminta akses kamera:", err);
        setError("Gagal mendapatkan akses kamera");
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
    const response = await fetch(imageSrc);
    const imageBlob = await response.blob();

    if (!imageBlob) {
      console.error("Tidak ada gambar yang tersedia.");
      Swal.fire("Error", "Gambar tidak tersedia", "error");
      return;
    }

    let imageUrl = null;
    try {
      imageUrl = await uploadImageToS3(imageBlob);
    } catch (error) {
      console.error("Error during image upload:", error);
      Swal.fire("Error", "Gagal mengupload gambar", "error");
      return;
    }

    if (!latitude || !longitude) {
      Swal.fire("Error", "Lokasi belum tersedia", "error");
      return;
    }

    async function uploadImageToS3(file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("https://s3.lynk2.co/api/s3/absenMasuk", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Gagal mengupload gambar");
        }

        const data = await response.json();
        console.log("Respons dari S3:", data);
        if (data.data && data.data.url_file) {
          setImageFile(data.data.url_file);
          console.log("image url: ", data.data.url_file);
          return data.data.url_file;
        } else {
          throw new Error("URL gambar tidak tersedia dalam respons");
        }
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    }

    try {
      const absensiCheckResponse = await axios.get(
        `${API_DUMMY}/api/absensi/checkAbsensi?token=${token}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (absensiCheckResponse.data === "Pengguna sudah melakukan absensi hari ini.") {
        Swal.fire("Info", "Anda sudah melakukan absensi hari ini.", "info");
      } else {
        const formData = new FormData();
        formData.append("image", imageBlob);
        formData.append("lokasiMasuk", address || "");
        formData.append("keteranganTerlambat", keteranganTerlambat || "-");

        console.log("FormData yang dikirim:", [...formData.entries()]);
        console.log("Image URL:", imageUrl);
        await axios.post(
          `${API_DUMMY}/api/absensi/masuk?token=${token}`,
          {
            fotoMasuk: imageUrl,
            lokasiMasuk: address || "",
            keteranganTerlambat: keteranganTerlambat || "-",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
      }
      setTimeout(() => {
        window.location.href = "/user/history_absen";
      }, 3000);
    } catch (err) {
      console.error("Error:", err);
      Swal.fire("Error", "Gagal Absen", "error");
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <SidebarProvider>
          <Navbar1 />
          <SidebarNavbar />
        </SidebarProvider>
        <div className="md:w-[78%] w-full mt-10 md:mt-0">
          <div className="content-page max-h-screen container p-8 min-h-screen ml-0 lg:ml-64">
            <div className="add-izin mt-12 bg-white p-5 rounded-xl shadow-lg border border-gray-300">
              <h1 className="text-lg sm:text-2xl font-medium mb-4 sm:mb-7">
                Absen Masuk
              </h1>
              <div className="text-base text-center mt-2">
                {currentDateTime.toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                - {tambahkanNolDepan(currentDateTime.getHours())}:
                {tambahkanNolDepan(currentDateTime.getMinutes())}:
                {tambahkanNolDepan(currentDateTime.getSeconds())}
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
                    <p>Lokasi: {address}</p>
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
