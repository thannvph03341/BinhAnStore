import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    AsyncStorage,
    ActivityIndicator
} from 'react-native'
import {connect} from 'react-redux'
import typeActionDefault from '../../../components/redux_config/type_action/KeyAction'
import ItemsNganh from './ItemNhomNganh'
import dataJsonNhomNganh from '../../../assets/data/data'
import keystore from '../../redux_config/type_action/KeyAsynStore'


const {width, height} = Dimensions.get('window')
// const dataNganh = [{id:1, tenNganh:'Ngànaksjldh;alskjdlkajsh A'},{id:2, tenNganh:'Ngành B'}, {id:3, tenNganh:'Ngành C'}, {id:4, tenNganh:'Ngàaslkdjaklsdnh D'}, {id:5, tenNganh:'Ngành E'}, {id:7, tenNganh:'Ngành F'}, {id:8, tenNganh:'Ngành G'}, {id:9, tenNganh:'Ngành H'}]



export default class NganhHang extends Component {

    constructor(props){
        super(props)
    }

    // _onEndReached(){
    //     console.log('aklsjdl;aksjdlkas')
    // }
  
    render(){
        const {obDataNganhNhomSanPham} = this.props

        return(
           <View style={{width: width, height: 55, backgroundColor:'#C2C2C2'}}>
                <FlatList
                    ref={node => (this.list = node)}
                    data = {obDataNganhNhomSanPham}
                    renderItem = {(item) => <ItemsNganh objectItem = {item}/>}
                    keyExtractor = {(item) => item.idNganhSanPham}
                    horizontal = {true}
                    showsHorizontalScrollIndicator = {false}
                    showsHorizontalScrollIndicator = {false}
                    onEndReached = {() => {
                        console.log('nganh hang')
                    }}

                    onEndReachedThreshold = {0}
                />
           </View>
        )
    }
} 
// function getDataNganhNhomSanPham(state){
//     const   { nganhNhomSanPham } = state
//     console.log(nganhNhomSanPham)
//     return {
//         nganhNhomSanPham: nganhNhomSanPham
//     }
// }

// export default connect(getDataNganhNhomSanPham)(NganhHang)

