import "../src/App.css";
// import LogPageView from "./LogPageView";
import Register from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";
import Karyawan from "./pages/admin/masterdata/Karyawan";
import Jabatan from "./pages/admin/masterdata/Jabatan";
import Shift from "./pages/admin/masterdata/Shift";
import Lokasi from "./pages/admin/masterdata/Lokasi";
import Organisasi from "./pages/admin/masterdata/Organisasi";
import DetailKaryawan from "./pages/admin/detail/DetailKaryawan";
import DetailLokasi from "./pages/admin/detail/DetailLokasi";
import Simpel from "./pages/admin/rekapan/simpel";
import DetailOrganisasi from "./pages/admin/detail/DetailOrganisasi";
import Login from "./pages/Login";
import Addkaryawan from "./pages/admin/add/Addkaryawan";
import AddJabatan from "./pages/admin/add/AddJabatan";
import AddShift from "./pages/admin/add/AddShift";
import AddLokasi from "./pages/admin/add/AddLokasi";
import AddOrganisasi from "./pages/admin/add/AddOrganisasi";
import EditKaryawan from "./pages/admin/edit/EditKaryawan";
import EditJabatan from "./pages/admin/edit/EditJabatan";
import EditLokasi from "./pages/admin/edit/EditLokasi";
import EditOrganisasi from "./pages/admin/edit/EditOrganisasi";
import Perkaryawan from "./pages/admin/rekapan/Perkaryawan";
import Harian from "./pages/admin/rekapan/Harian";
import Mingguan from "./pages/admin/rekapan/Mingguan";
import Bulanan from "./pages/admin/rekapan/Bulanan";
import Absensi from "./pages/admin/data absensi/Absensi";
import EditShift from "./pages/admin/edit/EditShift";
import Cuti from "./pages/admin/data absensi/Cuti";
import Kehadiran from "./pages/admin/data absensi/Kehadiran";
import Lembur from "./pages/admin/data absensi/Lembur";
import DashboardUser from "./pages/user/DashboardUser";
import DetailAbsen from "./pages/user/DetailAbsen";
import IzinAbsen from "./pages/user/IzinAbsen";
import Profile from "./pages/user/Profile";
import AbsenMasuk from "./pages/user/absen/AbsenMasuk";
import AbsenPulang from "./pages/user/absen/AbsenPulang";
import AddCuti from "./pages/user/add/AddCuti";
import AddIzin from "./pages/user/add/AddIzin";
import AddLembur from "./pages/user/add/AddLembur";
import TabelAbsen from "./pages/user/tabel/TabelAbsen";
import TabelCuti from "./pages/user/tabel/TabelCuti";
import TabelLembur from "./pages/user/tabel/TabelLembur";
import RegisterUser from "./pages/RegisterUser";
import DetailAbsensi from "./pages/admin/detail/DetailAbsensi";
import DashboardSA from "./pages/superadmin/DashboardSA";
import RegisterSuperadmin from "./pages/RegisterSuperadmin";
import Profil from "./pages/admin/Profil";
import Admin from "./pages/superadmin/admin/Admin";
import AddAdmin from "./pages/superadmin/add/AddAdmin";
import DetailAdmin from "./pages/superadmin/detail/DetailAdmin";
import EditAdmin from "./pages/superadmin/edit/EditAdmin";
import DetailLembur from "./pages/admin/detail/DetailLembur";
import OrganisasiSA from "./pages/superadmin/admin/OrganisasiSA";
import AddOrganisasiSA from "./pages/superadmin/add/AddOrganisasiSA";
import EditOrganisasiSA from "./pages/superadmin/edit/EditOrganisasiSA";
import ShiftSA from "./pages/superadmin/admin/ShiftSA";
import DetailShiftSA from "./pages/superadmin/detail/DetailShiftSA";
import AddShiftSA from "./pages/superadmin/add/AddShiftSA";
import EditShiftSA from "./pages/superadmin/edit/editShiftSA";
import JabatanSA from "./pages/superadmin/admin/JabatanSA";
import DetailJabatanSA from "./pages/superadmin/detail/DetailJabatanSA";
import EditJabatanSA from "./pages/superadmin/edit/EditJabatanSA";
import AddJabatanSA from "./pages/superadmin/add/AddJabatanSA";
import User from "./pages/superadmin/admin/User";
import AddUser from "./pages/superadmin/add/AddUser";
import EditUser from "./pages/superadmin/edit/EditUser";
import DetailUser from "./pages/superadmin/detail/DetailUser";
import LokasiSA from "./pages/superadmin/admin/LokasiSA";
import AddLokasiSA from "./pages/superadmin/add/AddLokasiSA";
import EditLokasiSA from "./pages/superadmin/edit/EditLokasiSA";
import DetailLokasiSA from "./pages/superadmin/detail/DetailLokasiSA";
import AbsensiSA from "./pages/superadmin/admin/AbsensiSA";
import DetailOrganisasiSA from "./pages/superadmin/detail/DetailOrganisasiSA";
import DetailAbsensiSA from "./pages/superadmin/detail/DetailAbsensiSA";
// import ProfileSA from "./pages/superadmin/ProfilSA";
import ProfilSA from "./pages/superadmin/ProfilSA";
import ForgotPass from "./pages/ForgotPass";
import VerifyCode from "./pages/VerifyCode";
import ResetPassword from "./pages/ResetPassword";
import VerifyCodeSup from "./pages/superadmin/VerifyCodeSup";
import ResetPasswordSup from "./pages/superadmin/ReserPasswordSup";
import ForgotPassSup from "./pages/superadmin/ForgotpassSup";
import KelasSiswa from "./pages/admin/masterdata/KelasSiswa";
import AddKelas from "./pages/admin/add/AddKelas";
import EditKelas from "./pages/admin/edit/EditKelas";
import Perkelas from "./pages/admin/rekapan/kelas/Perkelas";
import BulanPerkelas from "./pages/admin/rekapan/kelas/Bulanan";
import HarianPerkelas from "./pages/admin/rekapan/kelas/HarianPerkelas";
import SiswaperKelas from "./pages/admin/masterdata/SiswaperKelas";
import MingguanPerkelas from "./pages/admin/rekapan/kelas/Mingguan";
import Informasi from "./pages/admin/informasi/Informasi";
import AddInformasi from "./pages/admin/add/AddInformasi";
import EditInformasi from "./pages/admin/edit/editInformasi";
import OrangTua from "./pages/superadmin/admin/OrangTua";
import DashboardOrtu from "./pages/orangtua/DashboardOrtu";
import AddOrtu from "./pages/superadmin/add/AddOrtu";
import EditOrtu from "./pages/superadmin/edit/EditOrtu";
import Pengumuman from "./pages/user/Pengumuman";
import DetailPengumuman from "./pages/orangtua/DetailPengumuman";
import DetailOrtu from "./pages/superadmin/detail/DetailOrtu";
import ForgotPassAdmin from "./pages/admin/ForgotPassAdmin";
import VerifyCodeAdmin from "./pages/admin/VerifyCodeAdmin";
import ResetPasswordAdmin from "./pages/admin/ResetPassAdmin";
import ProfileOrtu from "./pages/orangtua/Profile";
import IndexDashboard from "./pages/IndexDashboard";
import PrivateRoute from "./utils/PrivateRoute";
import NotFound from "./pages/NotFound";
import AddSiswaPerkelas from "./pages/admin/add/AddSiswaPerkelas";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Navbar1 from "./components/Navbar1";
import { analytics } from "./firebase";
import { logEvent } from "firebase/analytics";

