import {useeffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export default function DetalleProducto() {
    // useParams extrae el ":id" de la URL actual (por ejemplo: /producto/2)
    const { id } = useParams()

    const [producto, setProducto] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetch(`${API}/api/productos/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error('Producto no encontrado')
                    return res.json()
            })
            .then(setProducto)
            .catch((err) => setError(err.message))
            .finally(() => setCargando(false))
        }, [id])

    // Si alguien escribe un ID que no existe (ej. /producto/999)
    if (cargando) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
                <p style={{ fontWeight: 600 }}>Cargando detalle del producto...</p>
            </div>
        )
    }

    if (error || !producto) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <h2>Producto no encontrado</h2>
                <p style={{ margin: '1rem 0', color: '#64748b' }}>
                    El producto solicitado no existe en el sevidor.
                </p>
                <Link to="/catalogo" className="boton">Volver al catálogo</Link>
            </div>
        )
    }    

    return (
        <section
            style={{
                maxWidth: '650px',
                margin: '2rem auto',
                background: 'white',
                padding: '2rem',
                borderRadius: 'var(--radio)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
                }}
            >
                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div style={{ marginTop: '1.5rem' }}>
                    <span
                        style={{
                            background: '#e0e7ff',
                            color: 'var(--color-principal)',
                            padding: '0.3rem 0.8rem',
                            borderRadius: '999px',
                            fontSize: '0.85rem',
                            fontWeight: 700
                        }}
                    >
                        {producto.categoria}
                    </span>
                    <h1 style={{ marginTop: '0.8rem', fontSize: '1.8rem' }}>{producto.nombre}</h1>
                    <p style={{ margin: '1rem 0', color: '#4b5563', fontSize: '1.05rem' }}>
                        {producto.descripcion}
                    </p>
                    <p className="precio" style={{ fontSize: '1.6rem', marginBottom: '1.5rem' }}>
                        S/ {producto.precio.toFixed(2)}
                    </p>
                    <Link to="/catalogo" className="boton">← Volver al catálogo</Link>
                </div>
            </section>
        )
}
