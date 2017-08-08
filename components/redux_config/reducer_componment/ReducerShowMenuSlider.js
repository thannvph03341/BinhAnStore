import typerDefault from '../type_action/KeyAction'

const showMenuSlider = (state = false, action) => {
    if (action.type === typerDefault.keyMenuClickShow) {
       
        return action.showMenu
    }
    return state
}

export default showMenuSlider