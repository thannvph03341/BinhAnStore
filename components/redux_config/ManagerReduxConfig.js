import {createStore, combineReducers} from 'redux'
import defaultState from './default_data/DefaultState'
import showTabClick from './reducer_componment/ReducerTabMenuBottom'
import itemsClickSelect from './reducer_componment/ReducerMenuNganh'
import itemMenuSliderSelect from './reducer_componment/ReducerMenuSlider'
import showMenuSliderRender from './reducer_componment/ReducerShowMenuSlider'
import trangChuRender from './reducer_componment/ReducerTrangChu'
import caiDatRender from './reducer_componment/RenducerCaiDat'
import tabMenuBottoms from './reducer_componment/ReducerMenuTabBottomShowOrHidden'
import getNganhNhomSanPham from './reducer_componment/ReducerNganhHang'
import ShowSanPhamTrongNhom from './reducer_componment/ReducerShowSanPhamTrongNhom'
import ShowSanPhamTrongNhomMenuSlider from './reducer_componment/ReducerShowSanPhamTheoNhomMenuSlide'
import DangXuat from './reducer_componment/ReducerDangXuat'

//mỗi một reducer cho một componment

const reducer = combineReducers({
   showTabClick: showTabClick,
   itemsClickSelect: itemsClickSelect,
   indexMenuSelect: itemMenuSliderSelect,
   showMenu: showMenuSliderRender,
   trangChuRenders: trangChuRender,
   caiDatRenders: caiDatRender,
   tabMenuBottom: tabMenuBottoms,
   nganhNhomSanPham: getNganhNhomSanPham,
   showSanPhamTrongNhom: ShowSanPhamTrongNhom,
   showSanPhamTrongNhomMenuSlider: ShowSanPhamTrongNhomMenuSlider,
   dangXuat: DangXuat,
})

const store = createStore(reducer)

export default store;