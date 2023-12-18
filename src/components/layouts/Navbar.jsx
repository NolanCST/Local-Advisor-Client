import "./Navbar.css";

function Navbar() {
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  return (
    <div>
      <nav className="navTag">
        <a className="imageLink" href="/">
          <img
            className="logoSmall"
            src="src\components\layouts\Corgi_guge-removebg-preview.png"
          />
        </a>
        <div className="navbar">
          <ul className="navbarListLeft">
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
                Profil
              </a>
            </li>
          </ul>
          <ul className="navbarListRight">
            {isLoggedIn ? (
              <li>
                <a className="link" href="/logout">
                  Déconnexion
                </a>
              </li>
            ) : (
              <>
                <li>
                  <a className="link" href="/register">
                    Inscription
                  </a>
                </li>
                <li>
                  <a className="link" href="/login">
                    Connexion
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
