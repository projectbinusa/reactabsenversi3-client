import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarSuper";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";

function AddLokasiSA() {
  const [namaLokasi, setNamaLokasi] = useState("");
  const [alamat, setAlamat] = useState("");
  const [organisasiList, setOrganisasiList] = useState([]);
  const [organisasiSelected, setOrganisasiSelected] = useState("");
  const idSuperAdmin = localStorage.getItem("superadminId");

  const getAllOrganisasi = async () => {
    try {
      const org = await axios.get(
        `${API_DUMMY}/api/organisasi/superadmin/${idSuperAdmin}`
      );
      setOrganisasiList(org.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrganisasi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newLokasi = {
        namaLokasi: namaLokasi,
        alamat: alamat,
      };
      await axios.post(
        `${API_DUMMY}/api/lokasi/add/superadmin/${idSuperAdmin}?idOrganisasi=${organisasiSelected}`,
        newLokasi
      );
      Swal.fire("Berhasil", "Berhasil menambahkan data", "success");
      window.location.href = "/superadmin/lokasi";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex h-full">
        <div className="fixed">
          <Sidebar />
        </div>
        <div className="sm:ml-64 content-page container p-8 ml-14 md:ml-64 mt-12">
          <div className="p-4">
            <div className="p-5">
              <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between">
                  <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Tambah Lokasi
                  </h6>
                </div>
                <hr />
                <div className="mt-5 text-left">
                  <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="nama_lokasi"
                          id="nama_lokasi"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          value={namaLokasi}
                          onChange={(e) => setNamaLokasi(e.target.value)}
                          required
                        />
                        <label
                          htmlFor="nama_lokasi"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Nama Lokasi
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="alamat_kantor"
                          id="alamat_kantor"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          value={alamat}
                          onChange={(e) => setAlamat(e.target.value)}
                          required
                        />
                        <label
                          htmlFor="alamat_kantor"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Alamat Kantor
                        </label>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <select
                          id="organisasi"
                          name="id_organisasi"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          value={organisasiSelected}
                          onChange={(e) =>
                            setOrganisasiSelected(e.target.value)
                          }
                          required
                        >
                          <option value="" disabled>
                            Pilih Organisasi
                          </option>
                          {organisasiList.slice().reverse().map((org) => (
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
                        href="/superadmin/lokasi"
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

export default AddLokasiSA;
