import React, { useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import SidebarNavbar from "../../../components/SidebarNavbar";

function AddInformasi() {
  const [message, setMessage] = useState("");
  const [namaAcara, setNamaAcara] = useState("");
  const [tanggalAcara, setTanggalAcara] = useState("");
  const [tempatAcara, setTempatAcara] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date().toISOString());
  const idAdmin = localStorage.getItem("adminId");

  const TambahInformasi = async (e) => {
    e.preventDefault();
    const informasi = {
      namaAcara: namaAcara,
      message: message,
      tanggalAcara: tanggalAcara,
      tempatAcara: tempatAcara,
      createdAt: createdAt,
    };

    try {
      const response = await axios.post(
        `${API_DUMMY}/api/notifications/user/send/${idAdmin}`,
        informasi
      );
      Swal.fire({
        title: "Berhasil",
        text: "Berhasil menambahkan data",
        icon: "success",
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location.href = "/admin/informasi";
      }, 2000);
    } catch (error) {
      console.error("There was an error adding the informasi!", error);
      Swal.fire("Error", "Gagal menambahkan informasi", "error");
    }
  };

// Helper function to capitalize each word, but not the character after an apostrophe
const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char, index, input) => {
    // Check if the character is right after an apostrophe
    if (index > 0 && input[index - 1] === "'") {
      return char.toLowerCase(); // Keep it lowercase
    }
    return char.toUpperCase(); // Otherwise, capitalize
  });
};

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <SidebarNavbar />
      </div>
      <div className="flex h-full">
        <div className="sticky top-16 z-40">
          <Navbar />
        </div>
        <div className=" sm:ml-64 content-page container md:p-8 md:ml-64 mt-12">
          <div className="p-4">
            <div className="p-5">
              <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between">
                  <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Tambah Informasi
                  </h6>
                </div>
                <hr />
                <div className="mt-5 text-left">
                  <form onSubmit={TambahInformasi}>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="nama_acara"
                          id="nama_acara"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          required
                          value={namaAcara}
                          onChange={(e) => setNamaAcara(capitalizeWords(e.target.value))}
                        />
                        <label
                          htmlFor="nama_acara"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Nama Acara
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="datetime-local"
                          name="tanggal_acara"
                          id="tanggal_acara"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          required
                          value={tanggalAcara}
                          onChange={(e) => setTanggalAcara(e.target.value)}
                        />
                        <label
                          htmlFor="tanggal_acara"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Tanggal Acara
                        </label>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="tempat_acara"
                          id="tempat_acara"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          required
                          value={tempatAcara}
                          onChange={(e) => setTempatAcara(capitalizeWords(e.target.value))}

                        />
                        <label
                          htmlFor="tempat_acara"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Tempat Acara
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <textarea
                          name="message"
                          id="message"
                          rows="6"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none resize-y dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          required
                          value={message}
                          onChange={(e) => setMessage(capitalizeWords(e.target.value))}
                        ></textarea>
                        <label
                          htmlFor="message"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Pesan
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <a
                        className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        href="/admin/informasi"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </a>
                      <button
                        type="submit"
                        className="text-white bg-indigo-500 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                      >
                        <FontAwesomeIcon icon={faFloppyDisk} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddInformasi;
