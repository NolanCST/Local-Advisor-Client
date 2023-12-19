import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./forgotPassword.css";
import Footer from "../footer/footer";
import Navbar from "../layouts/NavBar";

function ForgotPassword() {
    const [showForgotEmail, setShowForgotEmail] = useState(true);
    const [forgotEmail, setForgotEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleForget = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/send-reset-email`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: forgotEmail,
                    }),
                }
            );
            if (response.ok) {
                setMessage("Email envoyé avec succès");
            } else {
                const text = await response.text();
                setMessage(text); // Affiche le message d'erreur brut s'il n'est pas au format JSON
            }
        } catch (error) {
            console.error(
                "Erreur lors de l'envoi de l'email de réinitialisation : ",
                error
            );
        }
    };

    return (
        <>
            <nav>
                <Navbar />
            </nav>
            <div className="fg-form">
                {showForgotEmail && (
                    <>
                        <label className="labfg-form" htmlFor="email">
                            Adresse mail :
                        </label>
                        <br />
                        <input
                            className="input-formfg"
                            type="email"
                            placeholder="Entrez votre adresse email"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                        />
                        <br />
                        <div>
                            <button className="btn-env" onClick={handleForget}>
                                Envoyer
                            </button>
                            <br />
                        </div>
                        <div>
                            <button
                                className="btn-ann"
                                onClick={() => setShowForgotEmail(false)}
                            >
                                Annuler
                            </button>
                        </div>
                    </>
                )}
                {message && <p>{message}</p>}
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default ForgotPassword;
