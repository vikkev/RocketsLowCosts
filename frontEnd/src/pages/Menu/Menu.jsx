import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Menu = () => {
  const [rockets, setRockets] = useState([]),
    [launches, setLaunches] = useState([]),
    [quotation, setQuotation] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rocketsResponse, launchesResponse, quotationResponse] = await Promise.all([
          api.get("https://api.spacexdata.com/v3/rockets"),
          api.get("https://api.spacexdata.com/v3/launches"),
          api.get("http://localhost:3000/launch"),
        ]);
        setRockets(rocketsResponse.data);
        setLaunches(launchesResponse.data);
        setQuotation(quotationResponse.data);
      } catch (error) {
        console.error("Erro ao carregar dados da SpaceX:", error);
      }
    };
    fetchData();
  }, []);

  const handleLaunchClick = (rocket, missionName, flightNumber) => {
    if (rocket.active) {
      const launch = launches.find(
        (launch) =>
          launch.flight_number === flightNumber && launch.mission_name === missionName
      );
      if (launch) {
        navigate("/selectedRocket", { state: { rocket, launch, launches } });
      } else {
        console.error("Lançamento não encontrado para o foguete", rocket.rocket_id);
      }
    }
  };

  return (
    <Container className="mt-5 text-center">
      <h3 className="text-start" style={{ 
        marginBottom: "7vh", 
        marginTop: "7vh",
        fontWeight: 900}}>
        Olá, {user ? user.name : "User"}, selecione o lançamento
      </h3>
      <Row
        className="d-flex flex-nowrap"
        style={{
          overflowX: "auto", 
          scrollbarWidth: "thin", 
          scrollbarColor: "#007bff #f1f1f1", 
        }}
      >
        {launches.map((launch, index) => {
          const rocket = rockets.find((rocket) => rocket.rocket_id === launch.rocket.rocket_id);
          const isRocketActive = rocket?.active;
          const currentQuotation = quotation.find(
            (q) => q.mission_name === launch.mission_name && q.flight_number === launch.flight_number
          );
          
          const isLaunched = currentQuotation?.isLaunched;

          return (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-2 d-flex">
              <div
                className="text-start d-flex flex-column justify-content-between"
                style={{
                    border: "1px solid rgba(51, 102, 204, 0.5)",
                    padding: "20px",
                    borderRadius: "10px",
                    backgroundColor: "#ffffff",
                    minHeight: "250px",
                    backgroundImage: "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
                    backgroundSize: "cover", 
                    backgroundRepeat: "no-repeat",
                }}
              >
                <Image
                  src={rocket?.flickr_images?.[0] || "default-image.jpg"}
                  alt={rocket ? rocket.rocket_name : "Foguete Desconhecido"}
                  fluid
                  rounded
                />
                <h3 style={{ 
                    marginTop: "20px",
                    fontWeight: 900 }}>
                  {rocket ? rocket.rocket_name : "Foguete Desconhecido"}
                </h3>
                <h5 style={{ marginTop: "5px" }}><b>Nome da missão: </b>{launch.mission_name}</h5>
                <h5 style={{ marginTop: "5px" }}><b>Ano de lançamento: </b>
                  {new Date(launch.launch_date_utc).getFullYear()}
                </h5>
                <Button
                  as="input"
                  size="lg"
                  type="button"
                  value={isLaunched ? "Foguete Lançado" : isRocketActive ? "Lançar foguete" : "Foguete Inativo"}
                  className="mb-3"
                  onClick={() => handleLaunchClick(rocket, launch.mission_name, launch.flight_number)}
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    backgroundColor: isRocketActive ? "#007bff" : "red",
                    borderColor: isRocketActive ? "#007bff" : "#6c757d",
                    cursor: isRocketActive ? "pointer" : "not-allowed",
                    fontWeight: 900,
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  }}
                  disabled={!isRocketActive || isLaunched}
                />
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Menu;
