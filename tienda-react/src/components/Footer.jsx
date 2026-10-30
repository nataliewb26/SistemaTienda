export default function Footer() {
    const anio = new Date().getFullYear()
    return (
        <footer className="footer">
            <p>© {anio} MiTienda · Proyecto de clase Full Stack</p>
        </footer>
    )
}
