import {StackNavigator}  from 'react-navigation'
import ManHinhRoot from '../../component_app/ManHinhROOT'
import ManHinhChiTietSanPham from '../../navigation_comoponent/stack_screen/ManHinhChiTietSanPham'
import ManHinhGiaoHang from './ManHinhDiaChiGiaoHang'
import VanChuyen from './ManHinhVanChuyen'
import DatHang from './ManHinhDatHang'
import manHinhDanhSachDonHang from '../stack_screen/ManHinhDanhSachDonHang'
import manHinhThonTinNhaCungCap from '../stack_screen/ManHinhThongTinNhaCungCap'
import manHinhThongTinNhaPhatTrien from '../stack_screen/ManHinhThongTinNhaPhatTrien'
import manHinhDanhSachSanPhamTheoNhom from '../../component_app/SanPhamTheoNhom'

const AppContentTrangChu = StackNavigator({
  Home: { screen: ManHinhRoot },
  ChiTietSanPham: { screen: ManHinhChiTietSanPham },
  ManHinhDiaChiGiaoHang: { screen: ManHinhGiaoHang },
  ManHinhVanChuyen: { screen: VanChuyen },
  ManHinhDatHang: { screen: DatHang },
  DanhSachDonHang: { screen: manHinhDanhSachDonHang },
  ThonTinNhaCungCap: {screen: manHinhThonTinNhaCungCap},
  ThongTinNhaPhatTrien: {screen: manHinhThongTinNhaPhatTrien},
  SanPhamTheoNhom: {screen: manHinhDanhSachSanPhamTheoNhom}
});

export default AppContentTrangChu