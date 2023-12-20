import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useStatus } from "../status/StatusContext";

function Navbar() {
   const { status } = useStatus();
   const navigate = useNavigate();

   async function handleLogout() {
      const isConfirmed = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");

      if (isConfirmed) {
         // Supprimer les informations de connexion du localStorage
         localStorage.removeItem("email");
         localStorage.removeItem("password");
         localStorage.removeItem("token");

         try {
            // Effectuer une requête vers votre API pour révoquer le token
            const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
               method: "POST",
               headers: {
                  // Authorization: `Bearer ${localStorage.getItem(
                  //     "token"
                  // )}`,
                  "Content-Type": "application/json",
               },
            });

            if (response.ok) {
               // Rediriger l'utilisateur vers la page de connexion
               navigate("/Login");
            } else {
               // Gérer les erreurs ou messages du serveur si nécessaire
               console.error("Échec de la déconnexion côté serveur");
            }
         } catch (error) {
            console.error("Erreur lors de la déconnexion côté serveur :", error);
         }
      }
   }

   return (
      <div>
         <nav className="navTag">
            <a className="imageLink" href="/">
               <img className="logoSmall" src="src\components\layouts\Corgi_guge-removebg-preview.png" />
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
         </nav>
      </div>
   );
}

export default Navbar;
