import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    NativeModules,
    LayoutAnimation
} from 'react-native'

//import TextFormatNumber from 'react-number-format'
import typeAction from '../../redux_config/type_action/KeyAction'
import ImageSanPham from '../../../assets/image/img_san_pham.jpg'
import {connect} from 'react-redux'
import hosApi from '../../../func/HostApi'

const {width, height} = Dimensions.get('screen')
const {UIManager} = NativeModules
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class ItemSanPhamTheoNhom extends Component {

     componentWillMount(){
        LayoutAnimation.spring()
    }

    dinhDangTien(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    render(){

        const {itemsObject, navigate} = this.props
       
        return(

            <View style={{width: (width/2), height: (width/2) + 150, flexDirection:'row', justifyContent:'center', borderColor:'#979797', borderWidth:1, borderStyle:'solid',}}>
                    <View style={{flex:1, backgroundColor:'#FFF',  flexDirection:'column', alignContent:'center'}}>
                        <TouchableOpacity 
                            onPress ={()=> {
                                 //this.props.dispatch({type: typeAction.keyShowChiTietSanPham, sanPhamChiTiet: itemsObject}) 
                                 //const sp = itemsObject.item
                                 //console.log(sp)
                                 navigate('ChiTietSanPham', 
                                    {
                                        ...itemsObject,
                                        dispatchAction: this.props.dispatch,
                                        isBackShowButtom: '@#!'
                                    }
                                )
                                 this.props.dispatch({type: typeAction.keyTabButtomShowOrHidden, isShowMenu: false}) 
                            }}> 
                            <Image source = {{uri: `${hosApi.host}${itemsObject.item.urlAnhDaiDien}`}} style={{width: (width/2) - 2, height: (width/2) - 2, marginTop:1}}/>   
                        </TouchableOpacity>
                        <View style ={{width: (width/2) - 2, height:40, flexDirection:'column', backgroundColor:'transparent', justifyContent:'flex-end'}}>
                            <Text 
                            numberOfLines = {2}
                            style = {{fontFamily:'Tahoma', color:'#000', fontSize:16, marginLeft: 5, marginRight:5, }}
                            >{itemsObject.item.tenSanPham}</Text>
                        </View>
                        <View style ={{flex:1, flexDirection:'row', alignContent: 'center', margin:5, width: (width/2) - 2, height:18,}}>
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
                        style={{width: (width/2) - 2, height:45, flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:'#C11408'}}>
                            <Text style={{textAlign:'center', color: '#FFF', fontFamily:'Tahoma', fontSize: 16}}>Thêm vào giỏ</Text>
                        </TouchableOpacity>  
                    </View>
                   
            </View>

           
        )
    }
}
export default connect()(ItemSanPhamTheoNhom)