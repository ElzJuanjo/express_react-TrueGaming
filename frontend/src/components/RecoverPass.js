import React from 'react'
import { useLocation } from 'react-router-dom';
// import { HeaderIndex } from './HeaderIndex';
import { Footer } from './Footer';

export const RecoverPass = () => {
    const location = useLocation();
    const { email } = location.state || { email: 'Hay que reenviar al index :v' }; // Accede al correo

    return (
        <div>
            <main>
                <h1>RECUPERAR CUENTA: {email}</h1>
            </main>
            <Footer></Footer>
        </div>
    )
}