import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import SidebarNavbar from "../../../components/SidebarNavbar";
import { SidebarProvider } from "../../../components/SidebarContext";
import Navbar1 from "../../../components/Navbar1";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";

function AddLokasi() {
  const [namaLokasi, setNamaLokasi] = useState("");
  const [alamat, setAlamat] = useState("");
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

  const tambahLokasi = async (e) => {
    e.preventDefault();
    try {
      if (!selectedOrganisasi) {
        throw new Error("Pilih organisasi terlebih dahulu.");
      }
      const add = {
        namaLokasi: namaLokasi,
        alamat: alamat,
      };
      await axios.post(
        `${API_DUMMY}/api/lokasi/tambah/${idAdmin}?idOrganisasi=${selectedOrganisasi}`,
        add,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "Berhasil",
        text: "Berhasil menambahkan data",
        icon: "success",
        showConfirmButton: false, // Ini akan menghilangkan tombol konfirmasi
      });
      setTimeout(() => {
        window.location.href = "/admin/lokasi";
      }, 2000);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", error.message || "Gagal menambahkan data", "error");
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
      <div className="md:w-[78%] w-full mt-10 md:mt-0">
        <div className=" sm:ml-64 content-page container md:p-8 md:ml-64 mt-12">
          <div className="p-4 ">
            <div className="p-5">
              {/* <!-- Card --> */}
              <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                {/* <!-- Header --> */}
                <div className="flex justify-between">
                  <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Tambah Lokasi
                  </h6>
                </div>
                <hr />
                <div className="mt-5 text-left">
                  <form onSubmit={tambahLokasi}>
                    {/* <!-- Form Input --> */}
                    <div className="grid md:grid-cols-2 md:gap-6">
                      {/* <!-- Nama Lokasi Input --> */}
                      <div className="relative z-10 w-full mb-6 group">
                        <input
                          type="text"
                          name="nama_lokasi"
                          id="nama_lokasi"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          value={namaLokasi}
                          onChange={(e) =>
                            setNamaLokasi(capitalizeWords(e.target.value))
                          }
                          required
                        />
                        <label
                          htmlFor="nama_lokasi"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Nama Lokasi
                        </label>
                      </div>

                      {/* <!-- Alamat Kantor Input --> */}
                      <div className="relative z-10 w-full mb-6 group">
                        <input
                          type="text"
                          name="alamat_kantor"
                          id="alamat_kantor"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          value={alamat}
                          onChange={(e) =>
                            setAlamat(capitalizeWords(e.target.value))
                          }
                          required
                        />
                        <label
                          htmlFor="alamat_kantor"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Alamat Sekolah
                        </label>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                      {/* <!-- Pilihan Organisasi --> */}
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

                    {/* <!-- Button --> */}
                    <div className="flex justify-between">
                      <a
                        className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        href="/admin/lokasi"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </a>
                      <button
                        type="submit"
                        className="text-white bg-indigo-500  focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
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

export default AddLokasi;
