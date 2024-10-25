import React, { useEffect, useState } from "react";
import axios from "axios";
import { useApi } from "../../Context/ApiContext";
import { Modal, Button, Form } from "react-bootstrap";

export default function ProductList() {
  const { apiUrl } = useApi(); // Utilisez apiUrl si vous centralisez votre URL d’API
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    product: '',
    description: '',
    price: '',
    stock: '',
    category: '',
  });
  const [editProduct, setEditProduct] = useState({
    product: '',
    description: '',
    price: '',
    stock: '',
    category: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleShowProduct = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedProduct(null);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewProduct({
      product: '',
      description: '',
      price: '',
      stock: '',
      category: '',
    });
  };

  const handleShowEditModal = (product) => {
    setEditProduct(product);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditProduct({
      product: '',
      description: '',
      price: '',
      stock: '',
      category: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/product`, newProduct);
      setProducts([...products, response.data]);
      handleCloseAddModal();
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit", error);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/product/${editProduct._id}`, editProduct);
      setProducts(products.map(product => product._id === editProduct._id ? response.data : product));
      handleCloseEditModal();
    } catch (error) {
      console.error("Erreur lors de la modification du produit", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      try {
        await axios.delete(`http://localhost:8080/product/${productId}`);
        setProducts(products.filter(product => product._id !== productId)); // Mettre à jour la liste des produits
      } catch (error) {
        console.error("Erreur lors de la suppression du produit", error);
      }
    }
  };

  return (
    <>
      <div className="col-lg-8 col-12">
        <div className="component-wrapper rounded shadow">
          <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
            <h5 className="title mb-0">Liste des Produits</h5>
            <Button variant="primary" onClick={handleShowAddModal}>
              Ajouter un Produit
            </Button>
          </div>

          <div className="p-4">
            <div className="table-responsive bg-white shadow rounded">
              <table className="table table-hover mb-0 table-center">
                <thead>
                  <tr>
                    <th scope="col" className="border-bottom text-center">Produit</th>
                    <th scope="col" className="border-bottom text-center">Prix</th>
                    <th scope="col" className="border-bottom text-center">Stock</th>
                    <th scope="col" className="border-bottom text-center">Catégorie</th>
                    <th scope="col" className="border-bottom text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.product}</td>
                      <td>{product.price} €</td>
                      <td>{product.stock}</td>
                      <td>{product.category?.category || "N/A"}</td>
                      <td className="text-justify">
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => handleShowProduct(product)}
                        >
                          <i className="uil uil-eye"></i> Détails
                        </Button>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleShowEditModal(product)}
                          style={{ marginLeft: '5px' }}
                        >
                          <i className="uil uil-edit"></i> Modifier
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteProduct(product._id)}
                          style={{ marginLeft: '5px' }}
                        >
                          <i className="uil uil-trash"></i> Supprimer
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour les détails du produit */}
      <Modal show={showDetailModal} onHide={handleCloseDetailModal}>
        <Modal.Header closeButton>
          <Modal.Title>Détails du produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct ? (
            <div>
              <p><strong>Produit :</strong> {selectedProduct.product}</p>
              <p><strong>Prix :</strong> {selectedProduct.price} €</p>
              <p><strong>Description :</strong> {selectedProduct.description}</p>
              <p><strong>Stock :</strong> {selectedProduct.stock}</p>
              <p><strong>Catégorie :</strong> {selectedProduct.category.category}</p>
            </div>
          ) : (
            <p>Chargement des détails...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal pour ajouter un produit */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un Produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProduct}>
            <Form.Group controlId="product">
              <Form.Label>Nom du Produit</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le nom du produit"
                name="product"
                value={newProduct.product}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Entrez la description du produit"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Prix (€)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrez le prix du produit"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                required
                min="0"
              />
            </Form.Group>
            <Form.Group controlId="stock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrez le stock disponible"
                name="stock"
                value={newProduct.stock}
                onChange={handleInputChange}
                required
                min="0"
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Ajouter le Produit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal pour modifier un produit */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le Produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditProduct}>
            <Form.Group controlId="editProduct">
              <Form.Label>Nom du Produit</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le nom du produit"
                name="product"
                value={editProduct.product}
                onChange={handleEditInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="editDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Entrez la description du produit"
                name="description"
                value={editProduct.description}
                onChange={handleEditInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="editPrice">
              <Form.Label>Prix (€)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrez le prix du produit"
                name="price"
                value={editProduct.price}
                onChange={handleEditInputChange}
                required
                min="0"
              />
            </Form.Group>
            <Form.Group controlId="editStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrez le stock disponible"
                name="stock"
                value={editProduct.stock}
                onChange={handleEditInputChange}
                required
                min="0"
              />
            </Form.Group>
            <Form.Group controlId="editCategory">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={editProduct.category}
                onChange={handleEditInputChange}
                required
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Modifier le Produit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
