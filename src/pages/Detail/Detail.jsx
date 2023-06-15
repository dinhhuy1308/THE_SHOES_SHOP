import React, { useEffect } from 'react'
import './Detail.scss'
import DetailProduct from '../../components/DetailProduct/DetailProduct'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProducDetail } from '../../redux/slices/Product'
import CartProduct from '../../components/CartProduct/CartProduct'


function Detail() {
    const params = useParams();
    const dispatch = useDispatch()
    const {productDetail} = useSelector(state => state.ListProductReducer)


    const getProductById = async (id) => {
        try {
            const resp = await axios ({
                url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
                method: 'get',
            })
            dispatch(setProducDetail(resp.data.content))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getProductById(params.productID)
    },[params.productID])

    return (
        <div>
            <DetailProduct />
            <h3 className='relate-product'>- Relate Product -</h3>
            <div className='row row-list-product' style={{marginLeft:'8.4rem',marginBottom:'10.6rem'}}>
            {productDetail.relatedProducts?.map((product) => {
                return (
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4' key={product.id}>
                        <CartProduct product={product}/>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default Detail