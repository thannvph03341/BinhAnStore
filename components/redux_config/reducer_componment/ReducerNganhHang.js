import {Component} from 'react'
import typeAction from '../type_action/KeyAction'
import keyStore from '../type_action/KeyAsynStore'
import {AsyncStorage, } from 'react-native'
import stateDefault from '../default_data/DefaultState'

const GetNganhNhomSanPham = (state = stateDefault.nganhNhomSanPham , action) => {
    if (action.type === typeAction.getNganhNhomSanPham){
        AsyncStorage.getItem(keystore.dmKhachHang, (error, result) => {
                if (error == null && result != null){
                    const {idKhachHang} = JSON.parse(result) 
                    const data = funcGetNganhNhomSanPham({
                                                idKhachHang: idKhachHang,
                                                pageNganh: 1,
                                                pageNhom: 1,
                                                pageSanPham:1,
                                                pageSize: 6
                                            })
                    return data

                } else {
                    console.log(error)
                    return state
                }
            })
    }
    return state
}

const funcGetNganhNhomSanPham = (dataGet) => {
    // let request = await fetch(`${apiGetNganhNhomSanPham.apiGetNganhNhomSanPham}idKhachHang=${dataGet.idKhachHang}&pageNganh=${dataGet.pageNganh}&pageNhom=${dataGet.pageNhom}&pageSanPham=${dataGet.pageSanPham}&pageSize=${dataGet.pageSize}`)
    // let obDataNganhNhomSanPham = await request.json()
    // // console.log(obDataNganhNhomSanPham)
      let request = fetch(`${apiGetNganhNhomSanPham.apiGetNganhNhomSanPham}idKhachHang=${dataGet.idKhachHang}&pageNganh=${dataGet.pageNganh}&pageNhom=${dataGet.pageNhom}&pageSanPham=${dataGet.pageSanPham}&pageSize=${dataGet.pageSize}`)
      .then((response) => response.json()).then((data) => data).catch((error) => {
          console.log(error)
      })

    // return obDataNganhNhomSanPham[0]
}

export default GetNganhNhomSanPham