import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    Platform
} from 'react-native'
import ItemThongBao from './component_thong_bao/ItemThongBao'
import TabMenuBottom from '../navigation_comoponent/tab_menu_bottom/MenuTabMenuBottom' 
import {connect} from 'react-redux'
import typeAction from '../redux_config/type_action/KeyAction'
const {width, height} = Dimensions.get('screen')

class ThongBao extends Component {

    
    constructor(props){
        super(props)
        this.state = {
            showTabThongBao: false
        }
    }

    componentWillReceiveProps(nextProps){
        const {showTab} = nextProps
        if (showTab === typeAction.tabThongBao){
            this.setState({
                showTabThongBao: true
            })
        } else {
            this.setState({
                showTabThongBao: false
            })
        }
    }

    render(){
        return(
           <View style={{width: this.state.showTabThongBao ? width: 0, height: this.state.showTabThongBao ? height - 60 :0, backgroundColor:'#C2C2C2', position: this.state.showTabThongBao ?  'absolute':'relative', opacity: this.state.showTabThongBao ? 1 : 0}}>
            <View style={{width: width, height: Platform.OS == 'ios' ? 65:55,  flexDirection:'column', backgroundColor:'#C2C2C2', alignItems: 'center'}}>
                    <Text
                        numberOfLines = {1}
                        style={{flex: 1, textAlign:'center', marginTop: Platform.OS == 'ios' ? 30:0, fontSize: 18, fontWeight:'bold', color:'#0062FF'}}>Thông báo</Text>
                    <View style = {{width, height:1, backgroundColor:'#D8D8D8'}}/>
            </View>
            <FlatList
                data = {[{id:0, noiDung:'Thông báo: Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo '},
                {id:1, noiDung:'Thông báo: Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo '},
                {id:2, noiDung:'Thông báo: Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo '},
                {id:3, noiDung:'Thông báo: Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo '},
                {id:4, noiDung:'Thông báo: Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo '},
                {id:5, noiDung:'Thông báo: Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo '},
                {id:6, noiDung:'Thông báo: Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo '},
                {id:7, noiDung:'Thông báo: Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo '},
                {id:8, noiDung:'Thông báo: Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo Thông báo '}]}
                showsHorizontalScrollIndicator = {false}
                showsVerticalScrollIndicator = {false}
                keyExtractor = {(items) => items.id}
                initialNumToRender = {1}
                renderItem = {(item) => <ItemThongBao objectThongBao = {item}/>}

            />
           </View>
        )
    }
} 

function getDataThongBao(state){
    const {showTabClick} = state
    return {
        showTab: showTabClick.keyTab,
    }
}
export default connect(getDataThongBao)(ThongBao)