function App() {
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");

  const LogPageView = () => {
    const location = useLocation();

    useEffect(() => {
      logEvent(analytics, "page_view", {
        page_path: location.pathname + location.search,
      });
    }, [location]);

    return null; 
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute element={IndexDashboard} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/navbar" element={<Navbar1 />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerUser" element={<RegisterUser />} />
        <Route path="/registerSA" element={<RegisterSuperadmin />} />
        {/* user */}
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* superadmin */}
        <Route path="/forgotpassSup" element={<ForgotPassSup />} />
        <Route path="/verify-code-sup" element={<VerifyCodeSup />} />
        <Route
          path="/reset-password-sup/:token"
          element={<ResetPasswordSup />}
        />
        {/* admin */}
        <Route path="/forgotpass-admin" element={<ForgotPassAdmin />} />
        <Route path="/verify-code-admin" element={<VerifyCodeAdmin />} />
        <Route
          path="/reset-password-admin/:token"
          element={<ResetPasswordAdmin />}
        />

        {/* start admin */}
        {/* Admin Routes */}
        {role === "ADMIN" && (
          <>
            {/* orang tua */}
            <Route
              path="/admin/ortu"
              element={<PrivateRoute element={OrangTua} />}
            />
            <Route
              path="/admin/addOrtu"
              element={<PrivateRoute element={AddOrtu} />}
            />
            <Route
              path="/admin/editOrtu/:id"
              element={<PrivateRoute element={EditOrtu} />}
            />
            <Route
              path="/admin/detailOrtu/:id"
              element={<PrivateRoute element={DetailOrtu} />}
            />
            <Route
              path="/admin/dashboard"
              element={<PrivateRoute element={Dashboard} />}
            />
            <Route
              path="/admin/profil"
              element={<PrivateRoute element={Profil} />}
            />
            {/* master data */}
            <Route
              path="/admin/siswa"
              element={<PrivateRoute element={Karyawan} />}
            />
            <Route
              path="/admin/kelas"
              element={<PrivateRoute element={KelasSiswa} />}
            />
            <Route
              path="/admin/jabatan"
              element={<PrivateRoute element={Jabatan} />}
            />
            <Route
              path="/admin/shift"
              element={<PrivateRoute element={Shift} />}
            />
            <Route
              path="/admin/lokasi"
              element={<PrivateRoute element={Lokasi} />}
            />
            <Route
              path="/admin/organisasi"
              element={<PrivateRoute element={Organisasi} />}
            />
            <Route
              path="/admin/informasi"
              element={<PrivateRoute element={Informasi} />}
            />
            <Route
              path="/admin/detailK/:id"
              element={<PrivateRoute element={DetailKaryawan} />}
            />
            <Route
              path="/admin/detailLembur/:id"
              element={<PrivateRoute element={DetailLembur} />}
            />
            <Route
              path="/admin/detailL/:id"
              element={<PrivateRoute element={DetailLokasi} />}
            />
            <Route
              path="/admin/detailO/:id"
              element={<PrivateRoute element={DetailOrganisasi} />}
            />
            <Route
              path="/admin/detailA/:id"
              element={<PrivateRoute element={DetailAbsensi} />}
            />
            <Route
              path="/admin/addkary"
              element={<PrivateRoute element={Addkaryawan} />}
            />
            <Route
              path="/admin/addjab"
              element={<PrivateRoute element={AddJabatan} />}
            />
            <Route
              path="/admin/addshift"
              element={<PrivateRoute element={AddShift} />}
            />
            <Route
              path="/admin/addlok"
              element={<PrivateRoute element={AddLokasi} />}
            />
            <Route
              path="/admin/addor"
              element={<PrivateRoute element={AddOrganisasi} />}
            />
            <Route
              path="/admin/addkelas"
              element={<PrivateRoute element={AddKelas} />}
            />
            <Route
              path="/admin/addinformasi"
              element={<PrivateRoute element={AddInformasi} />}
            />
            <Route
              path="/admin/editK/:id"
              element={<PrivateRoute element={EditKaryawan} />}
            />
            <Route
              path="/admin/editJ/:id"
              element={<PrivateRoute element={EditJabatan} />}
            />
            <Route
              path="/admin/editL/:id"
              element={<PrivateRoute element={EditLokasi} />}
            />
            <Route
              path="/admin/editO/:id"
              element={<PrivateRoute element={EditOrganisasi} />}
            />
            <Route
              path="/admin/editS/:id"
              element={<PrivateRoute element={EditShift} />}
            />
            <Route
              path="/admin/editkelas/:id"
              element={<PrivateRoute element={EditKelas} />}
            />
            <Route
              path="/admin/editI/:id"
              element={<PrivateRoute element={EditInformasi} />}
            />
            {/* rekapan */}
            <Route
              path="/admin/simpel"
              element={<PrivateRoute element={Simpel} />}
            />
            <Route
              path="/admin/persiswa"
              element={<PrivateRoute element={Perkaryawan} />}
            />
            <Route
              path="/admin/harian"
              element={<PrivateRoute element={Harian} />}
            />
            <Route
              path="/admin/mingguan"
              element={<PrivateRoute element={Mingguan} />}
            />
            <Route
              path="/admin/bulanan"
              element={<PrivateRoute element={Bulanan} />}
            />
            <Route
              path="/admin/perkelas"
              element={<PrivateRoute element={Perkelas} />}
            />
            <Route
              path="/admin/harian/perkelas"
              element={<PrivateRoute element={HarianPerkelas} />}
            />
            {/* data absensi */}
            <Route
              path="/admin/absensi"
              element={<PrivateRoute element={Absensi} />}
            />
            <Route
              path="/admin/cuti"
              element={<PrivateRoute element={Cuti} />}
            />
            <Route
              path="/admin/kehadiran"
              element={<PrivateRoute element={Kehadiran} />}
            />
            <Route
              path="/admin/lembur"
              element={<PrivateRoute element={Lembur} />}
            />
            <Route
              path="/admin/siswa/kelas/:id"
              element={<PrivateRoute element={SiswaperKelas} />}
            />
            <Route
              path="/admin/bulanan/perkelas"
              element={<PrivateRoute element={BulanPerkelas} />}
            />
            <Route
              path="/admin/mingguan/perkelas"
              element={<PrivateRoute element={MingguanPerkelas} />}
            />
            <Route
              path="/admin/addsiswaperkelas/:id"
              element={<PrivateRoute element={AddSiswaPerkelas} />}
            />
          </>
          // ) : (
          //   <>
          //     <Redirect
          //       to={<{
          //         pathname: "/page/notfound",
          //       }}
          //     />
          //   </>
        )}
        {/* end admin */}
        {/* {role === "USER" && "Wali Murid" ? (
            <> */}
        <Route
          path="/user/detail_absen/:id"
          element={<PrivateRoute element={DetailAbsen} />}
        />
        {/* </>
          ) : (
            <></>
          )} */}

        {/* /* start user */}
        {role === "USER" && (
          <>
            <Route
              path="/user/dashboard"
              element={<PrivateRoute element={DashboardUser} />}
            />
            <Route
              path="/user/history_absen"
              element={<PrivateRoute element={TabelAbsen} />}
            />
            <Route
              path="/user/history_cuti"
              element={<PrivateRoute element={TabelCuti} />}
            />
            <Route
              path="/user/history_lembur"
              element={<PrivateRoute element={TabelLembur} />}
            />
            <Route
              path="/user/cuti"
              element={<PrivateRoute element={AddCuti} />}
            />
            <Route
              path="/user/lembur"
              element={<PrivateRoute element={AddLembur} />}
            />
            <Route
              path="/user/izin"
              element={<PrivateRoute element={AddIzin} />}
            />
            <Route
              path="/user/profile"
              element={<PrivateRoute element={Profile} />}
            />
            <Route
              path="/user/absen"
              element={<PrivateRoute element={AbsenMasuk} />}
            />
            <Route
              path="/user/pulang"
              element={<PrivateRoute element={AbsenPulang} />}
            />
            <Route
              path="/user/detail_info/:id"
              element={<PrivateRoute element={Pengumuman} />}
            />
            <Route
              path="/user/izin_absen"
              element={<PrivateRoute element={IzinAbsen} />}
            />
          </>
          // ) : (
          //   <>
          //     <Redirect
          //       to={<{
          //         pathname: "/page/notfound",
          //       }}
          //     />
          //   </>
        )}
        {/* end user */}
        {/* start superadmin */}
        {/* superadmin Routes */}
        {role === "SUPERADMIN" && (
          <>
            <Route
              path="/superadmin/dashboard"
              element={<PrivateRoute element={DashboardSA} />}
            />
            {/* admin */}
            <Route
              path="/superadmin/admin"
              element={<PrivateRoute element={Admin} />}
            />
            <Route
              path="/superadmin/addA"
              element={<PrivateRoute element={AddAdmin} />}
            />
            <Route
              path="/superadmin/detailA/:id"
              element={<PrivateRoute element={DetailAdmin} />}
            />
            <Route
              path="/superadmin/editA/:id"
              element={<PrivateRoute element={EditAdmin} />}
            />
            {/* organisasi */}
            <Route
              path="/superadmin/organisasi"
              element={<PrivateRoute element={OrganisasiSA} />}
            />
            <Route
              path="/superadmin/profile"
              element={<PrivateRoute element={ProfilSA} />}
            />
            <Route
              path="/superadmin/addO"
              element={<PrivateRoute element={AddOrganisasiSA} />}
            />
            <Route
              path="/superadmin/detailO/:id"
              element={<PrivateRoute element={DetailOrganisasiSA} />}
            />
            <Route
              path="/superadmin/editO/:id"
              element={<PrivateRoute element={EditOrganisasiSA} />}
            />
            {/* jabatan */}
            <Route
              path="/superadmin/jabatan"
              element={<PrivateRoute element={JabatanSA} />}
            />
            <Route
              path="/superadmin/addJ"
              element={<PrivateRoute element={AddJabatanSA} />}
            />
            <Route
              path="/superadmin/detailJ/:id"
              element={<PrivateRoute element={DetailJabatanSA} />}
            />
            <Route
              path="/superadmin/editJ/:idJabatan"
              element={<PrivateRoute element={EditJabatanSA} />}
            />
            {/* shift */}
            <Route
              path="/superadmin/shift"
              element={<PrivateRoute element={ShiftSA} />}
            />
            <Route
              path="/superadmin/detailS/:id"
              element={<PrivateRoute element={DetailShiftSA} />}
            />
            <Route
              path="/superadmin/add-shift"
              element={<PrivateRoute element={AddShiftSA} />}
            />
            <Route
              path="/superadmin/editS/:id"
              element={<PrivateRoute element={EditShiftSA} />}
            />
            <Route
              path="/superadmin/data-user"
              element={<PrivateRoute element={User} />}
            />
            <Route
              path="/superadmin/addU"
              element={<PrivateRoute element={AddUser} />}
            />
            <Route
              path="/superadmin/editU/:id"
              element={<PrivateRoute element={EditUser} />}
            />
            <Route
              path="/superadmin/detailU/:id"
              element={<PrivateRoute element={DetailUser} />}
            />
            <Route
              path="/superadmin/lokasi"
              element={<PrivateRoute element={LokasiSA} />}
            />
            <Route
              path="/superadmin/addLokasi"
              element={<PrivateRoute element={AddLokasiSA} />}
            />
            <Route
              path="/superadmin/editLokasi/:idLokasi"
              element={<PrivateRoute element={EditLokasiSA} />}
            />
            <Route
              path="/superadmin/detailLokasi/:idLokasi"
              element={<PrivateRoute element={DetailLokasiSA} />}
            />
            <Route
              path="/superadmin/absensi"
              element={<PrivateRoute element={AbsensiSA} />}
            />
            <Route
              path="/superadmin/detailAbsensi/:id"
              element={<PrivateRoute element={DetailAbsensiSA} />}
            />
          </>
          // ) : (
          //   <>
          //     <Redirect
          //       to={<{
          //         pathname: "/page/notfound",
          //       }}
          //     />
          //   </>
        )}
        {/* end superadmin */}
        {role === "Wali Murid" && (
          <>
            <Route
              path="/walimurid/dashboard"
              element={<PrivateRoute element={DashboardOrtu} />}
            />
            <Route
              path="/walimurid/detail_info/:id"
              element={<PrivateRoute element={DetailPengumuman} />}
            />
            <Route
              path="/walimurid/profile"
              element={<PrivateRoute element={ProfileOrtu} />}
            />
          </>
          // ) : (
          //   <>
          //     <Redirect
          //       to={<{
          //         pathname: "/page/notfound",
          //       }}
          //     />
          //   </>
        )}

        <Route element={<NotFound />} />
      </Routes>
      <LogPageView />
    </BrowserRouter>
  );
}

export default App;
