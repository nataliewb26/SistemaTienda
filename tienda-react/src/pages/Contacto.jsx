import { useState } from 'react'

export default function Contacto() {
    const [datos, setDatos] = useState({ nombre: '', email: '', mensaje: '' })
    const [enviado, setEnviado] = useState(false)

    function cambiar(e) {
        setDatos({ ...datos, [e.target.name]: e.target.value })
    }

    function enviar(e) {
        e.preventDefault()          // evita que la página se recargue
        console.log('Mensaje recibido:', datos)
        setEnviado(true)
    }

    return (
        <>
            <h1>Contáctanos</h1>
            <form className="formulario" onSubmit={enviar}>
                <input name="nombre" placeholder="Tu nombre"
                    value={datos.nombre} onChange={cambiar} required />
                <input name="email" type="email" placeholder="Tu correo"
                    value={datos.email} onChange={cambiar} required />
                <textarea name="mensaje" rows="5" placeholder="¿En qué te ayudamos?"
                    value={datos.mensaje} onChange={cambiar} required />
                <button type="submit">Enviar mensaje</button>
            </form>
            {enviado && <p className="mensaje-ok">¡Gracias! Te responderemos pronto.</p>}
        </>
    )
}
