import { useEffect, useState } from "react";
import "./CreatePlaces.css";

function CreatePlaces() {
   const [formData, setFormData] = useState({
      name: "",
      address: "",
      city: "",
      zip_code: "",
      description: "",
      categories: [],
      image: null,
   });
   const [categories, setCategories] = useState([]);
   const [selectedCategoriesId, setSelectedCategoriesId] = useState([]);
   const [selectedCategoriesName, setSelectedCategoriesName] = useState([]);

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleFile = (e) => {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
   };

   const handleCategoryChange = (e) => {
      const selectedCategory = parseInt(e.target.value);
      if (!selectedCategoriesId.includes(selectedCategory)) {
         setSelectedCategoriesId([...selectedCategoriesId, selectedCategory]);
         const selectedCategoryName = categories.find((category) => category.id === selectedCategory)?.name;
         setSelectedCategoriesName([...selectedCategoriesName, selectedCategoryName]);
      }
      console.log(selectedCategoriesId);
   };

   const handleRemoveCategory = (categoryToRemove) => {
      const updatedCategories = selectedCategoriesId.filter((category) => category !== categoryToRemove);
      const updatedCategoriesName = selectedCategoriesName.filter((category) => category !== categoryToRemove);
      setSelectedCategoriesId(updatedCategories);
      setSelectedCategoriesName(updatedCategoriesName);
   };

   const recupCategories = async () => {
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/places/create`);
         const data = await response.json();
         setCategories(data);
      } catch (error) {
         console.error("Erreur lors de la recuperation des categories", error);
      }
   };

   useEffect(() => {
      recupCategories();
   }, []);

   const renderCategories = () => {
      return categories?.map((element, index) => {
         return (
            <option key={index} value={element.id}>
               {element.name}
            </option>
         );
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(selectedCategoriesId);
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("zip_code", formData.zip_code);
      formDataToSend.append("description", formData.description);
      for (var i = 0; i < selectedCategoriesId.length; i++) {
         formDataToSend.append("categories[]", selectedCategoriesId[i]);
      }
      // formDataToSend.append("categories", selectedCategoriesId);
      formDataToSend.append("user_id", 1);
      // formDataToSend.append("image", formData.image);
      try {
         console.log(formDataToSend);
         const response = await fetch(`${import.meta.env.VITE_API_URL}/places`, {
            method: "POST",
            body: formDataToSend,
         });

         const responseData = await response.json();
         if (response.ok) {
            console.log("Création réussie:", responseData);
         } else {
            console.error("Erreur lors de la création:", responseData || response.statusText);
         }
      } catch (error) {
         console.error("Erreur lors de la création:", error);
      }
   };

  return (
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
          <select className="form-input" name="categories" onChange={handleCategoryChange} multiple>
                  {renderCategories()}
               </select>

               <div>
                  <p>Catégories sélectionnées:</p>
                  <ul>
                     {selectedCategoriesName.map((category) => (
                        <li key={category}>
                           {category}
                           <button onClick={() => handleRemoveCategory(category)}>Retirer</button>
                        </li>
                     ))}
                  </ul>
               </div>
          <label htmlFor="description">Description:</label>
          <textarea name="description" className="size-textarea" onChange={handleChange}></textarea>
          <label htmlFor="image">Sélectionner une image:</label>
          <input className="form-input" type="file" name="image" onChange={handleFile} />
         <div className="btn-center">
          <button type="submit" className="submit-btn">Enregistrer</button>
       </div>
        </form>
  );
}

export default CreatePlaces;
