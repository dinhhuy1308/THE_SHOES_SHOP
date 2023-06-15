import { Empty, Select } from 'antd';
import axios from 'axios';
import _, { values } from 'lodash';
import React, { useEffect, useState } from 'react';
import './SearchProduct.scss';
import CartProduct from '../CartProduct/CartProduct';
import { getLocalStorage } from '../../utils/LocalStorage/LocalStorage';
import { ACCESS_TOKEN } from '../../contants';

const option = [
    {
        value: 'decrease',
        label: 'Decrease',
    },
    {
        value: 'ascending',
        label: 'Ascending',
    },
];


function SearchProduct() {
    const [key, setKey] = useState();
    const [listProductSearch, setListProductSearch] = useState([]);

    const handleChangeKey = (e) => {
        setKey(e.target.value.trim().replace(/\s/g, ''))
    }

    const handleSearch = async () => {
        if (key !== '') {
            const resp = await axios.get(`https://shop.cyberlearn.vn/api/Product?keyword=${key}`)
            setListProductSearch(resp.data.content)
        } else {
            setListProductSearch([])
        }
    }

    const isHandleEmpty = () => {
        if (listProductSearch.length > 0) {
            return <div className="row row-search" style={{ marginLeft: '8.4rem', marginBottom: '10.6rem' }}>
                {listProductSearch.map((product) => {
                    return (
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4" key={product.id} >
                            <CartProduct product={product} />
                        </div>
                    )
                })}
            </div>
        } else {
            return <Empty />
        }
    }

    const handleSortByPrice = (value) => {
        if (value === 'ascending') {
            const result = _.sortBy(listProductSearch, [item => item.price])
            setListProductSearch(result)
        } else {
            const result = _.reverse(_.sortBy(listProductSearch, [item => item.price]))
            setListProductSearch(result)
        }
    }

    return (
        <>
            <p className='search-text'>Search</p>
            <div className='search-product'>
                <input onChange={handleChangeKey} type="text" className='input-search' placeholder='product name ...' />
                <button onClick={handleSearch} className='btn-search' >search</button>
            </div>
            <h1 >Search result</h1>
            <div className="search-result">
                <p>Price</p>
                <Select className='input-filter'
                    defaultValue="Filter"
                    style={{
                        width: 445,
                    }}
                    placeholder={'Filter'}
                    options={option}
                    onChange={handleSortByPrice}
                />
            </div>
            {isHandleEmpty()}
        </>
    )
}




export default SearchProduct