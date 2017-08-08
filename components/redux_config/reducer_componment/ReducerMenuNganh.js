
import keyActionDefault from '../type_action/KeyAction'

const defaultState = {
    items:null
}


const itemsClickSelect = (state = defaultState, action) => {

   if (action.type === keyActionDefault.indexMenuNganhSelect){
       
       return action.items
   }
   return state
}

export default itemsClickSelect