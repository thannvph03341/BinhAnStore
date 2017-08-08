import typeAction from '../type_action/KeyAction'
const nguoiDungDangXuat = (state = false, action) => {

        if (action.type === typeAction.keyDangXuat){
            return true
        }
        return state
}

export default nguoiDungDangXuat