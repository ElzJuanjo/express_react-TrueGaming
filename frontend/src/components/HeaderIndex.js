import React from 'react'

export const HeaderIndex = () => {
  return (
    <div>
      <header>
        <a href="/">
          <img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="" />
        </a>
        <section id='buttonHeader'>
          <a href="/login"><button>INICIAR SESIÓN</button></a>
          <a href="/register"><button>REGISTRARSE</button></a>
        </section>
      </header>
    </div>
  )
}
