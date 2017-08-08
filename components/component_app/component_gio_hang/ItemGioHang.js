import React,{Component} from 'react'
import {
    View, 
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Dimensions,
    Platform,
    KeyboardAvoidingView,
    AsyncStorage,
    Alert,
} from 'react-native'
import img_san_pham from '../../../assets/image/img_san_pham.jpg' 
import keyStore from '../../redux_config/type_action/KeyAsynStore'
import hostApi from '../../../func/HostApi'
const {width, height} = Dimensions.get('screen')
export default class ItemsGioHang extends Component {
    

    constructor(props){
        super(props)
        const {objectSanPham} = this.props
        this.state = {
            ...objectSanPham
        }

    }

    dinhDangTien(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

   
    chinhSuaSanPham(soLuong, type){

        const {capNhatSanPhamTrongGioHang, objectSanPham} = this.props
       if (soLuong == -1 && type == 'XOA') {
            capNhatSanPhamTrongGioHang({...objectSanPham}, type)
       } else {
            if (parseInt(soLuong) != NaN && parseInt(soLuong) > 0){
                    capNhatSanPhamTrongGioHang({...objectSanPham, soLuongMua: parseInt(soLuong), tongTien: objectSanPham.giaBanKhachHang * parseInt(soLuong)}, type)
                    this.setState({
                        soLuongMua: parseInt(soLuong)
                    })                                   
            } else {
                capNhatSanPhamTrongGioHang({...objectSanPham, soLuongMua: 1, tongTien: objectSanPham.giaBanKhachHang}, type)
                this.setState({
                        soLuongMua: 1
                    }) 
            } 
       }
          
    }

    render(){
        
        return(
            <View style={{width: width - 10, height: 150,  flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop: 5,  marginLeft: 5, marginRight:5, backgroundColor:'#FFF'}}>
                    <View style={{height: 35, flexDirection:'row', alignItems:'center'}}>
                        <Text numberOfLines = {1} style = {{flex:1, fontSize: 18, marginLeft: 5, color: '#000'}}>{this.state.tenSanPham}</Text>
                        <TouchableOpacity 
                            style = {{width: 60, height: 35}}
                            onPress = {() => {
                                this.chinhSuaSanPham(-1, 'XOA')
                            }}
                        >
                            <Text style={{width: 60, backgroundColor:'transparent', fontSize: 18, marginRight: 5, color:'#EC2727'}}>Xoá</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: 115, flexDirection:'row', alignContent:'center'}}>
                        <Image source = {{uri:`${this.state.urlAnhDaiDien}`}} style={{width:110, height: 110}}/>
                        <View
                            style={{flex:1, backgroundColor:'transparent', marginLeft: 5, flexDirection:'column', justifyContent:'center', marginBottom: 5}}
                        >   
                            <View style={{height: 35, flexDirection:'row',}}>
                                <Text style = {{width: 50, fontSize: 18, color: '#000'}}>Giá: </Text>
                                 <Text style={{backgroundColor:'transparent', fontSize: 18, color:'#EC2727'}}>{this.dinhDangTien(this.state.giaBanKhachHang)} đ</Text> 
                            </View>
                            <View style={{height: 35, flexDirection:'row', alignItems:'center', paddingBottom:10}}>
                                <Text style = {{fontSize: 18, color: '#000'}}>Số Lượng: </Text>
                                <TouchableOpacity
                                    style = {{width: 35, height: 35, flexDirection:'column', justifyContent:'center', alignItems:'center', borderColor: '#000', borderWidth: 1, borderRadius: 3}}
                                    onPress = {()=> {
                                        this.chinhSuaSanPham(this.state.soLuongMua - 1, 'SUA')
                                    }}
                                >
                                    <Text>-</Text>
                                </TouchableOpacity>
                                <TextInput 
                                    style={{width: 35, height: 35, backgroundColor:'transparent', fontSize: 18, borderColor:'#000', color: '#EC2727', borderWidth: 1, textAlign:'center', marginLeft: 5, marginRight:5, paddingBottom: Platform.OS == 'ios' ? 0: 4.3}}
                                    underlineColorAndroid = 'transparent'
                                    keyboardType = 'number-pad'
                                    value = {`${this.state.soLuongMua}`}
                                    onChangeText = {(v) => {
                                           this.chinhSuaSanPham(v, 'SUA')
                                        }   
                                    }

                                />
                                <TouchableOpacity
                                    style = {{width: 35, height: 35, flexDirection:'column', justifyContent:'center', alignItems:'center', borderColor: '#000', borderWidth: 1, borderRadius: 3}}
                                    onPress = {()=> {
                                        this.chinhSuaSanPham(this.state.soLuongMua + 1, 'SUA')
                                    }}
                                >
                                    <Text>+</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{height: 35, flexDirection:'row',}}>
                                <Text style = {{fontSize: 18, color: '#000'}}>Tổng: </Text>
                                <Text style={{backgroundColor:'transparent', fontSize: 18, color:'#0062FF'}}>{this.dinhDangTien(this.state.giaBanKhachHang * this.state.soLuongMua)} đ</Text>
                            </View>
                    </View>  
                </View>
            </View>
        )
    }
}