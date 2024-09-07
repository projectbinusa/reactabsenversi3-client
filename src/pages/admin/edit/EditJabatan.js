import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import SidebarNavbar from "../../../components/SidebarNavbar";

function EditJabatan() {
  const [namaJabatan, setNamaJabatan] = useState("");
  const { id } = useParams();
  const adminId = localStorage.getItem("adminId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // };

        const response = await axios.get(
          `${API_DUMMY}/api/jabatan/getbyid/${id}`
          // config
        );
        const { namaJabatan } = response.data;

        setNamaJabatan(namaJabatan);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data: ", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Terjadi kesalahan saat mengambil data!",
        });
      }
    };

    fetchData();
  }, [id]);

  const namaJabatanChangeHandler = (event) => {
    setNamaJabatan(event.target.value);
  };

  const submitActionHandler = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };

    const JabatanData = {
      id: id,
      namaJabatan,
      admin: {
        // ID admin yang terkait dengan shift
        id: adminId,
      },
    };

    try {
      await axios.put(
        `${API_DUMMY}/api/jabatan/editById/${id}`,
        JabatanData
        // config
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Edit Berhasil",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.href = "/admin/jabatan";
      }, 1500);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengedit data: ", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Terjadi kesalahan saat mengedit data: ${
          error.response?.data?.message || error.message
        }`,
      });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <SidebarNavbar />
      </div>
      <div className="flex h-full">
        <div className="sticky top-16 z-40">
          <Navbar />
        </div>
        <div className="sm:ml-64 content-page container md:p-8 md:ml-64 mt-12">
          <div className="p-4">
            <div className="p-5">
              <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between">
                  <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Edit Status
                  </h6>
                </div>

                <hr />

                <div className="mt-5 text-left">
                  <form onSubmit={submitActionHandler}>
                    {/* <input type="hidden" name="id_jabatan" value="10" /> */}

                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="nama_jabatan"
                        id="namaJabatan"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="Status"
                        autoComplete="off"
                        required
                        value={namaJabatan}
                        onChange={namaJabatanChangeHandler}
                      />
                      <label
                        htmlFor="namaJabatan"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Status
                      </label>
                    </div>

                    <div className="flex justify-between">
                      <a
                        className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        href="/admin/jabatan"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </a>
                      <button
                        type="submit"
                        className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
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
    </div>
  );
}

export default EditJabatan;
