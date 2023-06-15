import React from 'react'
import { NavLink } from 'react-router-dom'
import './FooterHomeTemplate.scss'


function FooterHomeTemplate(props) {
    return (
        <div className='footer '>
            <section className='footer-nav'>
                <div className="footer-nav-item" >
                    <h3>GET HELP</h3>
                    <div className='fotter-contact'>
                        <NavLink to=''>Home</NavLink>
                        <NavLink to=''>Nike</NavLink>
                        <NavLink to=''>Adidas</NavLink>
                        <NavLink to=''>Contact</NavLink>
                    </div>
                </div>
                <div className="footer-nav-item border">
                    <h3>SUPPORT</h3>
                    <div className='fotter-contact'>
                        <NavLink to=''>About</NavLink>  
                        <NavLink to=''>Contact</NavLink>
                        <NavLink to=''>HelNavLink</NavLink>
                        <NavLink to=''>NavLinkhone</NavLink>
                    </div>
                </div>
                <div className="footer-nav-item">
                    <h3>REGISTER</h3>
                    <div className='fotter-contact'>
                        <NavLink to='/register'>Register</NavLink>
                        <NavLink to='/login'>Login</NavLink>
                    </div>
                </div>
            </section>
            <section className='footer-copyright d-flex align-items-center justify-content-center' style={{ background: '#d9d9d9', height: 74 }}>
                <span>© 2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn Khải.</span>
            </section>
        </div>
    )
}

export default FooterHomeTemplate