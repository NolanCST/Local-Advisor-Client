import { useEffect, useState } from "react";
import "./detailsPlace.css";
import { useLocation } from "react-router-dom";
import Navbar from "../layouts/NavBar";
import Footer from "../footer/footer";
import RenderRate from "./RenderRate";
import { useStatus } from "../status/StatusContext";

function DetailsPlace() {
   const { idUser } = useStatus();
   const placeId = useLocation().state;
   const [place, setPlace] = useState([]);
   const [ratings, setRatings] = useState([]);
   const [avgRating, setAvgRating] = useState("");
   const [avgStarRating, setAvgStarRating] = useState("");
   const [ratingsCount, setRatingsCount] = useState("");

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

   const renderStarRates = () => {
      let $stars = 0;
      let $renderStars = "";
      while ($stars < avgStarRating) {
         $renderStars += "⭐";
         $stars++;
      }
      return $renderStars;
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
                           {element.user_id === idUser ? (
                              <div className="detailsPlaceBtnModif">
                                 <button className="btnEdit" onClick={handleDelete}>
                                    Supprimer
                                 </button>
                              </div>
                           ) : null}
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
                     </>
                  );
               })}
            </div>
         </>
      );
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
            <RenderRate ratings={ratings} avgStarRating={avgStarRating} place={place} />
         </div>
         <footer>
            <Footer />
         </footer>
      </>
   );
}

export default DetailsPlace;
