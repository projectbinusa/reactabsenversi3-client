import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import { Link, useParams } from "react-router-dom";
import SidebarNavbar from "../../../components/SidebarNavbar";
import { SidebarProvider } from "../../../components/SidebarContext";
import Navbar1 from "../../../components/Navbar1";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";

function AddSiswaPerkelas() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("Siswa");
  const [password, setPassword] = useState("");
  const idAdmin = localStorage.getItem("adminId");
  const token = localStorage.getItem("token");
  const [organisasiList, setOrganisasiList] = useState([]);
  const [shiftList, setShiftList] = useState([]);
  const [orangTuaList, setOrangTuaList] = useState([]);
  const param = useParams();
  const [selectedOrganisasi, setSelectedOrganisasi] = useState([]);
  const [selectedOrangTua, setSelectedOrangTua] = useState([]);
  const [selectedShift, setSelectedShift] = useState([]);
  const selectOrganisasiRef = useRef(null);
  const selectOrangTuaRef = useRef(null);
  const selectShiftRef = useRef(null);

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const GetAllOrganisasi = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/organisasi/all-by-admin/${idAdmin}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrganisasiList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Fetch data organisasi
    GetAllOrganisasi();

    // Initialize Select2 on the correct class
    $(selectOrganisasiRef.current).select2({
      placeholder: "Pilih Organisasi",
      width: "100%",
      multiple: true, // Enable multiple selection
    });

    // Listen for changes in selection
    $(selectOrganisasiRef.current).on("change", function () {
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
        $(selectOrganisasiRef.current).val(firstSelection).trigger("change"); // Update Select2 UI

        setSelectedOrganisasi(firstSelection); // Update state dengan pilihan pertama
      } else {
        setSelectedOrganisasi(selectedOptions || []); // Jika hanya satu pilihan, simpan ke state
      }
    });

    // Cleanup the Select2 instance on unmount
    return () => {
      $(selectOrganisasiRef.current).select2("destroy");
    };
  }, [idAdmin]);

  const GetAllShift = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/shift/getall-byadmin/${idAdmin}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShiftList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Fetch data organisasi
    GetAllShift();

    // Initialize Select2 on the correct class
    $(selectShiftRef.current).select2({
      placeholder: "Pilih Waktu Pembelajaran",
      width: "100%",
      multiple: true, // Enable multiple selection
    });

    // Listen for changes in selection
    $(selectShiftRef.current).on("change", function () {
      const selectedOptions = $(this).val();

      // Validasi: Jika pengguna memilih lebih dari satu organisasi
      if (selectedOptions && selectedOptions.length > 1) {
        // Gantikan alert dengan SweetAlert2
        Swal.fire({
          icon: "warning",
          title: "Maaf",
          text: "Anda hanya dapat memilih satu waktu pembelajaran!",
        });
        // Hanya simpan pilihan pertama dan batalkan pilihan yang lain
        const firstSelection = [selectedOptions[0]];
        $(selectShiftRef.current).val(firstSelection).trigger("change"); // Update Select2 UI

        setSelectedShift(firstSelection); // Update state dengan pilihan pertama
      } else {
        setSelectedShift(selectedOptions || []); // Jika hanya satu pilihan, simpan ke state
      }
    });

    // Cleanup the Select2 instance on unmount
    return () => {
      $(selectShiftRef.current).select2("destroy");
    };
  }, [idAdmin]);

  const GetAllOrangTua = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/orang-tua/getALlBySuperAdmin/${idAdmin}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrangTuaList(response.data);
      console.log("dtaa wali murid: ", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetAllOrangTua();
    // Initialize Select2 on the correct class
    $(selectOrangTuaRef.current).select2({
      placeholder: "Pilih Orang Tua",
      width: "100%",
      multiple: true, // Enable multiple selection
    });

    // Listen for changes in selection
    $(selectOrangTuaRef.current).on("change", function () {
      const selectedOptions = $(this).val();

      // Validasi: Jika pengguna memilih lebih dari satu organisasi
      if (selectedOptions && selectedOptions.length > 1) {
        // Gantikan alert dengan SweetAlert2
        Swal.fire({
          icon: "warning",
          title: "Maaf",
          text: "Anda hanya dapat memilih satu orang tua!",
        });
        // Hanya simpan pilihan pertama dan batalkan pilihan yang lain
        const firstSelection = [selectedOptions[0]];
        $(selectOrangTuaRef.current).val(firstSelection).trigger("change"); // Update Select2 UI

        setSelectedOrangTua(firstSelection); // Update state dengan pilihan pertama
      } else {
        setSelectedOrangTua(selectedOptions || []); // Jika hanya satu pilihan, simpan ke state
      }
    });

    // Cleanup the Select2 instance on unmount
    return () => {
      $(selectOrangTuaRef.current).select2("destroy");
    };
  }, [idAdmin]);

  const tambahKaryawan = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();

    try {
      // Fetch data semua pengguna
      const response = await axios.get(`${API_DUMMY}/api/user/get-allUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const existingUsers = response.data;

      const isEmailExists = existingUsers.some(
        (user) => user.email.toLowerCase() === trimmedEmail.toLowerCase()
      );
      const isUsernameExists = existingUsers.some(
        (user) => user.username.toLowerCase() === trimmedUsername.toLowerCase()
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

      await axios.post(
        `${API_DUMMY}/api/user/tambahuser/byAdmin/${idAdmin}/byKelas?idKelas=${param.id}&idOrangTua=${selectedOrangTua}&idOrganisasi=${selectedOrganisasi}&idShift=${selectedShift}`,
        newUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
        window.location.href = "/admin/siswa/kelas/" + param.id;
      }, 2000);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Gagal menambahkan data", "error");
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
                        {/* Organisasi */}
                      </label>
                      <select
                        ref={selectOrganisasiRef}
                        id="organisasi"
                        name="id_organisasi"
                        className="js-example-basic-multiple block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        multiple="multiple"
                        required
                      >
                        <option value="" disabled>
                          Pilih Organisasi
                        </option>
                        {Array.isArray(organisasiList) &&
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
                        onChange={(e) =>
                          setStatus(capitalizeWords(e.target.value))
                        }
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        autoComplete="off"
                        required
                        readOnly
                      />
                      <label
                        htmlFor="jabatan"
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
                        {/* Shift */}
                      </label>
                      <select
                        ref={selectShiftRef}
                        id="shift"
                        name="id_shift"
                        className="js-example-basic-multiple block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        multiple="multiple"
                        required
                      >
                        <option value="" disabled>
                          Pilih Waktu Pembelajaran
                        </option>
                        {Array.isArray(shiftList) &&
                          shiftList
                            .slice()
                            .reverse()
                            .map((org) => (
                              <option key={org.id} value={org.id}>
                                {org.namaShift}
                              </option>
                            ))}
                      </select>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <label
                        htmlFor="id_orang_tua"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        {/* Wali Murid */}
                      </label>
                      <select
                        ref={selectOrangTuaRef}
                        id="orang_tua"
                        name="id_orang_tua"
                        className="js-example-basic-multiple block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        multiple="multiple"
                        required
                      >
                        <option value="" disabled>
                          Pilih Orang Tua
                        </option>
                        {Array.isArray(orangTuaList) &&
                          orangTuaList
                            .slice()
                            .reverse()
                            .map((org) => (
                              <option key={org.id} value={org.id}>
                                {org.nama}
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
                    <Link
                      className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      to={"/admin/siswa/kelas/" + param.id}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
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

export default AddSiswaPerkelas;
