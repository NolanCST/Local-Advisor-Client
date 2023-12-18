import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../footer/footer";
import Navbar from "../layouts/NavBar";
import "./ResetPasswordPage.css";

function ResetPasswordPage() {
    const { token } = useParams(); // Récupère le jeton d'authentification depuis l'URL
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [resetToken, setResetToken] = useState("");
    const [resetEmail, setResetEmail] = useState("");

    useEffect(() => {
        fetch(`/reset-password/token/${token}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Token récupéré :", data.token);
                setResetToken(data.token);
                setResetEmail(data.email);
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération du token :",
                    error
                );
            });
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("Les mots de passe ne correspondent pas.");
            return;
        }
        const email = localStorage.getItem("resetPasswordEmail");
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/reset-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: resetEmail,
                        token: resetToken,
                        newPassword,
                    }),
                }
            );
            if (response.ok) {
                setMessage("Mot de passe réinitialisé avec succès !");
            } else {
                const data = await response.json();
                setMessage(
                    data.message ||
                        "Une erreur s'est produite lors de la réinitialisation du mot de passe."
                );
            }
        } catch (error) {
            console.error(
                "Erreur lors de la réinitialisation du mot de passe :",
                error
            );
            setMessage(
                "Une erreur s'est produite lors de la réinitialisation du mot de passe."
            );
        }
    };

    return (
        <div>
            <nav>
                <Navbar />
            </nav>
            <div className="resetpassword">
                <h1>Réinitialisation du mot de passe</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nouveau mot de passe :</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Confirmer le nouveau mot de passe :</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Réinitialiser le mot de passe</button>
                    {message && <p>{message}</p>}
                </form>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default ResetPasswordPage;
