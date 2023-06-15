import { createSlice } from '@reduxjs/toolkit'
import { saveLocalStogare } from '../../utils/LocalStorage/LocalStorage';

const listProductCart = JSON.parse(localStorage.getItem('listProductCart')) || [];
const historyOrderList = localStorage.getItem('historyArr') ? JSON.parse(localStorage.getItem('historyArr')) : [];

const initialState = {
    listProduct: [],
    productDetail: {},
    listProductCart: listProductCart,
    orderHistoryList: historyOrderList,
}

const ProductSlice = createSlice({
    name: 'ProductSlice',
    initialState,
    reducers: {
        setListProduct: (state, action) => {
            state.listProduct = action.payload
        },

        setProducDetail:(state, action) => {
            state.productDetail = action.payload
        },

        setHistoryOrder: (state, action) => {
            state.orderHistoryList.push(action.payload)

            localStorage.setItem('historyArr',
                JSON.stringify([...state.orderHistoryList, { list: action.payload.list, date: action.payload.date }]))
        },


        setListProductCart: (state, action) => {
            const indexById = state.listProductCart.findIndex((product) => product.id === action.payload.id);
            if (indexById === -1) {
                state.listProductCart.push(action.payload)
                console.log('indexById',indexById)
            } else {
                state.listProductCart[indexById] = action.payload
                console.log('indexById',indexById)
            }
            saveLocalStogare('listProductCart',state.listProductCart)
        },

        deleteProduct: (state, action) => {
            state.listProductCart = state.listProductCart.filter(product => product.id !== action.payload)
            saveLocalStogare('listProductCart',state.listProductCart)
        },

        setChangeQuantity: (state, action) => {
            const {id, value} = action.payload
            const index = state.listProductCart.findIndex(product => product.id === id)
            state.listProductCart[index].number += value;
            saveLocalStogare('listProductCart',state.listProductCart)
        }

    }
});

export const {setListProduct,setProducDetail,setListProductCart, setChangeQuantity,deleteProduct, setHistoryOrder} = ProductSlice.actions

export default ProductSlice.reducer