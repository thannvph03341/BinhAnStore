
import keyActionDefault from '../type_action/KeyAction'

const stateDefault = {
    keyTab: 'isNotShowTab',
    sanPham: null,
}

const showTabClick = (state = stateDefault, action) => {
    switch(action.type){

        case keyActionDefault.keyThemSanPhamVaoGio:
                //console.log("kjashdkjashdkhsdjkhdhaskdjh")
            return  {
                        keyTab: null,
                        sanPham: action.sanPham,
                    }
        case keyActionDefault.keyTatDialogThemSanPham:
            return {
                keyTab:null,
                sanPham: null,
            }
        case keyActionDefault.tabThongBao:
            return {
                        keyTab: keyActionDefault.tabThongBao,
                        sanPham: null,
                    }
        case keyActionDefault.tabGioHang:
            return {
                        keyTab: keyActionDefault.tabGioHang,
                        sanPham: null,
                    }
        case keyActionDefault.tabCaiDat:
            return {
                        keyTab: keyActionDefault.tabCaiDat,
                        sanPham: null,
                    }

        case keyActionDefault.tabTrangChu:            
            return {
                        keyTab: keyActionDefault.tabTrangChu,
                        sanPham: null,
                    }
        default: return state
    }
}

export default showTabClick