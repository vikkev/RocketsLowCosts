import { useEffect, useState, useRef } from "react";
import React from "react";
import { Container, Row, Col, Image, Button, Form } from "react-bootstrap";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputName = useRef();
  const navigate = useNavigate();  

  async function getUsers() {
    const usersFromAPI = await api.get("/users");
    setUsers(usersFromAPI.data);
    setLoading(false); 
  }

  async function login(event) {
    event.preventDefault(); 

    const userName = inputName.current.value;
    const userExists = users.some((user) => user.name === userName);

    if (userExists) {
      const user = users.find((user) => user.name === userName);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/confirmarIdade", { state: { user } });
    } else {
      alert("Usuário não encontrado!");
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Container className="mt-5 text-center">
      <Row>
        <Col>
          <Image
            src="https://skalaai.com/img_icon.svg"
            alt="imgHomePage"
            className="rounded mx-auto d-block"
            style={{
              width: "30%",
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3 className="text-">Login</h3>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={4}>
          <Form onSubmit={login}>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Digite seu nome" ref={inputName} />
            </Form.Group>
            <Button type="submit" variant="primary" size="lg" className="w-100" style={{fontWeight: 900}}>
              Entrar
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <p>Não tem conta? <a href="/cadastro">Cadastrar-se aqui</a></p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
