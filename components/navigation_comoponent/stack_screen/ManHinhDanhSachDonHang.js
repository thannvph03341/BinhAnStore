import React,{Component} from 'react'
import {
    View,
    Text,
    TextInput,
    Dimensions,
    Platform,
    TouchableOpacity,
    Image,
    FlatList,
    AsyncStorage,
    ActivityIndicator
} from 'react-native'
import icon_back from '../../../assets/image/Icon_back.png'
import TimKiemDonHang from '../../component_app/TimKiemDonHang'
import ItemDanhSachDonHang from '../../component_app/component_cai_dat/ItemDanhSachDonHang'
import typeAction from '../../redux_config/type_action/KeyAction'
import hostApi from '../../../func/HostApi'
import keyStore from '../../redux_config/type_action/KeyAsynStore'
import IconVector from 'react-native-vector-icons/Ionicons'

const {width, height} = Dimensions.get('screen')

export default class ManHinhDanhSachDonHang extends Component {

    static navigationOptions = ({ navigation }) => ({
        header:  null

        //`${navigation.state.params.item.tenSanPham}`
    })

    componentDidMount(){
        try {
            AsyncStorage.getItem(keyStore.dmKhachHang, (errkh, resultKh) => {
                if (errkh == null && resultKh != null){
                    const kh = JSON.parse(resultKh)
                    this.DanhSachDonDatHang(kh.idKhachHang)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    constructor(props){
        super(props)
        this.state = {
            dataDonHangDefault: [],
            dataDonHang:[],
            isLoad:false,
            indexNext: 10
        }
    }

    timKiemDonHang(textTimKiem){
       
         if (textTimKiem != ''){
              this.setState(
                { 
                    dataDonHang: this.state.dataDonHangDefault.filter((x) => x.idDatHang.indexOf(textTimKiem) == 0 ? x:null )
                }
            )
         } else {
              this.setState(
                { 
                    dataDonHang: this.state.dataDonHangDefault
                }
            )
         }
    }

    async DanhSachDonDatHang(idKhachHang){
        try {

            this.setState({isLoad: true})

            let request = await fetch(hostApi.apiLichSuDonHang + idKhachHang)
            let response = await request.json()
            
            if (response.Dathang.lenght != 0) {
                this.setState({
                    dataDonHangDefault: response.Dathang,
                    dataDonHang: response.Dathang,
                    isLoad:false
                })
            } 

        } catch (error) {
            this.setState({isLoad:false})
            console.log(error)
        }
    }

    // addData(){
    //     const x = this.state.dataDonHang
    //     const y = this.state.dataDonHangDefault
    //     const z = y.length - x.length
    //     if (x.length != y.length) {
    //         if (z < 10){
    //             this.setState({
    //                 dataDonHang: [...x, y.slice(x.length, 10)]
    //             })
    //         } else {
    //             this.setState({
    //                 dataDonHang: [...x, y.splice(x.length, y.length - 1)]
    //             })
    //         }
    //     }
        
    // }


    render(){

        const {navigation} = this.props

        return(
            <View style={{flex:1, backgroundColor:'transparent', flexDirection:'column'}}>
                <View style={{width: width, height: Platform.OS == 'ios' ? 65:55,  flexDirection:'row', backgroundColor:'#C2C2C2', alignItems: 'center'}}>
                    <TouchableOpacity 
                        onPress = {() => {
                            navigation.state.params.dispatchAction({type: typeAction.keyTabButtomShowOrHidden, isShowMenu: true})
                            navigation.goBack()
                        }}
                        style={{width: 50, height: Platform.OS == 'ios' ? 45:55,  backgroundColor:'transparent', marginTop: Platform.OS == 'ios' ? 16:0, flexDirection:'column', justifyContent:'center'}}>
                        <Image source = {icon_back} style={{width: 19, height: 11, marginLeft: 10,}}/>
                    </TouchableOpacity>
                    <View style={{width: width, height: Platform.OS == 'ios' ? 65:55,backgroundColor:'#C2C2C2', flexDirection:'row'}}>
                            <IconVector name="md-search" size={25} color="#BEB8B8" style={{ marginTop: Platform.OS == 'ios' ? 27: 15, position:'absolute', marginLeft: 60, zIndex:1, backgroundColor:'transparent'}}/>
                            <TextInput style={{textAlign:'center', backgroundColor:'white', width: width - 65,  height: 35, marginTop: Platform.OS == 'ios' ? 22.5: 10, marginLeft: 5, borderRadius: 5, paddingBottom:Platform.OS == 'ios' ? 0:4.5, paddingLeft: 35, paddingRight:15}}
                                placeholder = 'Tìm kiếm đơn hàng'
                                placeholderTextColor = '#BEB8B8'
                                underlineColorAndroid = 'transparent'
                                onChangeText = {(txt) => this.timKiemDonHang(txt)}
                            >
                            </TextInput>
                            
                    </View>
                </View>
                {
                    this.state.isLoad ? 
                    <ActivityIndicator
                        style = {{flex:1, backgroundColor: 'transparent', justifyContent:'center', alignItems:'center'}}
                        size = 'large'
                        color = 'red'
                        animating = {this.state.isLoad}
                    /> :
                    <FlatList
                        data = {this.state.dataDonHang}
                        renderItem = {({item}) => 
                            <ItemDanhSachDonHang objectDonHang = {item}/>
                        }
                        keyExtractor = {(items) => items.idDatHang}
                        initialNumToRender = {10}
                        showsHorizontalScrollIndicator = {false}
                        showsVerticalScrollIndicator = {false}
                        
                       
                    />
                }
            </View>
        )
    }

}