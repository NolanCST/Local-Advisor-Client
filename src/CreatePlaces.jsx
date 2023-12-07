import { useState } from "react";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", PlaceData.name);
    formData.append("adress", PlaceData.adress);
    formData.append("city", PlaceData.city);
    formData.append("zip_code", PlaceData.zip_code);
    formData.append("categories", PlaceData.categories);
    formData.append("description", PlaceData.description);
    formData.append("image", PlaceData.image);

    try {
      const response = await fetch("http://LAPILARAVELSUPER", {
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
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" onChange={handleChange} />
          <input type="text" name="adress" onChange={handleChange} />
          <input type="text" name="city" onChange={handleChange} />
          <input type="number" name="zip_code" onChange={handleChange} />
          <input type="select" name="categories" onChange={handleChange} />
        </form>
      </div>
    </div>
  );
}
export default CreatePlaces;
