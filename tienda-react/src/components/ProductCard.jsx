// "props" = datos que el componente padre le entrega a su hijo
import { Link } from "react-router-dom"

export default function ProductCard({ producto }) {
    return (
        <article className="tarjeta">
            <img src={producto.imagen} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p className="precio">S/ {producto.precio.toFixed(2)}</p>
            <div style={{ padding: '0.5rem 1rem 0' }}>
                <Link
                    to={`/producto/${producto.id}`}
                    style={{
                        display: 'inline-block',
                        color: 'var(--color-principal)',
                        textDecoration: 'none',
                        fontWeight: 700,
                        fontSize: '0.9rem'
                    }}
                >
                    Ver detalle →
                </Link>
            </div>
        </article>
    )
}
