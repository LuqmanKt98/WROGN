import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchProductData, updateProduct } from "../../services/api";

const UpdateProduct = () => {
  const [productId, setProductId] = useState("");
  const [productData, setProductData] = useState({
    productName: "",
    productPrice: 0,
    productColors: [],
    productSizes: [],
    productCategory: "",
    productImageURL: "",
  });
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (productId && isDataFetched) {
      fetchProductDetails();
    }
  }, [productId, isDataFetched]);

  const fetchProductDetails = async () => {
    try {
      const result = await fetchProductData(productId);

      if (!result || !result.data) {
        console.error("Invalid data structure in the API response:", result);
        return;
      }

      setProductData(result.data);
      setIsEditMode(true);
    } catch (error) {
      console.error("Error fetching Product details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (type === "checkbox") {
      const updatedArray = checked
        ? [...productData[name], value]
        : productData[name].filter((item) => item !== value);

      setProductData((prevData) => ({
        ...prevData,
        [name]: updatedArray,
      }));
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsDataFetched(true);

    try {
      // Update the productData state with the modified values
      const updatedData = {};
      relevantKeys.forEach((key) => {
        updatedData[key] = productData[key];
      });

      await updateProduct(productId, updatedData);
      setIsEditMode(false);
      alert("Product Updated Successfully");

      // Update the productData state with the modified values
      setProductData(updatedData);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product. Please try again.");
    }
  };

  // Define an array of relevant keys
  const relevantKeys = [
    "productName",
    "productPrice",
    "productColors",
    "productSizes",
    "productCategory",
    "productImageURL",
  ];

  return (
    <div className="container w-75">
      <div className="card shadow">
        <div className="card-body bg-dark text-white">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="productId" className="form-label">
                Product ID:
              </label>
              <input
                type="text"
                id="productId"
                className="form-control"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
              />
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={fetchProductDetails}
            >
              Fetch Product Data
            </button>

            <div className="mt-4">
              <h5>Fetched Product Data</h5>
              <table className="table table-bordered bg-black text-white">
                <tbody className="bg-black text-white">
                  {Object.entries(productData)
                    .filter(([key]) => relevantKeys.includes(key))
                    .map(([key, value]) => (
                      <tr key={key}>
                        <th scope="row" className="bg-black text-white">{key}</th>
                        <td className="bg-black text-white">
                          {isEditMode ? (
                            <input
                              type={key === "productPrice" ? "number" : "text"}
                              name={key}
                              className="form-control"
                              value={
                                Array.isArray(value) ? value.join(", ") : value
                              }
                              onChange={handleChange}
                            />
                          ) : Array.isArray(value) ? (
                            value.join(", ")
                          ) : (
                            value
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <button type="submit" className="btn btn-primary text-white mt-4">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
