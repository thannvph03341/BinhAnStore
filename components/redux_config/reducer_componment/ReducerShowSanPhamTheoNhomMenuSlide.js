import typerDefault from '../type_action/KeyAction'

const showMenuShowSanPhamNhom = (state = {ds:[], load: false}, action) => {
    if (action.type === typerDefault.keyShowSanPhamTrongNhomTuMenu ) {
       
        return  {ds: action.danhSachSanPham, load: true, tenNganhNhomSanPham: action.tenNganhNhomSanPham} 
    }
    return state
}

export default showMenuShowSanPhamNhom