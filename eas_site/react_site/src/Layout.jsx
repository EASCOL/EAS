import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
      <>
        <nav>
        <div className="logo-nav">
            <img
            src="https://raw.githubusercontent.com/EASCOL/EAS/HI005/HI005/logo.png"
            alt="EAS LOGO"
            className="logo"
            />
            <p>EAFIT Administration System</p>
        </div>
        <div className="nav-options">
            <Link to="/">Inicio</Link>
            <Link to="/classrooms">Aulas</Link>
            <Link to="/lockers">Casilleros</Link>
            <Link to="#">Cerrar sesión</Link>
        </div>
        </nav>
        <Outlet />
    </>
  );
}

export default Layout;
