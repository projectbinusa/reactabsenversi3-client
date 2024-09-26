import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../utils/api";
import SidebarNavbar from "../../../../components/SidebarNavbar";
import { SidebarProvider } from "../../../../components/SidebarContext";
import Navbar1 from "../../../../components/Navbar1";
import { useNavigate, useParams } from "react-router-dom";

function EditKoordinat() {
  const [northEastLat, setNorthEastLat] = useState("");
  const [northEastLng, setNorthEastLng] = useState("");
  const [northWestLat, setNorthWestLat] = useState("");
  const [northWestLng, setNorthWestLng] = useState("");
  const [southEastLat, setSouthEastLat] = useState("");
  const [southEastLng, setSouthEastLng] = useState("");
  const [southWestLat, setSouthWestLat] = useState("");
  const [southWestLng, setSouthWestLng] = useState("");
  const [organisasi, setOrganisasi] = useState({}); // To hold organisasi data
  const idAdmin = localStorage.getItem("adminId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams();

  const getKoordinat = async () => {
    try {
      const res = await axios.get(`${API_DUMMY}/api/koordinat/getById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Set the state with the received data
      const data = res.data;
      setNorthEastLat(data.northEastLat);
      setNorthEastLng(data.northEastLng);
      setNorthWestLat(data.northWestLat);
      setNorthWestLng(data.northWestLng);
      setSouthEastLat(data.southEastLat);
      setSouthEastLng(data.southEastLng);
      setSouthWestLat(data.southWestLat);
      setSouthWestLng(data.southWestLng);
      setOrganisasi(data.organisasi); // Set organisasi data
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const koordinat = {
      id: Number(id), // Ensure id is a number
      northEastLat,
      northEastLng,
      northWestLat,
      northWestLng,
      southEastLat,
      southEastLng,
      southWestLat,
      southWestLng,
      organisasi: {
        ...organisasi, // Include existing organisasi data
      },
    };

    try {
      await axios.put(
        `${API_DUMMY}/api/koordinat/ubah-koordinat/${id}`,
        koordinat,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Berhasil update koordinat!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/admin/koordinat");
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update location.",
      });
    }
  };

  useEffect(() => {
    getKoordinat();
  }, []);

  // Helper function to capitalize each word
  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="flex flex-col h-screen">
      <SidebarProvider>
        <Navbar1 />
        <SidebarNavbar />
      </SidebarProvider>
      <div className="md:w-[78%] w-full mt-16 md:mt-12">
        <div className="sm:ml-64 content-page container md:p-8 md:ml-64">
          <div className="p-4">
            <div className="p-5">
              <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between">
                  <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Edit Koordinat
                  </h6>
                </div>
                <hr />
                <div className="mt-5 text-left">
                  <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="southEastLat"
                          id="southEastLat"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          value={southEastLat}
                          onChange={(e) =>
                            setSouthEastLat(capitalizeWords(e.target.value))
                          }
                          required
                        />
                        <label
                          htmlFor="southEastLat"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Tenggara Latitude
                        </label>
                      </div>

                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="southEastLng"
                          id="southEastLng"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          value={southEastLng} // Corrected variable name
                          onChange={(e) =>
                            setSouthEastLng(capitalizeWords(e.target.value))
                          }
                          required
                        />
                        <label
                          htmlFor="southEastLng"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Tenggara Longitude
                        </label>
                      </div>

                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="southWestLat"
                          id="southWestLat"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          value={southWestLat}
                          onChange={(e) =>
                            setSouthWestLat(capitalizeWords(e.target.value))
                          }
                          required
                        />
                        <label
                          htmlFor="southWestLat"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Barat Daya Latitude
                        </label>
                      </div>

                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="southWestLng"
                          id="southWestLng"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          value={southWestLng} // Corrected variable name
                          onChange={(e) =>
                            setSouthWestLng(capitalizeWords(e.target.value))
                          }
                          required
                        />
                        <label
                          htmlFor="southWestLng"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Barat Daya Longitude
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="northEastLat"
                          id="northEastLat"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          autoComplete="off"
                          placeholder=" "
                          value={northEastLat}
                          onChange={(e) =>
                            setNorthEastLat(capitalizeWords(e.target.value))
                          }
                          required
                        />
                        <label
                          htmlFor="northEastLat"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Timur Laut Latitude
                        </label>
                      </div>

                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="northEastLng"
                          id="northEastLng"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          value={northEastLng} // Corrected variable name
                          onChange={(e) =>
                            setNorthEastLng(capitalizeWords(e.target.value))
                          }
                          required
                        />
                        <label
                          htmlFor="northEastLng"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
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
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Barat Laut Latitude
                        </label>
                      </div>

                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="northWestLng"
                          id="northWestLng"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          value={northWestLng} // Corrected variable name
                          onChange={(e) =>
                            setNorthWestLng(capitalizeWords(e.target.value))
                          }
                          required
                        />
                        <label
                          htmlFor="northWestLng"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Barat Laut Longitude
                        </label>
                      </div>
                    </div>
                    <div className="mt-8 flex justify-between">
                      <button
                        type="button"
                        onClick={() => navigate("/admin/koordinat")}
                        className="inline-flex items-center p-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                        Kembali
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                      >
                        <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />
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

export default EditKoordinat;
