import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import { connect } from 'react-redux'
import typeDefault from '../../redux_config/type_action/KeyAction'

class ItemNhomNganh extends Component {


    componentWillMount(){
        const {objectItem} = this.props

        this.props.indexClickSelect == objectItem.index ? this.props.dispatch({type: typeDefault.indexMenuNganhSelect, items: objectItem}):null
    }

    constructor(props){
        super(props)
    }


    render(){
        const {objectItem} = this.props
        //

        return(
           <View style={{flex:1}}>
                <View style={{flex:1}}>
                <TouchableOpacity style={{flex:1, flexDirection:'column', justifyContent:'center', alignContent:'center', marginLeft: 20, marginRight:10 }}
                    onPress = {() => {
                        {/* this.itemsRenderClick(itemObject) */}

                        this.props.dispatch({type: typeDefault.indexMenuNganhSelect, items: objectItem})
                    }}
                >
                    <Text>{objectItem.item.tenNganhSanPham}</Text>
                   
                    </TouchableOpacity>
                    <View style={{flex:0.03, backgroundColor: this.props.indexClickSelect == objectItem.index ? '#EB1F1F':'transparent', marginLeft: 5, marginRight: 2.5}}/>
                </View>
           </View>
        )
    }
} 


function getIndexItemSelectNganh(state) {

   // console.log(state)

    const {index} = state.itemsClickSelect
    return {
        indexClickSelect: index != null ? index : 0 
    };
}

export default connect(getIndexItemSelectNganh)(ItemNhomNganh)
