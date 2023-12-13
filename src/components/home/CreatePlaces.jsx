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
   const [selectedCategories, setSelectedCategories] = useState([]);

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleFile = (e) => {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
   };

   const handleCategoryChange = (e) => {
      const selectedCategory = parseInt(e.target.value);
      console.log(selectedCategory);
      if (!selectedCategories.includes(selectedCategory)) {
         setSelectedCategories([...selectedCategories, selectedCategory]);
      }
      console.log(selectedCategories);
   };

   const handleRemoveCategory = (categoryToRemove) => {
      const updatedCategories = selectedCategories.filter((category) => category !== categoryToRemove);
      setSelectedCategories(updatedCategories);
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
      console.log(selectedCategories);
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("zip_code", formData.zip_code);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("categories", JSON.stringify(selectedCategories));
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
      <div className="CreatePlacesContainer">
         <div className="wrapper">
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
               <label htmlFor="name">Titre de l'activité:</label>
               <input type="text" name="name" onChange={handleChange} />
               <label htmlFor="address">Adresse:</label>
               <input type="text" name="address" onChange={handleChange} />
               <label htmlFor="city">Ville:</label>
               <input type="text" name="city" onChange={handleChange} />
               <label htmlFor="zip_code">Code Postal:</label>
               <input type="number" name="zip_code" onChange={handleChange} />
               <label htmlFor="categories">Catégories:</label>
               <select name="categories" onChange={handleCategoryChange} multiple>
                  {renderCategories()}
               </select>

               <div>
                  <p>Catégories sélectionnées:</p>
                  <ul>
                     {selectedCategories.map((category) => (
                        <li key={category}>
                           {category}
                           <button onClick={() => handleRemoveCategory(category)}>Retirer</button>
                        </li>
                     ))}
                  </ul>
               </div>

               <label htmlFor="description">Description:</label>
               <textarea name="description" onChange={handleChange}></textarea>
               <label htmlFor="image">Sélectionner une image:</label>
               <input type="file" name="image" onChange={handleFile} />
               <button type="submit">Enregistrer</button>
            </form>
         </div>
      </div>
   );
}

export default CreatePlaces;
