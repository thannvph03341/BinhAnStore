import typeAction from '../type_action/KeyAction'
const reducerMenuButtom = (state = true, action) => {
    if (action.type === typeAction.keyTabButtomShowOrHidden){
        return action.isShowMenu
    }
    return state
}

export default reducerMenuButtom