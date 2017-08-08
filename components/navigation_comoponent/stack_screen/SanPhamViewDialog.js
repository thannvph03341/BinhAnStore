import React,{Component} from 'react'
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Platform,
    AsyncStorage,
    Keyboard,
    Alert
} from 'react-native'
import {connect} from 'react-redux'
import typeDefault from '../../redux_config/type_action/KeyAction'
import keyStore from '../../redux_config/type_action/KeyAsynStore'
import hostApi from '../../../func/HostApi'
import logo from '../../../assets/image/logo_binh_an.png'
const {width, height} = Dimensions.get('screen')

class SanPhamViewDialog extends Component {

    constructor(props){
        super(props)
        this.state = {
            sanPham: null
        }
    }

    componentWillReceiveProps(nextProp){
        const {sanPhamNew} = nextProp 
        
        if (sanPhamNew != null){
           
            this.setState({
                sanPham: {...sanPhamNew.item, urlAnhDaiDien: hostApi.host + sanPhamNew.item.urlAnhDaiDien},
                soLuongMua: '1'
            })
        }
    }

    dinhDangTien(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    themSanPhamVaoGioHang(obSanPham, soLuong){

        Keyboard.dismiss()

        try {
            if (parseInt(soLuong) > 0){
                AsyncStorage.getItem(keyStore.dmKhachHang, (errorKH, resultKH) => {
                    if (errorKH == null && resultKH != null ){
                        const {idKhachHang} = JSON.parse(resultKH)
                        AsyncStorage.getItem(idKhachHang, (errorGioHang, resultGioHang) =>{
                            if (errorGioHang == null && resultGioHang != null) {
                                var arrSp = JSON.parse(resultGioHang)
                                var obFindIndex =  arrSp.findIndex((x) => x.idSanPham == obSanPham.idSanPham, )  //không tìm thấy sẽ là -1
                                //console.log(obFindIndex)
                                if (obFindIndex == -1) {
                                    arrSp.push({...obSanPham, soLuongMua: parseInt(soLuong), tongTien: obSanPham.giaBanKhachHang * parseInt(soLuong)})

                                    AsyncStorage.setItem(idKhachHang, JSON.stringify(arrSp), (errorGioHangThemMoi, resultGioHangThemMoi) => {
                                        if(errorGioHangThemMoi != null){
                                            this.props.dispatch({type:typeDefault.keyTatDialogThemSanPham})
                                            return Alert.alert('Thông Báo', 'Thêm không thành công!\nBạn vui lòng thử lại!', [{title:'OK'}])
                                        } else {
                                            this.props.dispatch({type:typeDefault.keyTatDialogThemSanPham})
                                            return Alert.alert('Thông Báo', 'Thêm sản phẩm vào giỏ thành công!', [{title:'OK'}])
                                        }
                                    })
                                } else {
                                     arrSp[obFindIndex] = {...obSanPham, soLuongMua: parseInt(soLuong), tongTien: obSanPham.giaBanKhachHang * parseInt(soLuong)}
                                     AsyncStorage.setItem(idKhachHang, JSON.stringify(arrSp), (errorGioHangThemMoi, resultGioHangThemMoi) => {
                                        if(errorGioHangThemMoi != null){
                                            this.props.dispatch({type:typeDefault.keyTatDialogThemSanPham})
                                            return Alert.alert('Thông Báo', 'Thêm không thành công!\nBạn vui lòng thử lại!', [{title:'OK'}])
                                        } else {
                                            this.props.dispatch({type:typeDefault.keyTatDialogThemSanPham})
                                            return Alert.alert('Thông Báo', 'Thêm sản phẩm vào giỏ thành công!', [{title:'OK'}])
                                        }
                                    })
                                }

                                // console.log(arrSp)

                            } else if (errorGioHang != null){
                                    this.props.dispatch({type:typeDefault.keyTatDialogThemSanPham})
                                    return Alert.alert('Thông Báo', 'Thêm không thành công!\nBạn vui lòng thử lại!', [{title:'OK'}])
                                } else {
                                    AsyncStorage.setItem(idKhachHang, JSON.stringify([{...obSanPham, soLuongMua: parseInt(soLuong), tongTien: obSanPham.giaBanKhachHang * parseInt(soLuong)}]), (errorGioHangThemMoi, resultGioHangThemMoi) => {
                                        if(errorGioHangThemMoi != null){
                                            this.props.dispatch({type:typeDefault.keyTatDialogThemSanPham})
                                            return Alert.alert('Thông Báo', 'Thêm không thành công!\nBạn vui lòng thử lại!', [{title:'OK'}])
                                        } else {
                                            this.props.dispatch({type:typeDefault.keyTatDialogThemSanPham})
                                            return Alert.alert('Thông Báo', 'Thêm sản phẩm vào giỏ thành công!', [{title:'OK'}])
                                        }
                                    })
                                }
                        })
                    } else {
                        this.props.dispatch({type:typeDefault.keyTatDialogThemSanPham})
                        return Alert.alert('Thông Báo', 'Thêm không thành công!\nBạn vui lòng thử lại!', [{title:'OK'}])
                    }
                })

            } else {
                this.props.dispatch({type:typeDefault.keyTatDialogThemSanPham})
                return Alert.alert('Thông Báo', 'Thêm không thành công!\nBạn vui lòng thử lại!', [{title:'OK'}])
            }

            //AsyncStorage.setItem(keyStore.gioHang, JSON.stringify({...obSanPham, soLuongMua: soLuong}))
        } catch (error) {
            console.log(error)
        }
    }

    render(){

        return (

                <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
                    <View style={{height: 60, flexDirection:'column', justifyContent:'center', alignItems:'center'}}> 
                        <View style={{flex:1, backgroundColor:'transparent', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                            <Text 
                            numberOfLines = {1}
                            style={{textAlign:'center', fontSize: 18, fontWeight:'bold', color:'#000'}}>{this.state.sanPham != null ? this.state.sanPham.tenSanPham:null}</Text>
                        </View>
                        <View style={{width: width - 50, height:1, backgroundColor:'#C2C2C2'}}/>
                    </View >
                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', margin:5}}>
                        <View style={{width: 80, height:80, backgroundColor:'transparent'}}>
                           { this.state.sanPham != null ?  <Image source = {{uri: `${this.state.sanPham.urlAnhDaiDien}`}}/> : null} 
                        </View>
                        <View style={{width: width - 200, height:136, backgroundColor:'transparent', marginLeft: 5, flexDirection:'column'}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Text style={{fontSize: 18, color: '#000'}}>Giá: </Text>
                                <Text style={{fontSize: 18, color: '#D0021B'}}>{this.state.sanPham != null ? this.dinhDangTien(this.state.sanPham.giaBanKhachHang): null} đ</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', }}>
                                <Text style={{fontSize: 18, color: '#000'}}>Mô tả: </Text>

                                <Text 
                                numberOfLines = {3}
                                style={{flex:1, maxHeight:60, textAlignVertical:'center', fontSize: 14, color: '#000'}}>{this.state.sanPham != null ? this.state.sanPham.moTaNgan:null} </Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Text style={{fontSize: 18, color: '#000'}}>Tồn: </Text>
                                <Text style={{fontSize: 18, color: '#D0021B'}}>{this.state.sanPham != null ? this.state.sanPham.soLuongTon:null}</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Text style={{fontSize: 18, color: '#000'}}>Số lượng: </Text>
                                <TextInput 
                                    ref = {(x) => this.txtSoLuongMua = x}
                                    value = {this.state.soLuongMua}
                                    underlineColorAndroid = 'transparent'
                                    keyboardType = 'number-pad'
                                    onChangeText = {(cc) => {
                                        
                                        this.setState({
                                            soLuongMua: cc
                                        })

                                    }}
                                    style={{width: 50, height: 30, fontSize: 18, color: '#000', textAlign:'center', borderColor:'#000', borderWidth:1, paddingBottom:Platform.OS == 'android' ?  4.5:0}}/>
                            </View>
                        </View>
                    </View>

                    <View style={{width: width - 50, height: 60, flexDirection:'row', justifyContent:'center'}}>
                        <View style={{width:( width - 50)/2, height:55, backgroundColor:'transparent', flexDirection: 'column', justifyContent:'center', marginTop:5}}>
                            <TouchableOpacity 
                            onPress = {() => {
                                this.props.dispatch({type:typeDefault.keyTatDialogThemSanPham})
                            }}
                            style={{flex:1, borderColor:'#D0021B', borderWidth:1, flexDirection:'column', justifyContent:'center'}}>
                                <Text style={{textAlign:'center', color: '#D0021B'}}>Huỷ</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: ( width - 50)/2 , height:55, backgroundColor:'transparent', flexDirection: 'column', justifyContent:'center', marginTop:5}}>
                            <TouchableOpacity 
                                onPress = {() => {
                                        this.themSanPhamVaoGioHang(this.state.sanPham, this.state.soLuongMua)
                                    }}
                                style={{flex:1, borderColor:'#D0021B', borderWidth:1, flexDirection:'column', justifyContent:'center'}}>
                                <Text style={{textAlign:'center', color: '#D0021B'}}>Thêm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
        )
    }
}

function sanPhamSelect(state){
    const {showTabClick} = state
    return {
        sanPhamNew: showTabClick.sanPham
    };
}
export default connect(sanPhamSelect)(SanPhamViewDialog)