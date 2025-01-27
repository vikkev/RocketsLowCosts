import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom"; 

const AgeConfirm = () => {
  const { state } = useLocation();
  const user = state?.user;
  
  const [age, setAge] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (user && user.age) {
      setAge(user.age);
    } 
  }, [user]);

  if (!user) {
    return <div>Usuário não encontrado!</div>;
  }

  const cancelButton = () => {
    navigate("/");
  };

  const confirmButton = () => {
    navigate("/menu");
  };

  return (
    <Container className="mt-5 text-center" 
      style={{ 
        border: '1px solid #3366cc', 
        padding: '20px', 
        maxWidth: '30%', 
        borderRadius: '10px' }}>
      <Col>
        <Row>
          <h4>Sua idade é:</h4>
        </Row>
        <Row>
          <h1 style={{
            paddingTop: '5%',
            paddingBottom: '5%',
            fontSize: '106px',  
            fontWeight: 600,   
          }}>
            {age}
          </h1>
        </Row>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          width: '100%' }}>
          <Button as="input" size="lg" type="submit" value="Confirmar" className="mb-3" onClick={confirmButton} 
            style={{ width: '100%' }} />
          <Button as="input" size="lg" type="submit" value="Cancelar" variant="outline-none" onClick={cancelButton} 
            style={{ background: 'none', border: 'none', width: '100%' }} />
        </div>
      </Col>
    </Container>
  );
};

export default AgeConfirm;
