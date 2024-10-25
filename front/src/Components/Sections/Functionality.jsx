import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../Card/Product";

export default function Functionality() {
  const [products, setProducts] = useState([]); 

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/products");
        setProducts(response.data); 
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <section className="section overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h5 className="mb-0">Nos Produits</h5>
            </div>
          </div>

          <div className="row">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
