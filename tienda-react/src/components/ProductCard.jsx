// "props" = datos que el componente padre le entrega a su hijo
export default function ProductCard({ producto }) {
    return (
        <article className="tarjeta">
            <img src={producto.imagen} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p className="precio">S/ {producto.precio.toFixed(2)}</p>
        </article>
    )
}
