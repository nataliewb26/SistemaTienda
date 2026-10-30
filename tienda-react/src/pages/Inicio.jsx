import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import productos from '../data/productos'

export default function Inicio() {
    const destacados = productos.slice(0, 3)

    return (
        <>
            <section className="hero">
                <h1>Bienvenido a HERLENSHOP</h1>
                <p>Encuentra las mejores ofertas, variedad y calidad directo a tu alcance.</p>
                <Link to="/catalogo" className="boton">Ver catálogo</Link>
            </section>

            <h2>Productos destacados</h2>
            <div className="rejilla">
                {destacados.map((p) => (
                    <ProductCard key={p.id} producto={p} />
                ))}
            </div>
        </>
    )
}
