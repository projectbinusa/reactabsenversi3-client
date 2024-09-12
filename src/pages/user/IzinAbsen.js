import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavbarUser";
import axios from "axios";
import Swal from "sweetalert2";
// import { Toast } from "flowbite-react";
import { API_DUMMY } from "../../utils/api";
import SidebarNavbar from "../../components/SidebarNavbar";
import { toast } from "react-toastify";
import { SidebarProvider } from "../../components/SidebarContext";
import Navbar1 from "../../components/Navbar1";

function IzinAbsen() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [keteranganPulangAwal, setKeteranganPulangAwal] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Perbarui setiap detik

    return () => clearInterval(interval);
  }, []); // Tidak ada dependensi, sehingga efek ini hanya dipanggil sekali saat komponen dimuat

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error("Token tidak tersedia");
      return;
    }

    const izin = {
      keteranganPulangAwal,
    };

    try {
     await axios.put(
        `${API_DUMMY}/api/absensi/izin-tengah-hari?token=${token}`, izin, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire("Berhasil", "Berhasil Izin", "success");
      window.location.href = "/user/history_absen";
    } catch (error) {
      console.error("Error:", error);
      toast.error("Gagal Izin");
    }
  };

  const handleBack = () => {
    window.location.href = "/user/history_absen";
  };

  return (
    <div className="flex flex-col h-screen">
      <SidebarProvider>
        <Navbar1 />
        <SidebarNavbar />
      </SidebarProvider>
      <div className="md:w-[78%] w-full mt-10 md:mt-0">
        <div className="md:w-full max-h-screen container p-8 min-h-screen md:ml-64">
          <div className="add-izin mt-12 bg-white p-5 rounded-xl shadow-lg border border-gray-300">
            <h1 className="text-lg sm:text-2xl font-medium mb-4 sm:mb-7">
              Izin Tengah Hari
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
            <form onSubmit={handleSubmit}>
              <div className="relative mb-3">
                <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900">
                  Keterangan Izin
                </label>
                <input
                  type="text"
                  id="keterangan"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5"
                  placeholder="Masukkan Keterangan Izin"
                  value={keteranganPulangAwal}
                  onChange={(e) => setKeteranganPulangAwal(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="block w-20 sm:w-24 rounded-lg text-black outline outline-red-500 py-3 text-sm sm:text-xs font-medium"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="block w-20 sm:w-24 rounded-lg text-black outline outline-blue-500 py-3 text-sm sm:text-xs font-medium"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IzinAbsen;
