import React from 'react';
import { Link } from 'react-router-dom';

export default function Product({ product }) {
  return (
    <>
      <div className="col-lg-3 col-md-6 col-12 mt-4 pt-2">
        <div className="card shop-list border-0 position-relative">
          <ul className="label list-unstyled mb-0">
            {product.stock > 0 && (
              <li>
                <Link to="#" className="badge badge-link rounded-pill bg-success">
                  In Stock
                </Link>
              </li>
            )}
          </ul>
          <div className="shop-image position-relative overflow-hidden rounded shadow">
            <Link to="">
              <img src="assets/images/shop/product/s1.jpg" className="img-fluid" alt={product.product} />
            </Link>
            <ul className="list-unstyled shop-icons">
              <li>
                <Link to="#" className="btn btn-icon btn-pills btn-soft-danger">
                  <i data-feather="heart" className="icons"></i>
                </Link>
              </li>
              <li className="mt-2">
                <Link to="#" data-bs-toggle="modal" data-bs-target="#productview" className="btn btn-icon btn-pills btn-soft-primary">
                  <i data-feather="eye" className="icons"></i>
                </Link>
              </li>
             
            </ul>
            <div className="card-body content pt-4 p-2">
            <h4 className="text-dark product-name ">
              {product.product}
            </h4>
           
            <div className="d-flex justify-content-between mt-1">
              <h6 className="text-dark small fst-italic mb-0 mt-1">
                {product.price.toFixed(2)} €
              </h6>
              
            </div>
          </div>
          </div>
     
        </div>
      </div>
    </>
  );
}
