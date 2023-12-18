import { useEffect, useState } from "react";
import "./CreatePlaces.css";
import Footer from "../footer/footer";
import Navbar from "../layouts/NavBar";

function CreatePlaces() {
   const [formData, setFormData] = useState({
      name: "",
      address: "",
      city: "",
      zip_code: "",
      description: "",
      categories: [],
      image: {},
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
   };

   const handleRemoveCategory = (categoryToRemove) => {
      // Trouver l'index de la catégorie à supprimer dans selectedCategoriesId
      const indexToRemove = selectedCategoriesName.indexOf(categoryToRemove);

      if (indexToRemove !== -1) {
         // Créer une copie des états actuels
         const updatedCategoriesId = [...selectedCategoriesId];
         const updatedCategoriesName = [...selectedCategoriesName];

         // Supprimer l'élément à l'index trouvé dans selectedCategoriesId
         updatedCategoriesId.splice(indexToRemove, 1);

         // Supprimer l'élément à l'index trouvé dans selectedCategoriesName
         updatedCategoriesName.splice(indexToRemove, 1);

         // Mettre à jour les états
         setSelectedCategoriesId(updatedCategoriesId);
         setSelectedCategoriesName(updatedCategoriesName);
      }
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
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("zip_code", formData.zip_code);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", formData.image);
      for (var i = 0; i < selectedCategoriesId.length; i++) {
         formDataToSend.append("categories[]", selectedCategoriesId[i]);
      }
      // formDataToSend.append("categories", selectedCategoriesId);
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
            console.error("Erreur lors de la création:", responseData || response.statusText);
         }
      } catch (error) {
         console.error("Erreur lors de la création:", error);
      }
   };

   return (
      <>
         <nav>
            <Navbar />
         </nav>
         <section>
            <form encType="multipart/form-data" className="place-form" onSubmit={handleSubmit}>
               <label htmlFor="name">Titre de l'activité:</label>
               <input className="form-input" type="text" name="name" onChange={handleChange} />
               <label htmlFor="address">Adresse:</label>
               <input className="form-input" type="text" name="address" onChange={handleChange} />
               <label htmlFor="city">Ville:</label>
               <input className="form-input" type="text" name="city" onChange={handleChange} />
               <label htmlFor="zip_code">Code Postal:</label>
               <input className="form-input" type="number" name="zip_code" onChange={handleChange} />
               <label htmlFor="categories">Catégories:</label>
               <select className="form-input" name="categories" onChange={handleCategoryChange} multiple>
                  {renderCategories()}
               </select>

               <div>
                  <label>Catégories sélectionnées:</label>
                  <ul>
                     {selectedCategoriesName.map((category, index) => (
                        <li key={index}>
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
                  <button type="submit" className="submit-btn">
                     Enregistrer
                  </button>
               </div>
            </form>
         </section>
         <footer>
            <Footer />
         </footer>
      </>
   );
}

export default CreatePlaces;
