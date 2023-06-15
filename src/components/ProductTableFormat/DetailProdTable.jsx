import React from 'react'
import './tableFormat.scss'


//----------------------------------------------------

function DetailProdTable(props) {
    const {item } = props
    const {id, count, image, price, name} = props.shoe

    return (
        <tr className='row_detail_prod'>
            <td className='td_id'>{item.id}</td>
            <td className='td_img'><img src={image} alt={`...${name}`}/></td>
            <td className='td_name'>{name}</td>
            <td>{price} $</td>
        </tr>
    )
}

export default DetailProdTable