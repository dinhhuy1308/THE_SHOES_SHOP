// import React from 'react'
import React from 'react'
import './Register.scss'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Space } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate()

    const regex = {
        nameVietNam: /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/,
        number: /^\d+$/
    }


    const schema = Yup.object({
        email: Yup.string().required('Email can not be empty !').email('Email must be valid !'),
        name: Yup.string().required('Name can not be empty !').matches(regex.nameVietNam, 'Name cannot contain numbers !').min(4, 'Min is 4 characters !'),
        password: Yup.string().required('Password can not be empty !').min(4, 'Min is 4 characters !').max(12, 'Max is 12 characters !'),
        psConfirm: Yup.string().required('Password confirm can not be empty !').oneOf([Yup.ref('password')], 'Must match the password !'),
        phone: Yup.string().required('Phone can not be empty !').matches(regex.number, 'Phone must be a number !'),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            psConfirm: '',
            name: '',
            phone: '',
            gender: true,
        },

        validationSchema: schema,

        onSubmit: async (values) => {
            try {
                await axios({
                    method: 'post',
                    url: 'https://shop.cyberlearn.vn/api/Users/signup',
                    data: {
                        "email": values.email,
                        "password": values.password,
                        "name": values.name,
                        "gender": values.gender,
                        "phone": values.phone,
                    }
                })
                Swal.fire({
                    title: 'Success!',
                    text: 'Successful account registration.',
                    icon: 'success',
                })

                setTimeout(() => {
                    Swal.close()
                }, 1500)

                navigate('/login');
                formik.resetForm();
            } catch (err) {
                console.log(err)
                Swal.fire(
                    'Error!',
                    'Email already exists',
                    'error'
                )
            }

        }
    })

    return (
        <>
            <div className="container register-wrapper">
                <div className="register_header">
                    <p className='page_title'>Register</p>
                </div>
                <div className="register_body">
                    <form className="register_form row" onSubmit={formik.handleSubmit}>
                        <div className="col-12 col-sm-6">
                            <div className="form-group">
                                <label className='label_form' htmlFor="email">Email :</label>
                                <input type="text" className='form-control input_form' placeholder='Email' id='email' name='email'
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.errors.email && formik.touched.email && <p className='text-error'>{formik.errors.email}</p>}
                            </div>

                            <div className="form-group">
                                <label className='label_form' htmlFor="password">Password :</label>
                                <input type="text" className='form-control input_form' placeholder='Password' id='password' name='password'
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.errors.password && formik.touched.password && <p className='text-error'>{formik.errors.password}</p>}
                            </div>

                            <div className="form-group">
                                <label className='label_form' htmlFor="psConfirm">Password confirm :</label>
                                <input
                                    type="text"
                                    className='form-control input_form'
                                    placeholder='Password confirm'
                                    id='psConfirm'
                                    name='psConfirm'
                                    {...formik.getFieldProps('psConfirm')}
                                />
                                {formik.errors.psConfirm && formik.touched.psConfirm && <p className='text-error'>{formik.errors.psConfirm}</p>}
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
                            <div className="form-group">
                                <label className='label_form' htmlFor="name">Name :</label>
                                <input type="text" className='form-control input_form' placeholder='Name' id='name' name='name'
                                    {...formik.getFieldProps('name')}
                                />
                                {formik.errors.name && formik.touched.name && <p className='text-error'>{formik.errors.name}</p>}
                            </div>

                            <div className="form-group">
                                <label className='label_form' htmlFor="phone">Phone :</label>
                                <input type="text" className='form-control input_form' placeholder='Phone' id='phone' name='phone'
                                    {...formik.getFieldProps('phone')}
                                    />
                                    
                                {formik.errors.phone && formik.touched.phone && <p className='text-error'>{formik.errors.phone}</p>}
                            </div>

                            <div className="gender_choosen d-flex align-content-center">
                                <p className='label_form lable_gender'>Gender : </p>
                                <div className="form-check">
                                    <label className="form-check-label lable_radio label_form text-center" htmlFor="male">
                                        <input className="form-check-input" type="radio" name="gender" id="male" value={true}
                                            checked={formik.values.gender === true}
                                            onChange={() => { formik.setFieldValue('gender', true) }}
                                        />
                                        <span className="design"></span>
                                        <span className='value_gender'>Male</span>
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label className="form-check-label lable_radio label_form" htmlFor="female">
                                        <input className="form-check-input" type="radio" name="gender" id="female" value={false}
                                            checked={formik.values.gender === false}
                                            onChange={() => { formik.setFieldValue('gender', false) }}
                                        />
                                        <span className="design"></span>
                                        <span className='value_gender'>Female</span>
                                    </label>
                                </div>
                            </div>

                            <Space wrap>
                                <Button
                                    className='btn_submit_register'
                                    shape='round' type="submit"
                                    htmlType='submit'
                                >SUBMIT</Button>
                            </Space>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )

}

export default Register