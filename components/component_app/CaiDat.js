import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    TouchableOpacity,
    StatusBar,
    Image,
    AsyncStorage,
    Alert
} from 'react-native'
import ItemCaiDat from './component_cai_dat/ItemCaiDat'
import bg_setup from '../../assets/image/bg_setup.jpg'
import logo_binh_an from '../../assets/image/logo_binh_an.png'
import {connect} from 'react-redux'
import typeAction from '../redux_config/type_action/KeyAction'
import typeStore from '../redux_config/type_action/KeyAsynStore'
// import TabMenuBottom from '../navigation_comoponent/tab_menu_bottom/MenuTabMenuBottom' 
const {width, height} = Dimensions.get('screen')

class CaiDat extends Component {

    componentWillMount(){
        AsyncStorage.getItem(typeStore.dmKhachHang, (e,r) => {
            if(e == null && r != null) {
                const xx = JSON.parse(r)
                this.setState({
                    infoUser: xx
                })
            }
        })
    }

    constructor(props){
        super(props)
        this.state = {
            infoUser: null,
            showTabCaiDat:false,
            isChooseTab: 1
        }
    }
    
    static navigationOptions = {
        header: null 
    }

    componentWillReceiveProps(nextProps){

        const {keyAction, itemAction, showTab, isShowMenuUser} = nextProps
        if (isShowMenuUser){
            this.setState({
                isChooseTab: 1
            })
        }

       // console.log(isShowMenuUser)

        if (showTab === typeAction.tabCaiDat){
            this.setState({
                showTabCaiDat: true
            })
        } else {
            this.setState({
                showTabCaiDat: false
            })
        }
            
    }

    dangXuat(){
        AsyncStorage.removeItem(typeStore.dmKhachHang, (err) => {
            if(err != null) {
                Alert.alert('Thông báo', 'Bạn vui lòng thử lại!', [{text: 'OK'}])
            } else {
                this.props.dispatch({type: typeAction.keyDangXuat,})
            }
        })
    }

    showComponentCaiDat(keyAction, itemAction){
        const {navigate, isShowMenuUser} = this.props.navigation

        if (this.state.isChooseTab === 1){
            
            switch(keyAction){
                case typeAction.keyShowDanhSachDonHang:

                    this.setState({
                        isChooseTab: 8888989
                    })

                    this.props.dispatch({type: typeAction.keyTabButtomShowOrHidden, isShowMenu: false})
                    navigate(
                        'DanhSachDonHang', 
                            {...itemAction,
                                dispatchAction: this.props.dispatch
                            }
                        )
                    break
                case typeAction.keyShowThonTinNhaCungCap:

                    this.setState({
                        isChooseTab: 8888989
                    })

                    this.props.dispatch({type: typeAction.keyTabButtomShowOrHidden, isShowMenu: false})
                    navigate(
                        'ThonTinNhaCungCap', 
                            {...itemAction,
                                dispatchAction: this.props.dispatch
                            }
                        )
                    break
                case typeAction.keyShowThongTinNhaPhatTrien:

                    this.setState({
                        isChooseTab: 8888989
                    })

                    this.props.dispatch({type: typeAction.keyTabButtomShowOrHidden, isShowMenu: false})
                    navigate('ThongTinNhaPhatTrien', 
                            {...itemAction,
                                dispatchAction: this.props.dispatch
                            }
                        )
                    break
                case typeAction.keyDangXuat:               
                        this.setState({
                            isChooseTab: 1
                        })

                        Alert.alert('Thông Báo', 'Bạn thục sự muốn đăng xuât!', [{text: 'Đồng Ý', onPress: () => this.dangXuat()}, {text: 'Hủy'}])

                    break
            } 

        }
        
        
    }

    render(){
        if (!this.state.showTabCaiDat) {
            return <View style={{width: this.state.showTabCaiDat ? width: 0, height: this.state.showTabCaiDat ? height - 60:0, backgroundColor:'#C2C2C2', position: this.state.showTabCaiDat ?  'absolute':'relative', opacity: this.state.showTabCaiDat ? 1 : 0}}/>

        } else {
            return(
                <View style={{width: this.state.showTabCaiDat ? width: 0, height: this.state.showTabCaiDat ? height - 60:0, backgroundColor:'#C2C2C2', position: this.state.showTabCaiDat ?  'absolute':'relative', opacity: this.state.showTabCaiDat ? 1 : 0}}>
                    <StatusBar barStyle = 'light-content' />
                        <View style={{width, height: 200, backgroundColor:'#fff'}}>
                            <Image source = {bg_setup} style={{width:width, height: 200}}/>
                            <View style = {{width, height: 80, marginTop: 100, marginLeft: 20, flexDirection:'row', alignItems:'center', position:'absolute'}}>
                                    <Image source = {logo_binh_an} style = {{width: 80, height: 80}}/>
                                    <Text style={{color: '#FFF', backgroundColor:'transparent', fontSize:18, fontWeight:'bold'}}>{this.state.infoUser != null ? this.state.infoUser.tenKhachHang: ''}</Text>
                                </View>
                        </View>

                        <FlatList
                            data = {[{id: typeAction.keyShowDanhSachDonHang, name: 'Xem đơn hàng'}, {id: typeAction.keyShowThonTinNhaCungCap, name: 'Thông tin nhà cung cấp'}, {id: typeAction.keyShowThongTinNhaPhatTrien, name: 'Thông tin nhà phát triển'}, {id: typeAction.keyDangXuat, name: 'Đăng Xuất'}]}
                            renderItem = {({item}) => <ItemCaiDat obItemCaiDat = {item} showTabCaiDat = { this.showComponentCaiDat.bind(this)}/>}
                            showsHorizontalScrollIndicator = {false}
                            showsVerticalScrollIndicator = {false}
                            keyExtractor = {(items) => items.id}
                        />
                </View>
            )
        }
    }
} 

function getStateCaiDat(state){
    const {caiDatRenders, showTabClick, tabMenuBottom} = state
    
    return {
        itemAction: caiDatRenders.itemAction,
        keyAction: caiDatRenders.keyAction,
        showTab: showTabClick.keyTab,
        isShowMenuUser: tabMenuBottom
    }
}

export default connect(getStateCaiDat)(CaiDat)

