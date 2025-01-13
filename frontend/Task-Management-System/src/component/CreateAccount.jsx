import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { registerApi } from "../service/AuthApiService";
import { useNavigate } from "react-router-dom";
import "../css/signup.css";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleRegistrationForm(event) {
    event.preventDefault();

    if (validateForm()) {
      const register = { username, email, password };

      registerApi(register)
          .then((response) => {
            console.log("Account created:", response.data);
            navigate("/login");
          })
          .catch((error) => console.error("Registration failed:", error));
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (!username.trim()) {
      errorsCopy.username = "Username is required";
      valid = false;
    } else {
      errorsCopy.username = "";
    }

    if (!email.trim()) {
      errorsCopy.email = "Email is required";
      valid = false;
    } else if (!isValidEmail(email)) {
      errorsCopy.email = "Invalid email address";
      valid = false;
    } else {
      errorsCopy.email = "";
    }

    if (!password.trim()) {
      errorsCopy.password = "Password is required";
      valid = false;
    } else if (!isValidPassword(password)) {
      errorsCopy.password = "Password must be at least 6 characters long";
      valid = false;
    } else {
      errorsCopy.password = "";
    }

    setErrors(errorsCopy);

    return valid;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    return password.length >= 6;
  }

  return (
      <div className="signup-page">
        <Container>
          <Row className="justify-content-center">
            <Col md={5}>
              <div className="signup-form p-4 shadow rounded">
                <h2 className="text-center mb-4">Create Account</h2>
                <form onSubmit={handleRegistrationForm}>
                  <div className="form-group mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className={`form-control ${
                            errors.username ? "is-invalid" : ""
                        }`}
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && (
                        <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        className={`form-control ${
                            errors.email ? "is-invalid" : ""
                        }`}
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className={`form-control ${
                            errors.password ? "is-invalid" : ""
                        }`}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Create Account
                  </button>
                </form>
                <div className="text-center mt-3">
                  <small>
                    Already have an account?{" "}
                    <a href="/login" className="text-primary">
                      Login here
                    </a>
                  </small>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
  );
};

export default CreateAccount;
