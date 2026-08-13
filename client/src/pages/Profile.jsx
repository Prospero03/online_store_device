import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import axios from 'axios';

const Profile = () => {
    const server = useSelector((state) => state.prod.link);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      const fetch = async () => {
        try {
          const res = await axios.get(`${server}/api/user/profile`, {
            withCredentials: true,
          });
          setUserData(res.data.data);
        } catch (error) {
          console.error({error:"Ошибка при загрузке данных профиля"} );
        }
      };
      fetch();
    }, [server]);

    if(!userData){
      return <div>Загрузка</div>
    }

    return (
      <div>
        <span>Profile</span>
        <h1>{userData.username}</h1>
      </div>
    )
}

export default Profile