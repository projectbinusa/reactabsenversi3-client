import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../utils/api";
import SidebarNavbar from "../../../../components/SidebarNavbar";
import { SidebarProvider } from "../../../../components/SidebarContext";
import Navbar1 from "../../../../components/Navbar1";

function AddKoordinat() {
  const [northEastLat, setNorthEastLat] = useState("");
  const [northEastLong, setnorthEastLong] = useState("");
  const [northWestLat, setNorthWestLat] = useState("");
  const [northWestLong, setNorthWestLong] = useState("");
  const [southEastLat, setSouthEastLat] = useState("");
  const [southEastLong, setsouthEastLong] = useState("");
  const [southWestLat, setSouthWestLat] = useState("");
  const [southWestLong, setSouthWestLong] = useState("");
  const idAdmin = localStorage.getItem("adminId");
  const token = localStorage.getItem("token");
  const selectRef = useRef(null);

  const tambahLokasi = async (e) => {
    e.preventDefault();
    try {
      const add = {
        northEastLat: northEastLat,
        northEastLong: northEastLong,
        northWestLat: northWestLat,
        northWestLong: northWestLong,
      };
      await axios.post(
        `${API_DUMMY}/api/koordinat/tambahKoordinat/10`,
        add,
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
        showConfirmButton: false, // Ini akan menghilangkan tombol konfirmasi
      });
      setTimeout(() => {
        window.location.href = "/admin/koordinat";
      }, 2000);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", error.message || "Gagal menambahkan data", "error");
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
        <div className=" sm:ml-64 content-page container md:p-8 md:ml-64 mt-12">
          <div className="p-4 ">
            <div className="p-5">
              {/* <!-- Card --> */}
              <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                {/* <!-- Header --> */}
                <div className="flex justify-between">
                  <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Tambah Koordinat
                  </h6>
                </div>
                <hr />
                <div className="mt-5 text-left">
                  <form onSubmit={tambahLokasi}>
                    {/* <!-- Form Input --> */}
                    <div className="grid md:grid-cols-2 md:gap-6">
                      {/* <!-- Nama Lokasi Input --> */}
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="timur_laut_lat"
                          id="timur_laut_lat"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          autoComplete="off"
                          value={northEastLat}
                          onChange={(e) =>
                            setNorthEastLat(capitalizeWords(e.target.value))
                          }
                          required
                        />
                        <label
                          htmlFor="timur_laut_lat"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Timur Laut Latitude
                        </label>
                      </div>

                      {/* <!-- northEastLong Kantor Input --> */}
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="northEastLong"
                          id="northEastLong"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          value={northEastLong}
                          onChange={(e) =>
                            setnorthEastLong(capitalizeWords(e.target.value))
                          }
                          required
                        />
                        <label
                          htmlFor="northEastLong"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Timur Laut Longitude
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="northWestLat"
                          id="northWestLat"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          value={northWestLat}
                          onChange={(e) =>
                            setNorthWestLat(capitalizeWords(e.target.value))
                          }
                          required
                        />
                        <label
                          htmlFor="northWestLat"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Utara Barat Latitude
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="northWestLong"
                          id="northWestLong"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          value={northWestLong}
                          onChange={(e) =>
                            setNorthWestLong(capitalizeWords(e.target.value))
                          }
                          required
                        />
                        <label
                          htmlFor="northEastLong"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Utara Barat Longitude
                        </label>
                      </div>
                    </div>

                    {/* <!-- Button --> */}
                    <div className="flex justify-between">
                      <a
                        className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        href="/admin/lokasi">
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </a>
                      <button
                        type="submit"
                        className="text-white bg-indigo-500  focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800">
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

export default AddKoordinat;
