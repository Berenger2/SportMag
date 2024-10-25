import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

export default function Product({ product }) {
  const [showModal, setShowModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const getRandomImageIndex = () => Math.floor(Math.random() * 10) + 1;
  const randomImage = `assets/images/shop/product/s${getRandomImageIndex()}.jpg`;
  const handleShow = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/product/${product._id}`);
      setProductDetails(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails du produit", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setProductDetails(null); // Réinitialise les détails du produit
  };

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
            <Link to="#" onClick={handleShow}>
            <img src={randomImage} className="img-fluid" alt={product.product} />
            </Link>
            <ul className="list-unstyled shop-icons">
              <li>
                <Link to="#" className="btn btn-icon btn-pills btn-soft-danger">
                  <i data-feather="heart" className="icons"></i>
                </Link>
              </li>
              <li className="mt-2">
                <Link to="#" onClick={handleShow} className="btn btn-icon btn-pills btn-soft-primary">
                  <i data-feather="eye" className="icons"></i>
                </Link>
              </li>
            </ul>
            <div className="card-body content pt-4 p-2">
              <h4 className="text-dark product-name">
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

      {/* Modal pour afficher les détails du produit */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Détails du Produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productDetails ? (
            <div>
              <h5>{productDetails.product}</h5>
              <p><strong>Description :</strong> {productDetails.description}</p>
              <p><strong>Prix :</strong> {productDetails.price.toFixed(2)} €</p>
              <p><strong>Stock :</strong> {productDetails.stock}</p>
              <p><strong>Catégorie :</strong> {productDetails.category.category}</p>
            </div>
          ) : (
            <p>Chargement des détails...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
