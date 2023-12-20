import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // hook pour rediriger vers une page

import "./Login.css";
import Navbar from "../layouts/Navbar";
import Footer from "../footer/footer";

function Login() {
   const [email, setEmail] = useState(localStorage.getItem("email") || "");
   const [password, setPassword] = useState(localStorage.getItem("password") || "");
   const [message, setMessage] = useState(localStorage.getItem("message") || "");
   const showForgotEmail = false;
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

         const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, options);

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

   return (
      <>
         <nav>
            <Navbar />
         </nav>
         <section>
            <div className="login-form">
               <h1 className="title">Connexion:</h1>
               <label className="log-form" htmlFor="email">
                  Adresse mail:
               </label>
               <br />
               <input name="email" className="input-formL" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
               <br />
               <label className="log-form" htmlFor="">
                  Mot de passe:
               </label>
               <br />
               <input className="input-formL" type="password" placeholder="Mot de Passe" value={password} onChange={(e) => setPassword(e.target.value)} />
               <div>
                  <button className="btn-co" onClick={handleLogin}>
                     Se connecter
                  </button>
               </div>
               <div className="insc">
                  <p>
                     Vous n'avez pas de compte ?<a href="/register"> Cliquez ici</a>
                  </p>
               </div>
               <div className="insc">
                  <a href="/forgotPassword"> Mot de passe oublié ? </a>
               </div>
               {message && <p>{message}</p>}
            </div>
         </section>
         <footer>
            <Footer />
         </footer>
      </>
   );
}

export default Login;
