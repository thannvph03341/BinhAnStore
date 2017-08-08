import React,{Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native'
const {width} = Dimensions.get('screen')
export default class ItemDiaChiKhachHang extends Component{
    render(){
        const {objectDiaChiKhachHang, userChoose} = this.props
        if (objectDiaChiKhachHang.idKhachHang == "btn")
        {
            return(
                <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop: 5}}>
                    <TouchableOpacity style={{height: 55, width: width - 10, backgroundColor: '#D8D8D8', borderColor:'#979797', borderWidth:1, flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 18, color: '#000'}}>Thêm Địa Chỉ Mới</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return(
                <View style={{flex:1, backgroundColor: '#FFF', borderColor:'red', borderWidth:1, flexDirection: 'row', justifyContent:'center', paddingLeft: 10, paddingRight: 10, paddingTop: 2.5, paddingBottom: 2.5, marginTop: 5}}>
                    <TouchableOpacity 
                        onPress = {() => {
                            userChoose(objectDiaChiKhachHang.idKhachHang)
                        }}
                        style = {{flex:1, flexDirection:'column', justifyContent:'center'}}>
                        <Text style={{fontSize: 18, color: '#000'}}>Họ Tên: {objectDiaChiKhachHang.tenKhachHang}</Text>
                        <Text style={{fontSize: 18, color: '#000'}}>SĐT: {objectDiaChiKhachHang.soDienThoai}</Text>
                        <Text style={{fontSize: 18, color: '#000'}}>Địa Chỉ: {objectDiaChiKhachHang.diaChi}</Text>
                        <Text style={{fontSize: 18, color: '#000'}}>Email: {objectDiaChiKhachHang.email}</Text>
                    </TouchableOpacity>
                   {objectDiaChiKhachHang.isChoose === objectDiaChiKhachHang.idKhachHang ? <Text style={{marginLeft: 5, fontSize: 45, color:  'red'}}>✓</Text>: null}
                </View>
            )
        }

    }
}