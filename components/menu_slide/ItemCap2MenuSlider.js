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
} from 'react-native'

import typeDefault from '../redux_config/type_action/KeyAction'

const {width, height} = Dimensions.get('window')
const {UIManager} = NativeModules

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

import {connect} from 'react-redux'

class ItesCap2MenuSlider extends Component {

    componentWillMount(){
       Platform.OS === 'ios' ?  LayoutAnimation.spring():null
    }

    constructor(props){
        super(props)
        this.state = {
            colorSelect:'#000',
            _disabled: false
        }
    }

    componentWillReceiveProps(nextProps){
        const {isDisabled} = nextProps
        if (isDisabled) {
            this.setState({_disabled: false})
        } 
    }


    render(){
        
        const {objectItem} = this.props
        
        return(
          <View style = {{flex:1, backgroundColor: 'transparent', flexDirection: 'column', }}>
              <TouchableOpacity 
                disabled = {this.state._disabled}
                onPress = {()=>{
                    if (this.state.colorSelect === '#000'){
                        this.setState({
                            colorSelect: '#D0021B',
                            _disabled:false
                        })
                    } else {
                        this.setState({
                            colorSelect: '#000',
                            _disabled:false
                        })
                    }
                    this.props.dispatch({
                        type: typeDefault.keyMenuClickShow,
                        showMenu:false
                    })
                    this.props.dispatch({
                        type: typeDefault.keyShowSanPhamTrongNhomTuMenu, danhSachSanPham: objectItem.danhSachSanPham, tenNganhNhomSanPham: objectItem.tenNganhNhomSanPham
                    })
                }}
                style={{flex:1, height: 55,  backgroundColor: 'transparent', flexDirection:'column', justifyContent:'center', borderColor:'#C2C2C2', borderWidth:1, marginLeft: 15}}>
                    <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>         
                            <Text
                                numberOfLines = {1}
                                style = {{flex: 1, marginLeft:5, marginRight: 5, color: this.state.colorSelect}}>
                                 {objectItem.tenNganhNhomSanPham} 
                            </Text>
                    </View>
              </TouchableOpacity>
          </View>
        )
    }

} 
function getItemMenuSliderSelect(state){
    const {indexMenuSelect, tabMenuBottom} = state
   // console.log(state)

    return {
        itemMenuSelect: indexMenuSelect,
        isDisabled: tabMenuBottom
    }
}

export default connect(getItemMenuSliderSelect)(ItesCap2MenuSlider)




