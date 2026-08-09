
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
    const [Inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const change = (e) =>{
        const {name, value} = e.target;
        setInputs({ ...Inputs, [name]:value});
    };

    const SubmitHandler = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/user/login",
                Inputs,
                {withCredentials: true}
            );
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