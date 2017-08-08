import React,{Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native'
const {width} = Dimensions.get('screen')
export default class ItemXacNhanDatHang extends Component{

    dinhDangTien(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    render(){
        const {objectXacNhan} = this.props

        if (objectXacNhan.hehehe == '^&%@#&^%#*@')
        {
            return(
               <View style={{flex:1, backgroundColor: '#FFF', flexDirection: 'column', justifyContent:'center', paddingLeft: 10, paddingRight: 10, paddingTop: 2.5, paddingBottom: 2.5, marginTop: 5}}>
                    <Text style={{fontSize: 18, color: '#000'}}>Họ Tên: {objectXacNhan.tenKhachHang}</Text>
                    <Text style={{fontSize: 18, color: '#000'}}>SĐT: {objectXacNhan.soDienThoai}</Text>
                    <Text style={{fontSize: 18, color: '#000'}}>Địa Chỉ: {objectXacNhan.diaChi}</Text>
                    <Text style={{fontSize: 18, color: '#000'}}>Email: {objectXacNhan.email}</Text>
                </View>
                
            )
        } else {
            return(
                <View style={{width, height: 55, flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor: '#FFF', marginTop: 10}}>
                    <Text style={{fontSize: 18, fontWeight:'bold'}}>Tổng HĐ: </Text>
                    <Text style={{fontSize: 18, color:'red', fontWeight:'bold'}}>{this.dinhDangTien(objectXacNhan.tongHoaDon)} đ</Text> 
                </View>
            )
        }

    }
}