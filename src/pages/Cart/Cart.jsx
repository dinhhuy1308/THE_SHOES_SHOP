import React from 'react'
import TableCart from '../../components/TableCart/TableCart'
import { ACCESS_TOKEN } from '../../contants'
import { getLocalStorage } from '../../utils/LocalStorage/LocalStorage';
import Login from '../Login/Login';

function Cart() {
    return (
        <>
            {getLocalStorage(ACCESS_TOKEN) ? (<div><TableCart /></div>) : <Login />}
        </>
    )
}

export default Cart