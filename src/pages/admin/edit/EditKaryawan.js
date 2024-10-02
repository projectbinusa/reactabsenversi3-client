import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import SidebarNavbar from "../../../components/SidebarNavbar";
import { SidebarProvider } from "../../../components/SidebarContext";
import Navbar1 from "../../../components/Navbar1";
import ReactSelect from "react-select";

function EditKaryawan() {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");
  const [idJabatan, setIdJabatan] = useState("");
  const [idShift, setIdShift] = useState("");
  const [idOrganisasi, setIdOrganisasi] = useState("");
  const [idOrangTua, setIdOrangTua] = useState("");
  const [idKelas, setIdKelas] = useState("");
  const [password, setPassword] = useState("");
  const [jabatanOptions, setJabatanOptions] = useState([]);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [orangTuaOptions, setOrangTuaOptions] = useState([]);
  const [kelasOptions, setKelasOptions] = useState([]);
  const [organisasiOptions, setOrganisasiOptions] = useState([]);
  const { id } = useParams();
  const adminId = localStorage.getItem("adminId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordd, setShowPasswordd] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");

  const getUser = async () => {
    try {
      const res = await axios.get(`${API_DUMMY}/api/user/getUserBy/${id}`, {
        headers: {
          AuthPrs: `Bearer ${token}`,
        },
      });

      if (res.data.kelas) {
        setIdKelas({
          value: res.data.kelas.id,
          label: res.data.kelas.namaKelas,
        });
      } else {
        setIdKelas(null);
      }

      if (res.data.orangTua) {
        setIdOrangTua({
          value: res.data.orangTua.id,
          label: res.data.orangTua.nama,
        });
      } else {
        setIdOrangTua(null);
      }

      if (res.data.shift) {
        setIdShift({
          value: res.data.shift.id,
          label: res.data.shift.namaShift,
        });
      } else {
        setIdShift(null);
      }

      setUsername(res.data.username);
      setStatus(res.data.status);
      setPassword(res.data.password);
      setIdJabatan(res.data.jabatan ? res.data.jabatan.idJabatan : "");
      // setIdShift(res.data.shift ? res.data.shift.id : "");
      // setIdOrangTua(res.data.orangTua ? res.data.orangTua.id : "");
      setIdOrganisasi(res.data.organisasi ? res.data.organisasi.id : "");
    } catch (error) {
      console.log(error);
    }
  };

  const getJabatanOptions = async () => {
    try {
      const res = await axios.get(
        `${API_DUMMY}/api/jabatan/getByAdmin/${adminId}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      setJabatanOptions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getShiftOptions = async () => {
    try {
      const res = await axios.get(
        `${API_DUMMY}/api/shift/getall-byadmin/${adminId}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      setShiftOptions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrganisasiOptions = async () => {
    try {
      const res = await axios.get(
        `${API_DUMMY}/api/organisasi/all-by-admin/${adminId}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      setOrganisasiOptions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrangTuaOptions = async () => {
    try {
      const res = await axios.get(
        `${API_DUMMY}/api/orang-tua/getALlBySuperAdmin/${adminId}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      setOrangTuaOptions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getKelasOptions = async () => {
    try {
      const res = await axios.get(
        `${API_DUMMY}/api/kelas/getAllByAdmin/${adminId}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      setKelasOptions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser(idKelas);
    getJabatanOptions();
    getShiftOptions();
    getOrangTuaOptions();
    getKelasOptions();
    getOrganisasiOptions();
  }, [id, adminId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idOrangTua1 = idOrangTua ? idOrangTua.value : null;
    const idShift1 = idShift ? idShift.value : null;
    const idKelas1 = idKelas ? idKelas.value : null;

    try {
      if (passwordBaru && confirmPassword && passwordBaru !== confirmPassword) {
        Swal.fire(
          "Gagal",
          "Password baru dan konfirmasi password tidak cocok",
          "error"
        );
        return;
      }

      const payload = {
        username: username,
      };

      if (passwordBaru) payload.new_password = passwordBaru;
      if (confirmPassword) payload.confirm_new_password = confirmPassword;
      if (passwordLama) payload.old_password = passwordLama;

      await axios.put(
        `${API_DUMMY}/api/user/editByAdmin/${id}?idKelas=${idKelas1}&idOrangTua=${idOrangTua1}&idOrganisasi=${idOrganisasi}&idShift=${idShift1}`,
        payload,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: "Berhasil",
        text: "Berhasil mengubah data siswa",
        icon: "success",
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/admin/siswa");
        window.location.reload();
      }, 2000);
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === "Username sudah digunakan"
      ) {
        Swal.fire({
          title: "Error",
          text: "Username sudah digunakan",
          icon: "error",
        });
      } else {
        console.log(error);
        Swal.fire({
          title: "Gagal",
          text: "Gagal mengubah data siswa",
          icon: "error",
        });
      }
    }
  };

  const optionsKelas = kelasOptions.map((kelas) => ({
    value: kelas.id,
    label: kelas.namaKelas,
  }));

  const optionsOrtu = orangTuaOptions.map((ortu) => ({
    value: ortu.id,
    label: ortu.nama,
  }));

  const optionsShift = shiftOptions.map((shift) => ({
    value: shift.id,
    label: shift.namaShift,
  }));

  // Helper function to capitalize each word, but not the character after an apostrophe
  // const  = (str) => {
  //   return str.replace(/\b\w/g, (char, index, input) => {
  //     // Check if the character is right after an apostrophe
  //     if (index > 0 && input[index - 1] === "'") {
  //       return char.toLowerCase(); // Keep it lowercase
  //     }
  //     return char.toUpperCase(); // Otherwise, capitalize
  //   });
  // };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "transparent",
      borderBottom: "1px solid #ccc",
      marginTop: "10px",
      poistion: "absolute",
      fontSize: "14px",
      "&:hover": {
        outline: "none",
        boxShadow: "none",
      },
      "&:focus": {
        outline: "none",
        boxShadow: "none",
      },
    }),
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
                    Edit Siswa
                  </h6>
                </div>
                <hr />
                <div className="mt-5 text-left">
                  <form onSubmit={handleSubmit}>
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
                    <div className="grid md:grid-cols-2 md:gap-6 mb-6">
                      <div className="relative z-0 w-full mb-6 group capitalize">
                        <input
                          type="text"
                          name="username"
                          id="username"
                          value={status}
                          readOnly
                          onChange={(e) => setStatus(e.target.value)}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer capitalize"
                          placeholder=" "
                          autoComplete="off"
                          required
                        />
                        <label
                          htmlFor="username"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Status
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group capitalize hidden">
                        <input
                          type="text"
                          name="password"
                          id="password"
                          value={password}
                          readOnly
                          onChange={(e) => setPassword(e.target.value)}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer capitalize"
                          placeholder=" "
                          autoComplete="off"
                          required
                        />
                        <label
                          htmlFor="password"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Status
                        </label>
                      </div>
                      <div className="w-full mb-6 group">
                        <label
                          htmlFor="id_shift"
                          className="peer-focus:font-medium text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Waktu Pembelajaran
                        </label>
                        <ReactSelect
                          styles={customStyles}
                          value={idShift}
                          options={optionsShift}
                          onChange={(selectedOption) => {
                            setIdShift(selectedOption);
                            console.log("Selected option: ", selectedOption);
                          }}
                          placeholder="Pilih Waktu Pembelajaran"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6 mb-6">
                      <div className="w-full mb-6 group">
                        <label
                          htmlFor="id_orang_tua"
                          className="peer-focus:font-medium mt-0 text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Orang Tua
                        </label>
                        <ReactSelect
                          styles={customStyles}
                          value={idOrangTua}
                          options={optionsOrtu}
                          onChange={(selectedOption) => {
                            setIdOrangTua(selectedOption);
                            console.log("Selected option: ", selectedOption);
                          }}
                          placeholder="Pilih Wali Murid"
                        />
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <label
                          htmlFor="id_kelas"
                          className="peer-focus:font-medium text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Kelas
                        </label>
                        <ReactSelect
                          styles={customStyles}
                          value={idKelas}
                          options={optionsKelas}
                          onChange={(selectedOption) => {
                            setIdKelas(selectedOption);
                            console.log("Selected option: ", selectedOption);
                          }}
                          placeholder="Pilih Kelas"
                        />
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <label
                          htmlFor="id_kelas"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Organisasi
                        </label>
                        <select
                          name="idOrganisasi"
                          value={idOrganisasi}
                          onChange={(e) => setIdOrganisasi(e.target.value)}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                          <option value="">Belum memiliki</option>
                          {organisasiOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.namaOrganisasi}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="relative mb-3">
                        <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900">
                          Password Lama
                        </label>
                        <input
                          type={showPasswordd ? "text" : "password"}
                          id="pw-lama"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          // required
                          value={passwordLama}
                          onChange={(e) => setPasswordLama(e.target.value)}
                        />
                        <FontAwesomeIcon
                          icon={showPasswordd ? faEye : faEyeSlash}
                          className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer mt-3"
                          onClick={() => setShowPasswordd(!showPasswordd)}
                        />
                      </div>
                      <div className="relative mb-3">
                        <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900">
                          Password Baru
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="pw-baru"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            // required
                            value={passwordBaru}
                            onChange={(e) => setPasswordBaru(e.target.value)}
                          />
                          <FontAwesomeIcon
                            icon={showPassword ? faEye : faEyeSlash}
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        </div>
                      </div>
                      <div className="relative mb-3">
                        <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900">
                          Konfirmasi Password Baru
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="konfirmasi-pw"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            // required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <FontAwesomeIcon
                            icon={showConfirmPassword ? faEye : faEyeSlash}
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          />
                        </div>
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
                        className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800">
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

export default EditKaryawan;
