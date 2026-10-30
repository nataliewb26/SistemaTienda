import { useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export default function Contacto() {
    const [datos, setDatos] = useState({ nombre: '', email: '', mensaje: '' })
    const [enviado, setEnviado] = useState(false)
    const [enviando, setEnviando] = useState(false)
    const [error, setError] = useState('')

    function cambiar(e) {
        setDatos({ ...datos, [e.target.name]: e.target.value })
    }

    async function enviar(e) {
        e.preventDefault() // Evita que la página se recargue
        setEnviando(true)
        setError('')

        try {
            // Envío de datos al endpoint POST del backend
            const respuesta = await fetch(API + '/api/contacto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            })

            if (!respuesta.ok) {
                throw new Error('Error al enviar el mensaje')
            }

            const resultado = await respuesta.json()
            console.log('Respuesta del servidor:', resultado)

            setEnviado(true)
            // Limpia los campos del formulario
            setDatos({ nombre: '', email: '', mensaje: '' })
        } catch (err) {
            setError('No se pudo conectar con el servidor para enviar el mensaje.')
        } finally {
            setEnviando(false)
        }
    }

    return (
        <>
            <h1>Contáctanos</h1>
            <form className="formulario" onSubmit={enviar}>
                <input
                    name="nombre"
                    placeholder="Tu nombre"
                    value={datos.nombre}
                    onChange={cambiar}
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Tu correo"
                    value={datos.email}
                    onChange={cambiar}
                    required
                />
                <textarea
                    name="mensaje"
                    rows="5"
                    placeholder="¿En qué te ayudamos?"
                    value={datos.mensaje}
                    onChange={cambiar}
                    required
                />
                <button type="submit" disabled={enviando}>
                    {enviando ? 'Enviando...' : 'Enviar mensaje'}
                </button>
            </form>

            {enviado && (
                <p className="mensaje-ok" style={{ marginTop: '1rem' }}>
                    ¡Gracias! Tu mensaje fue recibido por nuestro servidor.
                </p>
            )}

            {error && (
                <p style={{ color: '#ef4444', marginTop: '1rem', fontWeight: 600 }}>
                    {error}
                </p>
            )}
        </>
    )
}
