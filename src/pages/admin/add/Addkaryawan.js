import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";

function AddKaryawan() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [idOrganisasi, setIdOrganisasi] = useState("");
  const [idJabatan, setIdJabatan] = useState("");
  const [idShift, setIdShift] = useState("");
  const [password, setPassword] = useState("");
  const idAdmin = localStorage.getItem("adminId");
  const adminId = localStorage.getItem("adminId");
  const [organisasiList, setOrganisasiList] = useState([]);
  const [jabatanList, setJabatanList] = useState([]);
  const [shiftList, setShiftList] = useState([]);

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    GetAllOrganisasi();
    GetAllJabatan();
    GetAllShift();
  }, []);

  const GetAllOrganisasi = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/organisasi/all-by-admin/${idAdmin}`
      );
      setOrganisasiList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetAllJabatan = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/jabatan/getByAdmin/${adminId}`
      );
      setJabatanList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetAllShift = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/shift/getall-byadmin/${idAdmin}`
      );
      setShiftList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const tambahKaryawan = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        email: email,
        username: username,
        password: password,
      };
      const response = await axios.post(
        `${API_DUMMY}/api/user/tambahkaryawan/${idAdmin}?idOrganisasi=${idOrganisasi}&idJabatan=${idJabatan}&idShift=${idShift}`,
        newUser
      );
      Swal.fire({
        title: "Berhasil",
        text: "Berhasil menambahkan data",
        icon: "success",
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location.href = "/admin/karyawan";
      }, 2000);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Gagal menambahkan data", "error");
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
                    Tambah Karyawan
                  </h6>
                </div>

                <hr />

                <form onSubmit={tambahKaryawan}>
                  <div className="mt-5 text-left">
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          required
                        />
                        <label
                          htmlFor="email"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Email
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="username"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          required
                        />
                        <label
                          htmlFor="username"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Username
                        </label>
                      </div>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <label
                        htmlFor="id_organisasi"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Organisasi
                      </label>
                      <select
                        value={idOrganisasi}
                        onChange={(e) => setIdOrganisasi(e.target.value)}
                        name="id_organisasi"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      >
                        <option value="" disabled>
                          Pilih Organisasi
                        </option>
                        {organisasiList &&
                          organisasiList.slice().reverse().map((org) => (
                            <option key={org.id} value={org.id}>
                              {org.namaOrganisasi}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <label
                        htmlFor="jabatan"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Jabatan
                      </label>
                      <select
                        id="id_jabatan"
                        value={idJabatan}
                        onChange={(e) => setIdJabatan(e.target.value)}
                        name="id_jabatan"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      >
                        <option value="" disabled>
                          Pilih Jabatan
                        </option>
                        {jabatanList.slice().reverse().map((jab) => (
                          <option key={jab.idJabatan} value={jab.idJabatan}>
                            {jab.namaJabatan}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <label
                        htmlFor="id_shift"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Shift
                      </label>
                      <select
                        name="id_shift"
                        value={idShift}
                        onChange={(e) => setIdShift(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      >
                        <option value="" disabled>
                          Pilih Shift
                        </option>
                        {shiftList.slice().reverse().map((sft) => (
                          <option key={sft.id} value={sft.id}>
                            {sft.namaShift}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        autoComplete="off"
                        required
                      />
                      <label
                        htmlFor="password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Password
                      </label>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex">
                      <div className="text-red-500">*</div>
                      <div className="text-sm font-medium text-gray-950 dark:text-gray-950">
                        Password harus memiliki 8 karakter
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex items-center h-5">
                        <input
                          id="showpass"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                          checked={showPassword}
                          onChange={handleShowPasswordChange}
                        />
                      </div>
                      <label
                        htmlFor="showpass"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Show Password
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <a
                      className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      href="/admin/karyawan"
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
  );
}

export default AddKaryawan;
