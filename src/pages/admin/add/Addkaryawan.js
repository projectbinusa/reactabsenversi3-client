import React, { useEffect, useState } from "react";
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
import ReactSelect from "react-select";

function AddKaryawan() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("Siswa");
  const [idOrganisasi, setIdOrganisasi] = useState("");
  const [idShift, setIdShift] = useState("");
  const [selectedOrangTua, setSelectedOrangTua] = useState(0);
  const [idKelas, setIdKelas] = useState(null);
  const [password, setPassword] = useState("");
  const idAdmin = localStorage.getItem("adminId");
  const token = localStorage.getItem("token");
  const [organisasiList, setOrganisasiList] = useState([]);
  const [shiftList, setShiftList] = useState([]);
  const [orangTuaList, setOrangTuaList] = useState([]);
  const [kelasList, setKelasList] = useState([]);

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    GetAllOrganisasi();
    GetAllShift();
    GetAllOrangTua();
    GetAllKelas();
  }, []);

  const GetAllOrganisasi = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/organisasi/all-by-admin/${idAdmin}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      setOrganisasiList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetAllShift = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/shift/getall-byadmin/${idAdmin}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      setShiftList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetAllOrangTua = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/orang-tua/getALlBySuperAdmin/${idAdmin}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      setOrangTuaList(response.data);
      console.log("dtaa wali murid: ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetAllKelas = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/kelas/getAllByAdmin/${idAdmin}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      setKelasList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const options = orangTuaList.map((ortu) => ({
    value: ortu.id,
    label: ortu.nama,
  }));

  const optionsShift = shiftList.map((ortu) => ({
    value: ortu.id,
    label: ortu.namaShift,
  }));

  const optionsKelas = kelasList.map((ortu) => ({
    value: ortu.id,
    label: ortu.namaKelas,
  }));

  const tambahKaryawan = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();

    try {
      // Fetch data semua pengguna
      const response = await axios.get(`${API_DUMMY}/api/user/get-allUser`, {
        headers: {
          AuthPrs: `Bearer ${token}`,
        },
      });
      const existingUsers = response.data;

      const isEmailExists = existingUsers.some(
        (user) => user.email === trimmedEmail
      );
      const isUsernameExists = existingUsers.some(
        (user) => user.username === username
      );

      if (isEmailExists || isUsernameExists) {
        Swal.fire("Error", "Email atau Username sudah terdaftar", "error");
        return;
      }

      const newUser = {
        email: trimmedEmail,
        username: trimmedUsername,
        password: password,
        status: status,
      };
      console.log("username1: ", username);

      const idOrangTua1 = selectedOrangTua ? selectedOrangTua.value : null;
      // const idKelas1 = idKelas ? idKelas.value : null;
      const idShift1 = idShift ? idShift.value : null;
      const idKelas1 = idKelas ? idKelas.value : null;
      await axios.post(
        `${API_DUMMY}/api/user/tambahkaryawan/${idAdmin}?idOrangTua=${idOrangTua1}&idOrganisasi=${idOrganisasi}&idKelas=${idKelas1}&idShift=${idShift1}`,
        newUser,
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
        showConfirmButton: false,
      });

      setTimeout(() => {
        window.location.href = "/admin/siswa";
      }, 2000);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Gagal menambahkan data", "error");
    }
  };

  // // Helper function to capitalize each word, but not the character after an apostrophe
  // const capitalizeWords = (str) => {
  //   return str.replace(/\b\w/g, (char, index, input) => {
  //     // Check if the character is right after an apostrophe
  //     if (index > 0 && input[index - 1] === "'") {
  //       return char.toLowerCase(); // Keep it lowercase
  //     }
  //     return char.toUpperCase(); // Otherwise, capitalize
  //   });
  // };

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
                    Tambah Siswa
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
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Username
                        </label>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-10 w-full mb-6 group">
                        <label
                          htmlFor="id_organisasi"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Organisasi
                        </label>
                        <select
                          value={idOrganisasi}
                          onChange={(e) => setIdOrganisasi(e.target.value)}
                          name="id_organisasi"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                          <option value="" disabled>
                            Pilih Organisasi
                          </option>
                          {organisasiList &&
                            organisasiList
                              .slice()
                              .reverse()
                              .map((org) => (
                                <option key={org.id} value={org.id}>
                                  {org.namaOrganisasi}
                                </option>
                              ))}
                        </select>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="status"
                          id="status"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          required
                          readOnly
                        />
                        <label
                          htmlFor="jabatan"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Status
                        </label>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-10 w-full mb-6 group">
                        <label
                          htmlFor="id_shift"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Shift
                        </label>
                        <ReactSelect
                          value={idShift}
                          options={optionsShift}
                          onChange={(selected) => setIdShift(selected)}
                          placeholder="Pilih Waktu Pembelajaran"
                        />
                      </div>

                      <div className="relative z-10 w-full mb-6 group">
                        <label
                          htmlFor="id_orang_tua"
                          className="mb-10 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Wali Murid
                        </label>
                        <ReactSelect
                          value={selectedOrangTua}
                          options={options}
                          onChange={(selected) => setSelectedOrangTua(selected)}
                          placeholder="Pilih Wali Murid"
                        />
                        {/* Tambahkan komponen lain di sini */}
                        {/* <div>
                        <h2>Wali Murid Terpilih:</h2>
                        {selectedOrangTua.map((ortu) => (
                          <div key={ortu.value}>{ortu.label}</div>
                        ))}
                      </div> */}
                        {/* <select
                        name="id_orang_tua"
                        value={idOrangTua || ""}
                        onChange={(e) => setIdOrangTua(Number(e.target.value))}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      >
                        <option value="" disabled selected>
                          Pilih Wali Murid
                        </option>
                        {orangTuaList
                          .slice()
                          .reverse()
                          .map((ortu) => (
                            <option key={ortu.id} value={ortu.id}>
                              {ortu.nama}
                            </option>
                          ))}
                      </select> */}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-10 w-full mb-6 group">
                        <label
                          htmlFor="id_shift"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Kelas
                        </label>
                        <ReactSelect
                          value={idKelas}
                          options={optionsKelas}
                          onChange={(selected) => setIdKelas(selected)}
                          placeholder="Pilih Kelas"
                        />
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
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Password
                        </label>
                      </div>
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
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Show Password
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <a
                      className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      href="/admin/siswa">
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </a>
                    <button
                      type="submit"
                      className="text-white bg-indigo-500 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800">
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
