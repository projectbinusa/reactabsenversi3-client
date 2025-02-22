import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../../components/NavbarAdmin";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import { API_DUMMY } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import SidebarNavbar from "../../../components/SidebarNavbar";
import { SidebarProvider } from "../../../components/SidebarContext";
import Navbar1 from "../../../components/Navbar1";

export default function AddOrganisasi() {
  const [loading, setLoading] = useState(false);
  const [namaOrganisasi, setNamaOrganisasi] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [nomerTelepon, setNomerTelepon] = useState("");
  const [emailOrganisasi, setEmailOrganisasi] = useState("");
  const [image, setImage] = useState(null);
  const idAdmin = localStorage.getItem("adminId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const organisasi = {
      namaOrganisasi: namaOrganisasi,
      alamat: alamat,
      kecamatan: kecamatan,
      kabupaten: kabupaten,
      provinsi: provinsi,
      nomerTelepon: nomerTelepon,
      emailOrganisasi: emailOrganisasi,
    };

    formData.append("image", image);

    const trimmed = namaOrganisasi.trim();
    try {
      // Send the organisasi object first
      const organisasiResponse = await axios.post(
        `${API_DUMMY}/api/organisasi/tambahByIdAdmin/${idAdmin}/data`,
        organisasi,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const organisasiId = organisasiResponse.data.id;

      formData.append("organisasiId", organisasiId);

      await axios.post(
        `${API_DUMMY}/api/organisasi/tammbahImageByOrg/${idAdmin}/image`,
        formData,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const existingUsers = organisasiResponse.data;

      const nameOrganisasiExists = existingUsers.some(
        (user) => user.namaOrganisasi.toLowerCase() === trimmed.toLowerCase()
      );

      if (nameOrganisasiExists) {
        Swal.fire("Error", "Nama organisasi sudah terdaftar", "error");
        return;
      }

      Swal.fire({
        title: "Berhasil",
        text: "Berhasil menambahkan data",
        icon: "success",
        showConfirmButton: false, // Ini akan menghilangkan tombol konfirmasi
      });
      setTimeout(() => {
        window.location.href = "/admin/organisasi";
      }, 2000);
    } catch (error) {
      Swal.fire("Gagal", "Gagal Menambahkan organisasi", "error");
      navigate("/admin/organisasi");
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
    <>
      {loading && <Loader />}
      <div className="flex flex-col h-screen">
        <SidebarProvider>
          <Navbar1 />
          <SidebarNavbar />
        </SidebarProvider>
        <div className="md:w-[78%] w-full mt-10 md:mt-0">
          <div className="sm:ml-64 content-page container md:p-8 md:ml-64 mt-12">
            <div className="p-4">
              <div className="p-5">
                <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex justify-between">
                    <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                      Tambah Organisasi
                    </h6>
                  </div>
                  <hr />
                  <div className="mt-5 text-left">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                      <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            name="nama_organisasi"
                            id="nama_organisasi"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={namaOrganisasi}
                            onChange={(e) => setNamaOrganisasi(e.target.value)}
                            required
                          />
                          <label
                            htmlFor="nama_organisasi"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Nama Organisasi
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            name="alamat"
                            id="alamat"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={alamat}
                            onChange={(e) =>
                              setAlamat(capitalizeWords(e.target.value))
                            }
                            required
                          />
                          <label
                            htmlFor="alamat"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Alamat
                          </label>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            name="nomer_telepon"
                            id="nomer_telepon"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={nomerTelepon}
                            onChange={(e) => setNomerTelepon(e.target.value)}
                            required
                          />
                          <label
                            htmlFor="nomer_telepon"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            No Telepon
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="email"
                            name="email_organisasi"
                            id="email_organisasi"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={emailOrganisasi}
                            onChange={(e) => setEmailOrganisasi(e.target.value)}
                            required
                          />
                          <label
                            htmlFor="email_organisasi"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Email Organisasi
                          </label>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            name="kecamatan"
                            id="kecamatan"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={kecamatan}
                            onChange={(e) =>
                              setKecamatan(capitalizeWords(e.target.value))
                            }
                            required
                          />
                          <label
                            htmlFor="kecamatan"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Kecamatan
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            name="kabupaten"
                            id="kabupaten"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={kabupaten}
                            onChange={(e) =>
                              setKabupaten(capitalizeWords(e.target.value))
                            }
                            required
                          />
                          <label
                            htmlFor="kabupaten"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Kota/Kabupaten
                          </label>
                        </div>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="provinsi"
                          id="provinsi"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={provinsi}
                          onChange={(e) =>
                            setProvinsi(capitalizeWords(e.target.value))
                          }
                          required
                        />
                        <label
                          htmlFor="provinsi"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Provinsi
                        </label>
                      </div>
                      <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Upload Logo Organisasi
                        </label>
                        <input
                          type="file"
                          name="image"
                          id="image"
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          onChange={(e) => setImage(e.target.files[0])}
                          required
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between mt-3">
                        <a
                          href="/admin/organisasi"
                          className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-3 sm:mt-0">
                          <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="mr-2"
                          />
                          Back
                        </a>
                        <button
                          type="submit"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          <FontAwesomeIcon
                            icon={faFloppyDisk}
                            className="mr-2"
                          />
                          Submit
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
    </>
  );
}
