import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
   const [places, setPlaces] = useState([]);

   const recupPlaces = async () => {
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/place`);
         const data = await response.json();
         setPlaces(data);
         console.log(data);
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
            <div key={index}>
               <Link to={`/DetailsPlace/${element.id}`}>
                  <p>{element.name}</p>
                  <p>{element.address}</p>
                  <p>{element.zip_code}</p>
                  <p>{element.city}</p>
                  <p>{element.description}</p>
                  {/* <p>{element.image}</p> */}
               </Link>
            </div>
         );
      });
   };

   return (
      <div className="homeContainer">
         <div>{/* Emplacement navbar */}</div>
         <section>
            <h1>LocalAdvisor</h1>
            <div>{renderPlaces()}</div>
         </section>
         <footer>{/* emplacement footer */}</footer>
      </div>
   );
}
export default Home;
