import { useEffect, useState } from "react";
import "./detailsPlace.css";

function DetailsPlace() {
  const [place, setPlace] = useState([]);

  const recupPlace = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/place/${place}`
      );
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
          <p>Nom de l'établissement : {element.name}</p>
          <p>Adresse : {element.address}</p>
          <p>Code postal : {element.zip_code}</p>
          <p>Ville: {element.city}</p>
          <p>Description : {element.description}</p>
          {/* <p>{element.image}</p> */}
        </div>
      );
    });
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/DetailsPlace/${place.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response == true) {
        console.log("Lieu supprimé avec succès");
      } else {
        console.log("ntm coté react");
      }
    } catch (e) {
      console.error("Erreur lors de la suppression du lieu", e);
    }
  };

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
