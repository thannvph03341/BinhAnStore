import React,{Component} from 'react'
import {
    View,
    Text,
    TextInput,
    Image,
    Dimensions,
    Platform,
    TouchableOpacity
} from 'react-native'
import icon_back from '../../../assets/image/Icon_back.png'

import IconIons from 'react-native-vector-icons/Ionicons'
import logo_binh_an from '../../../assets/image/logo_binh_an.png'
import typeAction from '../../redux_config/type_action/KeyAction'

const {width, height} = Dimensions.get('screen')
export default class ManHinhThongTinNhaCungCap extends Component {

    static navigationOptions = ({ navigation }) => ({
        header:   <View style={{width: width, height: Platform.OS == 'ios' ? 65:55,  flexDirection:'row', backgroundColor:'#C2C2C2', alignItems: 'center'}}>
                    <TouchableOpacity 
                        onPress = {() => {
                            navigation.state.params.dispatchAction({type: typeAction.keyTabButtomShowOrHidden, isShowMenu: true})
                            navigation.goBack()
                        }}
                        style={{width: 50, height: Platform.OS == 'ios' ? 45:55,  backgroundColor:'transparent', marginTop: Platform.OS == 'ios' ? 20:0, flexDirection:'column', justifyContent:'center'}}>
                        <Image source = {icon_back} style={{width: 19, height: 11, marginLeft: 10,}}/>
                    </TouchableOpacity>
                    <Text
                        numberOfLines = {1}
                        style={{flex: 1, textAlign:'center', marginTop: Platform.OS == 'ios' ? 20:0, fontSize: 18, fontWeight:'bold', color:'#0062FF', marginRight: 60}}>Thông tin nhà cung cấp</Text>
                </View>
    })
    render(){
        return(
            <View style={{flex:1, backgroundColor:'#FFF', flexDirection:'column', alignItems:'center'}}>
                <View style={{width, height: 350, flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop: 20}}>
                    <Image source = {logo_binh_an} style={{width: 150, height:150, marginBottom: 60}}/>
                    <View style={{flex: 1, marginLeft: 20, marginRight: 20, flexDirection:'column', justifyContent:'center'}}> 
                        <View style={{flex:1, flexDirection:'row', alignItems:'center', margin: 10}}>
                            <IconIons name = 'ios-locate' style={{fontSize:30, color: '#EB1F1F'}}/>
                        <Text
                            numberOfLines = {2}
                            style={{textAlign:'left', fontSize: 18, fontWeight:'bold', color:'#0062FF',  marginLeft: 10}}>
                            Bình An Hải Dương Bình An Hải Dương 
                        </Text>
                        </View>
                        <View style={{flex:1,  flexDirection:'row', alignItems:'center', margin: 10}}>
                            <IconIons name='ios-mail' style={{fontSize:30, color: '#EB1F1F'}}/>
                            <Text
                                style={{textAlign:'left', fontSize: 18, fontWeight:'bold', color:'#0062FF',  marginLeft: 10}}>
                                hinhanstore@gmail.com
                            </Text>
                        </View>
                        <View style={{flex:1,  flexDirection:'row', alignItems:'center', margin: 10}}>
                            <IconIons name='ios-call' style={{fontSize:30, color: '#EB1F1F'}}/>
                            <Text
                                style={{textAlign:'left', fontSize: 18, fontWeight:'bold', color:'#0062FF',  marginLeft: 10}}>
                                0977-888-888
                            </Text>
                        </View>
                        <View style={{flex:1,  flexDirection:'row', alignItems:'center', margin: 10}}>
                            <IconIons name = 'ios-browsers' style={{fontSize:30, color: '#EB1F1F'}}/>
                            <Text
                                style={{textAlign:'left', fontSize: 18, fontWeight:'bold', color:'#0062FF',  marginLeft: 10}}>
                                binhanstore.vn
                            </Text>
                        </View>
                    </View>
                </View>
                
            </View>
        )
    }

}