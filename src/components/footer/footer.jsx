import React from "react";
import "./footer.css";

function Footer() {
  return (
    <>
      <div className="container">
        <div >
          <img className='logo'href="/"
            src="src\components\layouts\Corgi_guge-removebg-preview.png"
          />
        </div>
        <div className="infos">
          <strong><u>Contact :</u></strong><br/><br/>
          <a href="tel:0493624458">Téléphone: 0493624458</a><br />
          <a href="mailto:community@lebocal.academy">community@lebocal.academy</a><br />
          <a href="https://www.google.com/maps/place/26+Bd+Carabacel,+06000+Nice/@43.7042617,7.2743648,17z/data=!3m1!4b1!4m6!3m5!1s0x12cddaafbc1f660f:0x665cc91f30f6b249!8m2!3d43.7042617!4d7.2743648!16s%2Fg%2F11c1klq5c7?entry=ttu" target="_blank">26 boulevard Carabacel 06000 Nice</a>
        </div>
        <nav className='links'>
          <div>
            <a href="/">Accueil</a>
          </div>
          <div>
            <a href="/create">Publier un lieu</a>
          </div>
          <div>
            <a href="/profile">Voir mon profil</a>
          </div>
          <div>
            <a href="/logout">se déconnecter </a>
          </div>
        </nav>
      </div>
      <div className='copy'>
        &copy; Nolan Costa, Andréa Baglieri, Luc Amartino & Louis-Adrien Debey
      </div>
    </>
  );
}

export default Footer;
