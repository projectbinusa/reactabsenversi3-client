import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../../components/NavbarAdmin";
import {
  faCloudArrowDown,
  faFileExport,
  faFileImport,
  faPenToSquare,
  faPlus,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Modal, Pagination } from "flowbite-react";
import { API_DUMMY } from "../../../utils/api";
import { Link } from "react-router-dom";
import SidebarNavbar from "../../../components/SidebarNavbar";
import { SidebarProvider } from "../../../components/SidebarContext";
import Navbar1 from "../../../components/Navbar1";

function KelasSiswa() {
  const [userData, setUserData] = useState([]);
  const [organisasiData, setOrganisasiData] = useState([]);
  const [validOrganisasiIds, setValidOrganisasiIds] = useState([]);
  const idAdmin = localStorage.getItem("adminId");
  const token = localStorage.getItem("token");
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState("");

  useEffect(() => {
    getAllKelasbyAdmin();
    getOrganisasiData();
  }, []);

  // useEffect(() => {
  //   validateOrganisasiIds();
  // }, [userData, organisasiData]);

  useEffect(() => {
    const filteredData = userData.filter(
      (kelas) =>
        kelas.namaKelas?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kelas.organisasi?.namaOrganisasi
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setTotalPages(Math.ceil(filteredData.length / limit));
  }, [searchTerm, limit, userData]);

  const exportData = async () => {
    if (userData.length === 0) {
      Swal.fire("Error", "Tidak ada data untuk diekspor", "error");
      return;
    }

    try {
      const response = await axios.get(
        `${API_DUMMY}/api/admin/kelas/export?idAdmin=${idAdmin}`,
        {
          responseType: "blob",
        },
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "DataKelas.xlsx");
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
      setTimeout(() => {}, 3000);
    } catch (error) {
      console.error("Error exporting data:", error);
      Swal.fire("Error", "Gagal mengunduh data", "error");
    }
  };

  const downloadTemplate = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/admin/kelas/templateKelas`,
        {
          responseType: "blob",
        },
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "TemplateExcelKelas.xlsx");
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

  const importData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `${API_DUMMY}/api/admin/importKelas/${idAdmin}`,
        formData,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "Sukses!",
        text: "Berhasil menambahkan",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });
      setOpenModal(false);
      getAllKelasbyAdmin();
    } catch (err) {
      let errorMessage = "Gagal menambahkan data";

      if (err.response && err.response.status === 400) {
        if (err.response.data && typeof err.response.data === "string") {
          errorMessage = err.response.data;
        } else if (err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      }

      Swal.fire("Error", errorMessage, "error");
    }
  };

  const getAllKelasbyAdmin = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/kelas/getAllByAdmin/${idAdmin}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      const kelasList = response.data.reverse();

      const siswaResponse = await axios.get(
        `${API_DUMMY}/api/user/${idAdmin}/users`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );

      const siswaList = siswaResponse.data;
      console.log(
        "siswa list: ",
        siswaResponse.data.map((dt) => dt.kelas?.id)
      );

      const kelasWithSiswaCount = kelasList.map((kelas) => {
        const siswaCount = siswaList.filter(
          (siswa) => siswa.kelas?.id === kelas.id
        ).length;
        return {
          ...kelas,
          siswaCount,
        };
      });
      setUserData(kelasWithSiswaCount);
      console.log("ssiwa: ", siswaResponse.data);
      console.log("kwlas siswa: ", response.data.data);

      console.log("kelas: ", kelasWithSiswaCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getOrganisasiData = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/organisasi/all-by-admin/${idAdmin}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );

      setOrganisasiData(response.data);
    } catch (error) {
      console.error("Error fetching organisasi data:", error);
    }
  };

  // const validateOrganisasiIds = () => {
  //   const validIds = organisasiData.map((org) => org.id);
  //   const validKelasIds = userData
  //     .filter((kelas) => validIds.includes(kelas.organisasi.id))
  //     .map((kelas) => kelas.organisasi.id);
  //   setValidOrganisasiIds(validKelasIds);
  // };

  // const checkIfHasRelations = async (id) => {
  //   try {
  //     const response = await axios.get(
  //       `${API_DUMMY}/api/kelas/hasRelations/${id}`
  //     );
  //     console.log("Relation check response:", response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error checking relations:", error);
  //     return false;
  //   }
  // };

  const deleteData = async (id) => {
    // const hasRelations = await checkIfHasRelations(id);

    // if (hasRelations) {
    //   Swal.fire({
    //     title: "Data Tidak Dapat Dihapus",
    //     text: "Data ini memiliki relasi dengan tabel lain.",
    //     icon: "warning",
    //     confirmButtonText: "OK",
    //   });
    //   return;
    // }

    Swal.fire({
      title: "Anda Ingin Menghapus Data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_DUMMY}/api/kelas/deleteKelas/${id}`, {
            headers: {
              AuthPrs: `Bearer ${token}`,
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
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            Swal.fire({
              icon: "error",
              title: "Gagal Menghapus Data",
              text: error.response.data.error,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Gagal Menghapus Data",
              text: "Terjadi kesalahan yang tidak diketahui.",
            });
          }
        }
      }
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    setCurrentPage(1); // Reset to the first page when limit changes
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredKelas = userData.filter(
    (kelas) =>
      kelas.namaKelas?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kelas.organisasi?.namaOrganisasi
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const paginatedKelas = filteredKelas.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const toUppercase = (str) => {
    if (typeof str !== "string") {
      return str;
    }
    return str.toUpperCase();
  };

  return (
    <div className="flex flex-col h-screen">
      <SidebarProvider>
        <Navbar1 />
        <SidebarNavbar />
      </SidebarProvider>
      <div className="md:w-[78%] w-full mt-10 md:mt-0">
        <div className="sm:ml-64 content-page container md:p-8 md:ml-64 mt-5 md:mt-10">
          <div className="p-5 mt-5">
            {/* <!-- Card --> */}
            <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="md:flex justify-between">
                <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  Data Kelas
                </h6>
                <div className="flex flex-col md:flex-row items-center gap-2 mt-2">
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
                      className="w-auto ml-2 flex-shrink-0 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                    >
                      <option value="5">05</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                  <div className="flex flex-wrap gap-2 w-full mt-2 md:mt-0 md:w-auto justify-center">
                    <Link
                      type="button"
                      to="/admin/addkelas"
                      className="text-white bg-indigo-500 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                    >
                      <FontAwesomeIcon icon={faPlus} size="lg" />
                    </Link>
                    <button
                      type="button"
                      className="exp bg-green-500 hover:bg-green text-white font-bold py-2 px-4 rounded-lg"
                      onClick={exportData}
                      title="Export"
                    >
                      <FontAwesomeIcon icon={faCloudArrowDown} />
                    </button>
                    <button
                      type="button"
                      className="imp bg-blue-500 hover:bg-blue text-white font-bold py-2 px-4 rounded-lg"
                      onClick={() => setOpenModal(true)}
                      title="Import"
                    >
                      <FontAwesomeIcon icon={faFileImport} />
                    </button>
                  </div>
                </div>
              </div>
              <hr className="mt-3" />

              {/* <!-- Tabel --> */}
              <div className=" overflow-x-auto mt-5">
                <table
                  id="dataKelas"
                  className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                >
                  {/* <!-- Tabel Head --> */}
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Nama Kelas
                      </th>
                      {/* <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Organisasi
                      </th> */}
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Jumlah Siswa
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 whitespace-nowrap text-center"
                      >
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  {/* <!-- Tabel Body --> */}
                  <tbody className="text-left">
                    {paginatedKelas.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-4">
                          Tidak ada data yang ditampilkan
                        </td>
                      </tr>
                    ) : (
                      paginatedKelas.map((kelas, index) => (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          key={index}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900  dark:text-white"
                          >
                            {(currentPage - 1) * limit + index + 1}
                          </th>
                          <td className="px-6 py-4 capitalize whitespace-nowrap">
                            {toUppercase(kelas.namaKelas)}
                          </td>
                          {/* <td className="px-6 py-4 capitalize whitespace-nowrap">
                            {validOrganisasiIds.includes(kelas.organisasi.id || "")
                              ? kelas.organisasi.namaOrganisasi
                              : "Invalid Organisasi"}
                          </td> */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {kelas.siswaCount || "0"}
                          </td>
                          <td className="py-3">
                            <div className="flex items-center -space-x-4 ml-12">
                              <a href={`/admin/editkelas/${kelas.id}`}>
                                <button className="z-30 block rounded-full border-2 border-white bg-yellow-100 p-4 text-yellow-700 active:bg-red-50">
                                  <span className=" inline-block">
                                    <FontAwesomeIcon
                                      icon={faPenToSquare}
                                      className="h-4 w-4"
                                    />
                                  </span>
                                </button>
                              </a>
                              <Link
                                to={`/admin/siswa/kelas/${kelas.id}`}
                                title="list siswa"
                                className="z-30 block rounded-full border-2 border-white  bg-blue-100 active:bg-blue-50 p-4 text-blue-700"
                              >
                                <span className=" inline-block">
                                  <FontAwesomeIcon
                                    icon={faUser}
                                    className="h-4 w-4"
                                  />
                                </span>
                              </Link>
                              <button
                                className="z-30 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 active:bg-red-50"
                                onClick={() => deleteData(kelas.id)}
                              >
                                <span className=" inline-block">
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
                <Modal.Header>Import Data Kelas</Modal.Header>
                <hr />
                <Modal.Body>
                  <form className="space-y-6">
                    <Button
                      className="mb-3 relative bg-green-500 text-white"
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

export default KelasSiswa;
