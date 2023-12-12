import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
    const navigate = useNavigate();

    async function handleLogout() {
        const isConfirmed = window.confirm(
            "Êtes-vous sûr de vouloir vous déconnecter ?"
        );

        if (isConfirmed) {
            // Supprimer les informations de connexion du localStorage
            localStorage.removeItem("email");
            localStorage.removeItem("password");
            localStorage.removeItem("token");

            try {
                // Effectuer une requête vers votre API pour révoquer le token
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/logout`,
                    {
                        method: "POST",
                        headers: {
                            // Authorization: `Bearer ${localStorage.getItem(
                            //     "token"
                            // )}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.ok) {
                    // Rediriger l'utilisateur vers la page de connexion
                    navigate("/Login");
                } else {
                    // Gérer les erreurs ou messages du serveur si nécessaire
                    console.error("Échec de la déconnexion côté serveur");
                }
            } catch (error) {
                console.error(
                    "Erreur lors de la déconnexion côté serveur :",
                    error
                );
            }
        }
    }

    const isLoggedIn = localStorage.getItem("token") !== null;

    return (
        <div>
            {isLoggedIn && (
                <button className="logout lien" onClick={handleLogout}>
                    Déconnexion
                </button>
            )}
        </div>
    );
}

export default LogoutButton;
