import React, { useState } from "react";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [birthday, setBirthday] = useState("");
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async () => {
        try {
            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    pseudo,
                    birthday,
                    status,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message); // Utilisateur créé avec succès
            } else {
                setMessage(data.message); // Erreur lors de la création d'utilisateur
            }
        } catch (error) {
            console.error("Erreur lors de la création d'utilisateur : ", error);
        }
    };

    return (
        <div className="RegisterContainer">
            <input
                className="RegisterName"
                type="text"
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                className="RegisterEmail"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                className="RegisterPassword"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <input
                className="RegisterPseudo"
                type="text"
                placeholder="Pseudo"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                required
            />
            <input
                className="RegisterBirthday"
                type="text"
                placeholder="Date de Naissance"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
            />
            <select
                value={status}
                onChange={(e) => {
                    if (e.target.value === "Membre") {
                        setStatus(2); // Choisir 2 pour Membre
                    } else if (e.target.value === "Gerant") {
                        setStatus(1); // Choisir 1 pour Gérant
                    } else {
                        setStatus(""); // Si aucun choix n'est sélectionné
                    }
                }}
                className="RegisterStatus"
                required
            >
                <option value="">Choisir un statut</option>
                <option value="Membre">Membre</option>
                <option value="Gerant">Gérant</option>
            </select>
            <button onClick={handleRegister}>Register</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
