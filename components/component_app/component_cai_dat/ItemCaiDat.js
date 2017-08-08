import React, {Component} from 'react'
import {
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    
} from 'react-native'

const {width, height} = Dimensions.get('screen')
import {connect} from 'react-redux'
import typeAction from '../../redux_config/type_action/KeyAction'
class ItemsCaiDat extends Component {

    render(){
        const {obItemCaiDat, showTabCaiDat} = this.props
        return (
            <View style={{flex:1, borderColor:'#C2C2C2', borderWidth:1, backgroundColor:'#FFF'}}>
                 <TouchableOpacity 
                    onPress = {() => {
                       // console.log(obItemCaiDat.id)
                         // this.props.dispatch({type: obItemCaiDat.id, itemAction: {itemAction: null ,keyAction: 'isNull'}})
                         showTabCaiDat(obItemCaiDat.id, {itemAction: null ,keyAction: 'isNull'})  
                    }}
                    style={{flex:1, height: 55, flexDirection:'column', justifyContent:'center', marginLeft: 5, marginRight:5}}
                 >
                       <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                            <Text 
                            style = {{width: width - 50}}
                             numberOfLines = {1}
                            >{obItemCaiDat.name}</Text>
                            <Text style={{right:0}}>></Text>
                       </View>
                 </TouchableOpacity>
            </View>
        )
    }
}

export default connect()(ItemsCaiDat)