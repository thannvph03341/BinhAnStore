import React,{Component} from 'react'
import {
    View, 
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Dimensions,
    Platform,
    KeyboardAvoidingView
} from 'react-native'
import img_san_pham from '../../../assets/image/img_san_pham.jpg' 
const {width, height} = Dimensions.get('screen')
export default class ItemSanPhamVanVanChuyen extends Component {
    
    dinhDangTien(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    render(){
        const {objectSanPham} = this.props

        return(
            <View style={{width: width - 10, height: 150,  flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop: 5,  marginLeft: 5, marginRight:5, backgroundColor:'#FFF'}}>
                    <View style={{height: 35, flexDirection:'row', alignItems:'center'}}>
                        <Text numberOfLines = {1} style = {{flex:1, fontSize: 18, marginLeft: 5, color: '#000'}}>{objectSanPham.tenSanPham}</Text>
                    </View>
                    <View style={{height: 115, flexDirection:'row', alignContent:'center'}}>
                        <Image source = {img_san_pham} style={{width:110, height: 110}}/>
                        <View
                            style={{flex:1, backgroundColor:'transparent', marginLeft: 5, flexDirection:'column', justifyContent:'center', marginBottom: 5}}
                        >   
                            <View style={{height: 35, flexDirection:'row',}}>
                                <Text style = {{width: 50, fontSize: 18, color: '#000'}}>Giá: </Text>
                                <Text style={{backgroundColor:'transparent', fontSize: 18, color:'#EC2727'}}>{this.dinhDangTien(objectSanPham.giaBanKhachHang)} đ</Text>
                            </View>
                            <View style={{height: 35, flexDirection:'row', alignItems:'center', paddingBottom:10}}>
                                <Text style = {{fontSize: 18, color: '#000'}}>Số Lượng: </Text>
                                <Text style={{backgroundColor:'transparent', fontSize: 18, color:'#EC2727'}}>{objectSanPham.soLuongMua}</Text>
                            </View>
                            <View style={{height: 35, flexDirection:'row',}}>
                                <Text style = {{fontSize: 18, color: '#000'}}>Tổng: </Text>
                                <Text style={{backgroundColor:'transparent', fontSize: 18, color:'#EC2727'}}>{this.dinhDangTien(objectSanPham.tongTien )} đ</Text>
                            </View>
                    </View> 
                </View>
            </View>
        )
    }
}