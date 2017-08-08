
import keyActionDefault from '../type_action/KeyAction'

const defaultState = {
    itemMenuSelect:null
}


const itemMenuSliderSelect = (state = defaultState.itemMenuSelect, action) => {

   if (action.type === keyActionDefault.keyMenuSliderSelect){
       
       return action.itemMenuSelect
   }
   return state
}

export default itemMenuSliderSelect