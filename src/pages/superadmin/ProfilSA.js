import React, { useCallback, useEffect, useState } from "react";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import Navbar from "../../components/Navbar1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../utils/api";
import SidebarNavbar from "../../components/SidebarNavbar";
import { SidebarProvider } from "../../components/SidebarContext";

function ProfilSA() {
  const [showPassword, setShowPassword] = useState(false);
  const [imageSuperAdmin, setImageAdmin] = useState("");
  const [showPasswordd, setShowPasswordd] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [ubahUsername, setUbahUsername] = useState(false);
  const [, setProfile] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const id = localStorage.getItem("superadminId");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = localStorage.getItem("token");

  const editPassword = async (e) => {
    e.preventDefault();

    if (passwordBaru !== confirmPassword) {
      Swal.fire(
        "Gagal",
        "Password baru dan konfirmasi password tidak cocok",
        "error"
      );
      return;
    }

    try {
      await axios.put(
        `${API_DUMMY}/api/superadmin/edit-password/${id}`,
        {
          old_password: passwordLama,
          new_password: passwordBaru,
          confirm_new_password: confirmPassword,
        },
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );

      Swal.fire("Berhasil", "Password berhasil diubah", "success");
      window.location.reload();
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Terjadi kesalahan, coba lagi nanti", "error");
    }
  };

  const getProfile = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/superadmin/getbyid/${id}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data);
      setImageAdmin(response.data.imageSuperAdmin);
      setEmail(response.data.email);
      setUsername(response.data.username);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [id]);

  const HandleUbahUsernameEmail = async (e) => {
    e.preventDefault();
    const usMail = {
      email: email,
      username: username,
    };
    try {
      const response = await axios.put(
        `${API_DUMMY}/api/superadmin/edit-email-username/${id}`,
        usMail,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data);
      setUsername(response.data.username);
      setEmail(response.data.email);
      Swal.fire("Berhasil", "Berhasil mengubah username dan email", "success");
      setTimeout(() => {
        Swal.fire("Info", "Silahkan login kembali", "info");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }, 2000);
    } catch (error) {
      console.error("Error updating data:", error);

      // Checking for specific error messages returned from the server
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (error.response.data.message.includes("Email sudah digunakan")) {
          Swal.fire("Gagal", "Email sudah digunakan", "error");
        } else if (
          error.response.data.message.includes("Username sudah digunakan")
        ) {
          Swal.fire("Gagal", "Username sudah digunakan", "error");
        } else {
          Swal.fire("Gagal", "Gagal mengubah username dan email", "error");
        }
      } else {
        Swal.fire("Gagal", "Terjadi kesalahan pada server", "error");
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      Swal.fire("Error", "No file selected", "error");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.put(
        `${API_DUMMY}/api/superadmin/ubah-foto/${id}`,
        formData,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setImageAdmin(response.data.imageSuperAdmin);
      Swal.fire({
        title: "Berhasil",
        text: "Berhasil mengubah foto profil",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      window.location.reload();
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
      Swal.fire("Error", "Error uploading image", "error");
    }
  };
  return (
    <>
      {/* {loading && <Loader />} */}
      <div className="flex flex-col h-screen">
        <SidebarProvider>
          <Navbar />
          <SidebarNavbar />
        </SidebarProvider>
        <div className="md:w-[78%] w-full mt-10 md:mt-0">
          <div className="content-page container p-8 ml-0 md:ml-72 mt-10">
            <Tabs aria-label="Tabs with underline">
              <Tabs.Item active title="Profile" icon={HiUserCircle}>
                {/* Konten tab Profil */}
                <div className="font-medium text-gray-800 dark:text-white">
                  <div className="profile  mt-6 bg-white p-5 rounded-xl shadow-xl border border-gray-300">
                    <h2 className="text-xl font-bold">Profile Picture</h2>
                    <div className="flex flex-col items-center mt-4">
                      {/* Placeholder untuk menampilkan gambar profil yang dipilih */}
                      <img
                        src={
                          preview
                            ? preview
                            : imageSuperAdmin
                            ? imageSuperAdmin
                            : "https://static.vecteezy.com/system/resources/previews/007/069/364/original/3d-user-icon-in-a-minimalistic-style-user-symbol-for-your-website-design-logo-app-ui-vector.jpg"
                        }
                        alt="Profile"
                        className="w-48 h-48 rounded-full"
                      />
                      {/* Pesan instruksi */}
                      <p className="mt-2 text-sm text-gray-600">
                        JPG atau PNG tidak lebih besar dari 5 MB. Disarankan
                        Berukuran 1:1.
                      </p>
                    </div>
                    <div className="flex justify-between mt-6">
                      <div>
                        <label htmlFor="fileInput" className="cursor-pointer">
                          <span className="z-20 block rounded-xl border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50">
                            Ubah
                          </span>
                        </label>
                        {/* Input file tersembunyi */}
                        <input
                          id="fileInput"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                      <button
                        type="submit"
                        className="z-20 block rounded-xl border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50"
                        onClick={handleImageUpload}
                        disabled={loading || !selectedFile}
                      >
                        {loading ? "Uploading..." : "Simpan"}
                      </button>
                    </div>
                  </div>
                </div>
              </Tabs.Item>

              <Tabs.Item title="Detail" icon={MdDashboard}>
                {/* Konten tab Dashboard */}
                <div className="font-medium text-gray-800 dark:text-white">
                  <div className="detail-akun mt-6 bg-white p-5 rounded-xl shadow-lg border border-gray-300">
                    <p className="text-lg sm:text-xl font-medium mb-4 sm:mb-7">
                      Detail Akun
                    </p>
                    <form onSubmit={HandleUbahUsernameEmail}>
                      <div className="relative mb-3">
                        <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          id="nama"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Masukkan Nama"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          disabled={!ubahUsername}
                        />
                      </div>
                      <div className="relative">
                        <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Masukkan Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={!ubahUsername}
                        />
                      </div>

                      <div className="flex justify-between mt-6">
                        {!ubahUsername && (
                          <button
                            type="button"
                            onClick={() => setUbahUsername(true)}
                            className="z-20 block rounded-xl border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50"
                          >
                            Ubah
                          </button>
                        )}
                        {ubahUsername && (
                          <>
                            <button
                              type="button"
                              onClick={() => setUbahUsername(false)}
                              className="z-20 block rounded-xl border-2 border-white bg-rose-100 p-4 text-rose-500 active:bg-rose-50"
                            >
                              Batal
                            </button>

                            <button
                              type="submit"
                              className="z-20 block rounded-xl border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50"
                            >
                              Simpan
                            </button>
                          </>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </Tabs.Item>
              <Tabs.Item title="Settings" icon={HiAdjustments}>
                <div className="font-medium text-gray-800 dark:text-white">
                  <div className="settings mt-6 bg-white p-5 rounded-xl shadow-lg border border-gray-300">
                    <p className="text-lg sm:text-xl font-medium mb-4 sm:mb-7">
                      Settings
                    </p>
                    <form onSubmit={editPassword}>
                      <div className="relative mb-3">
                        <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900">
                          Password Lama
                        </label>
                        <input
                          type={showPasswordd ? "text" : "password"}
                          id="pw-lama"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          required
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
                            required
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
                            required
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

                      <div className="flex justify-between mt-6">
                        <button
                          type="submit"
                          className="z-20 block rounded-xl border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50"
                        >
                          Simpan
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Tabs.Item>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilSA;
