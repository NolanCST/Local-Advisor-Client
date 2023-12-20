import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [status, setStatus] = useState("");

  async function getUserStatus() {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStatus(data.status);
        } else {
          console.error("Error fetching user status");
        }
      } else {
        console.error("Tokken error");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  }

  useEffect(() => {
    getUserStatus();
  }, []);

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
            {status !== null && (
              <li>
                <a className="link" href="/profile">
                  Profil
                </a>
              </li>
            )}
            {status === 1 && (
              <li>
                <a className="link" href="/create">
                  Ajouter
                </a>
              </li>
            )}
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
