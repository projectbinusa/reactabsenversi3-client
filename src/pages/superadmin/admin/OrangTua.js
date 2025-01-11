import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCloudArrowDown,
  faFileExport,
  faFileImport,
  faInfo,
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import Swal from "sweetalert2";
import { Button, Modal } from "flowbite-react";

import { API_DUMMY } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

import { Pagination } from "flowbite-react";
import SidebarNavbar from "../../../components/SidebarNavbar";
import { SidebarProvider } from "../../../components/SidebarContext";
import Navbar1 from "../../../components/Navbar1";

function OrangTua() {
  const [userData, setUserData] = useState([]);
  const [allAbsensi, setAllAbsensi] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const idAdmin = localStorage.getItem("adminId");
  const idOrtu = localStorage.getItem("orangTuaId");
  const token = localStorage.getItem("token");
  const fileInputRef = useRef(null);
  const [siswa, setSiswa] = useState([]);
  const [jml, setJmlSiswa] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const getAllOrtu = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${API_DUMMY}/api/orang-tua/getALlBySuperAdmin/${idAdmin}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );

      const ortuList = response.data.reverse();

      const siswaResponse = await axios.get(
        `${API_DUMMY}/api/user/${idAdmin}/users`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      const siswaList = siswaResponse.data;

      const ortuWithSiswaCount = ortuList.map((ortu) => {
        const siswaCount = siswaList.filter(
          (siswa) => siswa.orangTua?.id === ortu.id
        ).length;
        return {
          ...ortu,
          siswaCount,
        };
      });

      setUserData(ortuWithSiswaCount);
      console.log("data ortu dengan jumlah siswa: ", ortuWithSiswaCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllKaryawan = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/user/${idAdmin}/users`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      setSiswa(response.data.reverse());
      console.log("user data: ", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const getByIdOrtu = async () => {
  //   const token = localStorage.getItem("token");

  //   try {
  //     const response = await axios.get(
  //       `${API_DUMMY}/api/absensi/by-orang-tua/${idOrtu}`,
  //       {
  //         headers: {
  //           AuthPrs: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     setAllAbsensi(response.data.reverse());
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const deleteData = async (id) => {
    Swal.fire({
      title: "Anda Ingin Menghapus Data ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${API_DUMMY}/api/orang-tua/deleteOrangTua/` + id,
            {
              headers: {
                AuthPrs: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          Swal.fire({
            icon: "success",
            title: "Dihapus!",
            showConfirmButton: false,
          });

          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Gagal Menghapus Data",
          });
        }
      }
    });
  };
  useEffect(() => {
    getAllOrtu();
    // getByIdOrtu();
    getAllKaryawan();
  }, []);

  useEffect(() => {
    const filteredData = userData.filter(
      (admin) =>
        admin.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTotalPages(Math.ceil(filteredData.length / limit));
  }, [searchTerm, limit, userData]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    setCurrentPage(1); // Reset to the first page when limit changes
  };

  function onPageChange(page) {
    setCurrentPage(page);
  }

  const filteredAdmin = userData.filter(
    (admin) =>
      admin.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedAdmin = filteredAdmin.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const exportData = async () => {
    if (userData.length === 0) {
      Swal.fire("Error", "Tidak ada data untuk diekspor", "error");
      return;
    }
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/orang-tua/export/data-orang-tua/${idAdmin}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "DataWaliMurid.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      Swal.fire("Berhasil", "Berhasil mengunduh data", "success");
    } catch (error) {
      console.error("Error exporting data:", error);
      Swal.fire("Error", "Gagal mengunduh data", "error");
    }
  };

  const [file, setFile] = useState("");
  const importData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `${API_DUMMY}/api/orang-tua/import/data-orang-tua/{adminId}?adminId=${idAdmin}`,
        formData,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      Swal.fire("Sukses!", "Berhasil menambahkan", "success");
      setOpenModal(false);
      getAllOrtu();
    } catch (err) {
      console.error("Error during import:", err);

      if (err.response && err.response.data) {
        Swal.fire("Error", err.response.data, "error");
      } else {
        Swal.fire("Error", "Terjadi kesalahan saat mengimpor data.", "error");
      }
    }
  };

  const downloadTemplate = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/orang-tua/download/template-orang-tua`,
        // {
        // },
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "TemplateExcelWaliMurid.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      Swal.fire("Berhasil", "Berhasil mengunduh data", "success");
    } catch (error) {
      console.error("Error exporting data:", error);
      Swal.fire("Error", "Gagal mengunduh data", "error");
    }
  };

  // Updated getAbsensiByUserId function
  const getAbsensiByUserId = (idUser) => {
    return allAbsensi.filter((abs) => abs.id === idUser).length;
  };

  useEffect(() => {
    const userAbsensiCounts = allAbsensi.map((user) => ({
      idUser: user.id,
      earlyCount: getAbsensiByUserId(user.id, "Siswa"),
    }));

    setUserData((prevUsers) =>
      prevUsers.map((user) => {
        const updatedCounts = userAbsensiCounts.find(
          (u) => u.idUser === user.id
        );
        return updatedCounts ? { ...user, ...updatedCounts } : user;
      })
    );
  }, [allAbsensi]);

  return (
    <div className="flex flex-col h-screen">
      <SidebarProvider>
        <Navbar1 />
        <SidebarNavbar />
      </SidebarProvider>
      <div className="md:w-[78%] w-full mt-10 md:mt-0">
        <div className=" sm:ml-64 content-page container md:p-8 md:ml-64 mt-5">
          <div className="p-5 mt-10">
            {/* <!-- Card --> */}
            <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="md:flex justify-between">
                <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  Data Orang Tua
                </h6>
                <div className="flex flex-col items-center gap-2 mt-5 md:flex-row md:mt-0">
                  <div className="flex items-center w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                      <input
                        type="search"
                        id="search-dropdown"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="block p-2.5 w-full text-sm rounded-l-md text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        placeholder="Search name..."
                        required
                      />
                    </div>
                    <select
                      value={limit}
                      onChange={handleLimitChange}
                      className="w-auto ml-2 flex-shrink-0 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                      <option value="5">05</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                  <div className="flex flex-wrap gap-2 w-full mt-2 md:mt-0 md:w-auto justify-center">
                    <a
                      type="button"
                      href="/admin/addOrtu"
                      className="text-white bg-indigo-500 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800">
                      <FontAwesomeIcon icon={faPlus} size="lg" />
                    </a>
                    <button
                      type="button"
                      className="exp bg-green-500 hover:bg-green text-white font-bold py-2 px-4 rounded-lg"
                      onClick={exportData}
                      title="Export">
                      <FontAwesomeIcon icon={faCloudArrowDown} />
                    </button>
                    <button
                      type="button"
                      className="imp bg-blue-500 hover:bg-blue text-white font-bold py-2 px-4 rounded-lg"
                      onClick={() => setOpenModal(true)}
                      title="Import">
                      <FontAwesomeIcon icon={faFileImport} />
                    </button>
                  </div>
                </div>
              </div>
              <hr className="mt-3" />

              {/* <!-- Tabel --> */}
              <div className=" overflow-x-auto mt-5">
                <table
                  id="dataKaryawan"
                  className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  {/* <!-- Tabel Head --> */}
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Nama Orangtua
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Jumlah Siswa
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  {/* <!-- Tabel Body --> */}
                  <tbody className="text-left">
                    {paginatedAdmin.length === 0 ? (
                      <tr>
                        <td
                          colSpan="4"
                          className="px-6 py-4 text-center text-gray-500">
                          Tidak ada data yang ditampilkan
                        </td>
                      </tr>
                    ) : (
                      paginatedAdmin.map((ortu, index) => (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          key={index}>
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {(currentPage - 1) * limit + index + 1}
                          </th>
                          <td className="px-6 py-4">
                            {/* <a
                              href="/cdn-cgi/l/email-protection"
                              className="__cf_email__"
                              data-cfemail="5a363b23363b1a3d373b333674393537"
                            > */}
                            {ortu.email}
                            {/* </a> */}
                          </td>
                          <td className="px-6 py-4">{ortu.nama}</td>
                          <td className="px-6 py-4">
                            {ortu.siswaCount || "0"}
                          </td>
                          <td className="py-3">
                            <div className="flex items-center -space-x-4">
                              <a href={`/admin/detailOrtu/${ortu.id}`}>
                                <button className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50">
                                  <span className="inline-block">
                                    <FontAwesomeIcon
                                      icon={faInfo}
                                      className="h-4 w-4"
                                    />
                                  </span>
                                </button>
                              </a>
                              <a href={`/admin/editOrtu/${ortu.id}`}>
                                <button className="z-30 block rounded-full border-2 border-white bg-yellow-100 p-4 text-yellow-700 active:bg-red-50">
                                  <span className="inline-block">
                                    <FontAwesomeIcon
                                      icon={faPenToSquare}
                                      className="h-4 w-4"
                                    />
                                  </span>
                                </button>
                              </a>
                              <button
                                className="z-30 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 active:bg-red-50"
                                onClick={() => deleteData(ortu.id)}>
                                <span className="inline-block">
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="h-4 w-4"
                                  />
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <Modal
                popup
                className="w-fit ml-auto mr-auto fixed inset-0 flex items-center justify-center"
                show={openModal}
                onClose={() => setOpenModal(false)}>
                <Modal.Header>Import Data Wali Murid</Modal.Header>
                <hr />
                <Modal.Body>
                  <Button
                    className="mb-3 relative"
                    color="green"
                    type="submit"
                    onClick={downloadTemplate}>
                    Dowmload Template
                  </Button>
                  <form className="space-y-6">
                    <input
                      required
                      autoComplete="off"
                      type="file"
                      accept=".xlsx"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="bg-red-500"
                    onClick={() => setOpenModal(false)}>
                    Batal
                  </Button>
                  <Button color="blue" type="submit" onClick={importData}>
                    Simpan
                  </Button>
                </Modal.Footer>
              </Modal>
              <Pagination
                className="mt-5"
                layout="table"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                showIcons
                previousLabel=""
                nextLabel=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrangTua;
