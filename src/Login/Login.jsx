import React, { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message); // Authentification réussie
            } else {
                setMessage(data.message); // Erreur d'authentification
            }
        } catch (error) {
            console.error("Erreur lors de l'authentification : ", error);
        }
    };

    return (
        <div className="LoginContainer">
            <input
                className="LoginEmail"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="LoginPassword"
                type="password"
                placeholder="Mot de Passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
