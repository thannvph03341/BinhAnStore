import React,{Component} from 'react'
import {
    Text,
    View,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'

const {width} = Dimensions.get('window')

import ItemSanPham from './ItemSanPham'
import {connect} from 'react-redux'
import typeAction from '../../redux_config/type_action/KeyAction'

class ItemNhomHang extends Component {

   
    constructor(props){
        super(props)
        this.state = {
            _disabled: false
        }
    }

    _onEndReached(distanceFromEn){
        console.log(distanceFromEn)
    }

    componentWillReceiveProps(nextProps){
        const {isShowMenuUser} = nextProps
        if (isShowMenuUser) {
            this.setState({
                _disabled: false
            })
        }
    }


    render(){
        const {itemsObject, navigation} = this.props
        return(
            <View style = {{flex:1, flexDirection:'column', justifyContent:'center'}}>
                <View style={{width: width, height: 45, flexDirection:'row', alignItems:'center'}}>
                    <Text 
                    numberOfLines = {1}
                    style={{flex:1.5, marginLeft:5}}>{itemsObject.item.tenNganhNhomSanPham}</Text>
                    <TouchableOpacity 
                        disabled = {this.state._disabled}
                        onPress = {() => {
                            this.setState({
                                _disabled:true
                            })
                            //this.props.dispatch({type: typeAction.keyShowSanPhamTrongNhom, danhSachSanPham: itemsObject.item.danhSachSanPham})
                            navigation.navigate('SanPhamTheoNhom', {danhSachSanPham: itemsObject.item.danhSachSanPham, dispatchAction: this.props.dispatch, tenNganhNhomSanPham: itemsObject.item.tenNganhNhomSanPham, } )
                            this.props.dispatch({type: typeAction.keyTabButtomShowOrHidden, isShowMenu: false})
                        }}
                    style={{flex:1, height:45, flexDirection:'row', backgroundColor:'transparent', alignItems:'center'}}>
                        <Text style={{textAlign:'right', flex:1, marginRight: 15}}>Xem Thêm</Text>
                    </TouchableOpacity>
                </View>
               <FlatList
                    data = {itemsObject.item.danhSachSanPham}
                    renderItem = {(item) => <ItemSanPham itemsObject = {item}/>}
                    keyExtractor = {(items) => items.idSanPham}
                    showsHorizontalScrollIndicator = {false}
                    showsVerticalScrollIndicator = {false}
                    horizontal = {true}
                    initialNumToRender = {0}
                    onEndReached = {() => {
                        console.log('san pham trong nhoms')
                    }}

                    onEndReachedThreshold = {0}
               />
            </View>
            
        )
    }
}

function getData(state) {
        const {tabMenuBottom} = state
    return {
         isShowMenuUser: tabMenuBottom,
    }
}

export default connect(getData)(ItemNhomHang)