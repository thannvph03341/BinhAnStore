import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet, 
    TouchableOpacity,
    Dimensions, 
    Platform,
    FlatList
} from 'react-native'
const {width, height} = Dimensions.get('window')

import {connect} from 'react-redux'
import ItesCap2MenuSlider from './ItemCap2MenuSlider'
import typeAction from '../redux_config/type_action/KeyAction'

class ItesCap1MenuSlider extends Component {

    constructor(props){
        super(props)
        this.state = {
            dataMenuCap2: [],
            textViewMenu: '+',
            colorSelect: '#000',
            nganhChon: null
        }
    }

    componentWillReceiveProps(nextProps){
         const {indexMenuSelect} = nextProps
         if (indexMenuSelect != this.state.nganhChon){
                this.setState({
                dataMenuCap2: [],
                textViewMenu: '+',
                colorSelect: '#000',
                nganhChon: null
            })
         }
    }

    render(){
        const {objectItem} = this.props
            //console.log(objectItem)
        return(
          <View style = {{flex:1, backgroundColor: 'transparent', flexDirection: 'column', }}>
              <TouchableOpacity 
                onPress = {()=>{
                   
                        if (this.state.textViewMenu === '+' && this.state.dataMenuCap2.length == 0) {
                            this.setState({
                                dataMenuCap2: objectItem.item.danhSachNhom,
                                textViewMenu: '-',
                                colorSelect: '#D0021B',
                                nganhChon: objectItem.item.idNganhSanPham
                            })

                            this.props.dispatch({
                                type: typeAction.keyMenuSliderSelect,
                                itemMenuSelect: objectItem.item.idNganhSanPham
                            })  
                            this.props.dispatch({type: typeAction.indexMenuNganhSelect, items: objectItem})
                        } else {
                            this.setState({
                                dataMenuCap2: [],
                                textViewMenu: '+',
                                colorSelect: '#000',
                                nganhChon:null
                            })
                        }
                    
                }}
                style={{flex:1, height: 55,  backgroundColor: 'transparent', flexDirection:'column', justifyContent:'center', borderColor:'#C2C2C2', borderWidth:1,}}>
                    <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>         
                            <Text
                                numberOfLines = {1}
                                style = {{width: width - 150, marginLeft:5, color:this.state.colorSelect}}>
                                {objectItem.item.tenNganhSanPham}
                            </Text>
                            <Text
                                numberOfLines = {1}
                                style = {{width: 10, marginLeft:5,textAlign:'center'}}>
                                {this.state.textViewMenu}
                            </Text>
                    </View>
              </TouchableOpacity>
              <View style={{flex:1}}>
                    <FlatList
                        data = {this.state.dataMenuCap2}
                        renderItem = {({item}) => <ItesCap2MenuSlider objectItem = {item}/>}
                        keyExtractor = {(items) => items.idNganhNhomSanPham}
                        initialNumToRender = {0}
                    />
              </View>
          </View>
        )
    }

} 


function getItemMenuSliderSelect(state){

    return {
        itemMenuSelect: state.indexMenuSelect
    }
}

export default connect(getItemMenuSliderSelect)(ItesCap1MenuSlider)
