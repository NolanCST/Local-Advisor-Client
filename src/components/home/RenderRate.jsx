import { useState } from "react";
import "./renderRate.css";
import Vote from "./vote";
import { useStatus } from "../status/StatusContext";

function RenderRate(props) {
   const { idUser } = useStatus();
   const [review, setReview] = useState("");
   const [rate, setRate] = useState([]);
   const [newReview, setNewReview] = useState("");
   const [newRate, setNewRate] = useState([]);
   const [imgRate, setImgRate] = useState({});
   const [editMode, setEditMode] = useState(-1);
   const token = localStorage.getItem("token");

   const createRate = async (e) => {
      const place = props.place;
      e.preventDefault();
      if (token) {
         let formData = new FormData();
         formData.append("image", imgRate);
         formData.append("review", review);
         formData.append("rate", rate);
         formData.append("place_id", place[0].id);

         let options = {
            method: "POST",
            headers: {
               Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: formData,
         };

         try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/rates`, options);
            const data = await response.json();

            if (data.success) {
               alert("Votre avis a bien été pris en compte");
            } else {
               alert(data.message);
            }
            window.location.reload();
         } catch (error) {
            console.error("Error:", error);
         }
      } else {
         console.log("Vous devez être connecté en tant que membre pour mettre un commentaire");
      }
   };

   const renderRates = () => {
      return props.ratings?.map((element, index) => {
         const rateId = element.id;
         const stars = [];
         let renderImgRate = "";

         for (let i = 0; i < element.rate; i++) {
            stars.push(<span key={i}>⭐</span>);
         }
         if (element.image != null) {
            renderImgRate = element.image;
         }

         return (
            <div className="renderRateDetailsPlace" key={index}>
               {editMode === rateId ? (
                  // Formulaire d'édition
                  <form encType="multipart/form-data" onSubmit={(e) => editRate(e, rateId)}>
                     <p>Votre note</p>
                     <input type="number" min="1" max="5" defaultValue={element.rate} onChange={(e) => setNewRate(e.target.value)} required />
                     <p>Votre commentaire</p>
                     <textarea defaultValue={element.review} onChange={(e) => setNewReview(e.target.value)}></textarea>
                     <button type="submit">Enregistrer</button>
                  </form>
               ) : (
                  // Contenu de l'avis
                  <div>
                     <div className="renderStarRate">{stars}</div>
                     <img className="renderImgRate" src={renderImgRate} />
                     <p>{element.review}</p>
                  </div>
               )}
               {element.user_id === idUser ? (
                  <div>
                     <button className="btnEditRate" onClick={() => enterEditMode(rateId)}>
                        ✏️
                     </button>
                     <button className="btnDeleteRate" onClick={() => deleteRate(rateId)}>
                        🗑️
                     </button>
                  </div>
               ) : null}
               <Vote />
            </div>
         );
      });
   };

   const enterEditMode = (rateId) => {
      setEditMode(rateId);
   };

   const editRate = async (e, rateId) => {
      e.preventDefault();

      let options = {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
         },
         body: JSON.stringify({
            review: newReview,
            rate: newRate,
         }),
      };

      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/rates/${rateId}`, options);
         const data = await response.json();
         if (data.success) {
            console.log("Votre avis a bien été modifié");
         }
         window.location.reload();
      } catch (error) {
         console.error(error);
      }
      setEditMode(-1);
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
         <section>
            <div id="review">
               <div className="span1">
                  <h2 className="titleComment">Donnez nous votre avis !</h2>
                  <form className="form-horizontal" id="ratingForm" encType="multipart/form-data" onSubmit={createRate} name="ratingForm">
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
                        <textarea className="commentArea" name="review" onChange={(e) => setReview(e.target.value)}></textarea>
                     </div>
                     <div className="form-group">
                        <input
                           className="imgRate"
                           type="file"
                           name="imgRate"
                           onChange={(e) => {
                              setImgRate(e.target.files[0]);
                           }}
                        />
                     </div>
                     <div className="form-group">
                        <input className="btnComment" type="submit" value="Envoyer" />
                     </div>
                  </form>
               </div>
               <div className="span2">
                  <h2 className="titleComment">Commentaires</h2>
                  <div>{renderRates()}</div>
               </div>
            </div>
         </section>
      </>
   );
}
export default RenderRate;
