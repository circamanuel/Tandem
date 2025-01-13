import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { loginApi, saveLoggedUser, storeBasicAuth } from "../service/AuthApiService";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  async function handleLoginForm(event) {
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await loginApi(username, password);
        const basicAuth = "Basic " + btoa(username + ":" + password);
        const role = response.data.role;
        storeBasicAuth(basicAuth);
        saveLoggedUser(response.data.id, username, role);
        navigate(`/tasks`);
      } catch (error) {
        console.error("Login failed:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Invalid username or password",
        }));
      }
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

    if (!password.trim()) {
      errorsCopy.password = "Password is required";
      valid = false;
    } else {
      errorsCopy.password = "";
    }
    setErrors(errorsCopy);

    return valid;
  }

  return (
      <div className="login-page">
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col md={5}>
              <div className="login-form p-4 rounded shadow">
                <h2 className="text-center mb-4">Welcome Back</h2>
                <form onSubmit={handleLoginForm}>
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
                    Login
                  </button>
                </form>
                <div className="text-center mt-3">
                  <a href="/forgot-password" className="text-secondary">
                    Forgot password?
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
  );
};

export default LoginComponent;
