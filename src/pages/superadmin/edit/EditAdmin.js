import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarSuper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import { useParams } from "react-router-dom";
import SidebarNavbar from "../../../components/SidebarNavbar";
import { SidebarProvider } from "../../../components/SidebarContext";
import Navbar1 from "../../../components/Navbar1";

function EditAdmin() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const param = useParams();

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/admin/getById/` + param.id, {
        headers: {
          AuthPrs: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data;
        setEmail(response.email);
        setUsername(response.username);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param.id]);

  const updateAdmin = async (e) => {
    e.preventDefault();

    const usmail = {
      email: email,
      username: username,
    };

    try {
      const response = await axios.put(
        `${API_DUMMY}/api/admin/edit-email-username/${param.id}`,
        usmail,
        {
          headers: {
            AuthPrs: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUsername(response.data.username);
      setEmail(response.data.email);
      Swal.fire({
        title: "Berhasil!",
        text: "Berhasil edit data",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location.href = "/superadmin/admin";
      }, 1500);
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

  // Helper function to capitalize each word, but not the character after an apostrophe

  return (
    <div className="flex flex-col h-screen">
      <SidebarProvider>
        <Navbar1 />
        <SidebarNavbar />
      </SidebarProvider>
      <div className="md:w-[79%] w-full mt-20 md:mt-12"></div>
      <div className=" sm:ml-64 content-page md:p-8 md:ml-64 mb-40">
        <div className="p-4">
          {/* // <!-- Card --> */}
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            {/* <!-- Header --> */}
            <div className="flex justify-between">
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Edit Admin
              </h6>
            </div>

            <hr />

            <div className="mt-5 text-left">
              {/* <!-- Form Input --> */}
              <form onSubmit={updateAdmin} encType="multipart/form-data">
                {/* <!-- Email Input --> */}
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    // value={author}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    autoComplete="off"
                    required
                  />
                  <label
                    htmlFor="email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email
                  </label>
                </div>

                {/* <!-- Username Input --> */}
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    // value={author}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    autoComplete="off"
                    required
                  />
                  <label
                    htmlFor="username"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Username
                  </label>
                </div>

                {/* <!-- Button --> */}
                <div className="flex justify-between">
                  <a
                    className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    href="/superadmin/admin"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </a>
                  <button
                    type="submit"
                    className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
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
  );
}

export default EditAdmin;
