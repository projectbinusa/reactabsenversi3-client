import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_DUMMY } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import SidebarNavbar from "../../../components/SidebarNavbar";
import { SidebarProvider } from "../../../components/SidebarContext";
import Navbar1 from "../../../components/Navbar1";

function DetailOrtu() {
  const { id } = useParams();
  const [admin, setAdmin] = useState({
    email: "",
    nama: "",
  });

  const getUserData = async () => {
    try {
      const res = await axios.get(`${API_DUMMY}/api/orang-tua/getbyid/${id}`, {
        headers: {
          AuthPrs: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAdmin(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <SidebarProvider>
        <Navbar1 />
        <SidebarNavbar />
      </SidebarProvider>
      <div className="md:w-[78%] w-full mt-10"></div>
      <div className="sm:ml-64 content-page md:p-8 md:ml-64 mb-14 mt-10 md:mt-5">
        <div className="p-4">
          {/* // <!-- Card --> */}
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            {/* <!-- Header --> */}
            <div className="flex justify-between">
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Detail Orang Tua
              </h6>
            </div>
            <div className="mt-3 text-left">
              <hr />
            </div>
            <div className="mt-7 text-left">
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    autoComplete="off"
                    value={admin.email}
                    required
                    readOnly
                  />
                  <label
                    htmlFor="email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    autoComplete="off"
                    value={admin.nama}
                    required
                    readOnly
                  />
                  <label
                    htmlFor="username"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Nama Orang Tua
                  </label>
                </div>
              </div>

              <div className=" text-left mt-4">
                {/* <!-- email & username Input --> */}
                <div className="relative z-0 w-24 mb-6 group mt-5">
                  <label
                    htmlFor="Foto"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Foto :
                  </label>
                  <img
                    className="max-width-100 max-height-96 ml-12 mb-8"
                    src={
                      admin.imageOrtu
                        ? admin.imageOrtu
                        : "https://demo-absen.excellentsistem.com/images/admin/User.png"
                    }
                    alt="Image Ortu"
                  />

                  {/* <!-- Button --> */}
                  <div className="flex justify-between">
                    <a
                      className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      href="/admin/ortu"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailOrtu;
