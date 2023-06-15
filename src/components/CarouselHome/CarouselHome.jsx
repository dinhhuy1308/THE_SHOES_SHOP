import React, { useRef } from 'react'
import './CarouselHome.scss'
import polygon1 from '../../assets/imgs/polygon1.svg'
import polygon2 from '../../assets/imgs/polygon2.svg'
import { Carousel } from 'antd';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


function CarouselHome() {

    const {listProduct} = useSelector(state => state.ListProductReducer)
    const carouselRef = useRef(null)

    return (
        <>
            <img className='polygon2' src={polygon2} onClick={()=>carouselRef.current.next()}  />
            <img className='polygon1' src={polygon1} onClick={()=>carouselRef.current.prev()}  />
            <Carousel  ref={carouselRef}  >
            {listProduct.map((product) => {
                return (
                    <div  key={product.id}>
                        <div className="row" >
                            <div className="col-lg-8 col-md-12 carousel-product" >
                                <img src={product.image} alt="" />
                            </div>
                            <div className="col-lg-4 col-md-12 carousel-content">
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <button>
                                    <NavLink to={`/detail/${product.id}`}>Buy Now</NavLink>
                                </button>
                            </div>
                        </div>
                    </div>

                )
            })}
            </Carousel>
        </>
    );
}

export default CarouselHome