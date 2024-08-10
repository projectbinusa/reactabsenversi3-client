import React, { useEffect, useState } from "react";
import NavbarSuper from "../../../components/NavbarSuper";
import Sidebar from "../../../components/SidebarUser";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";

function EditUser() {
  const [username, setUsername] = useState("");
  const [idJabatan, setIdJabatan] = useState("");
  const [idShift, setIdShift] = useState("");
  const [idOrangTua, setIdOrangTua] = useState("");
  const [idKelas, setIdKelas] = useState("");
  const [jabatanOptions, setJabatanOptions] = useState([]);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [orangTuaOptions, setOrangTuaOptions] = useState([]);
  const [kelasOptions, setKelasOptions] = useState([]);
  const { id } = useParams();
  const idSuperAdmin = localStorage.getItem("superadminId");
  const [adminId, setAdminId] = useState(null);
  const history = useHistory();

  const getUser = async () => {
    try {
      const res = await axios.get(`${API_DUMMY}/api/user/getUserBy/${id}`);
      setUsername(res.data.username);
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
        `${API_DUMMY}/api/jabatan/getBySuper/${idSuperAdmin}`
      );
      setJabatanOptions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getShiftOptions = async () => {
    try {
      const res = await axios.get(
        `${API_DUMMY}/api/shift/getBySuper/${idSuperAdmin}`
      );
      setShiftOptions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrangTuaOptions = async () => {
    try {
      const res = await axios.get(
        `${API_DUMMY}/api/orang-tua/getALlBySuperAdmin/${idSuperAdmin}`
      );
      setOrangTuaOptions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getKelasOptions = async () => {
    try {
      const res = await axios.get(`${API_DUMMY}/api/kelas/kelas/all`);
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
        `${API_DUMMY}/api/user/edit-kar/${id}?idJabatan=${idJabatan}&idShift=${idShift}&idOrangTua=${idOrangTua}&idKelas=${idKelas}`,
        {
          username: username,
        }
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Edit Berhasil",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.href = "/superadmin/data-user";
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <NavbarSuper />
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
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer capitalize"
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
                      <div className="relative z-0 w-full mb-6 group">
                        <label
                          htmlFor="id_jabatan"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Jabatan
                        </label>
                        <select
                          name="idJabatan"
                          value={idJabatan}
                          onChange={(e) => setIdJabatan(e.target.value)}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        >
                            {jabatanOptions.slice().reverse().map((option) => (
                            <option
                              key={option.idJabatan}
                              value={option.idJabatan}
                            >
                              {option.namaJabatan}
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
                          name="idShift"
                          value={idShift}
                          onChange={(e) => setIdShift(e.target.value)}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        >
                          {shiftOptions &&
                            shiftOptions.slice().reverse().map((option) => (
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
                          {orangTuaOptions.slice().reverse().map((option) => (
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
                          {kelasOptions.slice().reverse().map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.namaKelas}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={() => history.goBack()}
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1" />
                        Kembali
                      </button>
                      <button
                        type="submit"
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                      >
                        <FontAwesomeIcon
                          icon={faFloppyDisk}
                          className="mr-2"
                        />
                        Simpan
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

export default EditUser;
