import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import Footer from "../footer/footer";
import Navbar from "../layouts/NavBar";

function Home() {
   const [places, setPlaces] = useState([]);
   const [categories, setCategories] = useState([]);
   const [selectedCity, setSelectedCity] = useState("");
   const [selectedCategories, setSelectedCategories] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");

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
      const filteredPlaces = places.filter((element) => {
         // Filtrer par ville
         const cityFilter = selectedCity === "" || element.city === selectedCity;

         // Filtrer par catégories
         const categoryFilter = selectedCategories.length === 0 || selectedCategories.every((category) => element.categories.some((placeCategory) => placeCategory.name === category));

         // Filtrer par terme de recherche
         const searchFilter = element.name.toLowerCase().includes(searchTerm.toLowerCase());

         return cityFilter && categoryFilter && searchFilter;
      });
      return filteredPlaces?.map((element, index) => {
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
                     </div>
                  </div>
               </Link>
            </>
         );
      });
   };

   const handleCityChange = (event) => {
      setSelectedCity(event.target.value);
   };

   const filterCity = () => {
      return (
         <>
            <option value="" onChange={handleCityChange}>
               Toutes les villes
            </option>
            {places?.map((element) => (
               <option key={element.city} value={element.city} onChange={handleCityChange}>
                  {element.city}
               </option>
            ))}
         </>
      );
   };

   const handleCategoryChange = (event) => {
      const categoryName = event.target.nextSibling.textContent;
      if (event.target.checked) {
         setSelectedCategories((prevSelectedCategories) => [...prevSelectedCategories, categoryName]);
      } else {
         setSelectedCategories((prevSelectedCategories) => prevSelectedCategories.filter((category) => category !== categoryName));
      }
   };

   const filterCategories = () => {
      return (
         <>
            {categories?.map((element, index) => (
               <div className="elementCategoriesFilter" key={index}>
                  <input type="checkbox" onChange={handleCategoryChange} checked={selectedCategories.includes(element.name)} />
                  <span>{element.name}</span>
               </div>
            ))}
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
                  <input type="text" className="filterSearch" placeholder="Rechercher" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
               </div>
               <div className="renderHomeContainer2">
                  <div className="filter2">
                     <div className="cityFilter">
                        <h4 className="categoriesFilterTitle">Choisir une ville :</h4>
                        <select className="categoriesFilterCity" onChange={handleCityChange}>
                           {filterCity()}
                        </select>
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
