import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native'

import dataKey from '../../redux_config/type_action/KeyAction'
import icon_trang_chu from '../../../assets/image/Icon_trang_chu.png'
import icon_thong_bao from '../../../assets/image/icon_thong_bao.png'
import icon_gio_hang from '../../../assets/image/icon_gio_hang.png'
import icon_cai_dat from '../../../assets/image/icon_cai_dat.png'
import {connect} from 'react-redux'
import typeDefault from '../../redux_config/type_action/KeyAction'
const {width, height} = Dimensions.get('window')

class MenuTabMenuBottom extends Component {


    constructor(props){
        super(props)
        this.state = {
            tbSelect: typeDefault.tabTrangChu,
            ishowTabMenu:true,
        }
    }


    componentWillReceiveProps(nexProps){
        const {isShowMenuUser} = nexProps
       
        // if (isShowMenuUser) {
            
        // } 
        if (isShowMenuUser === 'datHang'){
            this.setState({
                tbSelect: typeDefault.tabTrangChu,
                ishowTabMenu: true
            })
        } else {
            this.setState({
                ishowTabMenu: isShowMenuUser
            })
        }
    }


    render(){

        return(
            <View style={this.state.ishowTabMenu ? style.tabDefault:style.tabHidden}>
                    <View style = {{width: width, height:1, backgroundColor:'#979797'}}/>
                    <View style={{flex:1, backgroundColor: 'white', flexDirection:'row', paddingTop:2}}>
                        <TouchableOpacity style={ style.styleButtonTab} onPress = {() => 
                                {
                                    this.props.dispatch({type: typeDefault.tabTrangChu})
                                    this.setState({
                                        tbSelect: typeDefault.tabTrangChu
                                    })
                                }
                            }>
                            <Image source = {icon_trang_chu} style={this.state.tbSelect == typeDefault.tabTrangChu ? style.imageSelect: style.imageDefault}/>
                            <Text style={this.state.tbSelect == typeDefault.tabTrangChu ? style.textSelect: style.textDefault} >Trang Chủ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.styleButtonTab} onPress = {() => 
                                {
                                    this.props.dispatch({type: typeDefault.tabThongBao})
                                    this.setState({
                                        tbSelect: typeDefault.tabThongBao
                                    })
                                }
                            }>
                            <Image source = {icon_thong_bao} style={this.state.tbSelect == typeDefault.tabThongBao ? style.imageSelect: style.imageDefault}/>
                            <Text style={this.state.tbSelect == typeDefault.tabThongBao ? style.textSelect: style.textDefault} >Thông Báo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.styleButtonTab} onPress = {() => 
                                {
                                    this.props.dispatch({type: typeDefault.tabGioHang})
                                    this.setState({
                                        tbSelect: typeDefault.tabGioHang
                                    })
                                }
                            }>
                        <Image source = {icon_gio_hang} style={this.state.tbSelect == typeDefault.tabGioHang ? style.imageSelect: style.imageDefault}/>
                            <Text style={this.state.tbSelect == typeDefault.tabGioHang ? style.textSelect: style.textDefault} >Giỏ Hàng</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.styleButtonTab} onPress = {() => 
                                {
                                    this.props.dispatch({type: typeDefault.tabCaiDat})
                                    this.setState({
                                        tbSelect: typeDefault.tabCaiDat
                                    })
                                }
                            }>
                        <Image source = {icon_cai_dat} style={this.state.tbSelect == typeDefault.tabCaiDat ? style.imageSelect: style.imageDefault}/>
                            <Text style={this.state.tbSelect == typeDefault.tabCaiDat ? style.textSelect: style.textDefault} >Cài Đặt</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        )
    }
} 

function menuTabMenuBottomFunc(state){
    const  {tabMenuBottom} = state
    
    return {
        isShowMenuUser: tabMenuBottom
    }
}

export default connect(menuTabMenuBottomFunc)(MenuTabMenuBottom)

const style = StyleSheet.create({
    styleButtonTab:{
        flex:1, 
        flexDirection:'column', 
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor:'transparent',
       
    },
    textDefault:{
      color:'#2E75E6',
      paddingTop: 5
    },
    imageDefault:{
       width: 23, 
       height:23, 
       tintColor:'#2E75E6'
    },
    textSelect:{
      color:'#D0021B',
      paddingTop:5
    },
    imageSelect:{
       width: 20, 
       height:22, 
       tintColor:'#D0021B'
    },
    tabDefault:{
        height: 60,
        opacity: 1,
        width,
        flexDirection:'column'
    },
    tabHidden:{
        height: 0,
        opacity:0,
        width:0,
        flexDirection:'column'
    }
})