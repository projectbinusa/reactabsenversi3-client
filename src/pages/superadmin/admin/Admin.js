import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarSuper";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faFileExport,
  faFileImport,
  faInfo,
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";

import { API_DUMMY } from "../../../utils/api";

import { Button, Modal, Pagination } from "flowbite-react";

function Admin() {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const id_superadmin = localStorage.getItem("superadminId");

  const exportData = async () => {
    if (userData.length === 0) {
      Swal.fire("Error", "Tidak ada data untuk diekspor", "error");
      return;
    }

    try {
      const response = await axios.get(
        `${API_DUMMY}/api/superadmin/admin/export?superadminId=${id_superadmin}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "DataAdmin.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      Swal.fire({
        title: "Berhasil",
        text: "Berhasil mengunduh data",
        icon: "success",
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location.href = "/superadmin/admin";
      }, 3000);
    } catch (error) {
      console.error("Error exporting data:", error);
      Swal.fire("Error", "Gagal mengunduh data", "error");
    }
  };

  const downloadTemplate = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/superadmin/import/template`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "TemplatAdmin.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      Swal.fire({
        title: "Berhasil",
        text: "Berhasil mengunduh data",
        icon: "success",
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location.href = "/superadmin/admin";
      }, 3000);
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
    // formData.append("idJabatan", idJabatan);
    // formData.append("idOrangTua", idOrangTua);
    // formData.append("idShift", idShift);
    // formData.append("idOrganisasi", idOrganisasi);

    await axios
      .post(`${API_DUMMY}/api/superadmin/import/${id_superadmin}`, formData)
      .then(() => {
        Swal.fire({
          title: "Sukses!",
          text: "Berhasil menambahkan",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
        setOpenModal(false);
        getAllAdmin();
      })

      .catch((err) => {
        console.log(err);
        Swal.fire("Error", "Anda belum memilih file untuk diimport!.", "error");
      });
  };
  const getAllAdmin = async () => {
    const token = localStorage.getItem("token");
    const idSuperAdmin = localStorage.getItem("superadminId");

    try {
      const response = await axios.get(
        `${API_DUMMY}/api/admin/get-all-by-super/${idSuperAdmin}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setUserData(response.data);
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
          await axios.delete(`${API_DUMMY}/api/admin/delete/` + id, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

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
    getAllAdmin();
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

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex h-full">
        <div className="fixed">
          <Sidebar />
        </div>
        <div className=" sm:ml-64 content-page container p-8  ml-0 md:ml-64 mt-5">
          <div className="p-5 mt-10">
            {/* <!-- Card --> */}
            <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between">
                <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  Data Admin
                </h6>
                <div className="md:mt-2 mt-5 md:flex items-center gap-2">
                  <div className="relative w-64">
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
                    className="flex-shrink-0 z-10 inline-flex md:rounded-r-md rounded-md items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 md:mt-0 mt-3"
                  >
                    <option value="5">05</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                  <div className="flex gap-2 mx-auto items-center">
                    <a
                      type="button"
                      href="/superadmin/addA"
                      className="text-white bg-indigo-500 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800 mt-2"
                    >
                      <FontAwesomeIcon icon={faPlus} size="lg" />
                    </a>
                    <button
                      type="button"
                      className="exp bg-green-500 hover:bg-green text-white font-bold py-2 px-4 rounded-lg inline-block ml-auto"
                      onClick={exportData}
                    >
                      <FontAwesomeIcon icon={faFileExport} />
                    </button>
                    <button
                      type="button"
                      className="imp bg-blue-500 hover:bg-blue text-white font-bold py-2 px-4 rounded-lg inline-block ml-auto"
                      onClick={() => setOpenModal(true)}
                    >
                      <FontAwesomeIcon icon={faFileImport} />
                    </button>
                  </div>
                </div>
              </div>
              <hr />

              {/* <!-- Tabel --> */}
              <div className="relative overflow-x-auto mt-5">
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
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Nama Admin
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  {/* <!-- Tabel Body --> */}
                  <tbody className="text-left">
                    {paginatedAdmin
                      .slice()
                      .reverse()
                      .map((admin, index) => (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          key={index}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {(currentPage - 1) * limit + index + 1}
                          </th>
                          <td className="px-6 py-4">
                            <a
                              href="/cdn-cgi/l/email-protection"
                              className="__cf_email__"
                              data-cfemail="5a363b23363b1a3d373b333674393537"
                            >
                              {admin.email}
                            </a>
                          </td>
                          <td className="px-6 py-4 capitalize">
                            {admin.username}
                          </td>
                          <td className="py-3">
                            <div className="flex items-center -space-x-4">
                              <a href={`/superadmin/detailA/${admin.id}`}>
                                <button className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50">
                                  <span className="relative inline-block">
                                    <FontAwesomeIcon
                                      icon={faInfo}
                                      className="h-4 w-4"
                                    />
                                  </span>
                                </button>
                              </a>
                              <a href={`/superadmin/editA/${admin.id}`}>
                                <button className="z-30 block rounded-full border-2 border-white bg-yellow-100 p-4 text-yellow-700 active:bg-red-50">
                                  <span className="relative inline-block">
                                    <FontAwesomeIcon
                                      icon={faPenToSquare}
                                      className="h-4 w-4"
                                    />
                                  </span>
                                </button>
                              </a>

                              <button
                                className="z-30 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 active:bg-red-50"
                                onClick={() => deleteData(admin.id)}
                              >
                                <span className="relative inline-block">
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="h-4 w-4"
                                  />
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <Modal
                popup
                className="w-fit ml-auto mr-auto fixed inset-0 flex items-center justify-center"
                show={openModal}
                onClose={() => setOpenModal(false)}
              >
                <Modal.Header>Import Data Admin</Modal.Header>
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

export default Admin;
