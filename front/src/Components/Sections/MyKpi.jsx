import React, { useEffect, useState } from "react";
import axios from "axios";
import { useApi } from "../../Context/ApiContext";

export default function MyKpi() {
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const { apiUrl } = useApi(); // URL de votre API

  useEffect(() => {
    // Fonction pour récupérer les statistiques
    const fetchStats = async () => {
      try {
        // Récupérer les produits
        const productsResponse = await axios.get(`${apiUrl}/products`);
        setProductCount(productsResponse.data.length);

        // Récupérer les catégories
        const categoriesResponse = await axios.get(`${apiUrl}/categories`);
        setCategoryCount(categoriesResponse.data.length);

        // Récupérer les utilisateurs
        const usersResponse = await axios.get(`${apiUrl}/users`);
        setUserCount(usersResponse.data.length);
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques :", error);
      }
    };

    fetchStats();
  }, [apiUrl]); // La dépendance apiUrl pour re-exécuter si l'URL change

  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-md-6 mt-4 pt-2">
          <div className="d-flex features feature-primary key-feature align-items-center p-3 rounded shadow">
            <div className="icon text-center rounded-circle me-3">{productCount}</div>
            <div className="flex-1">
              <h4 className="title mb-0">Nombre de produits</h4>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mt-4 pt-2">
          <div className="d-flex features feature-primary key-feature align-items-center p-3 rounded shadow">
            <div className="icon text-center rounded-circle me-3">{categoryCount}</div>
            <div className="flex-1">
              <h4 className="title mb-0">Catégorie</h4>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mt-4 pt-2">
          <div className="d-flex features feature-primary key-feature align-items-center p-3 rounded shadow">
            <div className="icon text-center rounded-circle me-3">{userCount}</div>
            <div className="flex-1">
              <h4 className="title mb-0">Utilisateurs</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
