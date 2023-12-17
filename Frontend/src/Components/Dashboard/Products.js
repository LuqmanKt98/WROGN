import React, { useEffect, useState } from 'react';
// import '../Dashboard/Css/Product.css'
import { getProduct } from '../../services/api';

function Products() {

useEffect(()=>{
  getProductDetails();
});

const getProductDetails = async () => {

  const result = await getProduct();
  console.log(result.data);
  if (result) {
    setProducts(result.data);
  } else {
    alert("Something went wrong");
  }
};

  const initialProducts = [
    // Sample data (replace this with your actual data)
    {
      id: 1,
      name: 'Nike Tshirts for Men',
      imageUrl: 'https://www.freepnglogos.com/uploads/t-shirt-png/t-shirt-png-printed-shirts-south-africa-20.png',
      // sizes: ['sm', 'md', 'lg'],
      // colors: ['light', 'blue', 'green', 'orange', 'pink'],
      originalPrice: '5500 Rs',
      discountedPrice: '4500 Rs',
    },
    // Add more products as needed
  ];

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      (selectedSize === 'All' || product.sizes.includes(selectedSize)) &&
      (selectedPrice === 'All' || product.price === selectedPrice)
    );
  });

  return (
    <div>
      <div class="">
        {/* Dropdown filters */}
        <div className="dropdown m-2">
          <select
            className="btn bg-black text-white me-3 dropdown-toggle"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="All">Category</option>
            {/* Add your category options here */}
          </select>
          <select
            className="btn bg-black text-white me-3 dropdown-toggle"
            onChange={handleSizeChange}
            value={selectedSize}
          >
            <option value="All">Size</option>
            {/* Add your size options here */}
          </select>
          <select
            className="btn bg-black text-white me-3 dropdown-toggle"
            onChange={handlePriceChange}
            value={selectedPrice}
          >
            <option value="All">Price</option>
            {/* Add your price options here */}
          </select>
        </div>
      </div>

      {/* Product cards */}
      <div className=" my-5 row "  >
        {filteredProducts.map((product) => (
          <div key={product.productId} className="col-md-3 pt-md-0 ">
            <div className="card d-flex flex-column align-items-center">
              <div className="product-name"><h6 className='text-primary fw-bold'>{product.productName}</h6></div>
              <div className="card-img">
                <img src={product.productImageURL} alt="" height="100" id="shirt" />
              </div>
              <div className="text-light text-center">Available Sizes</div>
              <div id="avail-size">{/* Add your size filter here */}</div>
              <div className="card-body pt-0 " >
                <div className="text-light text-center mt-auto">Available Colors</div>
                <div className="d-flex align-items-center justify-content-center colors my-2">
                  {/* Add your color filter here */}
                </div>
                <div className="d-flex align-items-center price mb-0">
                  <div className="del mr-2">
                    <span className="text-light">
                      <strong>$ {product.productPrice}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
