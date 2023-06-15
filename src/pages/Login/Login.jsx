// import React from 'react';
import './Login.scss';
import './../Register/Register.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { saveLocalStogare } from '../../utils/LocalStorage/LocalStorage';
import { ACCESS_TOKEN } from '../../contants';


function Login() {
    const navigate = useNavigate()


    const schema = Yup.object({
        email: Yup.string().required('Email can not be empty !').email('Email must be valid !'),
        password: Yup.string().required('Password can not be empty !').min(4, 'Min is 4 characters !').max(12, 'Max is 12 characters !'),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },

        validationSchema: schema,

        onSubmit: async (values) => {
            try {
                const resp = await axios.post('https://shop.cyberlearn.vn/api/Users/signin',
                    {
                        email: values.email,
                        password: values.password,
                    }
                )
                saveLocalStogare(ACCESS_TOKEN, resp.data.content.accessToken);
                navigate('/profile');
            } catch (err) {
                console.log(err)
                Swal.fire({
                    title: 'Error!',
                    text: 'Incorrect Email or Password',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        }
    })

    return (
        <>
            <div className="container">
                <div className="login_header">
                    <p className="page_title">
                        Login
                    </p>
                </div>
                <div className="login_body">
                    <form action="" className='login_form' onSubmit={formik.handleSubmit}>
                        <div className="form-group form-group-login">
                            <label htmlFor="email" className='label_form' >Email :</label>
                            <input type="text" className='form-control input_form' id='email' placeholder='Email'
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email && <p className='text-error'>{formik.errors.email}</p>}
                        </div>
                        <div className="form-group form-group-login">
                            <label htmlFor="password" className='label_form' >Password :</label>
                            <input type="password" className='form-control input_form' id='password' placeholder='Password'
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password && <p className='text-error'>{formik.errors.password}</p>}
                        </div>
                        <div className="form_action form-group-login">
                            <NavLink to={'/register'}>Register now ?</NavLink>
                            <Space wrap>
                                <Button
                                    className='btn_submit_login'
                                    shape='round'
                                    htmlType='submit'
                                >
                                    LOGIN
                                </Button>
                            </Space>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Login