import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Platform, 
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native'
import icon_menu from '../../assets/image/Icon_Menu.png'
import IconVector from 'react-native-vector-icons/Ionicons'
import typeDefault from '../redux_config/type_action/KeyAction'
import {connect} from 'react-redux'

const {width, height} = Dimensions.get('window')


class TimKiemDonHang extends Component {

    constructor(props){
        super(props)

    }


    render(){
        return(
           <View style={{width: width, height: Platform.OS == 'ios' ? 65:55,backgroundColor:'#C2C2C2', flexDirection:'row'}}>
                <IconVector name="md-search" size={25} color="#BEB8B8" style={{ marginTop: Platform.OS == 'ios' ? 27: 15, position:'absolute', marginLeft: 60, zIndex:1, backgroundColor:'transparent'}}/>
                <TextInput style={{textAlign:'center', backgroundColor:'white', width: width - 65,  height: 35, marginTop: Platform.OS == 'ios' ? 22.5: 10, marginLeft: 5, borderRadius: 5, paddingBottom:Platform.OS == 'ios' ? 0:4.5, paddingLeft: 35, paddingRight:15}}
                    placeholder = 'Tìm kiếm đơn hàng'
                    placeholderTextColor = '#BEB8B8'
                    underlineColorAndroid = 'transparent'
                >
                </TextInput>
                
           </View>
        )
    }
} 
export default connect()(TimKiemDonHang)
