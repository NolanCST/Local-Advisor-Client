import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../layouts/NavBar";
import Footer from "../footer/footer";
import "./modifyPlace.css";

function ModifyPlace() {
    const navigate = useNavigate();
    const placeId = useLocation().state[0];
    const name = useLocation().state[1];
    const description = useLocation().state[2];
    const address = useLocation().state[3];
    const zip_code = useLocation().state[4];
    const city = useLocation().state[5];

    const [editedData, setEditedData] = useState({
        name: name,
        address: address,
        city: city,
        zip_code: zip_code,
        description: description,
    });

    const handleSubmit = async (e) => {
        console.log(editedData);
        e.preventDefault();
        try {
            let options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    name: editedData.name,
                    address: editedData.address,
                    zip_code: editedData.zip_code,
                    city: editedData.city,
                    description: editedData.description,
                }),
            };

            const result = await fetch(
                `${import.meta.env.VITE_API_URL}/places/${placeId}`,
                options
            );
            const data = await result.json();
            alert("Votre lieu a bien été modifié");
            navigate(`/`);
            // navigate(`/DetailsPlace/${placeId}`);
            // navigate(`<DetailsPlace />`);
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
                <section>
                    <form
                        encType="multipart/form-data"
                        className="place-form"
                        onSubmit={handleSubmit}
                    >
                        <h3>Modification de l'activité:</h3>
                        <label htmlFor="name">Titre de l'activité:</label>
                        <input
                            className="form-input"
                            type="text"
                            name="name"
                            defaultValue={name}
                            onChange={handleChange}
                        />
                        <label htmlFor="address">Adresse:</label>
                        <input
                            className="form-input"
                            type="text"
                            name="address"
                            defaultValue={address}
                            onChange={handleChange}
                        />
                        <label htmlFor="city">Code postal:</label>
                        <input
                            className="form-input"
                            type="number"
                            name="zip_code"
                            defaultValue={zip_code}
                            onChange={handleChange}
                        />
                        <label htmlFor="city">Ville:</label>
                        <input
                            className="form-input"
                            type="text"
                            name="city"
                            defaultValue={city}
                            onChange={handleChange}
                        />
                        <label htmlFor="description">Description:</label>
                        <textarea
                            name="description"
                            className="size-textarea"
                            defaultValue={description}
                            onChange={handleChange}
                        ></textarea>
                        <div className="btn-center">
                            <input type="submit" value="Enregistrer" />
                        </div>
                        <div className="btn-center">
                            <button
                                type="button"
                                onClick={
                                    () => navigate(`/`)
                                    // navigate(`/DetailsPlace/${placeId}`)
                                }
                            >
                                Annuler
                            </button>
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
