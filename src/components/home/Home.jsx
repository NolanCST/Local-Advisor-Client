import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import Footer from "../footer/footer";
import Navbar from "../layouts/NavBar";

function Home() {
   const [places, setPlaces] = useState([]);
   const [categories, setCategories] = useState([]);

   const recupPlaces = async () => {
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/places`);
         const data = await response.json();
         setPlaces(data.places);
         setCategories(data.categories);
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
         return (
            <>
               <Link to={`/DetailsPlace/${element.id}`} state={element.id} style={{ textDecoration: "none" }}>
                  <div className="placeContainer" key={index}>
                     <img className="placeImageElement" />
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
                     </div>
                  </div>
               </Link>
            </>
         );
      });
   };

   const filterCity = () => {
      return (
         <>
            {places?.map((element) => {
               return <option>{element.city}</option>;
            })}
         </>
      );
   };

   const filterCategories = () => {
      return (
         <>
            {categories?.map((element, index) => {
               return (
                  <div className="elementCategoriesFilter" key={index}>
                     <input type="checkbox" />
                     <span>{element.name}</span>
                  </div>
               );
            })}
         </>
      );
   };

   return (
      <div className="homeContainer">
         <nav>
            <Navbar />
         </nav>
         <section>
            <h1 className="placeTitle">LocalAdvisor</h1>
            <div className="renderHomeContainer">
               <div className="filter1">
                  <input type="text" className="filterSearch" placeholder="Rechercher" />
               </div>
               <div className="renderHomeContainer2">
                  <div className="filter2">
                     <div className="cityFilter">
                        <h4 className="categoriesFilterTitle">Choisir une ville :</h4>
                        <select className="categoriesFilterCity">{filterCity()}</select>
                     </div>
                     <div className="categoriesFilter">
                        <h4 className="categoriesFilterTitle">Choisir des categories :</h4>
                        {filterCategories()}
                     </div>
                  </div>
                  <div className="renderPlacesContainer">{renderPlaces()}</div>
               </div>
            </div>
         </section>
         <footer>
            <Footer />
         </footer>
      </div>
   );
}
export default Home;
