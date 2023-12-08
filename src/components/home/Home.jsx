import { useEffect, useState } from "react";
import "./home.css";

function Home() {
  const [places, setPlaces] = useState([]);

  const recupPlace = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/place`);
      const data = await response.json();
      setPlaces(data);
      console.log(data);
    } catch (e) {
      const $message = "FUCK";
      console.log($message);
    }
  };

  useEffect(() => {
    recupPlace();
  }, []);

  const renderPlaces = () => {
    return places?.map((element, index) => {
      return (
        <div key={index}>
          <p>{element.name}</p>
          <p>{element.address}</p>
          <p>{element.zip_code}</p>
          <p>{element.city}</p>
          <p>{element.description}</p>
          {/* <p>{element.image}</p> */}
        </div>
      );
    });
  };

  return (
    <div className="homeContainer">
      <div>{/* Emplacement navbar */}</div>
      <section>
        <h1>LocalAdvisor</h1>
        <div>{renderPlaces()}</div>
      </section>
      <footer>{/* emplacement footer */}</footer>
    </div>
  );
}
export default Home;
