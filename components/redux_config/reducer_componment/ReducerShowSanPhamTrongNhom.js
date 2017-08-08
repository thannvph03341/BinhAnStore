import typeAction from '../type_action/KeyAction'

const showSanPhamTrongNhom = (state = [], action ) => {
    if (action.type === typeAction.keyShowSanPhamTrongNhom){

        return action.danhSachSanPham
    }
    return state
}

export default showSanPhamTrongNhom