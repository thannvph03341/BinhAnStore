import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet, 
    TouchableOpacity,
    Dimensions, 
    Platform,
    FlatList,
    NativeModules,
    LayoutAnimation,
    AsyncStorage,
} from 'react-native'
import dataJsonNhomNganh from '../../assets/data/data'
import ItemCap1MenuSlider from './ItemCap1MenuSlider'
import keyStore from '../redux_config/type_action/KeyAsynStore'
import hostApi from '../../func/HostApi'
const {width, height} = Dimensions.get('window')
// const {UIManager} = NativeModules
// UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
import {connect} from 'react-redux'

class MainMenuSlide extends Component {

    componentWillMount(){
         AsyncStorage.getItem(keyStore.dmKhachHang, (error, result) => {
            if (error == null && result != null){
                const {idKhachHang} = JSON.parse(result) 
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
            isShowMenuSlider: false,
            dataNganhNhomSanPham: [],
        }
    }

    componentWillReceiveProps(nextProps){
        
        const {isShowMenuSlider} = nextProps

        if (this.state.isShowMenuSlider) {
            this.setState(
               {
                   isShowMenuSlider: false
                }
            )
        } else {
            this.setState(
                {
                    isShowMenuSlider: isShowMenuSlider
                }
            )
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
        return(
          <View style = {{width: this.state.isShowMenuSlider ? width - 100: 0, height:height, backgroundColor: 'transparent'}}>
               <FlatList 
                style={{marginTop: Platform.OS == 'ios' ? 20: 0, marginBottom: 20}}
                data = {this.state.dataNganhNhomSanPham}
                renderItem = {(item) => <ItemCap1MenuSlider objectItem = {item}/>}
                keyExtractor = {(items) => items.idNganhSanPham}
                showsHorizontalScrollIndicator = {false}
                showsVerticalScrollIndicator = {false}
                initialNumToRender = {0}
              /> 
          </View>
        )
    }

} 

function getDataMenuSlider(state){
    const {showMenu} = state
    return {
        isShowMenuSlider: state.showMenu
    }
}

export default connect(getDataMenuSlider)(MainMenuSlide)

