import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import productos from '../data/productos'

export default function Catalogo() {
    // useState guarda lo que escribe la persona en el buscador
    const [busqueda, setBusqueda] = useState('')

    const filtrados = productos.filter((p) =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )

    return (
        <>
            <h1>Catálogo</h1>
            <input
                type="search"
                placeholder="Buscar producto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />
            <p>{filtrados.length} producto(s) encontrado(s)</p>

            <div className="rejilla">
                {filtrados.map((p) => (
                    <ProductCard key={p.id} producto={p} />
                ))}
            </div>
        </>
    )
}
