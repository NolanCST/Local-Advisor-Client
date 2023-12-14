import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forgotPassword.css";

function forgotPassword () {

    const [showForgotEmail, setShowForgotEmail] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");

    const handleOublier = async () => {
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

<div className="fg-form">
<label className="labfg-form" htmlFor="email">Adresse mail:</label><br/>
<input
    className="input-formfg"
    type="email"
    placeholder="Entrez votre adresse email"
    value={forgotEmail}
    onChange={(e) => setForgotEmail(e.target.value)}
/><br/>
<div>
    <button className="btn-env" onClick={handleOublier}>
    Envoyer
    </button><br/>
</div>
<div>
    <button
    className="btn-ann"  onClick={() => setShowForgotEmail(false)}>
    Annuler
    </button>
</div>
</div>)
}

export default forgotPassword;