
const host = 'http://demo3.dataviet.vn'
const hostApi = {
    host: host,
    apiDangNhapPost: `${host}/api/dmKhachHangApi/Login` ,
    apiGetNganhNhomSanPham: `${host}/api/dmSanPhamApi/GetdmSanPhamsNganhNhom?`, //pageNganh=1&pageNhom=1&pageSanPham=1&pageSize=10
    apiDathang: `${host}/api/datHangApi/createDatHangApp`,
    apiLichSuDonHang: `${host}/api/datHangApi/Lichsudathang?id=`,
    apiTiemKiem: `${host}/api/searchApi/searchProduct` // http://demo3.dataviet.vn/api/searchApi/searchProduct?idKhachHang=011FA38F-63C1-4E33-9BBF-19886003C881&searchOption=TENNHOMSANPHAM&keyWord=Hoá&page=1&pageSize=40
}

export default hostApi