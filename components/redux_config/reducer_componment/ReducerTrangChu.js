import typerDefault from '../type_action/KeyAction'

const defaultState = {
    sanPhamChiTiet:null
}


const showChiTietSanPham = (state = defaultState.sanPhamChiTiet, action) => {
    if (action.type === typerDefault.keyShowChiTietSanPham) {
       
        return action.sanPhamChiTiet
    }
    return state
}

export default showChiTietSanPham