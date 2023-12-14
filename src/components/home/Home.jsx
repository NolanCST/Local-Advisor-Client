import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import Footer from "../footer/footer";

function Home() {
   const [places, setPlaces] = useState([]);

   const recupPlaces = async () => {
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/places`);
         const data = await response.json();
         setPlaces(data);
      } catch (e) {
         const $message = "Erreur dans la récupération du fetch";
         console.log($message);
      }
   };

   useEffect(() => {
      recupPlaces();
   }, []);

   const renderPlaces = () => {
      return places?.map((element, index) => {
         console.log(element.categories);
         return (
            <>
               <Link to={`/DetailsPlace/${element.id}`} state={element.id} style={{ textDecoration: "none" }}>
                  <div className="placeContainer" key={index}>
                     <img className="placeImageElement" />
                     <div className="placeElement">
                        <p className="placeNameElement">{element.name}</p>
                        <p className="placeCityElement">{element.city}</p>
                        {/* <div className="categoriesContainer">
                           {element.categories.map((element, index) => (
                              <p className="placeCategoriesElement" key={index}>
                                 #{element.name}
                              </p>
                           ))}
                        </div> */}
                     </div>
                  </div>
               </Link>
            </>
         );
      });
   };

   return (
      <div className="homeContainer">
         <div>{/* Emplacement navbar */}</div>
         <section>
            <h1 className="placeTitle">LocalAdvisor</h1>
            <div className="renderHomeContainer">
               <div className="filter1"></div>
               <div className="renderHomeContainer2">
                  <div className="filter2"></div>
                  <div className="renderPlacesContainer">{renderPlaces()}</div>
               </div>
            </div>
         </section>
        <Footer/>
      </div>
   );
}
export default Home;
