import React,{Component} from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    Dimensions,
    FlatList,
    AsyncStorage
} from 'react-native'
import IconText from 'react-native-vector-icons/Ionicons'
import icon_back from '../../../assets/image/Icon_back.png'
import ItemSanPhamVanChuyen from './ItemSanPhamVanChuyen'
import keyStore from '../../redux_config/type_action/KeyAsynStore'
const {width, height} = Dimensions.get('screen')
export default class ManHinhVanChuyen extends Component{
    
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
                        style={{flex: 1, textAlign:'center', marginTop: Platform.OS == 'ios' ? 20:0, fontSize: 18, fontWeight:'bold', color:'#0062FF', marginRight: 60}}>Vận Chuyển</Text>
                </View>
        
        //`${navigation.state.params.item.tenSanPham}`
    })
    
    componentWillMount(){
        this.layDuLieuSanPhamTrongGioHang()
    }

    constructor(props){
        super(props)
        this.state = {
                dataGioHang: [],
                tongHoaDon: 0,
                btnDisabled: false
        }
    }

    
    layDuLieuSanPhamTrongGioHang(){
        try {
                AsyncStorage.getItem(keyStore.dmKhachHang, (errorKH, resultKH) => {
                    if (errorKH == null && resultKH != null) {
                        const {idKhachHang} = JSON.parse(resultKH)
                        AsyncStorage.getItem(idKhachHang, (errorGioHang, resultGioHang) => {
                            if (errorGioHang == null && resultGioHang != null){
                                    const data = JSON.parse(resultGioHang)
                                    let tong = 0
                                    data.map((v) => {tong += v.tongTien})
                                    this.setState({
                                        dataGioHang: data,
                                        tongHoaDon: tong
                                    })
                            } else {
                                this.setState({
                                    dataGioHang: []
                                })
                            }
                        })
                    } else {
                        this.setState({
                            dataGioHang: []
                        })
                    }
                })
            } catch (error) {
                console.log(error)
                this.setState({
                    dataGioHang: []
                })
            }
    }

    dinhDangTien(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    setButtonDisabled(){
        this.setState({btnDisabled: false})
    }

    render(){

        return (
            <View style={{flex:1, backgroundColor:'#C2C2C2'}}>
                <View style = {{width, height: 60, flexDirection:'row', backgroundColor: '#C2C2C2', alignItems:'center', borderColor:'#979797', borderWidth:1}}>
                    
                    <View style={{width: (width - 90) / 2, height: 60, flexDirection:'row', alignItems:'center', left: 10}}>
                        <View style = {{width: 50, backgroundColor: 'transparent', flexDirection:'column',  alignItems:'center',  backgroundColor: 'transparent'}}>
                          
                             <IconText name = 'ios-locate' style={{ width: 32, height: 32, fontSize: 28, color:'red', borderRadius: 16, borderColor: 'red', borderWidth:1 ,  textAlign:'center', paddingTop: 2 }}/> 
                            <Text style={{fontSize:15, color:'red'}}>Địa Chỉ</Text> 
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
                            <IconText name = 'md-checkmark' style={{width: 32, height: 32, fontSize: 28, color:'#979797', borderRadius: 16, borderColor: '#979797', borderWidth:1 ,  textAlign:'center', paddingTop: 2 }}/>
                            <Text style={{fontSize:15, color: '#979797'}}>Đặt Hàng</Text> 
                        </View>
                    </View>
                </View>
                <FlatList
                    style={{flex:1}}
                    data = {this.state.dataGioHang}
                    renderItem = {({item}) => <ItemSanPhamVanChuyen objectSanPham={item} />}
                    keyExtractor = {(items) => items.idSanPham}
                    showsHorizontalScrollIndicator = {false}
                    showsVerticalScrollIndicator = {false}
                    initialNumToRender = {1}
                />
                <View style={{width, height: 112, backgroundColor: '#FFF', borderColor:'#979797', borderWidth: 1, flexDirection:'column', alignContent:'center', alignItems:'center'}}>
                    <View style={{width, height: 55, flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                        {/* <Text style={{fontSize: 18, fontWeight: 'bold'}}></Text> */}
                        <Text style={{fontWeight:'bold', color: 'red', fontSize: 18}}>Tổng HĐ:  {this.dinhDangTien(this.state.tongHoaDon)} đ</Text>
                    </View>
                    <TouchableOpacity
                        disabled = {this.state.btnDisabled}
                        onPress = {() => {
                            this.setState({btnDisabled: true})
                            const {navigate, state} = this.props.navigation
                            navigate('ManHinhDatHang', {thongTinNguoiDung: state.params, danhSachMatHang: this.state.dataGioHang, tongTienHoaDon: this.state.tongHoaDon, keyBack: state.params.keyBack})
                        }}
                     style={{width, height: 55, flexDirection:'column', justifyContent:'center', alignItems:'center', backgroundColor: '#C11408' }}>
                        {/* <Text style={{fontSize: 18, fontWeight: 'bold'}}></Text> */}
                        <Text style={{ color: '#FFF', fontSize: 18}}>TIẾP THEO: ĐẶT HÀNG</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}
