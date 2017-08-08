import React,{Component} from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    Dimensions,
    FlatList,
    AsyncStorage,
    Alert,
    ActivityIndicator
} from 'react-native'
import IconText from 'react-native-vector-icons/Ionicons'
import icon_back from '../../../assets/image/Icon_back.png'
import ItemXacNhanDatHang from './ItemXacNhanDatHang'
import hostApi from '../../../func/HostApi'
import keyStore from '../../redux_config/type_action/KeyAsynStore'
import typeDefault from '../../redux_config/type_action/KeyAction'
import {connect} from 'react-redux'

const {width, height} = Dimensions.get('screen')
class ManHinhDatHang extends Component{
    
    static navigationOptions = ({ navigation }) => ({
        header:  <View style={{width: width, height: Platform.OS == 'ios' ? 65:55,  flexDirection:'row', backgroundColor:'#C2C2C2', alignItems: 'center'}}>
                    <TouchableOpacity 
                        onPress = {() => {
                           navigation.state.params.setButtonDisabled()
                           navigation.goBack()
                           //navigation.dispatch({type: typeAction.keyTabButtomShowOrHidden, isShowMenu: true})
                        }}
                        style={{width: 50, height: Platform.OS == 'ios' ? 45:55,  backgroundColor:'transparent', marginTop: Platform.OS == 'ios' ? 20:0, flexDirection:'column', justifyContent:'center'}}>
                        <Image source = {icon_back} style={{width: 19, height: 11, marginLeft: 10,}}/>
                    </TouchableOpacity>
                    <Text
                        numberOfLines = {1}
                        style={{flex: 1, textAlign:'center', marginTop: Platform.OS == 'ios' ? 20:0, fontSize: 18, fontWeight:'bold', color:'#0062FF', marginRight: 60}}>Địa chỉ giao hàng</Text>
                </View>
        
        //`${navigation.state.params.item.tenSanPham}`
    })
    
    constructor(props){
        super(props)
        this.state = {
            isLoad: false,
            endButton: false
        }
         
    }

    funcBackHome(){
        this.props.dispatch({type: typeDefault.tabTrangChu})
        this.props.dispatch({type: typeDefault.keyTabButtomShowOrHidden, isShowMenu: 'datHang',})
        const { navigation } = this.props;
        navigation.goBack(navigation.state.params.keyBack)
        
    }

  async  guiDonDatHang(dataDonHang){

         this.setState({
             isLoad: true,
             endButton: true
         })

         const {danhSachMatHang, thongTinNguoiDung} = dataDonHang
         var manHangDatChiTiet = []

         danhSachMatHang.map((v) => {
            manHangDatChiTiet.push(
                {
                    idSanPham: v.idSanPham, 
                    soLuong: v.soLuongMua, 
                    donGia: v.giaBanKhachHang, 
                    thanhTien: v.tongTien, 
                    idDmDonVi: v.idDmDonVi
                }
            )
         })
         const dataChiTiet = JSON.stringify(
                {
                    idDmDonVi: thongTinNguoiDung.infoUser.idDmDonVi,
                    idKhachHang: thongTinNguoiDung.infoUser.idKhachHang, 
                    tenKhachHang: thongTinNguoiDung.infoUser.tenKhachHang, 
                    diaChi: thongTinNguoiDung.infoUser.diaChi, 
                    soDienThoai: thongTinNguoiDung.infoUser.soDienThoai, 
                    datHangChiTiets: manHangDatChiTiet 
                } 
            )
         //console.log(dataChiTiet)

        let requestDatHang = await fetch(hostApi.apiDathang,{
                method: 'POST',
                headers: {
                'accept': 'application/json;charset=UTF-8',
                'content-type': 'application/json;charset=UTF-8',
                },
                body: dataChiTiet
            })
            const responDathang = await requestDatHang.json()
           
            if (responDathang.success == true){
                AsyncStorage.getItem(keyStore.dmKhachHang, (e, r) => {
                    if (e == null && r != null){
                        const {idKhachHang} = JSON.parse(r)  
                        AsyncStorage.removeItem(idKhachHang, (ex) => {
                           this.setState({
                               isLoad: false
                           })
                           Alert.alert('Thông Báo', 'Gửi đơn hàng thành công!', [{text: 'OK', onPress: () => this.funcBackHome()}])
                        })
                    }
                })
            } else {
                this.setState({
                    isLoad: false
                })
                Alert.alert('Thông Báo', responDathang.responseText, [{text:'OK'}] )
            }
    }

