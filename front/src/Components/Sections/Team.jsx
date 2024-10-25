import React from "react";
import { Link } from "react-router-dom";

export default function Team() {
  return (
    <>
      <section className="section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="section-title mb-4 pb-2">
                <h4 className="title">Notre Equipe</h4>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 mt-4 pt-2">
              <div className="card team team-primary text-center bg-transparent border-0">
                <div className="card-body p-0">
                  <div className="position-relative">
                    <img
                      src="https://media.licdn.com/dms/image/v2/D4E03AQHiE4YoNZxkIw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1703530091184?e=1735171200&v=beta&t=ETnJYTPTWGhVjRTPfUpmzcN4S-RQahKEExKjq3oGRPw"
                      className="img-fluid avatar avatar-ex-large rounded-circle shadow"
                      alt=""
                    />
                    <ul className="list-unstyled mb-0 team-icon">
                      <li className="list-inline-item">
                        <Link
                          to="https://www.linkedin.com/in/bera-kod/"
                          className="btn btn-primary btn-pills btn-sm btn-icon"
                        >
                          <i className="fab fa-linkedin icons"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body py-3 px-0 content">
                    <h5 className="mb-0">
                      <Link to="" className="name text-dark">
                        Bérenger AKODO 
                      </Link>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt-4 pt-2">
              <div className="card team team-primary text-center bg-transparent border-0">
                <div className="card-body p-0">
                  <div className="position-relative">
                    <img
                      src="https://media.licdn.com/dms/image/v2/D4E35AQGncuXZKwpmBg/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1691588950223?e=1730458800&v=beta&t=uNQrh0CWnJ4jO9JHR0wpQv9api7RfWAelefb7my1M2g"
                      className="img-fluid avatar avatar-ex-large rounded-circle shadow"
                      alt=""
                    />
                    <ul className="list-unstyled mb-0 team-icon">
                      <li className="list-inline-item">
                        <Link
                          to="https://www.linkedin.com/in/etienne-vacher-254605282/"
                          className="btn btn-primary btn-pills btn-sm btn-icon"
                        >
                          <i className="fab fa-linkedin icons"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body py-3 px-0 content">
                    <h5 className="mb-0">
                      <Link to="" className="name text-dark">
                      Etienne VACHER
                      </Link>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          
         
          </div>
        </div>
      </section>
    </>
  );
}
