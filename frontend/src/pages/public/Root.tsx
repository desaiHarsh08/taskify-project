import Button from "@/components/ui/Button";
import { FormEvent, useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "@/styles/Root.css";
import Modal from "@/components/ui/Modal";
import { doLogin } from "@/services/auth-apis";

const Root = () => {
  const navigate = useNavigate();

  const [showInvalidModal, setShowInvalidModal] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(credentials);
    if (credentials.email.trim() === "" || credentials.password.trim() === "") {
      setShowInvalidModal(true);
      return;
    }

    try {
      const { accessToken, user } = await doLogin(credentials);
      console.log(accessToken, user);
      console.log(document.cookie);
      navigate("/home", { replace: true });
    } catch (error) {
      console.log(error);
      setShowInvalidModal(true);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 bg-body-secondary"
    >
      <Card id="login-container" className="pb-4">
        <Card.Header className="d-flex gap-3 justify-content-center align-items-center flex-column">
          <div
            className="border p-3 d-flex justify-content-center align-items-center"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          >
            <img src="/taskify-logo.png" alt="logo-img" className="h-100 p-1" />
          </div>
          <Card.Title>TASKIFY SOFTWARE</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) =>
                  setCredentials((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Link to={"/"}>Forget Password</Link>
            </div>
            <div className="d-flex mt-5 justify-content-center">
              <Button variant="primary">Sign in</Button>
              <Modal
                open={showInvalidModal}
                onHide={() => setShowInvalidModal(false)}
                heading="Invalid Credentials"
                size="lg"
              >
                <p className="pb-4">Please provide the valid credentials!</p>
              </Modal>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Root;
