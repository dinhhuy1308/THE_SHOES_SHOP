import React, { useEffect, useState } from 'react'
import './Profile.scss';
import './../register/register.scss';
import { Button, Empty, Space } from 'antd';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileThunk, profileFavoriteThunkAction } from '../../redux/slices/User';
import { getLocalStorage } from '../../utils/LocalStorage/LocalStorage';
import { ACCESS_TOKEN } from '../../contants';
import PaginationWrapper from '../../components/PaginationSetup/PaginationWrapper';
import Login from '../Login/Login';
import CartProduct from '../../components/CartProduct/CartProduct';






function Profile() {
    const dispatch = useDispatch();
    const { userProfile, favoriteList } = useSelector(state => state.UserReducer);
    const { avatar, name, email, gender, phone, ordersHistory, } = userProfile;
    const [change, setChange] = useState(false);


    const regex = {
        nameVietNam: /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/,
        number: /^\d+$/
    }


    const schema = Yup.object({
        name: Yup.string().required('Name can not be empty !').matches(regex.nameVietNam, 'Name cannot contain numbers !').min(4, 'Min is 4 characters !'),
        password: Yup.string().required('Password can not be empty !').min(4, 'Min is 4 characters !').max(12, 'Max is 12 characters !'),
        phone: Yup.string().required('Phone can not be empty !').matches(regex.number, 'Phone must be a number !'),
    })


    const formik = useFormik({
        initialValues: {
            email: email,
            password: '',
            name: '',
            phone: '',
            gender: gender,
        },

        validationSchema: schema,

        onSubmit: async (values) => {

            try {
                const resp = await axios({
                    url: 'https://shop.cyberlearn.vn/api/Users/updateProfile',
                    method: 'post',
                    data: { ...values, },
                    headers: {
                        Authorization: `Bearer ${getLocalStorage(ACCESS_TOKEN)}`,
                    }
                })
            } catch (err) {
                console.log(err)
            }
        }
    })


    useEffect(() => {
        dispatch(getProfileThunk())
    }, []);

    useEffect(() => {
        dispatch(profileFavoriteThunkAction())
    }, [change])

    return (
        <>
            {getLocalStorage(ACCESS_TOKEN) ? (
                <>
                    <div className="profile_title">
                        <p>Profile</p>
                    </div>
                    <div className="information_area">
                        <div className="left_detail">
                            <img src={avatar} alt="user" />
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="right_detail row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-right">
                                    <div className="form-group">
                                        <label className='label_form' htmlFor="email">Email :</label>
                                        <input disabled type="text" className='form-control input_form' placeholder='Email' id='email' name='email'
                                            value={userProfile.email}
                                        />
                                        {formik.errors.email && formik.touched.email && <p className='text-error'>{formik.errors.email}</p>}
                                    </div>
                                    <div className="form-group">
                                        <label className='label_form' htmlFor="phone">Phone :</label>
                                        <input type="text" className='form-control input_form' placeholder='Phone' id='phone' name='phone'
                                            {...formik.getFieldProps('phone')}
                                            value={formik.values.phone === '' && !formik.touched.phone ? phone : formik.values.phone}
                                        />
                                        {formik.errors.phone && formik.touched.phone && <p className='text-error'>{formik.errors.phone}</p>}
                                    </div>
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-right col-right-relative">
                                    <div className="form-group">
                                        <label className='label_form' htmlFor="name">Name :</label>
                                        <input type="text" className='form-control input_form' placeholder='Name' id='name' name='name'
                                            {...formik.getFieldProps('name')}
                                            value={formik.values.name === '' && !formik.touched.name ? name : formik.values.name}
                                        />
                                        {formik.errors.name && formik.touched.name && <p className='text-error'>{formik.errors.name}</p>}
                                    </div>
                                    <div className="form-group">
                                        <label className='label_form' htmlFor="password">Password :</label>
                                        <input type="text" className='form-control input_form' placeholder='Password' id='password' name='password'
                                            {...formik.getFieldProps('password')}
                                            value={formik.values.password === '' && !formik.touched.password ? '************' : formik.values.password}
                                        />
                                        {formik.errors.password && formik.touched.password && <p className='text-error'>{formik.errors.password}</p>}
                                    </div>
                                    <div >
                                        <div className="gender_choosen d-flex align-content-center">
                                            <p className='label_form lable_gender'>Gender: </p>
                                            <div className="form-check">
                                                <label className="form-check-label lable_radio label_form text-center" htmlFor="male">
                                                    <input className="form-check-input" type="radio" name="gender" id="male"
                                                        value={true}
                                                        checked={formik.values.gender === true ? true : gender}
                                                        onChange={() => { formik.setFieldValue('gender', true) }}
                                                    />
                                                    <span className="design"></span>
                                                    <span className='value_gender'>Male</span>
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label lable_radio label_form" htmlFor="female">
                                                    <input className="form-check-input" type="radio" name="gender" id="female"
                                                        value={false}
                                                        checked={formik.values.gender === false ? true : !gender}
                                                        onChange={() => { formik.setFieldValue('gender', false) }}
                                                    />
                                                    <span className="design"></span>
                                                    <span className='value_gender'>Female</span>
                                                </label>
                                            </div>
                                        </div>

                                        <Space wrap>
                                            <Button className='btn_submit_login' shape='round' htmlType='submit'>Update</Button>
                                        </Space>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="pill_tab">
                        <div>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="home-tab" data-toggle="tab" data-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Order history</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link nav-link-2" id="profile-tab" data-toggle="tab" data-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Favorite</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    {ordersHistory?.length > 0
                                        ? <PaginationWrapper itemsPerPage={2} items={ordersHistory} />
                                        : <Empty />}
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="favorite_list row">
                                        {
                                            favoriteList.length > 0
                                                ? favoriteList?.map((product, index) => {
                                                    return (<div className="check" key={index} ><CartProduct product={product} /></div>)
                                                })
                                                : <Empty />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </>
            ) : <Login />}
        </>
    )
}

export default Profile