export default function Servicios() {
    const servicios = [
        { titulo: 'Envíos a todo el país', texto: 'Recibe tu pedido en 48 horas.' },
        { titulo: 'Atención personalizada', texto: 'Te asesoramos por WhatsApp.' },
        { titulo: 'Pago seguro', texto: 'Aceptamos tarjetas y billeteras.' },
    ]

    return (
        <>
            <h1>Nuestros servicios</h1>
            <div className="rejilla">
                {servicios.map((s) => (
                    <article className="tarjeta" key={s.titulo}>
                        <h3>{s.titulo}</h3>
                        <p>{s.texto}</p>
                    </article>
                ))}
            </div>
        </>
    )
}
