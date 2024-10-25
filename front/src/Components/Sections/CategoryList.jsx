import React, { useEffect, useState } from "react";
import axios from "axios";
import { useApi } from "../../Context/ApiContext";
import { Modal, Button, Form } from "react-bootstrap";

export default function CategoryList() {
  const { apiUrl } = useApi();
  const [categories, setCategories] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    category: '',
    description: '',
    responsable: '',
  });
  const [editCategory, setEditCategory] = useState({
    category: '',
    description: '',
    responsable: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
      }
    };

    fetchCategories();
  }, [apiUrl]);

  const handleShowDetailModal = (category) => {
    setSelectedCategory(category);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedCategory(null);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewCategory({
      category: '',
      description: '',
      responsable: '',
    });
  };

  const handleShowEditModal = (category) => {
    setEditCategory(category);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditCategory({
      category: '',
      description: '',
      responsable: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/category`, newCategory);
      setCategories([...categories, response.data]);
      handleCloseAddModal();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie", error);
    }
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}/category/${editCategory._id}`, editCategory);
      setCategories(categories.map(category => category._id === editCategory._id ? response.data : category));
      handleCloseEditModal();
    } catch (error) {
      console.error("Erreur lors de la modification de la catégorie", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      try {
        await axios.delete(`${apiUrl}/category/${categoryId}`);
        setCategories(categories.filter(category => category._id !== categoryId)); // Mettre à jour la liste des catégories
      } catch (error) {
        console.error("Erreur lors de la suppression de la catégorie", error);
      }
    }
  };

  return (
    <>
      <div className="col-lg-8 col-12">
        <div className="component-wrapper rounded shadow">
          <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
            <h5 className="title mb-0">Liste des Catégories</h5>
            <Button variant="primary" onClick={handleShowAddModal}>
              Ajouter une Catégorie
            </Button>
          </div>

          <div className="p-4">
            <div className="table-responsive bg-white shadow rounded">
              <table className="table table-hover mb-0 table-center">
                <thead>
                  <tr>
                    <th scope="col" className="border-bottom text-center">Catégorie</th>
                    <th scope="col" className="border-bottom text-center">Description</th>
                    <th scope="col" className="border-bottom text-center">Responsable</th>
                    <th scope="col" className="border-bottom text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category._id}>
                      <td>{category.category}</td>
                      <td>{category.description || "N/A"}</td>
                      <td>{category.responsable}</td>
                      <td className="text-justify">
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => handleShowDetailModal(category)}
                        >
                          <i className="uil uil-eye"></i> Détails
                        </Button>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleShowEditModal(category)}
                          style={{ marginLeft: '5px' }}
                        >
                          <i className="uil uil-edit"></i> Modifier
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteCategory(category._id)}
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

      {/* Modal pour les détails de la catégorie */}
      <Modal show={showDetailModal} onHide={handleCloseDetailModal}>
        <Modal.Header closeButton>
          <Modal.Title>Détails de la catégorie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCategory ? (
            <div>
              <p><strong>Catégorie :</strong> {selectedCategory.category}</p>
              <p><strong>Description :</strong> {selectedCategory.description}</p>
              <p><strong>Responsable :</strong> {selectedCategory.responsable}</p>
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

      {/* Modal pour ajouter une catégorie */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Catégorie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddCategory}>
            <Form.Group controlId="category">
              <Form.Label>Nom de la Catégorie</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le nom de la catégorie"
                name="category"
                value={newCategory.category}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Entrez la description de la catégorie"
                name="description"
                value={newCategory.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="responsable">
              <Form.Label>Responsable</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le responsable de la catégorie"
                name="responsable"
                value={newCategory.responsable}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Ajouter la Catégorie
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal pour modifier une catégorie */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier la Catégorie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditCategory}>
            <Form.Group controlId="editCategory">
              <Form.Label>Nom de la Catégorie</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le nom de la catégorie"
                name="category"
                value={editCategory.category}
                onChange={handleEditInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="editDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Entrez la description de la catégorie"
                name="description"
                value={editCategory.description}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="editResponsable">
              <Form.Label>Responsable</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le responsable de la catégorie"
                name="responsable"
                value={editCategory.responsable}
                onChange={handleEditInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Modifier la Catégorie
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
