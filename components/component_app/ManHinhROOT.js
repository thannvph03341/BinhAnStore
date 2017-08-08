import React,{Component} from 'react'
import {
    View
} from 'react-native'
import TrangChu from '../component_app/TrangChu'
import ThongBao from '../component_app/TrangThongBao'
import GioHang from '../component_app/GioHang'
import CaiDat from '../component_app/CaiDat'
export default class ManHinhROOT extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props)

    }
    
    render(){
        const { navigation } = this.props
        return(
            <View style={{flex:1, backgroundColor:'#C2C2C2'}}>
                    <TrangChu navigation={navigation}/>
                    <ThongBao navigation={navigation}/>
                    <GioHang navigation={navigation}/>
                    <CaiDat navigation={navigation}/>  
            </View>
        )
    }
}