import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderIndex } from './HeaderIndex';
import { Footer } from './Footer';

export const RecoverPass = () => {
    const location = useLocation();
    const { email } = location.state || {}; // Accede al correo
    const navigate = useNavigate();

    useEffect(() => { // Se ejecuta en paralelo al cargado del componente
        if (!email) {
            navigate('/');
        }
    }, [email, navigate]); // Lista de dependencias

    if (!email) {
        return null; // No renderiza nada mientras redirige
    }

    return (
        <div>
            <HeaderIndex></HeaderIndex>
            <main>
                <h1>RECUPERAR CUENTA: {email}</h1>
            </main>
            <Footer></Footer>
        </div>
    );
};