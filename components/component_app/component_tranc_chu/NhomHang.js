import React,{ Component } from 'react'
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    ActivityIndicator
} from 'react-native'
import ItemRenderNhomHang from './ItemNhomHang'
import {connect} from 'react-redux'

class NhomHang extends Component{
    

    constructor(props){
        super(props)
        this.state = {
            isLoadData: false,
           
        }
        
        setTimeout(()=>{
            this.setState({
                isLoadData: true,
            })
        }, 50)

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoadData: false,
           
        })
        
        setTimeout(()=>{
            this.setState({
                isLoadData: true,
            })
        }, 50)
    }




    render(){
        const {dataNhom, navigation} = this.props
        // console.log(this.state.isLoadData)
        return(
            <View style = {{flex:1, backgroundColor:'transparent', flexDirection:'column', justifyContent:'center', alignContent:'center'}}>
                  {this.state.isLoadData ? <FlatList
                    style={{backgroundColor:'#FFF'}}
                    data = {dataNhom.danhSachNhom}
                    renderItem = {(item) => <ItemRenderNhomHang itemsObject = {item} navigation={navigation}/>}
                    keyExtractor = {(item) => item.idNganhNhomSanPham}
                    showsHorizontalScrollIndicator = {false}
                    showsVerticalScrollIndicator = {false}
                    initialNumToRender = {0}
                />: <ActivityIndicator 
                    size = 'large'
                    color = 'blue'
                    animating = {true}
                    style = {{flex:1, flexDirection:'column', justifyContent:'center', backgroundColor:'transparent'}}
                /> } 
            </View>
        )
    }
}

function getItemShow(state){

    const {index, item} = state.itemsClickSelect
     //console.log(item)
    return {
        dataNhom: item,
        indexNhom: index
    };
}

export default connect(getItemShow)(NhomHang)