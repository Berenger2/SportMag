import React from "react";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <>
      <section className="section">
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-md-4 mt-4 pt-2">
              <div className="card shop-features border-0 rounded overflow-hidden">
                <img
                  src="assets/images/shop/fea1.jpg"
                  className="img-fluid"
                  alt="Location de Vélos"
                />
                <div className="category-title ms-md-4 ms-2">
                  <h4>Location de Vélos</h4>
                  <Link to="#" className="btn btn-sm btn-soft-primary mt-2">
                    Louez Maintenant
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-4 mt-4 pt-2">
              <div className="card shop-features border-0 rounded overflow-hidden">
                <img
                  src="assets/images/shop/fea2.jpg"
                  className="img-fluid"
                  alt="Location de Matériel de Plage"
                />
                <div className="category-title ms-md-4 ms-2">
                  <h4>Matériel de Plage</h4>
                  <Link to="#" className="btn btn-sm btn-soft-primary mt-2">
                    Louez Maintenant
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-4 mt-4 pt-2">
              <div className="card shop-features border-0 rounded overflow-hidden">
                <img
                  src="assets/images/shop/fea3.jpg"
                  className="img-fluid"
                  alt="Location d'Équipements de Randonnée"
                />
                <div className="category-title ms-md-4 ms-2">
                  <h4>Équipements de Randonnée</h4>
                  <Link to="#" className="btn btn-sm btn-soft-primary mt-2">
                    Louez Maintenant
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
