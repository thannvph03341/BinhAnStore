import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet, 
    FlatList,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    AsyncStorage,
    Keyboard
} from 'react-native'
import ItemGioHang from './component_gio_hang/ItemGioHang'
import TabMenuBottom from '../navigation_comoponent/tab_menu_bottom/MenuTabMenuBottom' 
import typeAction from '../redux_config/type_action/KeyAction'
import keyStore from '../redux_config/type_action/KeyAsynStore'
import {connect} from 'react-redux'
import HeaderNavi from '../navigation_comoponent/HeaderNavigation'


const {width, height} = Dimensions.get('screen')


class GioHang extends Component {

    static navigationOptions = ({ navigation }) => ( 
        {
        header: null
        
        //`${navigation.state.params.item.tenSanPham}`
    })


    componentWillMount(){
        
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
                                    dataGioHang: [],
                                    tongHoaDon: 0,
                                })
                            }
                        })
                    } else {
                        this.setState({
                            dataGioHang: [],
                            tongHoaDon: 0,
                        })
                    }
                })
            } catch (error) {
                console.log(error)
                this.setState({
                    dataGioHang: [],
                    tongHoaDon: 0,
                })
            }
    }

    constructor(props){
        super(props)
        this.state = {
            dataGioHang : [],
            tongHoaDon: 0,
            showTabGioHang: false,
            btnDisabled: false
        }
    }


    componentWillReceiveProps(nextProps){
        const {showTab, tabMenuBottom} = nextProps
        if (tabMenuBottom){
            this.setState({
                 btnDisabled: false
            })
        }

        this.layDuLieuSanPhamTrongGioHang()
        if (showTab === typeAction.tabGioHang){
            
            this.setState({showTabGioHang: true})
        } else {
             this.setState({showTabGioHang: false})
        }
    }


    capNhatSanPhamTrongGioHang(obSanPham, type){

        try {
                AsyncStorage.getItem(keyStore.dmKhachHang, (errorKH, resultKH) => {
                    if (errorKH == null && resultKH != null ){
                        const {idKhachHang} = JSON.parse(resultKH)
                        AsyncStorage.getItem(idKhachHang, (errorGioHang, resultGioHang) =>{
                            if (errorGioHang == null && resultGioHang != null) {
                                let data = JSON.parse(resultGioHang)
                                let indexFind = data.findIndex(x => x.idSanPham == obSanPham.idSanPham)
                                if (type == 'XOA'){
                                    data.splice(indexFind,1)
                                } else {
                                     data[indexFind] = obSanPham
                                }
                               // console.log(data)
                                AsyncStorage.setItem(idKhachHang, JSON.stringify(data), (e) => {
                                    if(e == null) {
                                         this.layDuLieuSanPhamTrongGioHang()    
                                    } else {
                                        console.log(e)
                                    }
                                })
                               
                            }
                        })
                    } 
                })
        } catch (error) {
            console.log(error)
        }
    }

    render(){
        return(
            <View style={{width: this.state.showTabGioHang ? width: 0, height: this.state.showTabGioHang ? height - 60:0, backgroundColor:'#C2C2C2', position: this.state.showTabGioHang ?  'absolute':'relative', opacity: this.state.showTabGioHang ? 1 : 0}}>
                <KeyboardAvoidingView behavior = 'padding' style={{flex:1}}>
                <HeaderNavi tongHoaDon = {this.state.tongHoaDon}/>
                    {this.state.dataGioHang.length > 0 ? <View style={{flex:1, backgroundColor:'#C2C2C2', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                    
                                <FlatList
                                    style={{flex:1}}
                                    data = {this.state.dataGioHang}
                                    renderItem = {({item}) => <ItemGioHang objectSanPham = {item} capNhatSanPhamTrongGioHang = {this.capNhatSanPhamTrongGioHang.bind(this)}/>}
                                    keyExtractor = {(items) => items.idSanPham}
                                    showsHorizontalScrollIndicator = {false}
                                    showsVerticalScrollIndicator = {false}
                                    initialNumToRender = {1}
                                />
                        
                        <TouchableOpacity
                             
                            onPress = {() => {
                            const { navigate } = this.props.navigation
                                this.setState({btnDisabled: true})
                                this.props.dispatch({type: typeAction.keyTabButtomShowOrHidden, isShowMenu: false})
                                navigate('ManHinhDiaChiGiaoHang', {thongTinGioHang: 'thongTinKhachHang', dispatchAction: this.props.dispatch})
                                
                            }}
                            disabled = {this.state.btnDisabled}
                            style={{width, height: 55, flexDirection:'column', justifyContent:'center', alignItems:'center', backgroundColor:'#C11408'}}
                        >
                                <Text style={{color:'#FFF'}}>TIẾN HÀNH THANH TOÁN</Text>
                        </TouchableOpacity>
                    </View>: 
                        <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                            <Text style={{color:'#7A7A7A', fontSize: 18}}>Không có sản phẩm nào trong giỏ hàng!...</Text>
                        </View>}
                </KeyboardAvoidingView>
            </View>
        )
    }
} 

function getDataGioHang(state){
    const {showTabClick, tabMenuBottom} = state
    return {
        showTab: showTabClick.keyTab,
        tabMenuBottom: tabMenuBottom
    }
}

export default connect(getDataGioHang)(GioHang)
