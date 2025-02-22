import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { API_DUMMY } from "../../../utils/api";
import SidebarNavbar from "../../../components/SidebarNavbar";
import { SidebarProvider } from "../../../components/SidebarContext";
import Navbar1 from "../../../components/Navbar1";

function AddCuti() {
  const [awal_cuti, setAwalCuti] = useState("");
  const [akhir_cuti, setAkhirCuti] = useState("");
  const [masuk_kerja, setMasukKerja] = useState("");
  const [keperluan, setKeperluan] = useState("");

  const addCuti = async (e) => {
    e.preventDefault();

    const add = {
      awalCuti: awal_cuti,
      akhirCuti: akhir_cuti,
      masukKerja: masuk_kerja,
      keperluan: keperluan,
    };

    const token = localStorage.getItem("token");

    if (!token) {
      // Jika token tidak tersedia
      console.error("Token tidak tersedia");
      return;
    }

    try {
      await axios.post(`${API_DUMMY}/api/cuti/tambahCuti?token=${token}`, add);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Berhasil ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.href = "/user/history_cuti";
      }, 1500);
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: "Mohon coba lagi",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };



  const handleBack = () => {
    window.location.href = "/user/dashboard";
  };

  return (
    <div className="flex flex-col h-screen">
      <SidebarProvider>
      <Navbar1 />
      <SidebarNavbar />
    </SidebarProvider>
      <div className="md:w-[78%] w-full mt-10 md:mt-0">
        <div className="content-page max-h-screen container p-8 min-h-screen ml-64">
          <div className="add-cuti mt-12 bg-white p-5 rounded-xl shadow-lg border border-gray-300">
            <h1 className="text-lg sm:text-xl font-medium mb-4 sm:mb-7">
              Halaman Cuti
            </h1>
            <form onSubmit={addCuti}>
              <div className="md:grid grid-cols-2 gap-4">
                <div className="relative mb-3">
                  <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900">
                    Awal Cuti
                  </label>
                  <input
                    type="date"
                    id="awalcuti"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Masukkan Tanggal Awal Cuti"
                    value={awal_cuti}
                    onChange={(e) => setAwalCuti(e.target.value)}
                    required
                  />
                </div>
                <div className="">
                  <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900 ">
                    Akhir Cuti
                  </label>
                  <input
                    type="date"
                    id="akhircuti"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Masukkan Tanggal Akhir Cuti"
                    value={akhir_cuti}
                    onChange={(e) => setAkhirCuti(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="">
                  <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900 ">
                    Masuk Sekolah
                  </label>
                  <input
                    type="date"
                    id="masuk"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Masukkan Tanggal Masuk Sekolah"
                    value={masuk_kerja}
                    onChange={(e) => setMasukKerja(e.target.value)}
                    required
                  />
                </div>{" "}
                <div className="">
                  <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900 ">
                    Keperluan
                  </label>
                  <input
                    type="text"
                    id="keperluan"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Masukkan Keperluan"
                    value={keperluan}
                    onChange={(e) => setKeperluan(e.target.value)}
                    required
                  />
                </div>
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

export default AddCuti;
