import React, { useEffect } from 'react'
import './Home.scss'
import CarouselHome from '../../components/CarouselHome/CarouselHome'
import ListProduct from '../../components/ListProduct/ListProduct'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setListProduct } from '../../redux/slices/Product'


function Home() {
    const dispatch = useDispatch()

    const getListProduct = async () => {
        try {
            const resp = await axios({
                url: 'https://shop.cyberlearn.vn/api/Product',
                method: 'get',
            })
            dispatch(setListProduct(resp.data.content))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getListProduct()
    },[])

    return (
        <div>
            <CarouselHome />
            <h2 className='product-feature'>Product Feature</h2>
            <ListProduct />
        </div>
    )
}

export default Home