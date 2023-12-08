import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // hook pour rediriger vers une page

import "./Login.css";

function Login() {
    const [email, setEmail] = useState(localStorage.getItem("email") || "");
    const [password, setPassword] = useState(
        localStorage.getItem("password") || ""
    );
    const [message, setMessage] = useState(
        localStorage.getItem("message") || ""
    );
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            };

            setEmail(""); // Effacer les champs email et mot de passe
            setPassword("");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/login`,
                options
            );

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message); // Authentification réussie
                localStorage.setItem("email", email);
                localStorage.setItem("password", password);
                localStorage.setItem("token", data.token);
                navigate("/");
            } else {
                setMessage(data.message); // Erreur d'authentification
            }
        } catch (error) {
            console.error("Erreur lors de l'authentification : ", error);
        }
    };

    const gotoRegister = () => {
        // Redirection vers la page d'inscription de l'API
        navigate("/register");
    };

    const handleOublier = async () => {
        try {
            const response = await fetch(
                "${import.meta.env.VITE_API_URL}/send-reset-email",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message); // Email envoyé avec succès
            } else {
                setMessage(data.message); // Erreur lors de l'envoi de l'email
            }
        } catch (error) {
            console.error(
                "Erreur lors de l'envoi de l'email de réinitialisation : ",
                error
            );
        }
    };

    return (
        <div className="LoginContainer">
            <div className="loginEmail">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="loginPassword">
                <input
                    type="password"
                    placeholder="Mot de Passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="loginButton">
                <button onClick={handleLogin}>Login</button>
            </div>
            {message && <p>{message}</p>}
            <div className="buttonRegister">
                <button onClick={gotoRegister}>Créer un Compte</button>
            </div>
            <div className="buttonOublier">
                <button onClick={handleOublier}>Mot de passe oublié ?</button>
            </div>
        </div>
    );
}

export default Login;
