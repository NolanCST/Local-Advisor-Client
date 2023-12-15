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
                    navigate("/login");
                    //window.location.href("../login/Login.jsx");
                } else {
                    alert(data.message);
                }
            });
    };

    return (
            <div className="register-form">
                <h1 className="title">Inscription :</h1> 
                <form action="" method="post">
                <label className="reg-form" htmlFor="name"> Nom:</label><br/>
                    <input
                     name="name"
                        className="input-formR"
                        type="text"
                        // placeholder="Nom"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    /><br/>
                     <label className="reg-form" htmlFor="firstname">Prenom:</label><br/>
                    <input
                     name="firstname"
                        className="input-formR"
                        type="text"
                        // placeholder="Prenom"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    /><br/>
                     <label className="reg-form" htmlFor="email">Adresse mail:</label><br/>
                    <input
                        className="input-formR"
                        type="email"
                        // placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    /> <br/><label className="reg-form" htmlFor="password">Mot de passe:</label><br/>
                    <input
                    name="password"
                        className="input-formR"
                        type="password"
                        // placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    /> <br/><label className="reg-form" htmlFor="pseudo">Pseudo:</label><br/>
                    <input
                    name="pseudp"
                        className="input-formR"
                        type="text"
                        // placeholder="Pseudo"
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                        required
                    /> <br/><label className="reg-form" htmlFor="birthday">Date de naissance:</label><br/>
                    <input
                    name="birthday"
                        className="input-formR"
                        type="date"
                        // placeholder="Date de Naissance"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    /><br/>
                    <select
                        className="input-formR"
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="">Choisir un statut</option>
                        <option value="0">Membre</option>
                        <option value="1">Gérant</option>
                    </select>
                    <button className="btn-reg" onClick={handleRegister}>
                        S'inscrire
                    </button>
                    {message && <p>{message}</p>}
                </form>
            </div>
    );
}

export default Register;
