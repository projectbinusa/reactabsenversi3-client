import React, { useEffect, useState, useRef } from "react";
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
  const userId = localStorage.getItem("userId");
  const [address, setAddress] = useState("");
  const [fetchingLocation, setFetchingLocation] = useState(true);
  const [keteranganPulangAwal, setKeteranganPulangAwal] = useState("");
  const [waktuPulang, setWaktuPulang] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [imageFile, setImageFile] = useState("");
  const token = localStorage.getItem("token");

  // rmh
  //   const allowedCoordinates = {
  //     northWest: { lat: -6.9686335, lon: 110.2521534 },
  //     northEast: { lat: -6.9686335, lon: 110.2522446 },
  //     southWest: { lat: -6.9687235, lon: 110.2521534 },
  //     southEast: { lat: -6.9687235, lon: 110.2522446 },
  // };
  // -6.9825853796404385, 110.40398942261717
  // exc
  // const allowedCoordinates = {
  //   northWest: { lat: -6.982580885, lon: 110.404028235 },
  //   northEast: { lat: -6.982580885, lon: 110.404118565 },
  //   southWest: { lat: -6.982670715, lon: 110.404028235 },
  //   southEast: { lat: -6.982670715, lon: 110.404118565 },
  // };

  //smpn40smg
  const TOLERANCE = 0.00001;
  const allowedCoordinates = {
    northWest: { lat: -6.9886715772467669, lon: 110.40413205141627 },
    northEast: { lat: -6.989250031560412, lon: 110.40553250855176 },
    southWest: { lat: -6.989684282878134, lon: 110.40368713223796 },
    southEast: { lat: -6.99048075110716, lon: 110.40527006050439 },
  };

  const isWithinAllowedCoordinates = (lat, lon) => {
    const { northWest, northEast, southWest, southEast } = allowedCoordinates;
    const isLatInRange =
      lat >= Math.min(northWest.lat, southWest.lat) - TOLERANCE &&
      lat <= Math.max(northWest.lat, southWest.lat) + TOLERANCE;

    const isLonInRange =
      lon >= Math.min(southWest.lon, southEast.lon) - TOLERANCE &&
      lon <= Math.max(northEast.lon, southEast.lon) + TOLERANCE;

    return isLatInRange && isLonInRange;
  };

  const getShift = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/shift/getShift-byUserId/${userId}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
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
  });

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
        const response = await fetch("https://s3.lynk2.co/api/s3/absenPulang", {
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
    // if (isWithinAllowedCoordinates(latitude, longitude)) {
    try {
      console.log("Image URL:", imageUrl);
      await axios.put(
        `${API_DUMMY}/api/absensi/pulang/?token=${token}`, // Tambahkan ID absensi ke URL
        {
          fotoPulang: imageUrl,
          lokasiPulang: address || "",
          keteranganPulangAwal: keteranganPulangAwal || "-",
        },
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
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
    } catch (err) {
      console.error("Error:", err);

      // Cek apakah ada response dari backend
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Gagal Absen"; // Pesan default jika tidak ada pesan dari backend

      // Tampilkan pesan menggunakan Swal
      Swal.fire("Error", errorMessage, "error");
    }
    // } else {
    //       Swal.fire(
    //         "Error",
    //         "Lokasi Anda di luar batas yang diizinkan untuk absensi",
    //         "error"
    //       );
    //     }
  };

  // const handleCaptureAndSubmitPulang = async () => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   const response = await fetch(imageSrc);
  //   const imageBlob = await response.blob(); // Convert imageSrc to Blob

  //   let imageUrl;
  //   try {
  //     imageUrl = await uploadImageToS3(imageBlob);
  //   } catch (error) {
  //     console.error("Error during image upload:", error);
  //     Swal.fire("Error", "Gagal mengupload gambar", "error");
  //     return;
  //   }

  //   if (!latitude || !longitude) {
  //     Swal.fire("Error", "Lokasi belum tersedia", "error");
  //     return;
  //   }

  //   console.log("latitude: ", latitude, "longitude: ", longitude);

  //   async function uploadImageToS3(file) {
  //     const formData = new FormData();
  //     formData.append("file", file);

  //     try {
  //       const response = await fetch("https://s3.lynk2.co/api/s3/absenPulang", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       if (!response.ok) {
  //         throw new Error("Gagal mengupload gambar");
  //       }

  //       const data = await response.json();
  //       console.log("Respons dari S3:", data);
  //       if (data.data && data.data.url_file) {
  //         setImageFile(data.data.url_file);
  //         return data.data.url_file;
  //       } else {
  //         throw new Error("URL gambar tidak tersedia dalam respons");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       throw error;
  //     }
  //   }

  //   // if (isWithinAllowedCoordinates(latitude, longitude)) {
  //     try {
  //       const absensiCheckResponse = await axios.get(
  //         `${API_DUMMY}/api/absensi/checkAbsensi/${userId}`,
  //         {
  //           headers: {
  //             AuthPrs: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       const isUserAlreadyAbsenToday =
  //         absensiCheckResponse.data ===
  //         "Pengguna sudah melakukan absensi hari ini.";

  //       if (!isUserAlreadyAbsenToday) {
  //         Swal.fire(
  //           "Info",
  //           "Anda belum melakukan absensi masuk hari ini.",
  //           "info"
  //         );
  //         setFetchingLocation(false);
  //         return;
  //       }

  //       const currentTime = new Date();
  //       const currentHours = currentTime.getHours();
  //       const currentMinutes = currentTime.getMinutes();
  //       const [shiftHours, shiftMinutes] = waktuPulang.split(":").map(Number);

  //       if (
  //         currentHours < shiftHours ||
  //         (currentHours === shiftHours && currentMinutes < shiftMinutes)
  //       ) {
  //         if (!keteranganPulangAwal) {
  //           Swal.fire(
  //             "Info",
  //             `Anda tidak bisa melakukan absensi pulang sebelum pukul ${waktuPulang} tanpa memberikan keterangan. Mohon isi keterangan pulang awal.`,
  //             "info"
  //           );
  //           setFetchingLocation(false);
  //           return;
  //         }
  //       }

  //       const formData = new FormData();
  //       // if (keteranganPulangAwal) {
  //       //   formData.append("keteranganPulangAwal", keteranganPulangAwal || "");
  //       // }
  //       // formData.append("lokasiPulang", address);

  //       // Proceed with the absensi pulang request
  //       await axios.put(
  //         `${API_DUMMY}/api/absensi/pulang?keteranganPulangAwal=${
  //           keteranganPulangAwal || ""
  //         }&lokasiPulang=${address}&fotoMasuk=${imageUrl}&token=${token}`,
  //         {
  //           headers: {
  //             AuthPrs: `Bearer ${token}`,
  //             // "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );

  //       Swal.fire({
  //         position: "center",
  //         icon: "success",
  //         title: "Berhasil Pulang",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       setTimeout(() => {
  //         window.location.href = "/user/history_absen";
  //       }, 1500);
  //     } catch (err) {
  //       console.error("Error:", err);
  //       // if (response == "User sudah melakukan absensi pulang hari ini.") {
  //       //   Swal.fire("User sudah melakukan absensi pulang hari ini.");
  //       // }
  //       Swal.fire("Error", "Gagal Absen", "error");
  //     } finally {
  //       setFetchingLocation(false);
  //     }
  //   // } else {
  //   //   Swal.fire(
  //   //     "Error",
  //   //     "Lokasi Anda di luar batas yang diizinkan untuk absensi",
  //   //     "error"
  //   //   );
  //   // }
  // };

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
