import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // hook pour rediriger vers une page

import "./Register.css";

function Register() {
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [birthday, setBirthday] = useState("");
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        console.log("TEST");
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                pseudo: pseudo,
                birthday: birthday,
                status: status,
            }),
        };
        console.log("option", options);

        await fetch(`${import.meta.env.VITE_API_URL}/register`, options)
            .then((response) => response.json()) // Récupère la réponse au format JSON
            .then((data) => {
                if (data.success) {
                    navigate("/Login");
                } else {
                    alert(data.message);
                }
            });
    };

    return (
        <>
            <div className="RegisterContainer">
                <form action="" method="post">
                    <input
                        className="RegisterLastname"
                        type="text"
                        placeholder="Nom"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                    <input
                        className="RegisterFirstname"
                        type="text"
                        placeholder="Prenom"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
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
                        type="date"
                        placeholder="Date de Naissance"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                    <select
                        className="RegisterStatus"
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="">Choisir un statut</option>
                        <option value="0">Membre</option>
                        <option value="1">Gérant</option>
                    </select>
                    <button className="RegisterButton" onClick={handleRegister}>
                        S'inscrire
                    </button>
                    {message && <p>{message}</p>}
                </form>
            </div>
        </>
    );
}

export default Register;
