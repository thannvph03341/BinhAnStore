import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet, Button,
    NativeModules,
    LayoutAnimation,
    ActivityIndicator,
    Dimensions,
    AsyncStorage
} from 'react-native'
import TimKiem from './TimKiem'
import NganhHang from './component_tranc_chu/NganhHang'
import NhomSanPham from './component_tranc_chu/NhomHang'
import typeAction from '../redux_config/type_action/KeyAction'
import TabMenuBottom from '../navigation_comoponent/tab_menu_bottom/MenuTabMenuBottom' 
import {connect} from 'react-redux'
import dataDefault from '../redux_config/default_data/DefaultState'
import keyStore from '../redux_config/type_action/KeyAsynStore'
import hostApi from '../../func/HostApi'
const {width, height} = Dimensions.get('screen')

class TrangChu extends Component {

    componentDidMount(){
        AsyncStorage.getItem(keyStore.dmKhachHang, (error, result) => {
            if (error == null && result != null){

                const {idKhachHang} = JSON.parse(result) 
                this.setState({
                    idKhachHang: idKhachHang
                })
                this.funcGetNganhNhomSanPham({
                                            idKhachHang: idKhachHang,
                                            pageNganh: 1,
                                            pageNhom: 1,
                                            pageSanPham:1,
                                            pageSize: 6
                                        })
                
            }
        })
    }

    constructor(props){
        super(props)

        this.state = {
            isLoadData: false,
            dataNganhNhomSanPham: [],
            showTabTrangChu: true,
            isSanPhamChoose: 1,
            idKhachHang: ''
        }
    }

    componentWillReceiveProps(nextProps){
        const {sanPham, showTab, isShowMenuUser, sanPhamTrongNhom, showSanPhamTrongNhomMenuSlider} = nextProps
        const { navigate } = this.props.navigation
        if (isShowMenuUser){
            this.setState({
                isSanPhamChoose: 1
            })
        }
        //  navigation.navigate('SanPhamTheoNhom', {danhSachSanPham: itemsObject.item.danhSachSanPham, dispatchAction: this.props.dispatch, tenNganhNhomSanPham: itemsObject.item.tenNganhNhomSanPham} )
        // if ()
 
        if (sanPham != null && this.state.isSanPhamChoose === 1){
           
            navigate('ChiTietSanPham', 
                {
                    ...sanPham,
                    dispatchAction: this.props.dispatch
                }
            )
            
            this.props.dispatch({type: typeAction.keyShowChiTietSanPham, sanPhamChiTiet: null})
            this.setState({
                isSanPhamChoose: 2929
            })
        } 

        if (showTab === typeAction.tabTrangChu || showTab === 'isNotShowTab' || showTab == null){
            this.setState({
                showTabTrangChu: true
            })
        } else {
            this.setState({
                showTabTrangChu: false
            })
        }

        if (showSanPhamTrongNhomMenuSlider.ds.length > 0 && this.state.isSanPhamChoose === 1){
            this.setState({
                isSanPhamChoose: 2929
            })
             this.props.dispatch({type: typeAction.keyTabButtomShowOrHidden, isShowMenu: false})
            navigate('SanPhamTheoNhom', 
                {
                    danhSachSanPham: showSanPhamTrongNhomMenuSlider.ds,
                    dispatchAction: this.props.dispatch,
                    tenNganhNhomSanPham: showSanPhamTrongNhomMenuSlider.tenNganhNhomSanPham
                }
            )
            this.props.dispatch({
                        type: typeAction.keyShowSanPhamTrongNhomTuMenu, danhSachSanPham: {ds:[], load: false}
                    })
            // this.props.dispatch({type: typeAction.keyShowChiTietSanPham, sanPhamChiTiet: null})
        }
    }

    async funcGetNganhNhomSanPham(dataGet){
        //console.log(`${hostApi.apiGetNganhNhomSanPham}idKhachHang=${dataGet.idKhachHang}&pageNganh=${dataGet.pageNganh}&pageNhom=${dataGet.pageNhom}&pageSanPham=${dataGet.pageSanPham}&pageSize=${dataGet.pageSize}`)
        let request = await fetch(`${hostApi.apiGetNganhNhomSanPham}idKhachHang=${dataGet.idKhachHang}&pageNganh=${dataGet.pageNganh}&pageNhom=${dataGet.pageNhom}&pageSanPham=${dataGet.pageSanPham}&pageSize=${dataGet.pageSize}`)
        let obDataNganhNhomSanPham = await request.json()
       // console.log(obDataNganhNhomSanPham[0])
            this.setState(
                    {
                        dataNganhNhomSanPham: obDataNganhNhomSanPham[0].data,
                        isLoadData: true
                    }
            )
    }


    render(){
         const { navigation } = this.props
        if (this.state.isLoadData){
            return(
                <View style={{width: this.state.showTabTrangChu ? width:0, height: this.state.showTabTrangChu ? height - 60:0, backgroundColor:'#C2C2C2', flexDirection: 'column', alignItems:'center', position: this.state.showTabTrangChu ? 'relative': 'absolute', opacity:this.state.showTabTrangChu ? 1: 0}}>
                    <TimKiem idKhachHang = {this.state.idKhachHang} />
                    <NganhHang obDataNganhNhomSanPham = {this.state.dataNganhNhomSanPham}/>
                    <NhomSanPham navigation={navigation}/>
                </View>
            )
        } else {
            return (
                <View style={{flex:1, backgroundColor:'#C2C2C2'}}>
                    <ActivityIndicator
                        animating = {true}
                        size = 'large'
                        color = 'red'
                        style = {{flex:1, flexDirection: 'column', justifyContent:'center', alignItems:'center'}}
                />
                </View>
            )
        }
    }
} 

function getStateTrangChu(state) {
    const {trangChuRenders, showTabClick, tabMenuBottom, showSanPhamTrongNhomMenuSlider} = state
   
    return (
        {
            sanPham: trangChuRenders,
            showTab: showTabClick.keyTab,
            isShowMenuUser: tabMenuBottom,
            showSanPhamTrongNhomMenuSlider: showSanPhamTrongNhomMenuSlider
        }
    )
}

export default connect(getStateTrangChu)(TrangChu)
