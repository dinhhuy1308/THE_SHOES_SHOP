import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy } from 'react'
import './App.css'
import HomeTemplate from './templates/HomeTemplate/HomeTemplate'


const Home = lazy(() => import('./pages/Home/Home'))
const Login = lazy(() => import('./pages/Login/Login'))
const Register = lazy(() => import('./pages/Register/Register'))
const Cart = lazy(() => import('./pages/Cart/Cart'))
const Detail = lazy(() => import('./pages/Detail/Detail'))
const Search = lazy(() => import('./pages/Search/Search'))
const Profile = lazy(() => import('./pages/Profile/Profile'))

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<HomeTemplate />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
					<Route path='register' element={<Register />} />
					<Route path='cart' element={<Cart />} />
					<Route path='detail'  >
						<Route path=':productID' element={<Detail />} />
					</Route>
					<Route path='search' element={<Search />} />
					<Route path='profile' element={<Profile />} />
					<Route path='*' element={<Navigate to='' />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
