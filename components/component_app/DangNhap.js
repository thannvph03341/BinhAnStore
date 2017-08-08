import React,{Component} from 'react'
import {
    View,
    TextInput,
    Image,
    Dimensions,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    Platform,
    AsyncStorage,
    Alert,
    ActivityIndicator,
    Keyboard
} from 'react-native'
import logo_binh_an from '../../assets/image/logo_binh_an.png'
import MainNatvigationComponent from '../navigation_comoponent/MainNatvigationComponent'
import keyStore from '../redux_config/type_action/KeyAsynStore'
import hostApi from '../../func/HostApi'
import {connect} from 'react-redux'

const {width, height} = Dimensions.get('screen')


class DangNhap extends Component{


    componentWillMount(){
        this.funcLogin({
                        "userName": "xiaomi90",
                        "passWord":"1234"
                    })
    }

    

    constructor(props){
        super(props) 
        this.state = {
            isLoginStatus: false, // sửa lại false để hiện đăng nhâppj
            userName:'',
            passWord: '',
            isLoadding: false
        }    
    }


   async funcLogin(dataLogin){

        Keyboard.dismiss()

        try {
            if (dataLogin.userName == '' || dataLogin.passWord == ''){
                return Alert.alert('Thông Báo', 'Vui lòng nhập tài khoản & mật khẩu !', [{title: 'OK'}])
            }

            this.setState({
                isLoadding: true
            })

            let requestLogin = await fetch(hostApi.apiDangNhapPost,{
                method: 'POST',
                headers: {
                'accept': 'application/json;charset=UTF-8',
                'content-type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(dataLogin)
            })

            let obKhachHang = await requestLogin.json()

            this.setState({
                    isLoadding: false
                })

            if (obKhachHang.success == false){
                return Alert.alert('Thông Báo', obKhachHang.responseText, [{title: 'OK'}])
            }
            ///
            if (obKhachHang.Trangthaicongno == 1){
                AsyncStorage.setItem(keyStore.dmKhachHang, JSON.stringify(obKhachHang), (error) => {
                    if (error != null){
                        return Alert.alert('Thông Báo', 'Đăng nhập không thành công! vui lòng thử lại!', [{title: 'OK'}])
                    } else {
                        this.setState({
                            isLoginStatus:true
                        })
                    }
                } )
            } else {
                return Alert.alert('Thông Báo', 'Tài khoản đã bị khoá! Vui lòng liên hệ với quản trị viên!', [{title: 'OK'}])
            }
        } catch (error) {
            return Alert.alert('Thông Báo', 'Đăng nhập không thành công! vui lòng thử lại!', [{title: 'OK'}])
        }

    }

    componentWillReceiveProps(nextProps){
        const {dangXuat} = nextProps
       
        if (dangXuat) {
            this.setState({
                isLoadding: false,
                isLoginStatus: false
            })
        }
    }


    render(){

        if (this.state.isLoginStatus){
            return(
                <View style={{flex:1, flexDirection:'column'}}>
                    <MainNatvigationComponent />
                </View>
            )
        } else {

                return(
                    <View style={{flex: 1, flexDirection:'column', justifyContent:'center', alignItems:'center', backgroundColor:'#C2C2C2'}}>
                        <KeyboardAvoidingView behavior = 'padding' style={{flex: 1, flexDirection:'column', justifyContent:'center', alignItems:'center', backgroundColor:'transparent'}}>
                            <Image source = {logo_binh_an}
                                style = {{width: 150, height: 150, marginTop: 80}}
                            />
                            <View style={{flex:1, flexDirection: 'column', justifyContent:'flex-start', alignItems:'center', marginTop: 80}}>
                                <TextInput 
                                    ref = {(txtUser) => this.txtUser = txtUser}
                                    placeholder = 'Tên đăng nhập'
                                    placeholderTextColor = '#BEB8B8'
                                    underlineColorAndroid = 'transparent'
                                    returnKeyType = 'done'
                                    editable = {!this.state.isLoadding}
                                    onChangeText = {(v) => {
                                        this.setState({
                                            userName: v
                                        })
                                    }}
                                    style = {{width: width - 100, height: 45, backgroundColor:'#FFF', borderColor:'#C11408', borderWidth: 1.5, borderRadius: 20, textAlign:'center', paddingBottom: Platform.OS == 'ios' ? 0: 4.3 }}
                                />
                                <TextInput 
                                    ref = {(txtPasswork) => this.txtPasswork = txtPasswork}
                                    underlineColorAndroid = 'transparent'
                                    placeholderTextColor = '#BEB8B8'
                                    placeholder = 'Mật khẩu'
                                    returnKeyType = 'done'
                                    editable = {!this.state.isLoadding}
                                    secureTextEntry = {true}
                                    onChangeText = {(v) => {
                                        this.setState({
                                            passWord: v
                                        })
                                    }}
                                    style = {{width: width - 100, height: 45, backgroundColor:'#FFF', borderColor:'#C11408', borderWidth: 1.5, borderRadius: 20, marginTop: 10, textAlign:'center', paddingBottom: Platform.OS == 'ios' ? 0: 4.3 }}
                                />
                                {
                                    this.state.isLoadding ? 
                                    <ActivityIndicator
                                        animating={this.state.isLoadding}
                                        size="large"
                                        color='#ff246d'
                                        style = {{width: width - 100, height: 45, backgroundColor:'#FFF', borderColor:'#C11408', borderWidth: 1.5, borderRadius: 20, flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop: 10}}
                                    /> : <TouchableOpacity
                                            onPress = {() => {
                                                this.funcLogin({userName: this.state.userName, passWord: this.state.passWord})
                                            }}
                                            style = {{width: width - 100, height: 45, backgroundColor:'#FFF', borderColor:'#C11408', borderWidth: 1.5, borderRadius: 20, flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop: 10}}
                                        >
                                            <Text style={{color:'#C11408', backgroundColor:'transparent', fontSize: 18, }}>Đăng Nhập</Text>
                                        </TouchableOpacity>
                                }
                                
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                )
            }
        }
}

function getDataDangNhap(state) {
    const {dangXuat} = state
    
    return {
        dangXuat: dangXuat
    }
}
export default connect(getDataDangNhap)(DangNhap)