    render(){
       const {state} = this.props.navigation
       
        return (
            <View style={{flex:1, backgroundColor:'#C2C2C2'}}>
                <View style = {{width, height: 60, flexDirection:'row', backgroundColor: '#C2C2C2', alignItems:'center', borderColor:'#979797', borderWidth:1}}>
                    
                    <View style={{width: (width - 90) / 2, height: 60, flexDirection:'row', alignItems:'center', left: 10}}>
                        <View style = {{width: 50, backgroundColor: 'transparent', flexDirection:'column',  alignItems:'center',  backgroundColor: 'transparent'}}>
                          
                             <IconText name = 'ios-locate' style={{ width: 32, height: 32, fontSize: 28, color:'red', borderRadius: 16, borderColor: 'red', borderWidth:1 ,  textAlign:'center', paddingTop: 2 }}/> 
                            <Text style={{fontSize:15, color:'red' }}>Địa Chỉ</Text> 
                        </View>
                        <View style={{width: ((width - 90) / 2) - 20, height: 1, backgroundColor:'red', position: 'absolute', left: 40, top: 20 }}/>
                    </View>
                    <View style={{width: (width - 70) / 2,height: 60, flexDirection:'row', alignItems:'center', }}>
                        <View style = {{ width: 90, backgroundColor: 'transparent', flexDirection:'column',  alignItems:'center', backgroundColor: 'transparent'}}>
                            <IconText name = 'md-cart' style={{width: 32, height: 32, fontSize: 27, color:'red', borderRadius: 16, borderColor: 'red', borderWidth:1 ,  textAlign:'center', paddingTop: 3 }}/>
                            <Text style={{fontSize:15, color:'red'}}>Vận Chuyển</Text> 
                        </View>
                        <View style={{width: ((width - 90) / 2) - 30, height: 1, backgroundColor:'red', position: 'absolute', left: 60, top: 20,}}/>
                    </View>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center',}}>
                        <View style = {{width: 70, backgroundColor: 'transparent', flexDirection:'column',  alignItems:'center', backgroundColor: 'transparent'}}>
                            <IconText name = 'md-checkmark' style={{width: 32, height: 32, fontSize: 28, color:'red', borderRadius: 16, borderColor: 'red', borderWidth:1 ,  textAlign:'center', paddingTop: 2 }}/>
                            <Text style={{fontSize:15, color: 'red'}}>Đặt Hàng</Text> 
                        </View>
                    </View>
                </View>

                {
                    this.state.isLoad ? 
                            <ActivityIndicator 
                                color = '#C11408'
                                size = 'large'
                                animating = {this.state.isLoad}
                                style = {{flex:1, backgroundColor: 'transparent'}}
                            />: null
                }

                <View style={{width, height: 55, flexDirection:'column', justifyContent:'center', alignItems:'center', backgroundColor:'transparent'}}>
                    <Text style={{fontSize: 18}}>Thông tin này đã chính xác ?</Text>
                </View>
                
                <FlatList
                    style={{flex:1}}
                    data = {[{...state.params.thongTinNguoiDung.infoUser, hehehe: '^&%@#&^%#*@'}, {tongHoaDon: state.params.tongTienHoaDon, hehehe: '^&%@#&&^@%^%#*@'}]}
                    renderItem = {({item}) => <ItemXacNhanDatHang objectXacNhan= {item} />}
                    keyExtractor = {(items) => items.hehehe}
                    showsHorizontalScrollIndicator = {false}
                    showsVerticalScrollIndicator = {false}
                    initialNumToRender = {1}
                />
                <TouchableOpacity 
                    disabled = {this.state.endButton}
                    onPress = {() => {
                        this.guiDonDatHang(state.params)
                        {/* this.guiDonDatHang({thongTinNguoiDung: {...state.params.thongTinNguoiDung.infoUser}, danhSachSanPhamDat: state.params.danhSachMatHang, tongTienHoaDon: state.params.tongTienHoaDon}) */}
                    }}
                style={{width, height: 55, flexDirection:'column', justifyContent:'center', alignItems:'center', backgroundColor: '#C11408'}}>
                    <Text style={{fontSize: 18, color:'#FFF'}}>ĐẶT HÀNG</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

export default connect()(ManHinhDatHang)
