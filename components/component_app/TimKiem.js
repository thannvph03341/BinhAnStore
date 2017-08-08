import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Platform, 
    Image,
    TouchableOpacity,
    TextInput,
    Keyboard,
    FlatList,
} from 'react-native'
import icon_menu from '../../assets/image/Icon_Menu.png'
import icon_back from '../../assets/image/Icon_back.png'
import IconVector from 'react-native-vector-icons/Ionicons'
import hostApi from '../../func/HostApi'

import typeDefault from '../redux_config/type_action/KeyAction'
import {connect} from 'react-redux'

const {width, height} = Dimensions.get('window')


class TimKiem extends Component {


    constructor(props){
        super(props)
        this.state = {
            isShow: false,
            heightSearch: 65,
            keySreach:'TENSANPHAM', //TENNHOMSANPHAM
            dataSeearch:[]
        }
    }


    showMenuSlider(){
    const is = !this.state.isShow
       this.setState({
            isShow: is
        })
        this.props.dispatch({
            type: typeDefault.keyMenuClickShow,
            showMenu: is
        }) 

    }

    componentWillReceiveProps(nextProps){
        const {isShowMenuUser} = nextProps
        
        if(isShowMenuUser == false) {
            this.setState({isShow:false})
        }
    }

   async timKiemSanPham(txtTimKiem){
       const { idKhachHang } = this.props
       
       let requset = await fetch(`${hostApi.apiTiemKiem}?idKhachHang=${idKhachHang}&searchOption=${this.state.keySreach}&keyWord=${txtTimKiem}&page=1&pageSize=100`)
        let response = await requset.json()
        
        this.setState({
            dataSeearch: response.productList
        })
    }


    render(){
        return(
           <View style={{width: width, height: this.state.heightSearch,backgroundColor:'#C2C2C2', flexDirection:'column'}}>
                    <View style={{width: width, height: 65,backgroundColor:'#C2C2C2', flexDirection:'row'}}>
                        <TouchableOpacity 
                            onPress = {() => {
                                if (this.state.heightSearch == 65){
                                    this.showMenuSlider()
                                } else {
                                    Keyboard.dismiss()
                                    this.props.dispatch({type: typeDefault.keyTabButtomShowOrHidden, isShowMenu: true})
                                    this.setState({
                                        heightSearch: 65,
                                    })
                                }

                            }}>
                                
                                {this.state.heightSearch == 65 ?  <Image source = {icon_menu} style={{width: 35, height:35, marginTop: Platform.OS == 'ios' ? 22.5: 10, marginLeft: 10}}/>
                                : <View style={{width: 35, height:35, marginTop: Platform.OS == 'ios' ? 22.5: 10, marginLeft: 10, flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                                    <Image source = {icon_back} style={{width: 19, height: 11}}/>
                                </View>
                                }

                        </TouchableOpacity>
                            
                            <IconVector name="md-search" size={25} color="#BEB8B8" style={{ marginTop: Platform.OS == 'ios' ? 27: 15, position:'absolute', marginLeft: 60, zIndex:1, backgroundColor:'transparent'}}/>
                            <TextInput style={{textAlign:'center', backgroundColor:'white', width: width - 55,  height: 35, marginTop: Platform.OS == 'ios' ? 22.5: 10, marginLeft: 5, borderRadius: 5, paddingBottom:Platform.OS == 'ios' ? 0:4.5, paddingLeft: 35, paddingRight:15}}
                                placeholder = 'Tìm kiếm trên Bình An'
                                placeholderTextColor = '#BEB8B8'
                                underlineColorAndroid = 'transparent'
                                onChangeText = {(v) => {
                                    this.timKiemSanPham(v)
                                }}
                                onFocus = {() => {
                                    this.props.dispatch({type: typeDefault.keyTabButtomShowOrHidden, isShowMenu: false})
                                    this.setState({
                                        heightSearch: height
                                    })
                                }}
                            >
                        </TextInput>
                    </View>
                <View style={{width, height:height, backgroundColor: '#FFF', flexDirection:'column', alignItems:'center', }}>
                    <View style={{width, height:50, flexDirection:'row',justifyContent:'center', alignItems:'center', padding: 5}}>
                       <View style={{flex:1}}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    keySreach: 'TENSANPHAM'
                                })    
                            }} 
                            style = {[ this.state.keySreach == 'TENSANPHAM' ? style.btnSelect:style.btnNoSelect, {marginRight: 2.5}]}
                            >
                                <Text style={this.state.keySreach == 'TENSANPHAM' ? style.textSelect:style.textNoSelect}>Tìm theo tên sản phẩm</Text>
                            </TouchableOpacity>
                       </View>
                       <View style={{flex:1}}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    keySreach: 'TENNHOMSANPHAM'
                                })
                            }} 
                            style = {[this.state.keySreach == 'TENNHOMSANPHAM' ? style.btnSelect:style.btnNoSelect, {marginLeft: 2.5}]}
                            >
                                <Text style={this.state.keySreach == 'TENNHOMSANPHAM' ? style.textSelect:style.textNoSelect}>Tìm theo tên nhóm sản phẩm</Text>
                            </TouchableOpacity>
                       </View>
                    </View>
                    <FlatList 
                        style = {{flex:1, maxHeight: height - 120}}
                        data = {this.state.dataSeearch}
                        renderItem = {({item}) => 
                            <View style={{width, height: 50, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                <View style={{width: width - 10, height:0.5, backgroundColor:'blue'}}/>
                                <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
                                   <TouchableOpacity 
                                    onPress = {() => {
                                        this.setState({
                                            heightSearch: 65,
                                        })
                                        Keyboard.dismiss()
                                        {/* this.props.dispatch({type: typeDefault.keyTabButtomShowOrHidden, isShowMenu: true}) */}
                                        this.props.dispatch({type: typeDefault.keyShowChiTietSanPham, sanPhamChiTiet: {item: item}})
                                    }}
                                    style={{flex:1, flexDirection: 'column', alignItems:'center', justifyContent:'center'}}
                                   >
                                     <Text style={{color:'#000'}}>{item.tenSanPham}</Text>
                                   </TouchableOpacity>
                                </View>
                                <View style={{width: width - 10, height:0.5, backgroundColor:'blue'}}/>
                            </View>    
                        }
                        keyExtractor = {(items) => items.idSanPham}
                        showsVerticalScrollIndicator = {false}
                        showsHorizontalScrollIndicator = {false}
                    />    
                </View>
           </View>
        )
    }
} 

function getDataTimKiem(state){
    const {tabMenuBottom} = state
    return {
        isShowMenuUser: tabMenuBottom,
    }
}

const style = StyleSheet.create({
    btnSelect: {flex:1,  flexDirection:'column', justifyContent:'center', alignItems:'center', borderColor:'red', borderWidth: 1, borderRadius: 5, },
    btnNoSelect: {flex:1,  flexDirection:'column', justifyContent:'center', alignItems:'center', borderColor:'#C2C2C2', borderWidth: 1, borderRadius: 5, },
    textSelect: {color: 'blue', textAlign:'center'},
    textNoSelect: {color: '#C2C2C2', textAlign:'center'}
})

export default connect(getDataTimKiem)(TimKiem)
