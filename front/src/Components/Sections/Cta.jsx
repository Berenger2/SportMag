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
                      End of Season Clearance <br /> Sale upto 30%
                    </h2>
                    <p className="para-desc text-black mb-0">
                      Launch your campaign and benefit from our expertise on
                      designing and managing conversion centered bootstrap v5
                      html page.
                    </p>
                    <div className="mt-4">
                      <Link to="/shop" className="btn btn-primary">
                        Shop Now
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
