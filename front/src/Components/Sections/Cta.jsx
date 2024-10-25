import React from "react";
import { Link } from "react-router-dom";

export default function Cta() {
  return (
    <>
      <section className="section">
        <div className="container-fluid mt-100 mt-60">
          <div
            className="rounded py-5"
            style={{ background: "url('assets/images/shop/cta.jpg') fixed" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="section-title">
                    <h2 className="fw-bold text-black mb-4">
                      Offres Spéciales de Fin de Saison <br /> Location jusqu'à
                      30%
                    </h2>
                    <p className="para-desc text-black mb-0">
                      Profitez de nos offres exceptionnelles sur la location
                      d'équipements sportifs. Réservez maintenant et
                      préparez-vous à vivre des aventures inoubliables !
                    </p>
                    <div className="mt-4">
                      <Link to="/location" className="btn btn-primary">
                        Louez Maintenant
                      </Link>
                    </div>
                  </div>
                </div>
                {/*end col*/}
              </div>
              {/*end row*/}
            </div>
            {/*end container*/}
          </div>
        </div>
        {/*end container*/}
      </section>
    </>
  );
}
