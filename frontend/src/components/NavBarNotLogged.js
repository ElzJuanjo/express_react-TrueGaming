import React, { useState, useEffect } from 'react'

export const NavBarNotLogged = () => {

    const [filtro, setFiltro] = useState('');
    useEffect(() => {
        const filter = localStorage.getItem('Filter');
        setFiltro(JSON.parse(filter).title);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const opcion = document.getElementById('filtrador').value;
        let filterData;
        if (opcion === 'reciente') {
            filterData = { title: opcion, order: 'r.fecha_resena' };
        } else if (opcion === 'likes') {
            filterData = { title: opcion, order: 'total_likes' };
        } else if (opcion === 'comentarios') {
            filterData = { title: opcion, order: 'total_comentarios' };
        }
        localStorage.setItem('Filter', JSON.stringify(filterData));
        e.target.submit();
    }

    return (
        <div>
            <div id='panel'>
                <img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="" />
                <div>
                    <h3>Hola, ahora mismo estás navegando como Invitado</h3>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <h3>Ordenar por:</h3>
                        <select name="filtro" id="filtrador"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}>
                            <option value="reciente"> Más Recientes </option>
                            <option value="likes">Con Más Likes</option>
                            <option value="comentarios">Con Más Comentarios</option>
                        </select>
                        <button type="Submit">Filtrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
