import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

const Signup = () => {
    const [Inputs, setInputs] = useState({
        username:"",
        email: "",
        password: "",
    });

    const change = (e) =>{
        const {name, value} = e.target;
        setInputs({ ...Inputs, [name]:value })
    }

    const SubmitHandler = async(e) =>{
        e.preventDefault();
            try {
                const res = await axios.post("http://localhost:8000/api/user/registration",
                    Inputs,
                    {withCredentials: true}
                );
                console.log(res)
            } catch (error) {
                console.log(error)
        }
    }

    return (
        <div className=''>
            <h1>Регистрация</h1>

            <form onSubmit={SubmitHandler} action="">
                <div className="forms">
                    <label htmlFor="">Email</label>
                    <input type="email"
                        value={Inputs.email}
                        name = "email"
                        required
                        onChange={change}/>
                </div>

                <div className="forms">
                    <label htmlFor="">Имя пользователя</label>
                    <input type="text"
                        value={Inputs.username}
                        name = "username"
                        required
                        onChange={change}/>
                </div>

                <div className="forms">
                    <label htmlFor="">Пароль</label>
                    <input type="password"
                        value={Inputs.password}
                        name = "password"
                        required
                        onChange={change}/>
                </div>

                <button>Зарегистрироваться</button>
            </form>

            <Link to="/login">Войти</Link>
        </div>
    )
}

export default Signup