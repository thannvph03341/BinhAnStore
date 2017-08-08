import React,{Component} from 'react'
import {
    Text, 
    View,
     KeyboardAvoidingView,
     Image,
     Dimensions,
     Platform,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Keyboard,
    AsyncStorage,
    Alert
} from 'react-native'
import urlSanPham  from '../../../assets/image/img_san_pham.jpg'
import icon_back from '../../../assets/image/Icon_back.png'
import typeAction from '../../redux_config/type_action/KeyAction'
import keyStore from '../../redux_config/type_action/KeyAsynStore'
import hostApi from '../../../func/HostApi'
import {connect} from 'react-redux'
const {width, height} = Dimensions.get('screen')


class ManhinhChiTietSanPham extends Component{
   
    componentWillUnmount(){
        // const {navigation} = this.props
        // navigation.setParams({
        //     propsState: this.props
        // })
        const {state} = this.props.navigation
         console.log(state)

    }

    dinhDangTien(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    static navigationOptions = ({ navigation }) => ({
        header:  <View style={{width: width, height: Platform.OS == 'ios' ? 65:55,  flexDirection:'row', backgroundColor:'#C2C2C2', alignItems: 'center'}}>
                    <TouchableOpacity 
                        onPress = {() => {
                            if (!navigation.state.params.isBackShowButtom){
                                 navigation.state.params.dispatchAction({type: typeAction.keyTabButtomShowOrHidden, isShowMenu: true})
                            }  
                           navigation.goBack()
                        }}
                        style={{width: 50, height: Platform.OS == 'ios' ? 45:55,  backgroundColor:'transparent', marginTop: Platform.OS == 'ios' ? 20:0, flexDirection:'column', justifyContent:'center'}}>
                        <Image source = {icon_back} style={{width: 19, height: 11, marginLeft: 10,}}/>
                    </TouchableOpacity>
                    <Text
                        numberOfLines = {1}
                        style={{flex: 1, textAlign:'center', marginTop: Platform.OS == 'ios' ? 20:0, fontSize: 18, fontWeight:'bold', color:'#0062FF', marginRight: 60}}>{navigation.state.params.item.tenSanPham}</Text>
                </View>
        
        //`${navigation.state.params.item.tenSanPham}`
    })



    constructor(props){
        super(props)
        this.state = {
            soLuongMua: '1'
        }
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
                                            console.log('Thêm không thành công!\nBạn vui lòng thử lại!')
                                            return Alert.alert('Thông Báo', 'Thêm không thành công!\nBạn vui lòng thử lại!', [{title:'OK'}])
                                        } else {
                                           
                                            return Alert.alert('Thông Báo', 'Thêm sản phẩm vào giỏ thành công!', [{title:'OK'}])
                                        }
                                    })
                                } else {
                                     arrSp[obFindIndex] = {...obSanPham, soLuongMua: parseInt(soLuong), tongTien: obSanPham.giaBanKhachHang * parseInt(soLuong)}
                                     AsyncStorage.setItem(idKhachHang, JSON.stringify(arrSp), (errorGioHangThemMoi, resultGioHangThemMoi) => {
                                        if(errorGioHangThemMoi != null){
                                           console.log('Thêm không thành công!\nBạn vui lòng thử lại!')
                                            return Alert.alert('Thông Báo', 'Thêm không thành công!\nBạn vui lòng thử lại!', [{title:'OK'}])
                                        } else {
                                            
                                            return Alert.alert('Thông Báo', 'Thêm sản phẩm vào giỏ thành công!', [{title:'OK'}])
                                        }
                                    })
                                }

                                // console.log(arrSp)

                            } else if (errorGioHang != null){
                                    console.log('Thêm không thành công!\nBạn vui lòng thử lại!')
                                    return Alert.alert('Thông Báo', 'Thêm không thành công!\nBạn vui lòng thử lại!', [{title:'OK'}])
                                } else {
                                    AsyncStorage.setItem(idKhachHang, JSON.stringify([{...obSanPham, soLuongMua: parseInt(soLuong), tongTien: obSanPham.giaBanKhachHang * parseInt(soLuong)}]), (errorGioHangThemMoi, resultGioHangThemMoi) => {
                                        if(errorGioHangThemMoi != null){
                                           console.log('Thêm không thành công!\nBạn vui lòng thử lại!')
                                            return Alert.alert('Thông Báo', 'Thêm không thành công!\nBạn vui lòng thử lại!', [{title:'OK'}])
                                        } else {
                                           
                                            return Alert.alert('Thông Báo', 'Thêm sản phẩm vào giỏ thành công!', [{title:'OK'}])
                                        }
                                    })
                                }
                        })
                    } else {
                        console.log('Thêm không thành công!\nBạn vui lòng thử lại!')
                        return Alert.alert('Thông Báo', 'Thêm không thành công!\nBạn vui lòng thử lại!', [{title:'OK'}])
                    }
                })

            } else {
                console.log('Thêm không thành công!\nBạn vui lòng thử lại!')
                return Alert.alert('Thông Báo', 'Thêm không thành công!\nBạn vui lòng thử lại!', [{title:'OK'}])
            }

            //AsyncStorage.setItem(keyStore.gioHang, JSON.stringify({...obSanPham, soLuongMua: soLuong}))
        } catch (error) {
            console.log(error)
        }
    }



    render(){
         const {state} = this.props.navigation
        // console.log(state)

        return(
                <KeyboardAvoidingView behavior = 'padding' style={{flex:1, backgroundColor:'#FFF'}}>
                    <ScrollView 
                    showsHorizontalScrollIndicator = {false}
                    showsVerticalScrollIndicator = {false}
                    scrollEnabled = {true}
                    style={{flex:1, backgroundColor:'transparent'}}>
                        
                            <View style = {{flex:1, backgroundColor:'transparent', flexDirection:'column', alignItems:'center'}}>
                                <Image
                                    style={{width, height:width}} 
                                    source = {{url: `${hostApi.host}${state.params.item.urlAnhDaiDien}`}} />
                                    <View style ={{width, height:25, flexDirection:'row', justifyContent:'flex-start', marginTop: 10, marginLeft:10}}>
                                        <Text style = {{ color:'#000', fontSize:18, textAlignVertical:'bottom'}}>Giá: </Text>
                                        <Text style={{color: '#C11408',  fontSize:18, textAlignVertical:'bottom'}}>{this.dinhDangTien(state.params.item.giaBanKhachHang)} đ</Text>
                                    </View>    
                                    <View style ={{width, height:25, flexDirection:'row', justifyContent:'flex-start', marginTop: 10, marginLeft:10}}>
                                        <Text style={{ color:'#000', fontSize:18}}>Tồn: </Text>
                                        <Text style={{color: '#C11408',  fontSize:18}}>{state.params.item.soLuongTon}</Text>
                                    </View> 
                                    <View style ={{flex:1, width: width - 20, flexDirection:'row', justifyContent:'flex-start', marginTop: 10}}>
                                        <Text style={{ color:'#000', fontSize:18}}>Mô tả: </Text>
                                        <Text style={{color: '#000', fontSize:18, marginRight: 10}}>{state.params.item.moTaDayDu}</Text>
                                    </View>
                                    <View style={{width, height:25, flexDirection:'row', justifyContent:'flex-start', marginTop: 10, marginLeft:10, marginBottom: 20}}>
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
                                            style={{width: 50, height: 30, fontSize: 18, color: '#000', textAlign:'center', borderColor:'#000', borderWidth:1, paddingBottom:Platform.OS == 'ios' ? 0 : 4.5}}/>
                                    </View>
                                    
                            </View>
                        
                    </ScrollView>
                        <TouchableOpacity
                            onPress = {() => {
                                this.themSanPhamVaoGioHang(state.params.item, this.state.soLuongMua)
                            }}
                            style={{width, height:55, backgroundColor: '#C11408', flexDirection:'column', justifyContent:'center', alignItems:'center'}}
                        >
                            <Text style={{color:'#FFF', fontSize: 18}}>Thêm Vào Giỏ</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
              
        )
    }
}
export default connect()(ManhinhChiTietSanPham)