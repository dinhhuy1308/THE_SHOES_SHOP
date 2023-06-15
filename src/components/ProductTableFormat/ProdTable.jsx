import React, { useState } from 'react'
import DetailProdTable from './DetailProdTable'
import './tableFormat.scss'


//----------------------------------------------------

function ProdTable(props) {
    const { orderDetail, date } = props.item;

    return (
        <>
            <div className="prod_table">
                <p className='status_table'>{`+ Orders have been placed on ${date}`}</p>
                <div className='table-wrapper'>
                    <table>
                        <thead>
                            <tr className='table-row'>
                                <th className='td_id'>Id</th>
                                <th className='td_img'>Image</th>
                                <th className='td_name'>Name</th>
                                <th className='td_price'>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetail.map((item, index) => {
                                return <DetailProdTable key={index} shoe={item} item={props.item} />
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}

export default ProdTable