import { NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar__interior contenedor">
                <span className="logo">MiTienda</span>
                <nav>
                    <NavLink to="/" end>Inicio</NavLink>
                    <NavLink to="/servicios">Servicios</NavLink>
                    <NavLink to="/catalogo">Catálogo</NavLink>
                    <NavLink to="/contacto">Contacto</NavLink>
                </nav>
            </div>
        </header>
    )
}
