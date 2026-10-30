import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

// Dirección del servidor backend
const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export default function Catalogo() {
    // Estados para los datos de la API
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    // Estados de interfaz (búsqueda, categoría y orden)
    const [busqueda, setBusqueda] = useState('')
    const [categoria, setCategoria] = useState('Todas')
    const [orden, setOrden] = useState('ninguno')

    const categorias = ['Todas', 'Café', 'Accesorios', 'Cacao']

    // useEffect se ejecuta una sola vez cuando se abre la página
    useEffect(() => {
        fetch(API + '/api/productos')
            .then((res) => {
                if (!res.ok) throw new Error('Error al conectar con la API')
                return res.json()
            })
            .then((data) => setProductos(data))
            .catch(() => setError('No pudimos conectar con el servidor. ¿Está encendido el puerto 3001?'))
            .finally(() => setCargando(false))
    }, [])

    // 1. Filtrado por categoría y texto sobre los productos que trajo el servidor
    const filtrados = productos.filter((p) => {
        const coincideCategoria = categoria === 'Todas' || p.categoria === categoria
        const coincideTexto = p.nombre.toLowerCase().includes(busqueda.toLowerCase())
        return coincideCategoria && coincideTexto
    })

    // 2. Ordenamiento por precio
    const productosFinales = [...filtrados].sort((a, b) => {
        if (orden === 'menor') return a.precio - b.precio
        if (orden === 'mayor') return b.precio - a.precio
        return 0
    })

    // Estado de carga
    if (cargando) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
                <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>Cargando catálogo desde el servidor...</p>
            </div>
        )
    }

    // Estado de error (si el servidor está apagado)
    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#ef4444' }}>
                <h2>⚠️ Error de conexión</h2>
                <p style={{ marginTop: '0.5rem' }}>{error}</p>
            </div>
        )
    }

    return (
        <>
            <h1>Catálogo</h1>

            {/* Buscador de texto */}
            <input
                type="search"
                placeholder="Buscar producto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{
                    width: '100%',
                    padding: '0.7rem',
                    margin: '1rem 0',
                    borderRadius: '8px'
                }}
            />

            {/* Fila de controles: Categorías y Ordenamiento */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {categorias.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setCategoria(cat)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '999px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 600,
                                background: categoria === cat ? 'var(--color-principal)' : '#e2e8f0',
                                color: categoria === cat ? 'white' : 'var(--color-texto)',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label htmlFor="orden-precio" style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                        Ordenar por:
                    </label>
                    <select
                        id="orden-precio"
                        value={orden}
                        onChange={(e) => setOrden(e.target.value)}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '8px',
                            font: 'inherit',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="ninguno">Relevancia / Por defecto</option>
                        <option value="menor">Precio: Menor a Mayor</option>
                        <option value="mayor">Precio: Mayor a Menor</option>
                    </select>
                </div>
            </div>

            <p>{productosFinales.length} producto(s) encontrado(s)</p>

            {/* Rejilla de productos */}
            <div className="rejilla">
                {productosFinales.map((p) => (
                    <ProductCard key={p.id} producto={p} />
                ))}
            </div>
        </>
    )
}
