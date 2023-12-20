import React, { createContext, useContext, useState, useEffect } from "react";

const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
   const [status, setStatus] = useState("");
   const [idUser, setIdUser] = useState("");
   const token = localStorage.getItem("token");

   async function getUserStatus() {
      try {
         if (token) {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
               },
            });

            if (response.ok) {
               const data = await response.json();
               setStatus(data.status);
               setIdUser(data.id);
            } else {
               console.error("Error fetching user status");
            }
         } else {
            console.error("Tokken error");
         }
      } catch (error) {
         console.error("Erreur:", error);
      }
   }
   useEffect(() => {
      getUserStatus();
   }, []);

   return <StatusContext.Provider value={{ status, setStatus, idUser, setIdUser }}>{children}</StatusContext.Provider>;
};

export const useStatus = () => {
   const context = useContext(StatusContext);
   if (!context) {
      throw new Error("useStatus must be used within a StatusProvider");
   }
   return context;
};
