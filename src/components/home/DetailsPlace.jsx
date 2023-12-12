import { useEffect, useState } from "react";
import "./detailsPlace.css";
import { useLocation } from "react-router-dom";

function DetailsPlace() {
   const placeId = useLocation().state;
   const [place, setPlace] = useState([]);
   const [ratings, setRatings] = useState([]);
   const [avgRating, setAvgRating] = useState([]);
   const [avgStarRating, setAvgStarRating] = useState([]);
   const [ratingsCount, setRatingsCount] = useState([]);
   const [review, setReview] = useState([]);
   const [rate, setRate] = useState([]);

   const recupPlace = async () => {
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/places/${placeId}`);
         const data = await response.json();
         setPlace(data.place);
         setRatings(data.ratings);
         setAvgRating(data.avgRating);
         setAvgStarRating(data.avgStarRating);
         setRatingsCount(data.ratingsCount);
      } catch (e) {
         const $message = "Erreur dans la récupération du fetch";
         console.log($message);
      }
   };

   useEffect(() => {
      recupPlace();
   }, []);

   const handleDelete = async () => {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/destroy/${placeId}`, {
         method: "DELETE",
      });
      result = await result.json();
      console.warn(result);
      window.location.href = "/";
   };

   const renderPlace = () => {
      return (
         <div>
            <p>Nom de l'établissement : {place.name}</p>
            <p>Adresse : {place.address}</p>
            <p>Code postal : {place.zip_code}</p>
            <p>Ville: {place.city}</p>
            <p>Description : {place.description}</p>
            {/* <p>{place.image}</p> */}
         </div>
      );
   };

   const createRate = async (e) => {
      e.preventDefault();
      let options = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            review: review,
            rate: rate,
            place_id: place.id,
            user_id: 1,
         }),
      };
      await fetch(`${import.meta.env.VITE_API_URL}/rates/create`, options)
         .then((response) => response.json())
         .then((data) => {
            if (data.success) {
               alert("Votre avis a bien ete pris en compte");
            } else {
               alert(data.message);
            }
         });
   };

   const renderRates = () => {
      return ratings?.map((element, index) => {
         const rateId = element.id;
         const stars = [];

         for (let i = 0; i < element.rate; i++) {
            stars.push(<span key={i}>⭐</span>);
         }
         return (
            <div key={index}>
               {stars}
               <p>{element.review}</p>
               <button onClick={() => deleteRate(rateId)}>Supprimer</button>
            </div>
         );
      });
   };

   const deleteRate = async (rateId) => {
      try {
         const result = await fetch(`${import.meta.env.VITE_API_URL}/rates/${rateId}`, {
            method: "DELETE",
         });
         const data = await result.json();
         console.warn(data);
      } catch (error) {
         console.error("Erreur dans la suppression de l'avis", error);
      }
   };

   return (
      <>
         <div className="detailsPlaceContainer">
            <div>{/* Emplacement navbar */}</div>
            <section>
               <h1>Détails du lieu</h1>
               <div>{renderPlace()}</div>
               <button onClick={handleDelete}>Supprimer</button>
            </section>
            <section>
               <div id="review">
                  <div className="span1">
                     <h2 className="titleComment">Donnez nous votre avis !</h2>
                     <form className="form-horizontal" id="ratingForm" onSubmit={createRate} name="ratingForm">
                        <label>Votre note</label>
                        <div className="rate">
                           <input type="radio" id="star5" name="rate" value="5" onChange={(e) => setRate(e.target.value)} />
                           <label htmlFor="star5" title="5">
                              5 stars
                           </label>
                           <input type="radio" id="star4" name="rate" value="4" onChange={(e) => setRate(e.target.value)} />
                           <label htmlFor="star4" title="4">
                              4 stars
                           </label>
                           <input type="radio" id="star3" name="rate" value="3" onChange={(e) => setRate(e.target.value)} />
                           <label htmlFor="star3" title="3">
                              3 stars
                           </label>
                           <input type="radio" id="star2" name="rate" value="2" onChange={(e) => setRate(e.target.value)} />
                           <label htmlFor="star2" title="2">
                              2 stars
                           </label>
                           <input type="radio" id="star1" name="rate" value="1" onChange={(e) => setRate(e.target.value)} />
                           <label htmlFor="star1" title="1">
                              1 star
                           </label>
                        </div>
                        <div className="form-group">
                           <label>Votre commentaire</label>
                           <textarea className="commentArea" name="review" onChange={(e) => setReview(e.target.value)} required></textarea>
                        </div>
                        <div className="form-group">
                           <input type="submit" value="Envoyer" />
                        </div>
                     </form>
                  </div>
                  <div className="span2">
                     <h2 className="titleComment">Commentaires</h2>
                     <div>{renderRates()}</div>
                  </div>
               </div>
            </section>
            <footer>{/* emplacement footer */}</footer>
         </div>
      </>
   );
}

export default DetailsPlace;
