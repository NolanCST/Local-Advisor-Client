import { useState } from "react";
import "./CreatePlaces.css";

function CreatePlaces() {
  const [formData, setFormData] = useState({
    name: "",
    adress: "",
    city: "",
    zip_code: "",
    categories: "",
    description: "",
    image: null,
  });
  9;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", formData.name);
    formData.append("adress", formData.adress);
    formData.append("city", formData.city);
    formData.append("zip_code", formData.zip_code);
    formData.append("categories", formData.categories);
    formData.append("description", formData.description);
    formData.append("image", formData.image);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/create`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Création réussie:", data);
      } else {
        console.error("Erreur lors de la création:", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la création:", error);
    }
  };

  return (
    <div className="CreatePlacesContainer">
      <div className="wrapper">
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <label htmlFor="name">Titre de l'activité:</label>
          <input type="text" name="name" onChange={handleChange} />
          <label htmlFor="adress">Adresse:</label>
          <input type="text" name="adress" onChange={handleChange} />
          <label htmlFor="city">Ville:</label>
          <input type="text" name="city" onChange={handleChange} />
          <label htmlFor="zip_code">Code Postal:</label>
          <input type="number" name="zip_code" onChange={handleChange} />
          <input type="select" name="categories" onChange={handleChange} />
          <label htmlFor="description">Description:</label>
          <input type="textarea" name="description" onChange={handleChange} />
          <label htmlFor="image">Sélectionner une image:</label>
          <input type="file" name="image" onChange={handleFile} />
          <button type="submit">Enregistrer</button>
        </form>
      </div>
    </div>
  );
}
export default CreatePlaces;
