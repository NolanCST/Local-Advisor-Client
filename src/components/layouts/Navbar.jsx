import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div>
      <nav className="navTag">
        <img
          className="logoSmall"
          src="src\components\layouts\Corgi_guge-removebg-preview.png"
        />
        <div class="navbar">
          <ul className="navbarlist">
            <li>
              <a className="link" href="/">
                Accueil
              </a>
            </li>
            <li>
              <a className="link" href="/create">
                Ajouter
              </a>
            </li>
            <li>
              <a className="link" href="/profile">
                Mon Profile
              </a>
            </li>
            <li>
              <a className="link" href="/logout">
                Se déconnecter
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
