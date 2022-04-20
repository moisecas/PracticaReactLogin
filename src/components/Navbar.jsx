import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const Navbar = () => {
    return ( //usamos clases traídas de bootstrap 
        <div className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Entorno de creación de usuarios / React</Link>
            <div>
                <div className="d-flex">
                    <NavLink 
                        className="btn btn-dark mr-2" 
                        to="/"
                        exact //exact lo usamos par que solo en la pagina de inicio me coloque la clase especificada
                    >
                        Inicio
                    </NavLink>
                    <NavLink 
                        className="btn btn-dark mr-2" 
                        to="/admin" // guiando las rutas con el to
                    >
                        Admin
                    </NavLink>
                    <NavLink 
                        className="btn btn-dark" 
                        to="/login"
                    >
                        Login
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar