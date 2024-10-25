import React from 'react';

const HomeHeader = () => {
  return (
    <section className="home-slider position-relative">
      <div id="carouselExampleInterval" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3000">
            <div className="bg-home slider-rtl-2 d-flex align-items-center" style={{ background: "url('assets/images/shop/1.jpg') center center" }}>
              <div className="bg-overlay bg-overlay-white opacity-5"></div>
              <div className="container">
                <div className="row align-items-center mt-5">
                  <div className="col-lg-7 col-md-7">
                    <div className="title-heading mt-4">
                    <h1 className="display-4 fw-bold mb-3 text-black">Explorez Notre Nouvelle Collection d'Accessoires Sportifs</h1>
<p className="para-desc text-black">Profitez de notre expertise pour découvrir les meilleures options de location d'équipements sportifs et lancez vos aventures avec style.</p>

                      <div className="mt-4">
                        <a href="javascript:void(0)" className="btn btn-soft-primary">Shop Now</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeHeader;