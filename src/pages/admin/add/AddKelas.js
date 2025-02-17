import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../../components/NavbarAdmin";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import SidebarNavbar from "../../../components/SidebarNavbar";
import { SidebarProvider } from "../../../components/SidebarContext";
import Navbar1 from "../../../components/Navbar1";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";

function AddKelas() {
  const [namaKelas, setNamaKelas] = useState("");
  const [organisasilist, setOrganisasiList] = useState([]);
  const [selectedOrganisasi, setSelectedOrganisasi] = useState([]);
  const idAdmin = localStorage.getItem("adminId");
  const token = localStorage.getItem("token");
  const selectRef = useRef(null);

  const getOrganisasi = async () => {
    try {
      const org = await axios.get(
        `${API_DUMMY}/api/organisasi/all-by-admin/${idAdmin}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      setOrganisasiList(org.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const tambahKelas = async (e) => {
    e.preventDefault();
    const trimmedKelas = namaKelas.trim();
    try {
      if (!selectedOrganisasi || !idAdmin) {
        throw new Error("Pilih organisasi dan pastikan admin ID tersedia.");
      }
      const response = await axios.get(`${API_DUMMY}/api/kelas/kelas/all`, {
        headers: {
          AuthPrs: `Bearer ${token}`,
        },
      });
      const existingUsers = response.data;
      const isUsernameExists = existingUsers.some(
        (user) => user.namaKelas.toLowerCase() === trimmedKelas.toLowerCase()
      );

      if (isUsernameExists) {
        Swal.fire("Error", "Nama kelas sudah terdaftar", "error");
        return;
      }
      const add = {
        namaKelas: namaKelas,
      };
      const url = `${API_DUMMY}/api/kelas/tambah?idOrganisasi=${selectedOrganisasi}&idAdmin=${idAdmin}`;

      try {
        await axios.post(url, add, {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        });

        Swal.fire({
          title: "Berhasil",
          text: "Berhasil menambahkan data",
          icon: "success",
          showConfirmButton: false,
        });

        setTimeout(() => {
          window.location.href = "/admin/kelas";
        }, 2000);
      } catch (error) {
        console.error("Error adding data:", error);
        Swal.fire("Error", "Gagal menambahkan data", "error");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire(
          "Info",
          "Kelas dengan nama yang sama sudah terdaftar",
          "info"
        );
      } else {
        Swal.fire("Error", error.message || "Gagal menambahkan data", "error");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    getOrganisasi();

    // Initialize Select2 on the correct class
    $(selectRef.current).select2({
      placeholder: "Pilih Organisasi",
      width: "100%",
      multiple: true, // Enable multiple selection
    });

    // Listen for changes in selection
    $(selectRef.current).on("change", function () {
      const selectedOptions = $(this).val();

      // Validasi: Jika pengguna memilih lebih dari satu organisasi
      if (selectedOptions && selectedOptions.length > 1) {
        Swal.fire({
          icon: "warning",
          title: "Maaf",
          text: "Anda hanya dapat memilih satu organisasi!",
        });
        // Hanya simpan pilihan pertama dan batalkan pilihan yang lain
        const firstSelection = [selectedOptions[0]];
        $(selectRef.current).val(firstSelection).trigger("change"); // Update Select2 UI

        setSelectedOrganisasi(firstSelection); // Update state dengan pilihan pertama
      } else {
        setSelectedOrganisasi(selectedOptions || []); // Jika hanya satu pilihan, simpan ke state
      }
    });

    // Cleanup the Select2 instance on unmount
    return () => {
      $(selectRef.current).select2("destroy");
    };
  }, [idAdmin]);

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
      <SidebarProvider>
        <Navbar1 />
        <SidebarNavbar />
      </SidebarProvider>
      <div className="md:w-[78%] w-full mt-16 md:mt-10">
        <div className="sm:ml-64 content-page container md:p-8 md:ml-64">
          <div className="p-4">
            <div className="p-5">
              <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between">
                  <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Tambah Kelas
                  </h6>
                </div>
                <hr />
                <div className="mt-5 text-left">
                  <form onSubmit={tambahKelas}>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="nama_kelas"
                          id="nama_kelas"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          value={namaKelas}
                          onChange={(e) =>
                            setNamaKelas(capitalizeWords(e.target.value))
                          }
                          required
                        />
                        <label
                          htmlFor="nama_kelas"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Nama Kelas
                        </label>
                      </div>

                      <div className="relative z-10 w-full mb-6 group">
                        <select
                          ref={selectRef}
                          id="organisasi"
                          name="id_organisasi"
                          className="js-example-basic-multiple block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          multiple="multiple"
                          required
                        >
                          <option value="" disabled>
                            Pilih Organisasi
                          </option>
                          {Array.isArray(organisasilist) &&
                            organisasilist
                              .slice()
                              .reverse()
                              .map((org) => (
                                <option key={org.id} value={org.id}>
                                  {org.namaOrganisasi}
                                </option>
                              ))}
                        </select>

                        <label
                          htmlFor="organisasi"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        ></label>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <a
                        className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        href="/admin/kelas"
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

export default AddKelas;
