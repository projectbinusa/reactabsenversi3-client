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
        <Route
          path="/"
          element={
            <PrivateRoute>
              <IndexDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PrivateRoute>
              <Login />
            </PrivateRoute>
          }
        />
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
              element={
                <PrivateRoute>
                  <OrangTua />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/addOrtu"
              element={
                <PrivateRoute>
                  <AddOrtu />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/editOrtu/:id"
              element={
                <PrivateRoute>
                  <EditOrtu />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/detailOrtu/:id"
              element={
                <PrivateRoute>
                  <DetailOrtu />
                </PrivateRoute>
              }
            />
            {/* <Route
              path="/admin/dashboard"
              element={<PrivateRoute> <Dashboard/> </PrivateRoute>}
            /> */}
            <Route
              path="/admin/profil"
              element={
                <PrivateRoute>
                  <Profil />
                </PrivateRoute>
              }
            />
            {/* master data */}
            <Route
              path="/admin/siswa"
              element={
                <PrivateRoute>
                  <Karyawan />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/kelas"
              element={
                <PrivateRoute>
                  <KelasSiswa />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/jabatan"
              element={
                <PrivateRoute>
                  <Jabatan />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/shift"
              element={
                <PrivateRoute>
                  <Shift />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/lokasi"
              element={
                <PrivateRoute>
                  <Lokasi />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/organisasi"
              element={
                <PrivateRoute>
                  <Organisasi />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/informasi"
              element={
                <PrivateRoute>
                  <Informasi />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/detailK/:id"
              element={
                <PrivateRoute>
                  <DetailKaryawan />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/detailLembur/:id"
              element={
                <PrivateRoute>
                  <DetailLembur />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/detailL/:id"
              element={
                <PrivateRoute>
                  <DetailLokasi />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/detailO/:id"
              element={
                <PrivateRoute>
                  <DetailOrganisasi />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/detailA/:id"
              element={
                <PrivateRoute>
                  <DetailAbsensi />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/addkary"
              element={
                <PrivateRoute>
                  <Addkaryawan />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/addjab"
              element={
                <PrivateRoute>
                  <AddJabatan />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/addshift"
              element={
                <PrivateRoute>
                  <AddShift />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/addlok"
              element={
                <PrivateRoute>
                  <AddLokasi />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/addor"
              element={
                <PrivateRoute>
                  <AddOrganisasi />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/addkelas"
              element={
                <PrivateRoute>
                  <AddKelas />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/addinformasi"
              element={
                <PrivateRoute>
                  <AddInformasi />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/editK/:id"
              element={
                <PrivateRoute>
                  <EditKaryawan />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/editJ/:id"
              element={
                <PrivateRoute>
                  <EditJabatan />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/editL/:id"
              element={
                <PrivateRoute>
                  <EditLokasi />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/editO/:id"
              element={
                <PrivateRoute>
                  <EditOrganisasi />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/editS/:id"
              element={
                <PrivateRoute>
                  <EditShift />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/editkelas/:id"
              element={
                <PrivateRoute>
                  <EditKelas />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/editI/:id"
              element={
                <PrivateRoute>
                  <EditInformasi />
                </PrivateRoute>
              }
            />
            {/* rekapan */}
            <Route
              path="/admin/simpel"
              element={
                <PrivateRoute>
                  <Simpel />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/persiswa"
              element={
                <PrivateRoute>
                  <Perkaryawan />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/harian"
              element={
                <PrivateRoute>
                  <Harian />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/mingguan"
              element={
                <PrivateRoute>
                  <Mingguan />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/bulanan"
              element={
                <PrivateRoute>
                  <Bulanan />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/perkelas"
              element={
                <PrivateRoute>
                  <Perkelas />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/harian/perkelas"
              element={
                <PrivateRoute>
                  <HarianPerkelas />
                </PrivateRoute>
              }
            />
            {/* data absensi */}
            <Route
              path="/admin/absensi"
              element={
                <PrivateRoute>
                  <Absensi />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/cuti"
              element={
                <PrivateRoute>
                  <Cuti />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/kehadiran"
              element={
                <PrivateRoute>
                  <Kehadiran />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/lembur"
              element={
                <PrivateRoute>
                  <Lembur />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/siswa/kelas/:id"
              element={
                <PrivateRoute>
                  <SiswaperKelas />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/bulanan/perkelas"
              element={
                <PrivateRoute>
                  <BulanPerkelas />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/mingguan/perkelas"
              element={
                <PrivateRoute>
                  <MingguanPerkelas />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/addsiswaperkelas/:id"
              element={
                <PrivateRoute>
                  <AddSiswaPerkelas />
                </PrivateRoute>
              }
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
          element={
            <PrivateRoute>
              <DetailAbsen />
            </PrivateRoute>
          }
        />
        {/* </>
          ) : (
            <></>
          )} */}

        {/* /* start user */}
        {role === "USER" && (
          <>
            {/* <Route
              path="/user/dashboard"
              element={<PrivateRoute> <DashboardUser/> </PrivateRoute>}
            /> */}
            <Route
              path="/user/history_absen"
              element={
                <PrivateRoute>
                  <TabelAbsen />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/history_cuti"
              element={
                <PrivateRoute>
                  <TabelCuti />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/history_lembur"
              element={
                <PrivateRoute>
                  <TabelLembur />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/cuti"
              element={
                <PrivateRoute>
                  <AddCuti />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/lembur"
              element={
                <PrivateRoute>
                  <AddLembur />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/izin"
              element={
                <PrivateRoute>
                  <AddIzin />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/absen"
              element={
                <PrivateRoute>
                  <AbsenMasuk />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/pulang"
              element={
                <PrivateRoute>
                  <AbsenPulang />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/detail_info/:id"
              element={
                <PrivateRoute>
                  <Pengumuman />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/izin_absen"
              element={
                <PrivateRoute>
                  <IzinAbsen />
                </PrivateRoute>
              }
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
            {/* <Route
              path="/superadmin/dashboard"
              element={<PrivateRoute> <DashboardSA/> </PrivateRoute>}
            /> */}
            {/* admin */}
            <Route
              path="/superadmin/admin"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/addA"
              element={
                <PrivateRoute>
                  <AddAdmin />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/detailA/:id"
              element={
                <PrivateRoute>
                  <DetailAdmin />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/editA/:id"
              element={
                <PrivateRoute>
                  <EditAdmin />
                </PrivateRoute>
              }
            />
            {/* organisasi */}
            <Route
              path="/superadmin/organisasi"
              element={
                <PrivateRoute>
                  <OrganisasiSA />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/profile"
              element={
                <PrivateRoute>
                  <ProfilSA />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/addO"
              element={
                <PrivateRoute>
                  <AddOrganisasiSA />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/detailO/:id"
              element={
                <PrivateRoute>
                  <DetailOrganisasiSA />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/editO/:id"
              element={
                <PrivateRoute>
                  <EditOrganisasiSA />
                </PrivateRoute>
              }
            />
            {/* jabatan */}
            <Route
              path="/superadmin/jabatan"
              element={
                <PrivateRoute>
                  <JabatanSA />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/addJ"
              element={
                <PrivateRoute>
                  <AddJabatanSA />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/detailJ/:id"
              element={
                <PrivateRoute>
                  <DetailJabatanSA />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/editJ/:idJabatan"
              element={
                <PrivateRoute>
                  <EditJabatanSA />
                </PrivateRoute>
              }
            />
            {/* shift */}
            <Route
              path="/superadmin/shift"
              element={
                <PrivateRoute>
                  <ShiftSA />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/detailS/:id"
              element={
                <PrivateRoute>
                  <DetailShiftSA />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/add-shift"
              element={
                <PrivateRoute>
                  <AddShiftSA />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/editS/:id"
              element={
                <PrivateRoute>
                  <EditShiftSA />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/data-user"
              element={
                <PrivateRoute>
                  <User />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/addU"
              element={
                <PrivateRoute>
                  <AddUser />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/editU/:id"
              element={
                <PrivateRoute>
                  <EditUser />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/detailU/:id"
              element={
                <PrivateRoute>
                  <DetailUser />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/lokasi"
              element={
                <PrivateRoute>
                  <LokasiSA />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/addLokasi"
              element={
                <PrivateRoute>
                  <AddLokasiSA />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/editLokasi/:idLokasi"
              element={
                <PrivateRoute>
                  <EditLokasiSA />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/detailLokasi/:idLokasi"
              element={
                <PrivateRoute>
                  <DetailLokasiSA />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/absensi"
              element={
                <PrivateRoute>
                  <AbsensiSA />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/detailAbsensi/:id"
              element={
                <PrivateRoute>
                  <DetailAbsensiSA />
                </PrivateRoute>
              }
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
            {/* <Route
              path="/walimurid/dashboard"
              element={<PrivateRoute> <DashboardOrtu/> </PrivateRoute>}
            /> */}
            <Route
              path="/walimurid/detail_info/:id"
              element={
                <PrivateRoute>
                  <DetailPengumuman />
                </PrivateRoute>
              }
            />
            <Route
              path="/walimurid/profile"
              element={
                <PrivateRoute>
                  <ProfileOrtu />
                </PrivateRoute>
              }
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
