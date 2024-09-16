import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const Logout = () => {         
    const navigate = useNavigate();

    useEffect(() => {
        const user = {user:null,loggedIn:false}
        localStorage.setItem("LoggedUser", JSON.stringify(user))
        navigate('/')

    }, [navigate]);

    return null;
}
