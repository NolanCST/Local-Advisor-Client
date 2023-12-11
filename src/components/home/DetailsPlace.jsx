import { useEffect, useState } from "react";
import "./detailsPlace.css";
import { useLocation } from "react-router-dom";

function DetailsPlace() {
  const [places, setPlaces] = useState([]);
  const placeId = useLocation().state;

  const recupPlace = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/place/${places}`
      );
      const data = await response.json();
      setPlaces(data);
      // console.log(data);
    } catch (e) {
      const $message = "Erreur dans la récupération du fetch";
      // console.log($message);
    }
  };

  useEffect(() => {
    recupPlace();
  }, []);

  const renderPlace = () => {
    return places
      ?.filter((place) => place.id == placeId)
      .map((place) => {
        return (
          <div key={place.id}>
            <p>Nom de l'établissement : {place.name}</p>
            <p>Adresse : {place.address}</p>
            <p>Code postal : {place.zip_code}</p>
            <p>Ville: {place.city}</p>
            <p>Description : {place.description}</p>
            {/* <p>{place.image}</p> */}
          </div>
        );
      });
  };

  async function handleDelete(event) {
    let result = await fetch(
      `${import.meta.env.VITE_API_URL}/destroy/${placeId}`,
      {
        method: "DELETE",
      }
    );
    result = await result.json();
    console.warn(result);
    window.location.href = "/";
  }

  return (
    <div className="detailsPlaceContainer">
      <div>{/* Emplacement navbar */}</div>
      <section>
        <h1>Détails du lieu</h1>
        <div>{renderPlace()}</div>
        <button onClick={handleDelete}>Supprimer</button>
      </section>
      <footer>{/* emplacement footer */}</footer>
    </div>
  );
}

export default DetailsPlace;
