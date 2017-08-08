import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import store from './redux_config/ManagerReduxConfig'
import {Provider, connect} from 'react-redux'

import DangNhap from './component_app/DangNhap'

export default class MainComponent extends Component {

    render(){
        return(
           <Provider store = {store}>
                 {/* <MainNatvigationComponent /> */}
                <DangNhap/>
           </Provider>
        )
    }
} 

