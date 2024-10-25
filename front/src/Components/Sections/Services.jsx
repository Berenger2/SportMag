import React from 'react'
import { Link } from 'react-router-dom'

export default function Services() {
    return (
        <>
            <section className="section">
                <div className="container-fluid mt-4">
                    <div className="row">
                        <div className="col-md-4 mt-4 pt-2">
                            <div className="card shop-features border-0 rounded overflow-hidden">
                                <img src="assets/images/shop/fea1.jpg" className="img-fluid" alt="" />
                                <div className="category-title ms-md-4 ms-2">
                                    <h4>Summer <br /> Collection</h4>
                                    <Link to="#" className="btn btn-sm btn-soft-primary mt-2">Shop Now</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mt-4 pt-2">
                            <div className="card shop-features border-0 rounded overflow-hidden">
                                <img src="assets/images/shop/fea2.jpg" className="img-fluid" alt="" />
                                <div className="category-title ms-md-4 ms-2">
                                    <h4>Summer <br /> Collection</h4>
                                    <Link to="#" className="btn btn-sm btn-soft-primary mt-2">Shop Now</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mt-4 pt-2">
                            <div className="card shop-features border-0 rounded overflow-hidden">
                                <img src="assets/images/shop/fea3.jpg" className="img-fluid" alt="" />
                                <div className="category-title ms-md-4 ms-2">
                                    <h4>Summer <br /> Collection</h4>
                                    <Link to="#" className="btn btn-sm btn-soft-primary mt-2">Shop Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
