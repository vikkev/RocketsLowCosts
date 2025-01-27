import { useEffect, useState, useRef } from "react";
import React from "react";
import { Container, Row, Col, Image, Button, Form } from "react-bootstrap";
import api from "../../services/api";
import { useNavigate } from "react-router-dom"; 

const SignIn = () => {
  const [users, setUsers] = useState([]);
  const inputName = useRef();
  const inputAge = useRef();
  const navigate = useNavigate();

  async function getUsers() {
    const usersFromAPI = await api.get('/users');
    setUsers(usersFromAPI.data);
    console.log(users);
  }

  async function createUser(e) {
    e.preventDefault();
    try {
      await api.post('/users', {
        name: inputName.current.value,
        age: inputAge.current.value,
      });
      alert('Usuário criado com sucesso! ✅');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data.error === "Nome já existe no banco de dados ❌") {
        alert('Nome já existe no banco de dados ❌');
      } else {
        alert('Erro ao criar usuário. Tente novamente mais tarde. ❌');
      }
    }
  }
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container className="mt-5 text-center">
      <Row>
        <Col>
          <Image 
            src="https://skalaai.com/img_icon.svg"
            alt="imgHomePage"
            className="mx-auto d-block"
            style={{
              width: '30%'
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3 className="text-">Cadastrar</h3>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={4}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control 
                type="text" 
                placeholder="Digite seu nome" 
                ref={inputName}
              />
              <Form.Control 
                style={{ marginTop: '2%' }} 
                type="number" 
                placeholder="Digite sua idade" 
                ref={inputAge}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100" size="lg" onClick={createUser} style={{fontWeight: 900}}>
                Cadastrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
