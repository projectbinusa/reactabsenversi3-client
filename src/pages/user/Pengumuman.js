import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_DUMMY } from "../../utils/api";
import SidebarNavbar from "../../components/SidebarNavbar";
import Navbar from "../../components/NavbarUser";
import { useParams, Link } from "react-router-dom";
import {
  faArrowLeft,
  faCalendarDays,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Pengumuman() {
  const [informasi, setInformasi] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const fetchInformasi = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/notifications/user/getById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInformasi(response.data);
    } catch (error) {
      console.error("Error fetching informasi:", error);
    }
  };

  useEffect(() => {
    fetchInformasi();
  }, [id]);

  const formatDate = (timestamp) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    };
    return new Date(timestamp).toLocaleDateString("id-ID", options);
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
        <div className="sm:ml-64 content-page container md:p-8 md:ml-64 mt-5">
          <div className="p-4">
            <div className="p-5">
              <div className="informasi-section p-6 bg-slate-50 rounded-xl shadow-xl border border-gray-300">
                <h2 className="text-2xl font-bold mb-4 text-black">
                  Pengumuman
                </h2>
                <hr />
                <div className="mt-5">
                  {informasi ? (
                    <div>
                      <h3 className="text-xl font-semibold text-black capitalize">
                        {informasi.namaAcara}
                      </h3>
                      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                        <div className="flex items-center sm:justify-start">
                          <FontAwesomeIcon
                            icon={faCalendarDays}
                            className="h-4 w-4 text-gray-600 mr-2"
                          />
                          <p className="text-sm font-medium text-black">
                            Tanggal:
                          </p>
                        </div>
                        <p className="text-sm text-black sm:ml-2">
                          {formatDate(informasi.tanggalAcara)}
                        </p>
                      </div>
                      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                        <div className="flex items-center sm:justify-start">
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="h-4 w-4 text-gray-600 mr-2"
                          />
                          <p className="text-sm font-medium text-black">
                            Tempat:
                          </p>
                        </div>
                        <p className="text-sm text-black sm:ml-2">
                          {informasi.tempatAcara}
                        </p>
                      </div>
                      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                        <div className="flex items-center sm:justify-start">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="h-4 w-4 text-gray-600 mr-2"
                          />
                          <p className="text-sm font-medium text-black">
                            Pesan:
                          </p>
                        </div>
                        <p className="text-sm text-black sm:ml-2">
                          {informasi.message}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-black">Tidak ada pengumuman.</p>
                  )}
                </div>
                <div className="mt-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative z-0 w-full group">
                      <div className="flex justify-between">
                        <Link
                          className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          to="/user/dashboard"
                        >
                          <FontAwesomeIcon icon={faArrowLeft} />
                        </Link>
                      </div>
                    </div>
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

export default Pengumuman;
