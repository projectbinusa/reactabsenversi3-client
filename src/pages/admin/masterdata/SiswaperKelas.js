import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowDown,
  faFileImport,
  faInfo,
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { Pagination } from "flowbite-react";
import { API_DUMMY } from "../../../utils/api";
import SidebarNavbar from "../../../components/SidebarNavbar";
import { Button, Modal } from "flowbite-react";
import { Link, useParams } from "react-router-dom";
import { SidebarProvider } from "../../../components/SidebarContext";
import Navbar1 from "../../../components/Navbar1";

function SiswaperKelas() {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [namaKelas, setNamaKelas] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const idAdmin = localStorage.getItem("adminId");
  // const KlasId = localStorage.getItem("KlasId");
  const param = useParams();
  const [openModal, setOpenModal] = useState(false);

  const exportPerkelas = async () => {
    if (userData.length === 0) {
      Swal.fire("Error", "Tidak ada data untuk diekspor", "error");
      return;
    }
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/user/export-data-siswa/${idAdmin}/perkelas/${param.id}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "DataSiswaperKelas.xlsx");
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

  const downloadTemplate = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/download/template-excel-siswa`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "TemplateExcelSiswaperKelas.xlsx");
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
        `${API_DUMMY}/api/import/data-siswa/admin/${idAdmin}/kelas/${param.id}`,
        formData
      );
      Swal.fire("Sukses!", "Berhasil menambahkan", "success");
      setOpenModal(false);
      getAllKaryawan();
    } catch (err) {
      console.error("Error during import:", err);

      if (err.response && err.response.data) {
        Swal.fire("Error", err.response.data, "error");
      } else {
        Swal.fire("Error", "Terjadi kesalahan saat mengimpor data.", "error");
      }
    }
  };
  const getAllKaryawan = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${API_DUMMY}/api/user/by-kelas/${param.id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setUserData(response.data.reverse());
      //   console.log(response.data);
      const dataKelas = response.data.map((data) => data.kelas.namaKelas);
      setNamaKelas(dataKelas[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
          await axios.delete(`${API_DUMMY}/api/user/delete-user/` + id);

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
    getAllKaryawan();
  }, []);

  useEffect(() => {
    const filteredData = userData.filter(
      (user) =>
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.admin?.username
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
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

  const filteredUser = userData.filter(
    (user) =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.admin?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUser = filteredUser.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const capitalize = (str) => {
    if (typeof str !== "string") {
      return str; // Atau Anda bisa mengembalikan string kosong jika itu lebih sesuai
    }
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

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
                  Data Siswa {namaKelas}
                </h6>
                <div className="flex items-center gap-2 mt-2">
                  <div className=" w-64">
                    <input
                      type="search"
                      id="search-dropdown"
                      value={searchTerm}
                      onChange={handleSearch}
                      className="block p-2.5 w-full z-20 text-sm rounded-l-md text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                      placeholder="Search name..."
                      required
                    />
                  </div>
                  <select
                    value={limit}
                    onChange={handleLimitChange}
                    className="flex-shrink-0 z-10 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                  >
                    <option value="5">05</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                  <Link
                    type="button"
                    to={"/admin/addsiswaperkelas/" + param.id}
                    className="text-white bg-indigo-500 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800 mt-2"
                  >
                    <FontAwesomeIcon icon={faPlus} size="lg" />
                  </Link>
                  <button
                    type="button"
                    className="exp bg-green-500 hover:bg-green text-white font-bold py-2 px-4 rounded-lg inline-block ml-auto"
                    onClick={exportPerkelas}
                    title="Export"
                  >
                    <FontAwesomeIcon icon={faCloudArrowDown} />
                  </button>
                  <button
                    type="button"
                    className="imp bg-blue-500 hover:bg-blue text-white font-bold py-2 px-4 rounded-lg inline-block ml-auto"
                    onClick={() => setOpenModal(true)}
                    title="Import"
                  >
                    <FontAwesomeIcon icon={faFileImport} />
                  </button>
                </div>
              </div>
              <hr />

              {/* <!-- Tabel --> */}
              <div className=" overflow-x-auto mt-5">
                <table
                  id="dataKaryawan"
                  className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                >
                  {/* <!-- Tabel Head --> */}
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Username
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Admin
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  {/* <!-- Tabel Body --> */}
                  <tbody className="text-left">
                    {paginatedUser.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          Tidak ada data yang ditampilkan
                        </td>
                      </tr>
                    ) : (
                      paginatedUser.map((user, index) => (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          key={user.id}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {(currentPage - 1) * limit + index + 1}
                          </th>
                          <td className="px-6 py-4 text-gray-900 capitalize">
                            {user.username}
                          </td>
                          <td className="px-6 py-4 text-gray-900">
                            <a
                              href="/cdn-cgi/l/email-protection"
                              className="__cf_email__"
                              data-cfemail="5a363b23363b1a3d373b333674393537"
                            >
                              {user.email}
                            </a>
                          </td>
                          <td className="px-6 py-4 text-gray-900 capitalize">
                            {user.admin.username}
                          </td>
                          <td className="py-3">
                            <div className="flex items-center -space-x-4 ml-12">
                              <a href={`/admin/detailK/${user.id}`}>
                                <button className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50">
                                  <span className="inline-block">
                                    <FontAwesomeIcon
                                      icon={faInfo}
                                      className="h-4 w-4"
                                    />
                                  </span>
                                </button>
                              </a>
                              <a href={`/admin/editK/${user.id}`}>
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
                                onClick={() => deleteData(user.id)}
                              >
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
                onClose={() => setOpenModal(false)}
              >
                <Modal.Header>Import Data Siswa perKelas</Modal.Header>
                <hr />
                <Modal.Body>
                  <form className="space-y-6">
                    <Button
                      className="mb-3 bg-green-500 text-white"
                      type="submit"
                      onClick={downloadTemplate}
                    >
                      Download Template
                    </Button>
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
                    onClick={() => setOpenModal(false)}
                  >
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

export default SiswaperKelas;