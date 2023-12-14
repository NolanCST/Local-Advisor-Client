import { useState } from "react";
import "./CreatePlaces.css";

function CreatePlaces() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    zip_code: "",
    categories: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("zip_code", formData.zip_code);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("user_id", 1);
    // formDataToSend.append("image", formData.image);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/places`, {
        method: "POST",
        body: formDataToSend,
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Création réussie:", responseData);
      } else {
        console.error(
          "Erreur lors de la création:",
          responseData || response.statusText
        );
      }
    } catch (error) {
      console.error("Erreur lors de la création:", error);
    }
  };

  return (
    <div className="CreatePlacesContainer">
      <div className="wrapper">
        <form encType="multipart/form-data" className="place-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Titre de l'activité:</label>
          <input className="form-input" type="text" name="name" onChange={handleChange} />
          <label htmlFor="address">Adresse:</label>
          <input className="form-input" type="text" name="address" onChange={handleChange} />
          <label htmlFor="city">Ville:</label>
          <input className="form-input"type="text" name="city" onChange={handleChange} />
          <label htmlFor="zip_code">Code Postal:</label>
          <input className="form-input" type="number" name="zip_code" onChange={handleChange} />
          <label htmlFor="categories">Catégories:</label>
          <select className="form-input" name="categories" onChange={handleChange}>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            {/* Ajoutez plus d'options au besoin */}
          </select>
          <label htmlFor="description">Description:</label>
          <textarea name="description" onChange={handleChange}></textarea>
          <label htmlFor="image">Sélectionner une image:</label>
          <input className="form-input" type="file" name="image" onChange={handleFile} />
          <button type="submit" className="submit-btn">Enregistrer</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePlaces;
