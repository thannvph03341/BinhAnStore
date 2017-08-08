import typeAction from '../type_action/KeyAction'

const stateDefalut = {
    itemAction: null ,   
    keyAction: 'isNull'
}

const renderActionCaiDat = (state = stateDefalut, action) => {
    switch(action.type){
        case typeAction.keyShowDanhSachDonHang:
         return {
                itemAction: action.itemAction ,   
                keyAction: typeAction.keyShowDanhSachDonHang     
            }
        case typeAction.keyShowThonTinNhaCungCap:
         return {
                itemAction: action.itemAction ,   
                keyAction: typeAction.keyShowThonTinNhaCungCap
            }
       case typeAction.keyShowThongTinNhaPhatTrien:
            return {
                itemAction: action.itemAction ,   
                keyAction: typeAction.keyShowThongTinNhaPhatTrien
            }

        case typeAction.keyDangXuat:
            return {
                itemAction: action.itemAction ,   
                keyAction: typeAction.keyDangXuat
            }
        default: 
            return state
    }

}

export default renderActionCaiDat