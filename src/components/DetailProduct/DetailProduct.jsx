import React, { useEffect, useState } from 'react'
import './DetailProduct.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { setListProductCart } from '../../redux/slices/Product';
import Swal from 'sweetalert2'

function DetailProduct() {
    const { productDetail, listProductCart } = useSelector(state => state.ListProductReducer);
    const [count, setCount] = useState(0);
    const params = useParams();
    const dispatch = useDispatch()
    
    const handleChangeCount = (value) => {
        if(count + value >= 0) {
            setCount(count + value)
        }
    }
    
    const addToCart = () => {
        if(count === 0) {
            Swal.fire(
                'Please choose the quantity you want to buy',
                '',
                'question'
            )
            setTimeout(() => {
                Swal.close();
            }, 1500);
        } else {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Add to cart success',
                showConfirmButton: false,
                timer: 1500
            })
            const action = setListProductCart({...productDetail, number: count});
            dispatch(action)
        }
    }
    
    useEffect(()=>{
        const product =  listProductCart.find((item) => item.id === Number(params.productID))
        setCount(product ? product.number : 0)

    },[params.productID])

    

    return (
        <div className='detail-product row '>
            <div className="detail-product-left col-12  col-lg-4" >
                <img src={productDetail.image} alt="" />
            </div>
            <div className="detail-product-right col-12   col-lg-8">
                <h2>{productDetail.name}</h2>
                <p>{productDetail.description}</p>
                <h3>Available size</h3>
                {productDetail.size?.map((item, index) => {
                    return (
                        <button className='btn-size' key={index}>{item}</button>
                    )
                })}
                <span className='detail-price'>{productDetail.price}$</span>
                <div >
                    <button className='btn-quantity' onClick={() => { handleChangeCount(1) }}>+</button>
                    <span>{count}</span>
                    <button className='btn-quantity' onClick={() => { handleChangeCount(-1) }}>-</button>
                </div>
                <button className='add-cart' onClick={addToCart}>Add to cart</button>
            </div>
        </div>
    )

}

export default DetailProduct