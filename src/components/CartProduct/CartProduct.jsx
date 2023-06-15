import React, { useEffect, useState } from 'react'
import './CartProduct.scss'
import { NavLink } from 'react-router-dom'
import borderHeart from '../../assets/imgs/borderHeart.svg'
import fullHeart from '../../assets/imgs/fullHeart.svg'
import { getLocalStorage } from '../../utils/LocalStorage/LocalStorage'
import { ACCESS_TOKEN } from '../../contants'
import axios from 'axios'
import { useSelector } from 'react-redux'



function CartProduct(props) {

    const { product, listFavor } = props;
    const [isImageChanged, setIsImageChanged] = useState(borderHeart);
    const [isFavor, setFavor] = useState(false);
    const { favoriteList } = useSelector(state => state.UserReducer)

    useEffect(() => {
        if (favoriteList?.find((favorite) => favorite.id === product.id)) {
            setFavor(true);
            setIsImageChanged(fullHeart);
        } else {
            setFavor(false);
            setIsImageChanged(borderHeart);
        }
    }, [favoriteList]);

    const handleFavorite = async (link) => {
        try {
            await axios({
                method: 'get',
                url: link,
                headers: {
                    Authorization: `Bearer ${getLocalStorage(ACCESS_TOKEN)}`,
                }
            })
        } catch (err) {
            console.log(err)
        }
    };

    const handleChangeFavorite = (id) => {
        if (!isFavor) {
            handleFavorite(`https://shop.cyberlearn.vn/api/Users/like?productId=${id}`);
            setIsImageChanged(fullHeart);
            setFavor(true);
        } else {
            handleFavorite(`https://shop.cyberlearn.vn/api/Users/unlike?productId=${id}`);
            setIsImageChanged(borderHeart);
            setFavor(false);
        }
    }

    return (
        <div className='card-product'>
            <img className='fullHeart' src={isImageChanged} alt="" onClick={() => { handleChangeFavorite(product.id) }} />
            <div className="card-product-img">
                <img src={product.image} alt="" />
            </div>
            <div className="card-product-content">
                <h3 className='content.title'>{product.name}</h3>
                <p className='content.sub'>{product.shortDescription}</p>
            </div>
            <div className="card-product-interact ">
                <NavLink to={`/detail/${product.id}`} className='card-product-btn buy-now'>Buy now</NavLink>
                <button className='card-product-btn price'>{product.price ? product.price : '$$'}$</button>
            </div>
        </div>
    )
}

export default CartProduct