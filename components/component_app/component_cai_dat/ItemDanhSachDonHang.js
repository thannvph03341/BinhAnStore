import React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native'

import Monent from 'moment'

const {width, height} = Dimensions.get('screen')

export default class ItemsDanhSachDonHang extends Component {

    // componentDidMount(){
    //     const {objectDonHang} = this.props


    // }

    // constructor(props){
    //     super(props)

    // }

    tinhTongTienHoaDon(danhSachSanPham){
        var tongTienHoaDon = 0
        danhSachSanPham.map((v) =>{
            tongTienHoaDon += v.donGia
        })
        return this.dinhDangTien(tongTienHoaDon)
    }

    dinhDangTien(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }


    render(){
        const {objectDonHang} = this.props
       

        return(
            <View style={{flex:1, backgroundColor:'transparent', flexDirection:'column'}}>
                <View style={{flex:1,  margin: 5, backgroundColor:'#FFF', padding: 5}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={[style.txtDefault, style.txtWidth, ]}>Đơn Hàng:</Text>
                        <Text numberOfLines = {1} style={[style.txtDefault, style.txtTitle,]}>{objectDonHang.idDatHang.toUpperCase()}</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={[style.txtDefault, style.txtWidth]}>Tổng tiền:</Text>
                        <Text style={[style.txtDefault, style.txtTitle]}>{this.tinhTongTienHoaDon(objectDonHang.datHangChiTiets)} đ</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={[style.txtDefault, style.txtWidth]}>Người Nhận:</Text>
                        <Text style={[style.txtDefault, style.txtTitle]}>{objectDonHang.tenKhachHang}</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={[style.txtDefault, style.txtWidth]}>SĐT:</Text>
                        <Text style={[style.txtDefault, style.txtTitle]}>{objectDonHang.soDienThoai}</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={[style.txtDefault, style.txtWidth]}>Địa chỉ nhận:</Text>
                        <Text 
                        style={[style.txtDefault, style.txtTitle]}>{objectDonHang.diaChi}</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={[style.txtDefault, style.txtWidth]}>Ngày đặt:</Text>
                          <Text style={[style.txtDefault, style.txtTitle]}>{objectDonHang.Ngaytao.replace('T',' - ').split('.')[0]}</Text>  
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={[style.txtDefault, style.txtWidth]}>Trạng thái:</Text>
                        <Text style={[style.txtDefault, style.txtStatus,]}>{objectDonHang.trangThaiDonHang == 0 ? 'Chờ xác nhận!': 'Đã xác nhận!'}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    txtDefault: {
        fontSize: 18 
    },
    txtWidth:{
        width: 118,
        textAlign: 'right',
        marginRight: 10
    },
    txtTitle:{
        color:'#EB1F1F',
        width: width - 138,
        fontSize: 16,
        backgroundColor:'transparent',
        paddingRight: 10,
    },
    txtStatus:{
        color:'#3278E7',
        fontSize: 16,
        backgroundColor:'transparent',
        paddingRight: 10
    }
})