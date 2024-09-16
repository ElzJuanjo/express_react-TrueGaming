import React, { useState } from 'react'

export const NavBar = ({name}) => {

    const [filtro, setFiltro] = useState("");

    return (
        <div id='panel'>
            <div>
                <h3>Hola {name}, ¿Qué quieres hacer hoy?</h3>
            </div>
            <a href="/searchUsers"><button>Buscar Usuario</button></a>
            <a href="/upload"><button>Publicar Algo</button></a>
            <div id="panelFiltro">
                <form>
                    <h3>Ordenar por:</h3>
                    <select name="filtro" id="filtrador" 
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}>
                        <option value="reciente" defaultValue="reciente"> Más Recientes </option>
                        <option value="likes">Con Más Likes</option>
                        <option value="comentarios">Con Más Comentarios</option>
                    </select>
                    <button type="Submit">Filtrar</button>
                </form>
            </div>
        </div>
    )
}
