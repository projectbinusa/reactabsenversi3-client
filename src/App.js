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

import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const role = localStorage.getItem("role");
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/registerUser" component={RegisterUser} exact />
          <Route path="/registerSA" component={RegisterSuperadmin} exact />
          {/* Forgot Pass User */}
          <Route path="/forgotpass" component={ForgotPass} exact />
          <Route path="/verify-code" component={VerifyCode} exact />
          <Route
            path="/reset-password/:token"
            component={ResetPassword}
            exact
          />
          {/* Forgot Pass Superadmin */}
          <Route path="/forgotpassSup" component={ForgotPassSup} exact />
          <Route path="/verify-code-sup" component={VerifyCodeSup} exact />
          <Route
            path="/reset-password-sup/:token"
            component={ResetPasswordSup}
            exact
          />
          {/* Forgot Pass Admin */}
          <Route path="/forgotpass-admin" component={ForgotPassAdmin} exact />
          <Route path="/verify-code-admin" component={VerifyCodeAdmin} exact />
          <Route
            path="/reset-password-admin/:token"
            component={ResetPasswordAdmin}
            exact
          />
          {/* Private Routes */}
          {/* Wali Murid Routes */}
          <PrivateRoute path="/walimurid/dashboard" roles={["Wali Murid"]}>
            <DashboardOrtu />
          </PrivateRoute>

          <PrivateRoute
            path="/walimurid/detail_info/:id"
            roles={["Wali Murid"]}
          >
            <DetailPengumuman />
          </PrivateRoute>

          {/* Private Routes */}
          {/* Admin Routes */}
          <PrivateRoute path="/admin/dashboard" roles={["ADMIN"]}>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/admin/profil" roles={["ADMIN"]}>
            <Profil />
          </PrivateRoute>
          <PrivateRoute path="/admin/karyawan" roles={["ADMIN"]}>
            <Karyawan />
          </PrivateRoute>
          <PrivateRoute path="/admin/kelas" roles={["ADMIN"]}>
            <KelasSiswa />
          </PrivateRoute>
          <PrivateRoute path="/admin/jabatan" roles={["ADMIN"]}>
            <Jabatan />
          </PrivateRoute>
          <PrivateRoute path="/admin/shift" roles={["ADMIN"]}>
            <Shift />
          </PrivateRoute>
          <PrivateRoute path="/admin/lokasi" roles={["ADMIN"]}>
            <Lokasi />
          </PrivateRoute>
          <PrivateRoute path="/admin/organisasi" roles={["ADMIN"]}>
            <Organisasi />
          </PrivateRoute>
          <PrivateRoute path="/admin/informasi" roles={["ADMIN"]}>
            <Informasi />
          </PrivateRoute>
          {/* Detail Admin */}
          <PrivateRoute path="/admin/detailK/:id" roles={["ADMIN"]}>
            <DetailKaryawan />
          </PrivateRoute>
          <PrivateRoute path="/admin/detailLembur/:id" roles={["ADMIN"]}>
            <DetailLembur />
          </PrivateRoute>
          <PrivateRoute path="/admin/detailL/:id" roles={["ADMIN"]}>
            <DetailLokasi />
          </PrivateRoute>
          <PrivateRoute path="/admin/detailO/:id" roles={["ADMIN"]}>
            <DetailOrganisasi />
          </PrivateRoute>
          <PrivateRoute path="/admin/detailA/:id" roles={["ADMIN"]}>
            <DetailAbsensi />
          </PrivateRoute>
          {/* Add Admin */}
          <PrivateRoute path="/admin/addkary" roles={["ADMIN"]}>
            <Addkaryawan />
          </PrivateRoute>
          <PrivateRoute path="/admin/addjab" roles={["ADMIN"]}>
            <AddJabatan />
          </PrivateRoute>
          <PrivateRoute path="/admin/addshift" roles={["ADMIN"]}>
            <AddShift />
          </PrivateRoute>
          <PrivateRoute path="/admin/addlok" roles={["ADMIN"]}>
            <AddLokasi />
          </PrivateRoute>
          <PrivateRoute path="/admin/addor" roles={["ADMIN"]}>
            <AddOrganisasi />
          </PrivateRoute>
          <PrivateRoute path="/admin/addkelas" roles={["ADMIN"]}>
            <AddKelas />
          </PrivateRoute>
          <PrivateRoute path="/admin/addinformasi" roles={["ADMIN"]}>
            <AddInformasi />
          </PrivateRoute>
          {/* Edit Admin */}
          <PrivateRoute path="/admin/editK/:id" roles={["ADMIN"]}>
            <EditKaryawan />
          </PrivateRoute>
          <PrivateRoute path="/admin/editJ/:id" roles={["ADMIN"]}>
            <EditJabatan />
          </PrivateRoute>
          <PrivateRoute path="/admin/editL/:id" roles={["ADMIN"]}>
            <EditLokasi />
          </PrivateRoute>
          <PrivateRoute path="/admin/editO/:id" roles={["ADMIN"]}>
            <EditOrganisasi />
          </PrivateRoute>
          <PrivateRoute path="/admin/editS/:id" roles={["ADMIN"]}>
            <EditShift />
          </PrivateRoute>
          <PrivateRoute path="/admin/editkelas/:id" roles={["ADMIN"]}>
            <EditKelas />
          </PrivateRoute>
          <PrivateRoute path="/admin/editI/:id" roles={["ADMIN"]}>
            <EditInformasi />
          </PrivateRoute>
          {/* Rekapan Admin */}
          <PrivateRoute path="/admin/simpel" roles={["ADMIN"]}>
            <Simpel />
          </PrivateRoute>
          <PrivateRoute path="/admin/perkaryawan" roles={["ADMIN"]}>
            <Perkaryawan />
          </PrivateRoute>
          <PrivateRoute path="/admin/harian" roles={["ADMIN"]}>
            <Harian />
          </PrivateRoute>
          <PrivateRoute path="/admin/mingguan" roles={["ADMIN"]}>
            <Mingguan />
          </PrivateRoute>
          <PrivateRoute path="/admin/bulanan" roles={["ADMIN"]}>
            <Bulanan />
          </PrivateRoute>
          <PrivateRoute path="/admin/perkelas" roles={["ADMIN"]}>
            <Perkelas />
          </PrivateRoute>
          <PrivateRoute path="/admin/bulanan/perkelas" roles={["ADMIN"]}>
            <BulanPerkelas />
          </PrivateRoute>
          <PrivateRoute path="/admin/harian/perkelas" roles={["ADMIN"]}>
            <HarianPerkelas />
          </PrivateRoute>
          <PrivateRoute path="/admin/siswa/kelas/:id" roles={["ADMIN"]}>
            <SiswaperKelas />
          </PrivateRoute>
          <PrivateRoute path="/admin/mingguan/perkelas" roles={["ADMIN"]}>
            <MingguanPerkelas />
          </PrivateRoute>
          {/* Data Absensi Admin */}
          <PrivateRoute path="/admin/absensi" roles={["ADMIN"]}>
            <Absensi />
          </PrivateRoute>
          <PrivateRoute path="/admin/cuti" roles={["ADMIN"]}>
            <Cuti />
          </PrivateRoute>
          <PrivateRoute path="/admin/kehadiran" roles={["ADMIN"]}>
            <Kehadiran />
          </PrivateRoute>
          <PrivateRoute path="/admin/lembur" roles={["ADMIN"]}>
            <Lembur />
          </PrivateRoute>
          {/* End Admin Routes */}

          {/* User Routes */}
          <PrivateRoute path="/user/dashboard" roles={["USER"]}>
            <DashboardUser />
          </PrivateRoute>
          <PrivateRoute path="/user/history_absen" roles={["USER"]}>
            <TabelAbsen />
          </PrivateRoute>
          <PrivateRoute path="/user/history_cuti" roles={["USER"]}>
            <TabelCuti />
          </PrivateRoute>
          <PrivateRoute path="/user/history_lembur" roles={["USER"]}>
            <TabelLembur />
          </PrivateRoute>
          <PrivateRoute path="/user/cuti" roles={["USER"]}>
            <AddCuti />
          </PrivateRoute>
          <PrivateRoute path="/user/lembur" roles={["USER"]}>
            <AddLembur />
          </PrivateRoute>
          <PrivateRoute path="/user/izin" roles={["USER"]}>
            <AddIzin />
          </PrivateRoute>
          <PrivateRoute path="/user/profile" roles={["USER"]}>
            <Profile />
          </PrivateRoute>
          <PrivateRoute path="/user/absen" roles={["USER"]}>
            <AbsenMasuk />
          </PrivateRoute>
          <PrivateRoute path="/user/pulang" roles={["USER"]}>
            <AbsenPulang />
          </PrivateRoute>
          <PrivateRoute path="/user/izin_absen" roles={["USER"]}>
            <IzinAbsen />
          </PrivateRoute>
          <PrivateRoute path="/user/detail_info/:id" roles={["USER"]}>
            <Pengumuman />
          </PrivateRoute>
          <PrivateRoute path="/user/detail_absen/:id" roles={["USER"]}>
            <DetailAbsen />
          </PrivateRoute>
          {/* End User Routes */}

          {/* Superadmin Routes */}
          <PrivateRoute path="/superadmin/dashboard" roles={["SUPERADMIN"]}>
            <DashboardSA />
          </PrivateRoute>
          <PrivateRoute path="/superadmin/profile" roles={["SUPERADMIN"]}>
            <ProfilSA />
          </PrivateRoute>
          {/* Page Admin */}
          <PrivateRoute path="/superadmin/admin" roles={["SUPERADMIN"]}>
            <Admin />
          </PrivateRoute>
          <PrivateRoute path="/superadmin/addA" roles={["SUPERADMIN"]}>
            <AddAdmin />
          </PrivateRoute>
          <PrivateRoute path="/superadmin/detailA/:id" roles={["SUPERADMIN"]}>
            <DetailAdmin />
          </PrivateRoute>
          <PrivateRoute path="/superadmin/editA/:id" roles={["SUPERADMIN"]}>
            <EditAdmin />
          </PrivateRoute>
          {/* Page Organisasi */}
          <PrivateRoute path="/superadmin/organisasi" roles={["SUPERADMIN"]}>
            <OrganisasiSA />
          </PrivateRoute>
          <PrivateRoute path="/superadmin/addO" roles={["SUPERADMIN"]}>
            <AddOrganisasiSA />
          </PrivateRoute>
          <PrivateRoute path="/superadmin/detailO/:id" roles={["SUPERADMIN"]}>
            <DetailOrganisasiSA />
          </PrivateRoute>
          <PrivateRoute path="/superadmin/editO/:id" roles={["SUPERADMIN"]}>
            <EditOrganisasiSA />
          </PrivateRoute>
          {/* Page Jabatan */}
          <PrivateRoute path="/superadmin/jabatan" roles={["SUPERADMIN"]}>
            <JabatanSA />
          </PrivateRoute>
          <PrivateRoute path="/superadmin/addJ" roles={["SUPERADMIN"]}>
            <AddJabatanSA />
          </PrivateRoute>
          <PrivateRoute path="/superadmin/detailJ/:id" roles={["SUPERADMIN"]}>
            <DetailJabatanSA />
          </PrivateRoute>
          <PrivateRoute
            path="/superadmin/editJ/:idJabatan"
            roles={["SUPERADMIN"]}
          >
            <EditJabatanSA />
          </PrivateRoute>
          {/* Page Shift */}
          <PrivateRoute path="/superadmin/shift" roles={["SUPERADMIN"]}>
            <ShiftSA />
          </PrivateRoute>
          <PrivateRoute path="/superadmin/detailS/:id" roles={["SUPERADMIN"]}>
            <DetailShiftSA />
          </PrivateRoute>
          <PrivateRoute path="/superadmin/add-shift" roles={["SUPERADMIN"]}>
            <AddShiftSA />
          </PrivateRoute>
          <PrivateRoute path="/superadmin/editS/:id" roles={["SUPERADMIN"]}>
            <EditShiftSA />
          </PrivateRoute>
          {/* Page User */}
          <PrivateRoute path="/superadmin/data-user" roles={["SUPERADMIN"]}>
            <User />
          </PrivateRoute>
          <PrivateRoute path="/superadmin/addU" roles={["SUPERADMIN"]}>
            <AddUser />
          </PrivateRoute>
          <PrivateRoute path="/superadmin/editU/:id" roles={["SUPERADMIN"]}>
            <EditUser />
          </PrivateRoute>
          <PrivateRoute path="/superadmin/detailU/:id" roles={["SUPERADMIN"]}>
            <DetailUser />
          </PrivateRoute>
          {/* Page Lokasi */}
          <PrivateRoute path="/superadmin/lokasi" roles={["SUPERADMIN"]}>
            <LokasiSA />
          </PrivateRoute>
          <PrivateRoute path="/superadmin/addLokasi" roles={["SUPERADMIN"]}>
            <AddLokasiSA />
          </PrivateRoute>
          <PrivateRoute
            path="/superadmin/editLokasi/:idLokasi"
            roles={["SUPERADMIN"]}
          >
            <EditLokasiSA />
          </PrivateRoute>
          <PrivateRoute
            path="/superadmin/detailLokasi/:idLokasi"
            roles={["SUPERADMIN"]}
          >
            <DetailLokasiSA />
          </PrivateRoute>
          {/* Page Absensi */}
          <PrivateRoute path="/superadmin/absensi" roles={["SUPERADMIN"]}>
            <AbsensiSA />
          </PrivateRoute>
          <PrivateRoute
            path="/superadmin/detailAbsensi/:id"
            roles={["SUPERADMIN"]}
          >
            <DetailAbsensiSA />
          </PrivateRoute>
          {/* Page Ortu */}
          <PrivateRoute path="/superadmin/ortu" roles={["SUPERADMIN"]}>
            <OrangTua />
          </PrivateRoute>
          <PrivateRoute path="/superadmin/addOrtu" roles={["SUPERADMIN"]}>
            <AddOrtu />
          </PrivateRoute>
          <PrivateRoute path="/superadmin/editOrtu/:id" roles={["SUPERADMIN"]}>
            <EditOrtu />
          </PrivateRoute>
          <PrivateRoute
            path="/superadmin/detailOrtu/:id"
            roles={["SUPERADMIN"]}
          >
            <DetailOrtu />
          </PrivateRoute>
          {/* End Superadmin Routes */}
          {/* End Private Routes */}
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
