import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../layouts/NavBar";
import Footer from "../footer/footer";
import "./modifyPlace.css";

function ModifyPlace() {
    const placeId = useLocation().state;
    console.log(placeId);
    const [place, setPlace] = useState([]);
    const [editedData, setEditedData] = useState({
        address: "",
        city: "",
        zip_code: "",
        description: "",
    });

    const handleUpdate = async () => {};
    useEffect(() => {
        if (placeId) {
            const recupPlace = async () => {
                try {
                    const response = await fetch(
                        `${import.meta.env.VITE_API_URL}/places/${placeId}`
                    );
                    const data = await response.json();
                    setEditedData({
                        name: data.name,
                        address: data.address,
                        zip_code: data.zip_code,
                        city: data.city,
                        description: data.description,
                    });
                } catch (e) {
                    const $message = "Erreur dans la récupération du fetch";
                    console.log($message);
                }
            };

            recupPlace();
        }
    }, [placeId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("address", editedData.address);
            formData.append("city", editedData.city);
            formData.append("zip_code", editedData.zip_code);
            formData.append("description", editedData.description);

            const result = await fetch(
                `${import.meta.env.VITE_API_URL}/places/${placeId}`,
                {
                    method: "PUT",
                    body: formData,
                }
            );
            const data = await result.json();
            console.warn(data);
        } catch (error) {
            console.error("Erreur dans la mise à jour du lieu", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    return (
        <>
            <nav>
                <Navbar />
            </nav>
            <div className="modifyPlaceContainer">
                <h3>Modification du lieu</h3>
                <section>
                    <form
                        encType="multipart/form-data"
                        className="place-form"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="name">Titre de l'activité:</label>
                        <input
                            className="form-input"
                            type="text"
                            name="name"
                            onChange={handleChange}
                        />
                        <label htmlFor="city">Ville:</label>
                        <input
                            className="form-input"
                            type="text"
                            name="city"
                            onChange={handleChange}
                        />
                        <label htmlFor="address">Adresse:</label>
                        <input
                            className="form-input"
                            type="text"
                            name="address"
                            onChange={handleChange}
                        />
                        <label htmlFor="city">Code postal:</label>
                        <input
                            className="form-input"
                            type="number"
                            name="zip_code"
                            onChange={handleChange}
                        />
                        <label htmlFor="description">Description:</label>
                        <textarea
                            name="description"
                            className="size-textarea"
                            onChange={handleChange}
                        ></textarea>
                        <div className="btn-center">
                            <button onClick={handleUpdate}>Enregistrer</button>
                        </div>
                    </form>
                </section>
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default ModifyPlace;
