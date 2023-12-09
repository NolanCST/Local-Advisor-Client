import { useEffect, useState } from "react";
import "./detailsPlace.css";

function DetailsPlace() {
   const [place, setPlace] = useState([]);

   const recupPlace = async () => {
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/place/${place}`);
         const data = await response.json();
         setPlace(data);
         console.log(data);
      } catch (e) {
         const $message = "Erreur dans la récupération du fetch";
         console.log($message);
      }
   };

   useEffect(() => {
      recupPlace();
   }, []);

   const renderPlace = () => {
      return place?.map((element, index) => {
         return (
            <div key={index}>
               <p>{element.name}</p>
               <p>{element.address}</p>
               <p>{element.zip_code}</p>
               <p>{element.city}</p>
               <p>{element.description}</p>
               {/* <p>{element.image}</p> */}
            </div>
         );
      });
   };

   return (
      <div className="detailsPlaceContainer">
         <div>{/* Emplacement navbar */}</div>
         <section>
            <h1>Détails du lieu</h1>
            <div>{renderPlace()}</div>
         </section>
         <footer>{/* emplacement footer */}</footer>
      </div>
   );
}
export default DetailsPlace;
