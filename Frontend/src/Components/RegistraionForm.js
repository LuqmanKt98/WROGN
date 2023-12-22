// RegistrationForm.js
import React, { useState } from "react";
import { addUser } from "../services/api";
import Header from "./Header";
import Footer from "./Footer";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { addGoogleUser } from "../services/api";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User Data : ", formData);
    try {
      // Call the API function for user registration
      const response = await addUser(formData);
      if (response) {
        alert("user registered successfully");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration failed");
    }

    console.log("Form submitted:", formData);
    // Reset the form after submission
    setFormData({
      fullName: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto my-3">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-dark fs-5">
                  Sign Up
                </h5>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    <label htmlFor="fullName">Full Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <label htmlFor="email">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-login text-uppercase fw-bold"
                      type="submit"
                      style={{ backgroundColor: "indigo", color: "white" }}
                    >
                      Sign Up
                    </button>
                  </div>
                  <hr className="my-4" />
                  <div className="d-grid mb-2">
                    {/* <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
                        console.log(credentialResponseDecoded);
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    /> */}
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn text-uppercase fw-bold"
                      type="button"
                      style={{ backgroundColor: "#1877f2", color: "white" }}
                    >
                      Sign Up with Facebook
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RegistrationForm;
