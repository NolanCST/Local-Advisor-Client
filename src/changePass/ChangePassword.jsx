import React, { useState } from "react";

function PasswordChangeForm() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/passwordChange`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        newPassword: newPassword,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage("Mot de passe changé avec succès !");
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage(
                "Une erreur s'est produite lors du changement de mot de passe"
            );
        }
    };

    return (
        <div>
            <h2>Changer le mot de passe</h2>
            <form onSubmit={handlePasswordChange}>
                <label>Nouveau mot de passe :</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />

                <label>Confirmer le nouveau mot de passe :</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button type="submit">Changer le mot de passe</button>

                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

export default PasswordChangeForm;
