import { useEffect, useState } from "react";
import "./detailsPlace.css";

function DetailsPlace() {
   const [place, setPlace] = useState([]);
   const [review, setReview] = useState([]);
   const [rate, setRate] = useState([]);

   const recupPlace = async () => {
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/place/${place}`);
         const data = await response.json();
         setPlace(data);
      } catch (e) {
         const $message = "Erreur dans la récupération du fetch";
         console.log($message);
      }
   };

   useEffect(() => {
      recupPlace();
   }, []);

   const renderPlace = () => {
      console.log(place);
      return place?.map((element, index) => {
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

   const getRate = async (e) => {
      e.prevenDefault();

      let options = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            review: review,
            rate: rate,
            place_id: place["id"],
         }),
      };

      await fetch(`${import.meta.env.VITE_API_URL}/rates/create`, options)
         .then((response) => response.json())
         .then((data) => {
            if (data.success) {
               alert("Votre avis a bien ete pris en compte");
            } else {
               alert(data.message);
            }
         });
   };

   return (
      <>
         <div className="detailsPlaceContainer">
            <div>{/* Emplacement navbar */}</div>
            <section>
               <h1>Détails du lieu</h1>
               <div>{renderPlace()}</div>
            </section>
            <footer>{/* emplacement footer */}</footer>
         </div>
         <div id="review">
            <div className="span1">
               <h2 className="titleComment">Donnez nous votre avis !</h2>
               <form className="form-horizontal" id="ratingForm" method="POST" action="" name="ratingForm">
                  <label>Votre note</label>
                  <div className="rate">
                     <input type="radio" id="star5" name="rate" value="5" onChange={(e) => setRate(e.target.value)} />
                     <label htmlFor="star5" title="5">
                        5 stars
                     </label>
                     <input type="radio" id="star4" name="rate" value="4" onChange={(e) => setRate(e.target.value)} />
                     <label htmlFor="star4" title="4">
                        4 stars
                     </label>
                     <input type="radio" id="star3" name="rate" value="3" onChange={(e) => setRate(e.target.value)} />
                     <label htmlFor="star3" title="3">
                        3 stars
                     </label>
                     <input type="radio" id="star2" name="rate" value="2" onChange={(e) => setRate(e.target.value)} />
                     <label htmlFor="star2" title="2">
                        2 stars
                     </label>
                     <input type="radio" id="star1" name="rate" value="1" onChange={(e) => setRate(e.target.value)} />
                     <label htmlFor="star1" title="1">
                        1 star
                     </label>
                  </div>
                  <div className="form-group">
                     <label>Votre commentaire</label>
                     <textarea className="commentArea" name="review" onChange={(e) => setReview(e.target.value)} required></textarea>
                  </div>
                  <div className="form-group">
                     <button className="btnComment" onClick={getRate}>
                        Envoyer
                     </button>
                  </div>
               </form>
            </div>
            {/* <div className="span2">
                <h2 className="titleComment">Commentaires</h2>
                @if(count($ratings)>0)
                    @foreach($ratings as $rating)
                        <div className="usersComments">
                            <div className="starsComment">
                            <?php
                                $count=1;
                                while($count<=$rating['rate']) {?>
                                    <span>&#9733;</span>
                            <?php $count++; }?>
                            </div>
                            <p>{{$rating['review']}}</p>
                            <p>Par {{$rating['user']['name']}}</p>
                            <p>Posté le: {{date("d-m-Y H:i", strtotime($rating['created_at']))}}</p>
                        </div>
                    @endforeach
                @else
                    <p className="noComment"><b>Aucun commentaires n'est disponible pour ce livre</b></p>
                @endif
            </div> */}
         </div>
      </>
   );
}
export default DetailsPlace;
