import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import SidebarNavbar from "../../../components/SidebarNavbar";

function EditKaryawan() {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");
  const [idJabatan, setIdJabatan] = useState("");
  const [idShift, setIdShift] = useState("");
  const [idOrangTua, setIdOrangTua] = useState("");
  const [idKelas, setIdKelas] = useState("");
  const [jabatanOptions, setJabatanOptions] = useState([]);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [orangTuaOptions, setOrangTuaOptions] = useState([]);
  const [kelasOptions, setKelasOptions] = useState([]);
  const { id } = useParams();
  const adminId = localStorage.getItem("adminId");
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await axios.get(`${API_DUMMY}/api/user/getUserBy/${id}`);
      setUsername(res.data.username);
      setStatus(res.data.status);
      setIdJabatan(res.data.jabatan ? res.data.jabatan.idJabatan : "");
      setIdShift(res.data.shift ? res.data.shift.id : "");
      setIdOrangTua(res.data.orangTua ? res.data.orangTua.id : "");
      setIdKelas(res.data.kelas ? res.data.kelas.id : "");
    } catch (error) {
      console.log(error);
    }
  };

  const getJabatanOptions = async () => {
    try {
      const res = await axios.get(
        `${API_DUMMY}/api/jabatan/getByAdmin/${adminId}`
      );
      setJabatanOptions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getShiftOptions = async () => {
    try {
      const res = await axios.get(
        `${API_DUMMY}/api/shift/getall-byadmin/${adminId}`
      );
      setShiftOptions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrangTuaOptions = async () => {
    try {
      const res = await axios.get(`${API_DUMMY}/api/orang-tua/all`);
      setOrangTuaOptions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getKelasOptions = async () => {
    try {
      const res = await axios.get(
        `${API_DUMMY}/api/kelas/getAllByAdmin/${adminId}`
      );
      setKelasOptions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getJabatanOptions();
    getShiftOptions();
    getOrangTuaOptions();
    getKelasOptions();
  }, [id, adminId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_DUMMY}/api/user/editBYSuper/${id}?idShift=${idShift}&idOrangTua=${idOrangTua}&idKelas=${idKelas}`,
        {
          username: username,
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

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <SidebarNavbar />
      </div>
      <div className="flex h-full">
        <div className="sticky top-16 z-40">
          <Navbar />
        </div>
        <div className="sm:ml-64 content-page container md:p-8 md:ml-64 mt-12">
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
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
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
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Status
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <label
                          htmlFor="id_shift"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Shift
                        </label>
                        <select
                          name="idShift"
                          value={idShift}
                          onChange={(e) => setIdShift(e.target.value)}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        >
                          <option value="">Belum memiliki</option>
                          {shiftOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.namaShift}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6 mb-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <label
                          htmlFor="id_orang_tua"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Orang Tua
                        </label>
                        <select
                          name="idOrangTua"
                          value={idOrangTua}
                          onChange={(e) => setIdOrangTua(e.target.value)}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        >
                          <option value="">Belum memiliki</option>
                          {orangTuaOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.nama}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <label
                          htmlFor="id_kelas"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Kelas
                        </label>
                        <select
                          name="idKelas"
                          value={idKelas}
                          onChange={(e) => setIdKelas(e.target.value)}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        >
                          <option value="">Belum memiliki</option>
                          {kelasOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.namaKelas}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <a
                        className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        href="/admin/siswa"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </a>
                      <button
                        type="submit"
                        className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
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

export default EditKaryawan;
