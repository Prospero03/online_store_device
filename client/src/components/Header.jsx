import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../store/authRoute'
import axios from 'axios'

const Header = (props) => {
  const {
    links =[
      {
            name: "Главная",
            to: "/",
      },
      {
            name: "Профиль",
            to: "/profile",
      },
      {
            name: "Войти",
            to: "/login",
      },
    ]
  } = props

  const server = useSelector((state)=>state.prod.link)
  const dispatch = useDispatch()
  const history = useNavigate()
  const logoutHandler = async () =>{
    const res = await axios.post(`${server}/api/user/logout`,
      {},
      {withCredentials: true}
    );
    console.log(res)
    dispatch(authActions.logout());
    history("/")
  }

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if( !isLoggedIn){
    links.splice(2,1)
  }else{
    links.splice(3,1)
  }
  
  return (
    <div className='header'>
      <div className='logo'>
        <Link to="/" className='nav-link'>Лого</Link>
      </div>
    
      <nav className='navbar'>
          {links.map((items, i)=> (
            <Link key={i} to={items.to} className='navbar-link'>
              {items.name}
            </Link>
              ))
          }
          {!isLoggedIn &&(
            <Link to="/sign-up" className='navbar-link'>
              Регистрация
            </Link>
          )}
          {isLoggedIn &&(
            <Link to="/" onClick={logoutHandler} className='navbar-link'>
              Выход
            </Link>
          )}
      </nav>
    </div>
  )
}

export default Header