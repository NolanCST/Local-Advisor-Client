import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useState } from "react";

function Navbar() {
   const [status, setStatus] = useState("");
   const navigate = useNavigate();
   const token = localStorage.getItem("token");
   const [isOpen, setIsOpen] = useState(false);

   const toggleMenu = () => {
      setIsOpen(!isOpen);
   };
    async function handleLogout() {
        const isConfirmed = window.confirm(
            "Êtes-vous sûr de vouloir vous déconnecter ?"
        );

        if (isConfirmed) {
            // Supprime les infos de connexion du localStorage
            localStorage.removeItem("email");
            localStorage.removeItem("password");
            localStorage.removeItem("token");

            try {
                // Requête vers API pour révoquer le token
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/logout`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.ok) {
                    // Redirige l'utilisateur vers la page de connexion
                    navigate("/Login");
                }
            } catch (error) {
                console.error(
                    "Erreur lors de la déconnexion côté serveur :",
                    error
                );
            }
        }
    }

    async function getUserStatus() {
        try {
            if (token) {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/user`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token,
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setStatus(data.status);
                } else {
                    console.error("Error fetching user status");
                }
            }
        } catch (error) {
            console.error("Erreur:", error);
        }
    }

    useEffect(() => {
        getUserStatus();
    }, []);

  return (
    <div>
        {/* Menu Hamburger pour les petits écrans */}
      <div className="hamburgerMenu" onClick={toggleMenu}>
        <div className={isOpen ? "line line1 active" : "line line1"}></div>
        <div className={isOpen ? "line line2 active" : "line line2"}></div>
        <div className={isOpen ? "line line3 active" : "line line3"}></div>
      </div>
      <nav className={`navTag ${isOpen ? "open" : ""}`}>
        <div class="sidebar">
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
                {(status === 0 || status === 1) && (
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
                {status === 0 || status === 1 ? (
                    <li>
                        <a className="link" onClick={handleLogout}>
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
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
