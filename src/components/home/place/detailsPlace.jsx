import { useState, useEffect } from "react";
import "./detailsPlace.css";

function Details() {
  const [places, setPlaces] = useState([]);

  const fetchPlaces = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/detailsPlace`
      );

      if (!response.ok) {
        throw new Error(`Erreur de réseau - ${response.status}`);
      }

      const data = await response.json();
      console.log(data.places);
      setPlaces(data.places);
    } catch (error) {
      console.error("Erreur : " + error);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  console.log("coucou", places);

  return (
    <div>
      {places.map((place) => (
        <div key={place.id}>
          <div>{"Nom de l'établissement : " + place.name}</div>
          <div>{"Adresse : " + place.address}</div>
          <div>{"Code postale: " + place.zip_code}</div>
          <div>{"Ville: " + place.city}</div>
          <div>{"Description: " + place.description}</div>
        </div>
      ))}
    </div>
  );
}

export default Details;
