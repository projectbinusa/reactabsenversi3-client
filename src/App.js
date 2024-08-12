import "../src/App.css";
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
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
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
import ProfileSA from "./pages/superadmin/ProfilSA";
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

function App() {
  const role = localStorage.getItem("role");
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/registerUser" component={RegisterUser} exact />
          <Route path="/registerSA" component={RegisterSuperadmin} exact />
          {/* user */}
          <Route path="/forgotpass" component={ForgotPass} exact />
          <Route path="/verify-code" component={VerifyCode} exact />
          <Route
            path="/reset-password/:token"
            component={ResetPassword}
            exact
          />
          {/* superadmin */}
          <Route path="/forgotpassSup" component={ForgotPassSup} exact />
          <Route path="/verify-code-sup" component={VerifyCodeSup} exact />
          <Route
            path="/reset-password-sup/:token"
            component={ResetPasswordSup}
            exact
          />
          {/* admin */}
          <Route path="/forgotpass-admin" component={ForgotPassAdmin} exact />
          <Route path="/verify-code-admin" component={VerifyCodeAdmin} exact />
          <Route
            path="/reset-password-admin/:token"
            component={ResetPasswordAdmin}
            exact
          />
          <PrivateRoute path="/" component={IndexDashboard} exact />

          {/* start admin */}
          {/* Admin Routes */}
          {role === "ADMIN" && (
            <>
              {/* orang tua */}
              <PrivateRoute path="/admin/ortu" component={OrangTua} exact />
              <PrivateRoute path="/admin/addOrtu" component={AddOrtu} exact />
              <PrivateRoute
                path="/admin/editOrtu/:id"
                component={EditOrtu}
                exact
              />
              <PrivateRoute
                path="/admin/detailOrtu/:id"
                component={DetailOrtu}
                exact
              />
              <PrivateRoute
                path="/admin/dashboard"
                component={Dashboard}
                exact
              />
              <PrivateRoute path="/admin/profil" component={Profil} exact />
              {/* master data */}
              <PrivateRoute path="/admin/siswa" component={Karyawan} exact />
              <PrivateRoute path="/admin/kelas" component={KelasSiswa} exact />
              <PrivateRoute path="/admin/jabatan" component={Jabatan} exact />
              <PrivateRoute path="/admin/shift" component={Shift} exact />
              <PrivateRoute path="/admin/lokasi" component={Lokasi} exact />
              <PrivateRoute
                path="/admin/organisasi"
                component={Organisasi}
                exact
              />
              <PrivateRoute
                path="/admin/informasi"
                component={Informasi}
                exact
              />
              <PrivateRoute
                path="/admin/detailK/:id"
                component={DetailKaryawan}
                exact
              />
              <PrivateRoute
                path="/admin/detailLembur/:id"
                component={DetailLembur}
                exact
              />
              <PrivateRoute
                path="/admin/detailL/:id"
                component={DetailLokasi}
                exact
              />
              <PrivateRoute
                path="/admin/detailO/:id"
                component={DetailOrganisasi}
                exact
              />
              <PrivateRoute
                path="/admin/detailA/:id"
                component={DetailAbsensi}
                exact
              />
              <PrivateRoute
                path="/admin/addkary"
                component={Addkaryawan}
                exact
              />
              <PrivateRoute path="/admin/addjab" component={AddJabatan} exact />
              <PrivateRoute path="/admin/addshift" component={AddShift} exact />
              <PrivateRoute path="/admin/addlok" component={AddLokasi} exact />
              <PrivateRoute
                path="/admin/addor"
                component={AddOrganisasi}
                exact
              />
              <PrivateRoute path="/admin/addkelas" component={AddKelas} exact />
              <PrivateRoute
                path="/admin/addinformasi"
                component={AddInformasi}
                exact
              />
              <PrivateRoute
                path="/admin/editK/:id"
                component={EditKaryawan}
                exact
              />
              <PrivateRoute
                path="/admin/editJ/:id"
                component={EditJabatan}
                exact
              />
              <PrivateRoute
                path="/admin/editL/:id"
                component={EditLokasi}
                exact
              />
              <PrivateRoute
                path="/admin/editO/:id"
                component={EditOrganisasi}
                exact
              />
              <PrivateRoute
                path="/admin/editS/:id"
                component={EditShift}
                exact
              />
              <PrivateRoute
                path="/admin/editkelas/:id"
                component={EditKelas}
                exact
              />
              <PrivateRoute
                path="/admin/editI/:id"
                component={EditInformasi}
                exact
              />
              {/* rekapan */}
              <PrivateRoute path="/admin/simpel" component={Simpel} exact />
              <PrivateRoute
                path="/admin/persiswa"
                component={Perkaryawan}
                exact
              />
              <PrivateRoute path="/admin/harian" component={Harian} exact />
              <PrivateRoute path="/admin/mingguan" component={Mingguan} exact />
              <PrivateRoute path="/admin/bulanan" component={Bulanan} exact />
              <PrivateRoute path="/admin/perkelas" component={Perkelas} exact />
              <PrivateRoute
                path="/admin/bulanan/perkelas"
                component={BulanPerkelas}
                exact
              />
              <PrivateRoute
                path="/admin/harian/perkelas"
                component={HarianPerkelas}
                exact
              />
              {/* data absensi */}
              <PrivateRoute path="/admin/absensi" component={Absensi} exact />
              <PrivateRoute path="/admin/cuti" component={Cuti} exact />
              <PrivateRoute
                path="/admin/kehadiran"
                component={Kehadiran}
                exact
              />
              <PrivateRoute path="/admin/lembur" component={Lembur} exact />
              <PrivateRoute
                path="/admin/siswa/kelas/:id"
                component={SiswaperKelas}
                exact
              />
              <PrivateRoute
                path="/admin/bulanan/perkelas"
                component={BulanPerkelas}
                exact
              />
              <PrivateRoute
                path="/admin/mingguan/perkelas"
                component={MingguanPerkelas}
                exact
              />
            </>
            // ) : (
            //   <>
            //     <Redirect
            //       to={{
            //         pathname: "/page/notfound",
            //       }}
            //     />
            //   </>
          )}
          {/* end admin */}
          {/* {role === "USER" && "Wali Murid" ? (
            <> */}
          <PrivateRoute
            path="/user/detail_absen/:id"
            component={DetailAbsen}
            exact
          />
          {/* </>
          ) : (
            <></>
          )} */}

          {/* /* start user */}
          {role === "USER" && (
            <>
              <PrivateRoute
                path="/user/dashboard"
                component={DashboardUser}
                exact
              />
              <PrivateRoute
                path="/user/history_absen"
                component={TabelAbsen}
                exact
              />
              <PrivateRoute
                path="/user/history_cuti"
                component={TabelCuti}
                exact
              />
              <PrivateRoute
                path="/user/history_lembur"
                component={TabelLembur}
                exact
              />
              <PrivateRoute path="/user/cuti" component={AddCuti} exact />
              <PrivateRoute path="/user/lembur" component={AddLembur} exact />
              <PrivateRoute path="/user/izin" component={AddIzin} exact />
              <PrivateRoute path="/user/profile" component={Profile} exact />
              <PrivateRoute path="/user/absen" component={AbsenMasuk} exact />
              <PrivateRoute path="/user/pulang" component={AbsenPulang} exact />
              <PrivateRoute
                path="/user/detail_info/:id"
                component={Pengumuman}
                exact
              />
              <PrivateRoute
                path="/user/izin_absen"
                component={IzinAbsen}
                exact
              />
            </>
            // ) : (
            //   <>
            //     <Redirect
            //       to={{
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
              <PrivateRoute
                path="/superadmin/dashboard"
                component={DashboardSA}
                exact
              />
              {/* admin */}
              <PrivateRoute path="/superadmin/admin" component={Admin} exact />
              <PrivateRoute
                path="/superadmin/addA"
                component={AddAdmin}
                exact
              />
              <PrivateRoute
                path="/superadmin/detailA/:id"
                component={DetailAdmin}
                exact
              />
              <PrivateRoute
                path="/superadmin/editA/:id"
                component={EditAdmin}
                exact
              />
              {/* organisasi */}
              <PrivateRoute
                path="/superadmin/organisasi"
                component={OrganisasiSA}
                exact
              />
              <PrivateRoute
                path="/superadmin/profile"
                component={ProfilSA}
                exact
              />
              <PrivateRoute
                path="/superadmin/addO"
                component={AddOrganisasiSA}
                exact
              />
              <PrivateRoute
                path="/superadmin/detailO/:id"
                component={DetailOrganisasiSA}
                exact
              />
              <PrivateRoute
                path="/superadmin/editO/:id"
                component={EditOrganisasiSA}
                exact
              />
              {/* jabatan */}
              <PrivateRoute
                path="/superadmin/jabatan"
                component={JabatanSA}
                exact
              />
              <PrivateRoute
                path="/superadmin/addJ"
                component={AddJabatanSA}
                exact
              />
              <PrivateRoute
                path="/superadmin/detailJ/:id"
                component={DetailJabatanSA}
                exact
              />
              <PrivateRoute
                path="/superadmin/editJ/:idJabatan"
                component={EditJabatanSA}
                exact
              />
              {/* shift */}
              <PrivateRoute
                path="/superadmin/shift"
                component={ShiftSA}
                exact
              />
              <PrivateRoute
                path="/superadmin/detailS/:id"
                component={DetailShiftSA}
                exact
              />
              <PrivateRoute
                path="/superadmin/add-shift"
                component={AddShiftSA}
                exact
              />
              <PrivateRoute
                path="/superadmin/editS/:id"
                component={EditShiftSA}
                exact
              />
              <PrivateRoute
                path="/superadmin/data-user"
                component={User}
                exact
              />
              <PrivateRoute path="/superadmin/addU" component={AddUser} exact />
              <PrivateRoute
                path="/superadmin/editU/:id"
                component={EditUser}
                exact
              />
              <PrivateRoute
                path="/superadmin/detailU/:id"
                component={DetailUser}
                exact
              />
              <PrivateRoute
                path="/superadmin/lokasi"
                component={LokasiSA}
                exact
              />
              <PrivateRoute
                path="/superadmin/addLokasi"
                component={AddLokasiSA}
                exact
              />
              <PrivateRoute
                path="/superadmin/editLokasi/:idLokasi"
                component={EditLokasiSA}
                exact
              />
              <PrivateRoute
                path="/superadmin/detailLokasi/:idLokasi"
                component={DetailLokasiSA}
                exact
              />
              <PrivateRoute
                path="/superadmin/absensi"
                component={AbsensiSA}
                exact
              />
              <PrivateRoute
                path="/superadmin/detailAbsensi/:id"
                component={DetailAbsensiSA}
                exact
              />
            </>
            // ) : (
            //   <>
            //     <Redirect
            //       to={{
            //         pathname: "/page/notfound",
            //       }}
            //     />
            //   </>
          )}
          {/* end superadmin */}
          {role == "Wali Murid" && (
            <>
              <PrivateRoute
                path="/walimurid/dashboard"
                component={DashboardOrtu}
                exact
              />
              <PrivateRoute
                path="/walimurid/detail_info/:id"
                component={DetailPengumuman}
                exact
              />
              <PrivateRoute
                path="/walimurid/profile"
                component={ProfileOrtu}
                exact
              />
            </>
            // ) : (
            //   <>
            //     <Redirect
            //       to={{
            //         pathname: "/page/notfound",
            //       }}
            //     />
            //   </>
          )}

          <Route component={NotFound} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
