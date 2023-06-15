import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../CartProduct/CartProduct'
import { getLocalStorage } from '../../utils/LocalStorage/LocalStorage';
import { ACCESS_TOKEN } from '../../contants';
import axios from 'axios';
import './ListProduct.scss'

function ListProduct() {
    const { listProduct } = useSelector(state => state.ListProductReducer)
    const [listFavorite, setListFavorite] = useState([]);

    const getListFavorite = async () => {
        try {
            const resp = await axios({
                method: 'get',
                url: 'https://shop.cyberlearn.vn/api/Users/getproductfavorite',
                headers: {
                    Authorization: `Bearer ${getLocalStorage(ACCESS_TOKEN)}`,
                }
            });
            setListFavorite(resp.data.content.productsFavorite)
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        getListFavorite()
    }, []);

    return (
        <div className='row row-list-product' style={{ marginLeft: 99 }}>
            {listProduct.map((product) => {
                return (
                    <div className=' col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4' key={product.id}>
                        <CartProduct product={product} listFavor={listFavorite} />
                    </div>
                )
            })}
        </div>
    )
}

export default ListProduct