
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/authRoute';

const Login = () => {
    const [Inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const history = useNavigate();
    const dispatch = useDispatch()
    const server = useSelector((state)=> state.prod.link)


    const change = (e) =>{
        const {name, value} = e.target;
        setInputs({ ...Inputs, [name]:value});
    };
    const SubmitHandler = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`${server}/api/user/login`,
                Inputs,
                {withCredentials: true}
            );
            dispatch(authActions.login());
            console.log(res)
        } catch (error) {
            console.log(error)
        } finally{
            setInputs({
                email: "",
                password: "",
            })
        }
    }

    return (
        <div className=''>
          <h1>Авторизация</h1>

          <form onSubmit={SubmitHandler} action="">
            <div className="forms">
              <label htmlFor="">Email</label>
              <input  type="email"
                  value={Inputs.email}
                  name = "email"
                  required
                  onChange={change}/>
            </div>

            <div className="forms">
              <label htmlFor="">Пароль</label>
              <input  type="password"
                  value={Inputs.password}
                  name = "password"
                  required
                  onChange={change}/>
            </div>
            
            <button>Войти</button>
          </form>

          <Link to="/sign-up">Регистрация</Link>
        </div>
    )
}

export default Login