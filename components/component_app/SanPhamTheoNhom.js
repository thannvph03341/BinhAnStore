import React, {Component} from 'react' 
import {
    View,
    Text,
    Platform,
    TouchableOpacity,
    Dimensions,
    Image, 
    FlatList,
    TextInput
} from 'react-native'
import typeAction from '../redux_config/type_action/KeyAction'
import icon_back from '../../assets/image/Icon_back.png'
import ItemSanPhamTheoNhom from '../component_app/component_tranc_chu/ItemSanPhamTheoNhom'
import IconVector from 'react-native-vector-icons/Ionicons'

const {width, height} = Dimensions.get('screen')


export default class SanPhamTheoNhom extends Component{

    static navigationOptions = ({ navigation }) => ({
        header:  null
        //`${navigation.state.params.item.tenSanPham}`
    })

    render(){
        const {navigation} = this.props
        // console.log(navigation)

        return(
            <View style={{flex:1, backgroundColor:'#C2C2C2', flexDirection:'column'}}>
                <View style={{width: width, height: Platform.OS == 'ios' ? 65:55,  flexDirection:'row', backgroundColor:'#C2C2C2', alignItems: 'center'}}>
                    <TouchableOpacity 
                        onPress = {() => {
                           navigation.state.params.dispatchAction({type: typeAction.keyTabButtomShowOrHidden, isShowMenu: true})
                           navigation.goBack()
                        }}
                        style={{width: 50, height: Platform.OS == 'ios' ? 45:55,  backgroundColor:'transparent', marginTop: Platform.OS == 'ios' ? 15:0, flexDirection:'column', justifyContent:'center'}}>
                        <Image source = {icon_back} style={{width: 19, height: 11, marginLeft: 10,}}/>
                    </TouchableOpacity>
                    <View style={{width: width - 65, height: Platform.OS == 'ios' ? 65:55,  flexDirection:'column', backgroundColor:'#C2C2C2', alignItems: 'center'}}>
                    <Text
                        numberOfLines = {1}
                        style={{flex: 1, textAlign:'center', marginTop: Platform.OS == 'ios' ? 30:0, fontSize: 18, fontWeight:'bold', color:'#0062FF'}}>{navigation.state.params.tenNganhNhomSanPham}</Text>
                    <View style = {{width: width - 55, height:1, backgroundColor:'#D8D8D8'}}/>
                </View>
                    {/* <View style={{width: width, height: Platform.OS == 'ios' ? 65:55,backgroundColor:'#C2C2C2', flexDirection:'row'}}>
                        <IconVector name="md-search" size={25} color="#BEB8B8" style={{ marginTop: Platform.OS == 'ios' ? 27: 15, position:'absolute', marginLeft: 60, zIndex:1, backgroundColor:'transparent'}}/>
                        <TextInput style={{textAlign:'center', backgroundColor:'white', width: width - 75,  height: 35, marginTop: Platform.OS == 'ios' ? 22.5: 10, marginLeft: 5, borderRadius: 5, paddingBottom:Platform.OS == 'ios' ? 0:4.5, paddingLeft: 35, paddingRight:15}}
                            placeholder = {navigation.state.params.tenNganhNhomSanPham}
                            placeholderTextColor = '#BEB8B8'
                            underlineColorAndroid = 'transparent'
                        >
                        </TextInput>
                    </View> */}
                    
                </View>
                
                <FlatList 
                    data = {navigation.state.params.danhSachSanPham}
                    renderItem = {(item) => <ItemSanPhamTheoNhom itemsObject = {item} navigate = {navigation.navigate}/>}
                    keyExtractor = {(items) => items.idSanPham}
                    showsHorizontalScrollIndicator = {false}
                    showsVerticalScrollIndicator = {false}
                    numColumns = {2}
                />
            </View>
        )
    }

}