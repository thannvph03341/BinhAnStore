import React,{Component} from 'react'
import {
    View,
    Text,
    Platform,
    Dimensions
} from 'react-native'
import {connect} from 'react-redux'
const {width} = Dimensions.get('screen')

export default class HeaderNavifation  extends Component {

    dinhDangTien(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    render(){
        const {tongHoaDon} = this.props
        return(
            <View style={{width: width, height: Platform.OS == 'ios' ? 65:55,  flexDirection:'column', backgroundColor:'#C2C2C2', alignItems: 'center'}}>
                    <Text
                        numberOfLines = {1}
                        style={{flex: 1, textAlign:'center', marginTop: Platform.OS == 'ios' ? 30:0, fontSize: 18, fontWeight:'bold', color:'#0062FF'}}>Tổng HĐ: {this.dinhDangTien(tongHoaDon)} đ</Text>
                <View style = {{width, height:1, backgroundColor:'#D8D8D8'}}/>
            </View>
        )
    }
}