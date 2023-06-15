import React from 'react'
import { Divider, Radio, Space, Table } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TableCart.scss'
import { deleteProduct, setChangeQuantity } from '../../redux/slices/Product';
import Swal from 'sweetalert2'
import axios from 'axios';

const { Column } = Table


function TableCart() {
    const { listProductCart } = useSelector(state => state.ListProductReducer)
    const dispatch = useDispatch();
    const [listBuy, setListBuy] = useState([]);
    const { userProfile } = useSelector(state => state.UserReducer);

    const sweetDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            width: 500,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProduct(id))
                Swal.fire(
                    'Deleted!',
                    'The product has been deleted.',
                    'success',
                )
                setTimeout(() => {
                    Swal.close();
                }, 1500);
            }
        })
    }

    const handleChangeQuantity = (id, count, value) => {
        if (count + value > 0) {
            const action = setChangeQuantity({ id, value })
            dispatch(action)
        } else {
            sweetDelete(id)
        }
    }

    const handleSubmitOrder = async () => {
        if (listBuy.length === 0) {
            return
        }


        try {
            const list = listBuy.map(item => ({
                productId: item.id,
                quantity: item.number,
            }));

            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, buy it!'
            });

            if (result.isConfirmed) {
                await axios.post('https://shop.cyberlearn.vn/api/Users/order', {
                    orderDetail: list,
                    email: userProfile.email,
                });
                list.forEach(item => {
                    dispatch(deleteProduct(item.productId))
                });
                Swal.fire(
                    'Success!',
                    'You have successfully placed your order.',
                    'success'
                );
                setTimeout(() => {
                    Swal.close()
                }, 1500)
            }
        } catch (err) {
            console.log(err)
        }
    }


    const rowSelection = {
        onChange: (_, selectedRows) => {
            // Table;
            setListBuy(selectedRows)
        }
    };

    return (
        <div className="">
            <div className='table table-wrapper'>
                <Table dataSource={listProductCart}
                    rowKey={"id"}
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}>

                    <Column title="ID" dataIndex="id" align='center' />
                    <Column title="IMAGE" dataIndex="image" align='center'
                        render={(_, product) => (
                            <img height={50} width={60} src={product.image} alt="..." />
                        )}
                    />
                    <Column title="NAME" dataIndex="name" />
                    <Column title="PRICE" dataIndex="price" align='center'
                        render={(_, product) => (
                            <>{product.price}$</>
                        )}
                    />
                    <Column title="QUANTITY" dataIndex="number" align='center'
                        render={(_, product) => (
                            <Space size={'middle'}>
                                <button className='btn-quantity' onClick={() => handleChangeQuantity(product.id, product.number, 1)}>+</button>
                                <span className='cart-quantity'> {product.number}</span>
                                <button className='btn-quantity' onClick={() => handleChangeQuantity(product.id, product.number, -1)}>-</button>
                            </Space>
                        )}
                    />
                    <Column title="TOTAL" dataIndex="total" align='center'
                        render={(_, product) => (
                            <>{product.price * product.number}$</>
                        )}
                    />
                    <Column title="Action" key="action" align='center'
                        render={(_, product) => (
                            <>
                                <button className='btn-delete' onClick={() => sweetDelete(product.id)}>DELETE</button>
                            </>
                        )}
                    />

                </Table>
                <div className='d-flex justify-content-end'>
                    <button className='submit-order' onClick={handleSubmitOrder}>submit order</button>
                </div>

            </div>
        </div>
    );
}

export default TableCart