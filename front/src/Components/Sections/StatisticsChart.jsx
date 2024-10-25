import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { useApi } from "../../Context/ApiContext";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsChart = () => {
  const [chartData, setChartData] = useState(null);
  const { apiUrl } = useApi();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products`);
        const products = response.data;

        // Organiser les données par catégorie
        const categoryCounts = products.reduce((acc, product) => {
          const category = product.category._id; 
          acc[category] = (acc[category] || 0) + 1; 
          return acc;
        }, {});

        // Créer les labels et les données pour le graphique
        const labels = Object.keys(categoryCounts);
        const data = Object.values(categoryCounts);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Nombre de Produits par Catégorie",
              data: data,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };

    fetchProductData();
  }, [apiUrl]);

  if (!chartData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="rounded shadow mt-4">
      <div className="p-4 border-bottom">
        <h5 className="mb-0 text-danger">Statistiques des Produits par Catégorie</h5>
      </div>
      <div
        className="d-flex justify-content-center align-items-center mt-4 p-4"
        style={{ width: "100%", height: "400px" }} 
      >
        <div className="mt-4 text-center" style={{ width: "300px", height: "300px" }}>
          <Pie data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsChart;
