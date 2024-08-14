import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import Sidebar from "../../../components/SidebarUser";
import axios from "axios";
import { Pagination } from "flowbite-react";
import { API_DUMMY } from "../../../utils/api";
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import SidebarNavbar from "../../../components/SidebarNavbar";

function Informasi() {
  const [informasi, setInformasi] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");
  const idAdmin = localStorage.getItem("adminId");

  const getAllInformasi = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/notifications/user/getByAdmin/${idAdmin}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );

      setInformasi(response.data.reverse() || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAllInformasi();
  }, []);

  useEffect(() => {
    if (!Array.isArray(informasi)) return;

    const filteredData = informasi.filter((item) => {
      if (!item) return false;

      const name = item.namaAcara ? item.namaAcara.toLowerCase() : "";
      const date = item.tanggalAcara
        ? String(item.tanggalAcara).toLowerCase()
        : "";
      const place = item.tempatAcara ? item.tempatAcara.toLowerCase() : "";
      const message = item.message ? item.message.toLowerCase() : "";

      const search = searchTerm.toLowerCase();

      return (
        name.includes(search) ||
        date.includes(search) ||
        place.includes(search) ||
        message.includes(search)
      );
    });

    setTotalPages(Math.ceil(filteredData.length / limit));
  }, [searchTerm, limit, informasi]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page when limit changes
  };

  function onPageChange(page) {
    setCurrentPage(page);
  }

  const filteredInformasi = informasi.filter((item) => {
    if (!item) return false;

    const name = item.namaAcara ? item.namaAcara.toLowerCase() : "";
    const date = item.tanggalAcara
      ? String(item.tanggalAcara).toLowerCase()
      : "";
    const place = item.tempatAcara ? item.tempatAcara.toLowerCase() : "";
    const message = item.message ? item.message.toLowerCase() : "";

    const search = searchTerm.toLowerCase();

    return (
      name.includes(search) ||
      date.includes(search) ||
      place.includes(search) ||
      message.includes(search)
    );
  });

  const paginatedInformasi = filteredInformasi.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

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
          await axios.delete(`${API_DUMMY}/api/notifications/delete/` + id);

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

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const requestNotificationPermission = async () => {
    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted.");
      } else {
        console.log("Notification permission denied.");
      }
    } else {
      console.log("Notification permission already granted or denied.");
    }
  };

  const showNotification = (informasi) => {
    if (Notification.permission === "granted") {
      const options = {
        body: `Acara: ${informasi.namaAcara}\nPesan: ${
          informasi.message
        }\nTanggal: ${formatDate(informasi.tanggalAcara)}\nTempat: ${
          informasi.tempatAcara
        }`,
        icon: "https://via.placeholder.com/150",
      };

      const notification = new Notification("Pengumuman Informasi", options);

      notification.onclick = () => {
        console.log("Notification clicked");
        // You can also open a specific URL here
        window.open("http://localhost:3000", "_blank");
      };
    } else {
      console.log("Notification permission not granted.");
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <SidebarNavbar />
      </div>
      <div className="flex h-full">
        <div className="sticky top-16 z-40">
          <Navbar />
        </div>
        <div className="sm:ml-64 content-page container p-8 ml-0 md:ml-64 mt-12">
          <div className="p-4">
            <div className="p-5">
              <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between">
                  <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Pengumuman Informasi
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
                      href="/admin/addinformasi"
                      className="text-white bg-indigo-500 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800 mt-2"
                    >
                      <FontAwesomeIcon icon={faPlus} size="lg" />
                    </a>
                  </div>
                </div>
                <hr className="mt-3" />
                <div className=" overflow-x-auto mt-5">
                  <table
                    id="dataInformasi"
                    className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                  >
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          No
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Acara
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Tanggal
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Tempat
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Pesan
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-left">
                      {paginatedInformasi.map((informasi, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {(currentPage - 1) * limit + index + 1}
                          </th>
                          <td className="px-6 py-4 text-gray-700 capitalize">
                            {informasi.namaAcara}
                          </td>
                          <td className="px-6 py-4 text-gray-700 capitalize">
                            {informasi.message}
                          </td>
                          <td className="px-6 py-4 text-gray-700 capitalize">
                            {formatDate(informasi.tanggalAcara)}
                          </td>
                          <td className="px-6 py-4 text-gray-700 capitalize">
                            {informasi.tempatAcara}
                          </td>
                          <td className="py-4 text-center">
                            <div className="flex justify-center -space-x-4">
                              <a href={`/admin/editI/${informasi.id}`}>
                                <button className="rounded-full border-2 border-white bg-yellow-100 p-4 text-yellow-700 active:bg-yellow-50">
                                  <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    className="h-4 w-4"
                                  />
                                </button>
                              </a>
                              <button
                                className="rounded-full border-2 border-white bg-red-100 p-4 text-red-700 active:bg-red-50"
                                onClick={() => deleteData(informasi.id)}
                              >
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="h-4 w-4"
                                />
                              </button>
                            </div>
                          </td>
                          <td className="py-4 text-center">
                            <button
                              className="rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50"
                              onClick={() => showNotification(informasi)}
                            >
                              Notifikasi
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  className="mt-4"
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Informasi;
