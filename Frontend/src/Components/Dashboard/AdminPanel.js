// AdminPanel.jsx

import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import Dashboard from './Dashboard';
import Products from './Products';
import AddProducts from './AddProducts';
import DeleteProducts from './DeleteProducts';
import UpdateProduct from './UpdateProduct';

function AdminPanel() {
  // State to track the selected menu item
  const [selectedMenuItem, setSelectedMenuItem] = useState('');

  // Function to handle menu item clicks
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  // Function to render the appropriate component based on the selected menu item
  const renderComponent = () => {
    switch (selectedMenuItem) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'add':
        return <AddProducts />;
      case 'delete':
        return <DeleteProducts />;
      case 'update':
        return <UpdateProduct />;
      default:
        return null; // No other components available for now
    }
  };

  return (
    <div className="container-fluid bg-dark text-white min-vh-100">
      {/* Main Row */}
      <div className="row">
        {/* Sidebar Column */}
        <div className="col-2 bg-black min-vh-100">
          {/* Sidebar component with onMenuItemClick prop */}
          <Sidebar onMenuItemClick={handleMenuItemClick} />
        </div>
        {/* Main Content Column */}
        <div className="col-10 my-4">
          {/* Render the appropriate component based on the selected menu item */}
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
