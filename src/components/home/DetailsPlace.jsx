import { useEffect, useState } from "react";
import "./detailsPlace.css";
import { useLocation } from "react-router-dom";
import Navbar from "../layouts/NavBar";
import Footer from "../footer/footer";
import Vote from "./vote";

function DetailsPlace() {
   const placeId = useLocation().state;
   const [place, setPlace] = useState([]);
   const [ratings, setRatings] = useState([]);
   const [avgRating, setAvgRating] = useState("");
   const [avgStarRating, setAvgStarRating] = useState("");
   const [ratingsCount, setRatingsCount] = useState("");
   const [review, setReview] = useState([]);
   const [rate, setRate] = useState([]);
   const [imgRate, setImgRate] = useState({});
   const token = localStorage.getItem("token");

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
      try {
         const result = await fetch(`${import.meta.env.VITE_API_URL}/places/${place[0].id}`, {
            method: "DELETE",
         });
         const data = await result.json();
         console.warn(data);
      } catch (error) {
         console.error("Erreur dans la suppression de l'avis", error);
      }
   };

   const renderPlace = () => {
      return (
         <>
            <div className="elementPlaceContainer">
               {place.map((element, index) => {
                  return (
                     <>
                        <div className="detailsPlaceLeftSection" key={index}>
                           <img className="detailsPlaceImage" src={element.image} />;
                           <div className="averageRate">
                              Note générale: {avgRating} {renderStarRates()} ({ratingsCount})
                           </div>
                           <div className="detailsPlaceBtnModif">
                              <button className="btnEdit" onClick={handleDelete}>
                                 Supprimer
                              </button>
                           </div>
                        </div>
                        ;
                        <div className="elementDetailsPlaceContainer">
                           <h1 className="detailsPlaceTilte">{element.name}</h1>
                           <p className="detailsPlaceDescription">{element.description}</p>
                           <div className="categoriesDetailsPlace">
                              {element.categories.map((element, index) => {
                                 return (
                                    <>
                                       <div key={index}>
                                          <h5>#{element.name}</h5>
                                       </div>
                                    </>
                                 );
                              })}
                           </div>
                           <div className="precisionDetailsPlace">
                              <div className="mapsDetailsPlace">Future maps</div>
                              <div className="addressDetailsPlace">
                                 <h4>{element.address}</h4>
                                 <h4>{element.zip_code}</h4>
                                 <h4>{element.city}</h4>
                              </div>
                           </div>
                        </div>
                        ;
                     </>
                  );
               })}
            </div>
         </>
      );
   };

   const createRate = async (e) => {
      e.preventDefault();
      if (token) {
         let formData = new FormData();
         formData.append("image", imgRate); // Assurez-vous que imgRate est un objet de fichier
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
         } catch (error) {
            console.error("Error:", error);
         }
      } else {
         console.log("Vous devez être connecté en tant que membre pour mettre un commentaire");
      }
   };

   const renderRates = () => {
      return ratings?.map((element, index) => {
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
               <div className="renderStarRate">{stars}</div>
               <img className="renderImgRate" src={renderImgRate} />
               <p>{element.review}</p>
               <button className="btnDeleteRate" onClick={() => deleteRate(rateId)}>
                  🗑️
               </button>
               <Vote />
            </div>
         );
      });
   };

   const renderStarRates = () => {
      let $stars = 0;
      let $renderStars = "";
      while ($stars < avgStarRating) {
         $renderStars += "⭐";
         $stars++;
      }
      return $renderStars;
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
         <nav>
            <Navbar />
         </nav>
         <div className="detailsPlaceContainer">
            <section>
               <div className="showContainer">{renderPlace()}</div>
            </section>
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
         </div>
         <footer>
            <Footer />
         </footer>
      </>
   );
}

export default DetailsPlace;
