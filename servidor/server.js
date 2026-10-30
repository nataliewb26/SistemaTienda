import express from 'express'
import cors from 'cors'

const app = express()

// Middlewares
app.use(cors()) // Permite que React (puerto 5173) consulte a la API sin bloqueo de CORS
app.use(express.json()) // Permite leer el cuerpo de peticiones en formato JSON

// Datos de productos (en la Fase 3 vendrán de SQLite)
const productos = [
    {
        id: 1,
        nombre: 'Café de altura 250 g',
        precio: 28.5,
        categoria: 'Café',
        descripcion: 'Granos tostados de forma artesanal.',
        imagen: 'https://picsum.photos/seed/cafe/400/300'
    },
    {
        id: 2,
        nombre: 'Taza de cerámica',
        precio: 22.0,
        categoria: 'Accesorios',
        descripcion: 'Hecha a mano, ideal para regalo.',
        imagen: 'https://picsum.photos/seed/taza/400/300'
    },
    {
        id: 3,
        nombre: 'Cacao orgánico 200 g',
        precio: 19.9,
        categoria: 'Cacao',
        descripcion: 'Sin azúcar añadida.',
        imagen: 'https://picsum.photos/seed/cacao/400/300'
    },
    {
        id: 4,
        nombre: 'Prensa francesa',
        precio: 65.0,
        categoria: 'Accesorios',
        descripcion: 'Para preparar café en casa.',
        imagen: 'https://picsum.photos/seed/prensa/400/300'
    },
    {
        id: 5,
        nombre: 'Termo de acero 500 ml',
        precio: 45.0,
        categoria: 'Accesorios',
        descripcion: 'Mantiene la temperatura por 12 horas.',
        imagen: 'https://picsum.photos/seed/termo/400/300'
    },
    {
        id: 6,
        nombre: 'Café molido gourmet 500 g',
        precio: 38.0,
        categoria: 'Café',
        descripcion: 'Molienda media para cafetera de filtro.',
        imagen: 'https://picsum.photos/seed/cafegourmet/400/300'
    },
    {
        id: 7,
        nombre: 'Chocolate amargo 70%',
        precio: 14.5,
        categoria: 'Cacao',
        descripcion: 'Tableta artesanal con granos selectos.',
        imagen: 'https://picsum.photos/seed/choco/400/300'
    },
    {
        id: 8,
        nombre: 'Molinillo de café manual',
        precio: 55.0,
        categoria: 'Accesorios',
        descripcion: 'Muelas de cerámica ajustables.',
        imagen: 'https://picsum.photos/seed/molino/400/300'
    }
]

// 1. Endpoint: Obtener todos los productos
app.get('/api/productos', (req, res) => {
    res.json(productos)
})

// 2. Endpoint: Obtener un producto por ID
app.get('/api/productos/:id', (req, res) => {
    const producto = productos.find((p) => p.id === Number(req.params.id))
    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' })
    }
    res.json(producto)
})

// 3. Endpoint: Recibir formulario de contacto
app.post('/api/contacto', (req, res) => {
    console.log('Mensaje recibido en el servidor:', req.body)
    res.status(201).json({ ok: true, mensaje: 'Mensaje recibido exitosamente' })
})

// Iniciar servidor en el puerto 3001
const PORT = 3001
app.listen(PORT, () => {
    console.log(`API lista en http://localhost:${PORT}`)
})