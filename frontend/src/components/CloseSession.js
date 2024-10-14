import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const CloseSession = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = () => {
            const user = JSON.parse(localStorage.getItem('LoggedUser'));
            const currentPath = window.location.pathname;

            if (user) {
                if (user.stayLogged) {
                    if (currentPath === '/' || currentPath === '/login' || currentPath === '/register') {
                        navigate('/wall');
                    }
                } else {
                    if ((currentPath === '/login' || currentPath === '/register' || currentPath === '/') && !user.guest) {
                        navigate('/logout')
                    }
                }
            } else {
                if (currentPath === '/' || currentPath === '/login' || currentPath === '/register') {
                    const stateData = { user: null, loggedIn: false, stayLogged: false, guest: true }  
                    localStorage.setItem("LoggedUser", JSON.stringify(stateData))
                    const filterData = { title: 'reciente', order: 'r.fecha_resena' };
                    localStorage.setItem('Filter', JSON.stringify(filterData));
                } else {
                    navigate('/')
                }
            }
        };

        checkSession();

    }, [navigate]);

    return null;
};
