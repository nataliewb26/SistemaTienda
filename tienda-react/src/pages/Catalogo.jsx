import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import productos from '../data/productos'

export default function Catalogo() {
    // Estado 1: texto del buscador
    const [busqueda, setBusqueda] = useState('')
    // Estado 2: categoría seleccionada (por defecto 'Todas')
    const [categoria, setCategoria] = useState('Todas')
    // Estado 3: criterio de ordenamiento por precio ('ninguno', 'menor', 'mayor')
    const [orden, setOrden] = useState('ninguno')

    // Lista de categorías disponibles para generar los botones
    const categorias = ['Todas', 'Café', 'Accesorios', 'Cacao']

    // 1. Filtrado doble: primero por categoría y luego por coincidencia de texto
    const filtrados = productos.filter((p) => {
        const coincideCategoria = categoria === 'Todas' || p.categoria === categoria
        const coincideTexto = p.nombre.toLowerCase().includes(busqueda.toLowerCase())
        return coincideCategoria && coincideTexto
    })

    // 2. Ordenamiento por precio usando [...filtrados].sort(...)
    const productosFinales = [...filtrados].sort((a, b) => {
        if (orden === 'menor') return a.precio - b.precio
        if (orden === 'mayor') return b.precio - a.precio
        return 0 // Sin orden específico si es 'ninguno'
    })

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
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1'
                }}
            />

            {/* Fila de controles: Categorías y Ordenamiento */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                {/* Botones de categoría */}
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

                {/* Selector de orden por precio */}
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
                            border: '1px solid #cbd5e1',
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

            {/* Cuadrícula de tarjetas con los productos filtrados y ordenados */}
            <div className="rejilla">
                {productosFinales.map((p) => (
                    <ProductCard key={p.id} producto={p} />
                ))}
            </div>
        </>
    )
}
