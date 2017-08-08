import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet, 
    Dimensions, 
    Platform,
    KeyboardAvoidingView,
    TextInput,
    Keyboard,
    AsyncStorage
} from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import {connect} from 'react-redux'
import typeDefault from '../redux_config/type_action/KeyAction'
import TabMenuBottom from './tab_menu_bottom/MenuTabMenuBottom'
import ManHinhRootConfig from './stack_screen/ManHinhTrangChu'
// import ManHinhThongBao from './stack_screen/ManHinhThongBao'
// import ManHinhGioHang from './stack_screen/ManHinhGioHang'
// import ManHinhCaiDat from './stack_screen/ManHinhCaiDat'
import keyStore from '../redux_config/type_action/KeyAsynStore'

import MenuSlide from '../menu_slide/MainMenuSlide'
import SanPhamViewDialog from '../navigation_comoponent/stack_screen/SanPhamViewDialog'


const {width, height} = Dimensions.get("window")

class MainNatvigationComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            isShowDialog:false,
        }
    }

    componentWillReceiveProps(nextProps){
        const {sanPham, isHeightMenuButtom} = nextProps

        if (sanPham != null ){
            this.setState({
                isShowDialog: true,
            })
        } else{
           this.setState({
                isShowDialog: false,
            })
            Keyboard.dismiss()
        }
    }


    // hienThiManHinhTab(tabSelect){

    //     switch(tabSelect){
    //         case typeDefault.tabThongBao:
    //             return <ManHinhThongBao />
    //         case typeDefault.tabGioHang:
    //             return <ManHinhGioHang />
    //         case typeDefault.tabCaiDat:
    //             return <ManHinhCaiDat />
    //         default:
    //             return <ManHinhTrangChu/>
    //     }
    // }

    render(){

        return(
            <View style={{flex:1, flexDirection:'row', }}>
                    <MenuSlide/>
                 <View style={{width,height: Platform.OS == 'ios' ? height: height - 25,  flexDirection:'column'}}>
                      {/* {this.hienThiManHinhTab(this.props.showTab)}   */}
                      <ManHinhRootConfig />
                    <View >
                        <TabMenuBottom/>
                    </View>
                 </View>
                    <View style={[style.container, this.state.isShowDialog ? style.showDialog:style.hiddenDialog]}>
                        <KeyboardAvoidingView behavior = 'padding' style={{flex: 1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                             <View style={{width: width - 50, height: 260, borderRadius: 8, backgroundColor: '#fff' }}>
                                 <SanPhamViewDialog />
                             </View>
                        </KeyboardAvoidingView>
                    </View>
            </View>
        )
    }
} 

function nainNatvigationComponent(state){
    const {showTabClick} = state
    
   // console.log(showTabClick.keyTab)
    return {
        showTab: showTabClick.keyTab,
        sanPham: showTabClick.sanPham,
    };
}

export default connect(nainNatvigationComponent)(MainNatvigationComponent)
const style = StyleSheet.create(
     {
        container: {
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            justifyContent: 'center',
            alignItems: 'center'
        },

        showDialog: {
           width: width,
           height:height,
           backgroundColor:'rgba(52,52,52,0.5)'
        },
        hiddenDialog: { 
            top: -10000,
            left: 0,
            height: 0,
            width: 0
        }
    }
)
