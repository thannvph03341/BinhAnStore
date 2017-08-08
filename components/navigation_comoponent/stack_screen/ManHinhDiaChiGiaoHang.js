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
} from 'react-native'
import IconText from 'react-native-vector-icons/Ionicons'
import icon_back from '../../../assets/image/Icon_back.png'
import ItemDiaChiKhachHang from './ItemDiaChiKhachHang'
import typeAction from '../../redux_config/type_action/KeyAction'
import keyStore from '../../redux_config/type_action/KeyAsynStore'
const {width, height} = Dimensions.get('screen')
export default class ManHinhDiaChiGiaoHang extends Component{
    
    static navigationOptions = ({ navigation }) => ({
        header:  <View style={{width: width, height: Platform.OS == 'ios' ? 65:55,  flexDirection:'row', backgroundColor:'#C2C2C2', alignItems: 'center'}}>
                    <TouchableOpacity 
                        onPress = {() => {
                            navigation.state.params.dispatchAction({type: typeAction.keyTabButtomShowOrHidden, isShowMenu: true})
                            navigation.goBack()
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


    componentWillMount(){
        try {
            AsyncStorage.getItem(keyStore.dmKhachHang, (err, result) => {
                if (err == null && result != null) {
                    const info = JSON.parse(result)
                    
                    this.setState({
                        infoUser: [info],
                        isChoose: info.idKhachHang
                    })
                }

            })
        } catch (error) {
            console.log(error)
        }
    }

    constructor(props){
        super(props)
        this.state = {
            infoUser: [],
            isChoose: '',
            btnDisabled: false
        }
        
    }


    funcChonDiaChi(choose){
        this.setState({
            isChoose: choose
        })
    }

    setButtonDisabled(){
        this.setState({btnDisabled: false})
    }
    
    render(){
        const { navigation } = this.props
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
                            <IconText name = 'md-cart' style={{width: 32, height: 32, fontSize: 27, color:'#979797', borderRadius: 16, borderColor: '#979797', borderWidth:1 ,  textAlign:'center', paddingTop: 3 }}/>
                            <Text style={{fontSize:15, color:'#979797'}}>Vận Chuyển</Text> 
                        </View>
                        <View style={{width: ((width - 90) / 2) - 30, height: 1, backgroundColor:'#979797', position: 'absolute', left: 60, top: 20,}}/>
                    </View>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center',}}>
                        <View style = {{width: 70, backgroundColor: 'transparent', flexDirection:'column',  alignItems:'center', backgroundColor: 'transparent'}}>
                            <IconText name = 'md-checkmark' style={{width: 32, height: 32, fontSize: 28, color:'#979797', borderRadius: 16, borderColor: '#979797', borderWidth:1 ,  textAlign:'center', paddingTop: 2 }}/>
                            <Text style={{fontSize:15, color: '#979797'}}>Đặt Hàng</Text> 
                        </View>
                    </View>
                </View>
                <FlatList
                    style = {{flex:1, margin: 5}}
                    data = {this.state.infoUser}
                    renderItem = {({item}) => <ItemDiaChiKhachHang objectDiaChiKhachHang = {{...item, isChoose: this.state.isChoose}} userChoose = {this.funcChonDiaChi.bind(this)}/>}
                    keyExtractor = {(items) => items.idKhachHang}
                    showsHorizontalScrollIndicator = { false }
                    showsVerticalScrollIndicator = { false }
                    
                /> 
                <TouchableOpacity 
                    disabled = {this.state.btnDisabled}
                    onPress = {() => {
                         this.setState({btnDisabled: true})
                        navigation.navigate('ManHinhVanChuyen', {infoUser: this.state.infoUser[0], keyBack: navigation.state.key, setButtonDisabled: this.setButtonDisabled.bind(this)})
                    }}
                style={{height: 55, width, backgroundColor: '#C11408', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 18, color: '#FFF'}}>TẾP THEO: VẬN CHUYỂN</Text>
                    </TouchableOpacity>
            </View>
        )
    }

}
