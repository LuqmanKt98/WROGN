import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { AuthUser } from "../services/api";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { addGoogleUser } from "../services/api";

function SignIn() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleGoogleSignup = async (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    const email = credentialResponseDecoded.email;
    const name = credentialResponseDecoded.name;
    const googleObj = {
      name: name,
      email: email,
    };

    console.log("Google Object:", googleObj);

    // await addGoogleUser(googleEmail, googlePicture, isGoogleAccount);
    console.log(name, email);
    const response = await addGoogleUser(googleObj);
  };


  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await AuthUser(loginData);

      if (response.data) {
        console.log("User logged in successfully:", response.data);
        alert("you have Succesfully logged in");
      } else {
        console.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
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
                  Sign In
                </h5>
                <form onSubmit={handleLogin}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      name="email"
                      value={loginData.email}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      name="password"
                      value={loginData.password}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="rememberPasswordCheck"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="rememberPasswordCheck"
                    >
                      Remember password
                    </label>
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-login text-uppercase fw-bold"
                      type="submit"
                      style={{ backgroundColor: "indigo", color: "white" }}
                    >
                      Sign in
                    </button>
                  </div>
                  <hr className="my-4" />
                  <div className="d-grid mb-2">
                    <button
                      className="btn btn-danger btn-google text-uppercase fw-bold"
                      type="submit"
                    >
                      <i className="fab fa-google"></i> Sign in with Google
                    </button>
                  </div>
                  <div className="d-grid ">
                    <button
                      className="btn text-uppercase fw-bold "
                      type="submit"
                      style={{ backgroundColor: "#1877f2", color: "white" }}
                    >
                      Sign in with Facebook
                    </button>
                    <GoogleLogin
                      onSuccess={handleGoogleSignup}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
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

export default SignIn;
