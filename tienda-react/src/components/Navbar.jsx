import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
    const [oscuro, setOscuro] = useState(false)

    // Sincroniza la clase con la etiqueta <body> del navegador
    useEffect(() => {
        if (oscuro) {
            document.body.classList.add('oscuro')
        } else {
            document.body.classList.remove('oscuro')
        }
    }, [oscuro])

    return (
        <header className="navbar">
            <div className="navbar__interior contenedor">
                <span className="logo">HERLENSHOP</span>
                <nav style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <NavLink to="/" end>Inicio</NavLink>
                    <NavLink to="/servicios">Servicios</NavLink>
                    <NavLink to="/catalogo">Catálogo</NavLink>
                    <NavLink to="/contacto">Contacto</NavLink>

                    {/* Botón toggle de tema */}
                    <button
                        type="button"
                        onClick={() => setOscuro(!oscuro)}
                        style={{
                            background: 'transparent',
                            border: '1px solid #c7d2fe',
                            color: 'white',
                            padding: '0.35rem 0.8rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.85rem'
                        }}
                        title="Alternar tema"
                    >
                        {oscuro ? '☀️ Claro' : '🌙 Oscuro'}
                    </button>
                </nav>
            </div>
        </header>
    )
}
