import React, { useEffect, useState } from "react";
import "./profile.css";
import Footer from "../footer/footer";
import Navbar from "../layouts/NavBar";
import { useStatus } from "../status/StatusContext";
import { Link } from "react-router-dom";

function Profile() {
   // Objets
   const { status, idUser } = useStatus();
   const [userPlaces, setUserPlaces] = useState([]);
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [birthday, setAge] = useState("");
   const [pseudo, setPseudo] = useState("");
   const [edit, setEdit] = useState(false);

   async function getDataProfile() {
      try {
         const token = localStorage.getItem("token"); // Récupération du token depuis le localStorage

         if (token) {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
               },
            });

            if (response.ok) {
               const data = await response.json();
               setFirstName(data.firstname);
               setLastName(data.lastname);
               setEmail(data.email);
               setAge(data.birthday);
               setPseudo(data.pseudo);
            } else {
               console.error("Failed to get user data");
            }
         } else {
            console.error("Le token n'est pas présent dans le localStorage");
         }
      } catch (error) {
         console.error("Error:", error);
      }
   }

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
         setFirstName(user.firstName);
         setLastName(user.lastName);
         setEmail(user.email);
         setAge(user.birthday);
         setPseudo(user.pseudo);
      } else {
         getDataProfile();
      }
      getUserPlaces();
   }, []);

   async function updateDataProfile() {
      const options = {
         method: "PUT", // Utilisation de la méthode PUT
         headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
         },
         body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            email: email,
            birthday: birthday,
            pseudo: pseudo,
         }),
      };

      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/user/profile/update`, options);
         if (response.ok) {
            const data = await response.json();
            console.log(data);
         } else {
            console.error("Impossible d'update les données utilisateur");
         }
      } catch (error) {
         console.error("Error:", error);
      }
   }

   function handleClickEdit() {
      if (edit) {
         updateDataProfile();
      }
      setEdit(!edit);
   }

   const getUserPlaces = async () => {
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/places`);
         const data = await response.json();
         setUserPlaces(data.places.filter((place) => place.user_id === idUser));
      } catch (e) {
         const $message = "Erreur dans la récupération du fetch";
         console.log($message);
      }
   };

   const renderUserPlaces = () => {
      return userPlaces?.map((element, index) => {
         const stars = [];
         for (let i = 1; i <= element.average_rating; i++) {
            stars.push(<span key={i}>⭐</span>);
         }
         return (
            <>
               <Link to={`/DetailsPlace/${element.id}`} state={element.id} style={{ textDecoration: "none" }}>
                  <div className="placeContainer" key={index}>
                     <img className="placeImageElement" src={element.image} />
                     <div className="placeElement">
                        <p className="placeNameElement">{element.name}</p>
                        <p className="placeCityElement">{element.city}</p>
                        <div className="categoriesContainer">
                           {element.categories.map((element, index) => (
                              <p className="placeCategoriesElement" key={index}>
                                 #{element.name}
                              </p>
                           ))}
                        </div>
                        <div className="avgRateContainer">
                           {element.average_rating}
                           {stars}({element.total_rates})
                        </div>
                     </div>
                  </div>
               </Link>
            </>
         );
      });
   };

   return (
      <>
         <nav>
            <Navbar />
         </nav>
         <section>
            <div className="prform">
               {edit === false ? (
                  <>
                     <h2 className="title">Mon Profil d'utilisateur</h2>
                     {/* Render user information */}
                     <div className="pform">
                        <label>Nom:</label>
                        <div className="input-formP">{lastName}</div>
                        <label>Prénom:</label>
                        <div className="input-formP">{firstName}</div>
                        <label>Date de Naissance:</label>
                        <div className="input-formP">{birthday}</div>
                        <label>Pseudo:</label>
                        <div className="input-formP">{pseudo}</div>
                        <label>Email:</label>
                        <div className="input-formP">{email}</div>
                        <button className="btn-edit" onClick={handleClickEdit}>
                           Modifier
                        </button>
                     </div>
                  </>
               ) : (
                  <>
                     <div className="pform">
                        <h2 className="title">Modifier Mon Profil d'utilisateur</h2>
                        <label>Nom:</label>
                        <input className="input-formP" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <label>Prénom:</label>
                        <input className="input-formP" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <label>Date de naissance:</label>
                        <input className="input-formP" type="text" value={birthday} onChange={(e) => setAge(e.target.value)} />
                        <label> Pseudo:</label>
                        <input className="input-formP" type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                        <label>Email:</label>
                        <input className="input-formP" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <div>
                           <button className="btn-edit" onClick={handleClickEdit}>
                              Valider
                           </button>
                        </div>
                     </div>
                  </>
               )}
            </div>
            {status === 1 ? (
               <>
                  <div className="userPlaces">
                     <h1>Vos lieux publiés</h1>
                     <Link to="/create">
                        <button className="btnCreate">Publier un nouveau lieu</button>
                     </Link>
                     {renderUserPlaces()}
                  </div>
               </>
            ) : null}
         </section>
         <footer>
            <Footer />
         </footer>
      </>
   );
}

export default Profile;
