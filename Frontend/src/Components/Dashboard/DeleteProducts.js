import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getProduct, deleteProduct } from "../../services/api";
import { Modal, Button } from "react-bootstrap";

const DeleteProducts = () => {
  const [productData, setProductData] = useState([]); // State to store product data
  const [searchTerm, setSearchTerm] = useState(""); // State to handle search term
  const [selectedProduct, setSelectedProduct] = useState(null); // State to track selected product for details modal
  const [showModal, setShowModal] = useState(false); // State to control visibility of the details modal

  // Fetch product data on component mount
  useEffect(() => {
    getProductDetail();
  }, []);

  // Function to fetch product details
  const getProductDetail = async () => {
    try {
      const result = await getProduct();
      if (result && result.data) {
        setProductData(result.data);
      } else {
        console.error("Invalid data structure in the API response:", result);
      }
    } catch (error) {
      console.error("Error fetching Products details:", error);
    }
  };

  // Function to open details modal for a specific product
  const openProductDetailsModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Function to close details modal
  const closeProductDetailsModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  // Filtered products based on search term
  const filteredProducts = productData.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle deleting products
  const handleDeleteProducts = async (product) => {
    const productId = product.productId;

    try {
      // Call the deleteProduct API with the product ID
      await deleteProduct(productId);

      // Update the productData state by filtering out the deleted product
      setProductData((prevProducts) =>
        prevProducts.filter((prod) => prod.productId !== productId)
      );

      // Close the modal if the deleted product is the currently selected one
      if (selectedProduct && selectedProduct.productId === productId) {
        closeProductDetailsModal();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      // Provide user feedback on deletion failure if needed
    }
  };

  // JSX for the component
  return (
    <div className="card shadow container bg-black text-white w-75 ">
      <div className="mb-3">
        <input
          type="text"
          className="form-control search-bar"
          placeholder="Search by Product Name"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table table-bordered mt-3 bg-black text-white">
        <thead>
          <tr>
            <th className="bg-black text-white">Product ID</th>
            <th className="bg-black text-white">Product Name</th>
            <th className="bg-black text-white">Category</th>
            <th className="bg-black text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.productId}>
              <td className="bg-black text-white">{product.productId}</td>
              <td className="bg-black text-white">{product.productName}</td>
              <td className="bg-black text-white">{product.productCategory}</td>
              <td className="bg-black text-white">
                <button
                  className="btn btn-primary text-white me-2"
                  onClick={() => openProductDetailsModal(product)}
                >
                  View Details
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteProducts(product)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Product Details Modal */}
      <Modal show={showModal} onHide={closeProductDetailsModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct?.productName} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <img
                  src={selectedProduct?.productImageURL}
                  alt={selectedProduct?.productName}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-6">
                <p>Product ID: {selectedProduct?.productId}</p>
                <p>Category: {selectedProduct?.productCategory}</p>
                <p>Price: ${selectedProduct?.productPrice}</p>
                <p>Sizes: {selectedProduct?.productSizes.join(", ")}</p>
                <p>Colors: {selectedProduct?.productColors.join(", ")}</p>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button className="btn btn-dark text-white" onClick={closeProductDetailsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteProducts;
