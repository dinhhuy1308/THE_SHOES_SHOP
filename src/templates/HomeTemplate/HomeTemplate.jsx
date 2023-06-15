import React, { Suspense } from 'react'
import HeaderHomeTemplate from './components/HeaderHomeTemplate/HeaderHomeTemplate'
import FooterHomeTemplate from './components/FooterHomeTemplate/FooterHomeTemplate'
import { Skeleton } from 'antd';
import { Outlet } from 'react-router-dom';
import { useScrollTop } from '../../hooks/useScrollTop/useScrollTop';

function HomeTemplate() {
  useScrollTop()

  return (
    <div>
        <HeaderHomeTemplate />
        <div style={{ minHeight: '50vh' }}>
                <Suspense fallback={<Skeleton />}>
                    <Outlet />
                </Suspense>
            </div>

        <FooterHomeTemplate />
    </div>
  )
}

export default HomeTemplate