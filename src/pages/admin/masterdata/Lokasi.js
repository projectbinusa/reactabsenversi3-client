import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import {
  faInfo,
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Swal from "sweetalert2";
import { Pagination } from "flowbite-react";
import { API_DUMMY } from "../../../utils/api";
import SidebarNavbar from "../../../components/SidebarNavbar";
import { SidebarProvider } from "../../../components/SidebarContext";
import Navbar1 from "../../../components/Navbar1";

function Lokasi() {
  const [userData, setUserData] = useState([]);
  const idAdmin = localStorage.getItem("adminId");
  const token = localStorage.getItem("token");
  const [karyawan, setKaryawan] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getallUser = async () => {
    try {
      const res = await axios.get(`${API_DUMMY}/api/user/${idAdmin}/users`, {
        headers: {
          AuthPrs: `Bearer ${token}`,
        },
      });
      setKaryawan(res.data.length);
      // console.log("data siswa: ", res.data);
    } catch (error) {}
  };

  const getAllLokasibyAdmin = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/lokasi/get-admin/${idAdmin}`,
        {
          headers: {
            AuthPrs: `Bearer ${token}`,
          },
        }
      );
      // const lokasiList = response.data.reverse();

      // const siswaResponse = await axios.get(`${API_DUMMY}/api/user/${idAdmin}/users`);
      // const siswaList = siswaResponse.data;
      // console.log("siswa list: ", siswaResponse.data);

      // const ortuWithSiswaCount = lokasiList.map((lokasi) => {
      //     const siswaCount = siswaList.filter((siswa) => siswa.lokasi?.id === lokasi.id).length;
      //     return {
      //         ...lokasi,
      //         siswaCount,
      //     };
      // });
      setUserData(response.data.reverse());
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
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_DUMMY}/api/lokasi/delete-sementara/` + id, {
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
    getAllLokasibyAdmin();
    getallUser();
  }, []);

  useEffect(() => {
    const filteredData = userData.filter(
      (lokasi) =>
        lokasi.namaLokasi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lokasi.alamat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lokasi.organisasi?.namaOrganisasi
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
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

  const filteredLokasi = userData.filter(
    (lokasi) =>
      lokasi.namaLokasi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lokasi.alamat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lokasi.organisasi?.namaOrganisasi
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const paginatedLokasi = filteredLokasi.slice(
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
                  Data Lokasi
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
                  <a
                    type="button"
                    href="/admin/addlok"
                    className="text-white bg-indigo-500 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800 mt-2"
                  >
                    <FontAwesomeIcon icon={faPlus} size="lg" />
                  </a>
                </div>
              </div>
              <hr />

              {/* <!-- Tabel --> */}
              <div className=" overflow-x-auto mt-5">
                <table
                  id="dataJabatan"
                  className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                >
                  {/* <!-- Tabel Head --> */}
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Nama Lokasi
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Alamat
                      </th>
                      {/* <th scope="col" className="px-6 py-3">
                        Jumlah Siswa
                      </th> */}
                      <th scope="col" className="px-6 py-3">
                        Organisasi
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  {/* <!-- Tabel Body --> */}
                  <tbody className="text-left">
                    {paginatedLokasi.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          Tidak ada data yang ditampilkan
                        </td>
                      </tr>
                    ) : (
                      paginatedLokasi.map((lokasi, index) => (
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
                          <td className="px-6 py-4 whitespace-nowrap">
                            {capitalize(lokasi.namaLokasi)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {capitalize(lokasi.alamat)}
                          </td>
                          {/* <td className="px-6 py-4">{capitalize(karyawan)}</td> */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {lokasi.organisasi.namaOrganisasi}
                          </td>
                          <td className="py-3">
                            <div className="flex items-center -space-x-4 ml-12">
                              <a href={`/admin/detailL/${lokasi.idLokasi}`}>
                                <button className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50">
                                  <span className="inline-block">
                                    <FontAwesomeIcon
                                      icon={faInfo}
                                      className="h-4 w-4"
                                    />
                                  </span>
                                </button>
                              </a>
                              <a href={`/admin/editL/${lokasi.idLokasi}`}>
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
                                onClick={() => deleteData(lokasi.idLokasi)}
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

export default Lokasi;
