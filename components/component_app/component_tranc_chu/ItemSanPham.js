import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    NativeModules,
    LayoutAnimation
} from 'react-native'
//import TextFormatNumber from 'react-number-format'
import typeAction from '../../redux_config/type_action/KeyAction'
import ImageSanPham from '../../../assets/image/img_san_pham.jpg'
import {connect} from 'react-redux'
import hosApi from '../../../func/HostApi'
const {UIManager} = NativeModules
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class ItemSanPham extends Component {

     componentWillMount(){
        LayoutAnimation.spring()
    }

    dinhDangTien(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    constructor(props){
        super(props)
        this.state = {
            _disabled: false
        }
    }


    componentWillReceiveProps(nextProps){
        const {isDisable} = nextProps
        if (isDisable){
            this.setState({
                _disabled: false
            })
        }
    }

    render(){

        const {itemsObject} = this.props

        return(
            <View style={{width: 138, height:280, backgroundColor:'#FFF', borderColor:'#979797', borderWidth:1, borderStyle:'solid', margin:2.5, flexDirection:'column', alignContent:'center'}}>
                    <TouchableOpacity 
                        disabled = {this.state._disabled}
                        onPress ={()=> {
                            this.setState({_disabled: true})
                            this.props.dispatch({type: typeAction.keyShowChiTietSanPham, sanPhamChiTiet: itemsObject})
                            this.props.dispatch({type: typeAction.keyTabButtomShowOrHidden, isShowMenu: false})
                        }}> 
                        <Image source = {{uri: `${hosApi.host}${itemsObject.item.urlAnhDaiDien}`}} style={{width: 136, height:136, marginTop:1}}/>   
                    </TouchableOpacity>
                <View style ={{width: 136, height:40, flexDirection:'column', backgroundColor:'transparent', justifyContent:'flex-end'}}>
                    <Text 
                    numberOfLines = {2}
                    style = {{fontFamily:'Tahoma', color:'#000', fontSize:16, marginLeft: 5, marginRight:5, }}
                    >{itemsObject.item.tenSanPham}</Text>
                </View>
                <View style ={{flex:1, flexDirection:'row', alignContent: 'center', margin:5, width: 136, height:18,}}>
                    <Text style = {{fontFamily:'Tahoma', color:'#000', fontSize:16, textAlignVertical:'bottom'}}>Giá: </Text>
                    <Text style={{color: '#C11408', fontFamily:'Tahoma', fontSize:14, textAlignVertical:'bottom'}}>{this.dinhDangTien(itemsObject.item.giaBanKhachHang)} đ</Text>
                </View>    
                <View style ={{flex:1, flexDirection:'row', alignContent: 'center', margin:5}}>
                    <Text style={{fontFamily:'Tahoma', color:'#000', fontSize:16}}>Tồn: </Text>
                    <Text style={{color: '#C11408', fontFamily:'Tahoma', fontSize:16}}>{itemsObject.item.soLuongTon}</Text>
                </View> 
               <TouchableOpacity 
                onPress = {()=>{
                    this.props.dispatch({type: typeAction.keyThemSanPhamVaoGio, sanPham: itemsObject})
                }}
               style={{width: 136, height:45, flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:'#C11408'}}>
                   <Text style={{textAlign:'center', color: '#FFF', fontFamily:'Tahoma', fontSize: 16}}>Thêm vào giỏ</Text>
               </TouchableOpacity>  
            </View>
        )
    }
}

function getData(state) {
    const {tabMenuBottom} = state
    return {
        isDisable: tabMenuBottom
    }
}

export default connect(getData)(ItemSanPham)