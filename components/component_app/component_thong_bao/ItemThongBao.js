import React,{Component} from 'react'
import {
    View,
    Text
} from 'react-native'

export default class ItemThongBao extends Component {

    render(){
        const {objectThongBao} = this.props
        return(
            <View style={{flex:1, flexDirection:'column', justifyContent: 'center', alignItems:'center', backgroundColor: '#FFF', marginLeft: 5, marginRight: 5, marginTop:5, padding: 5}}>
                <Text style = {{flex: 1, color: '#000', fontSize: 18}}>{objectThongBao.item.noiDung}</Text>
            </View>
        )
        
    }
}