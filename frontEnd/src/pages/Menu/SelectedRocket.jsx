import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Image, Row, Form, Button } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import api from "../../services/api";

const SelectedRocket = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { rocket, existingLaunch , launch } = location.state || {};
    const user = JSON.parse(localStorage.getItem("user"));

    const inputProfit = useRef();
    const inputDate = useRef();

    const [profit, setProfit] = useState(existingLaunch?.profit_margin || 0);
    const [launchDate, setLaunchDate] = useState(existingLaunch?.launch_date || "");
    const [totalPrice, setTotalPrice] = useState(existingLaunch?.total_price || null);
    async function createLaunch(e) { 
        e.preventDefault();
        try {
            await api.post('/launch', {
                flight_number: launch.flight_number,
                mission_name: launch.mission_name,
                rocketName: rocket.rocket_name,
                costPerLaunch: rocket.cost_per_launch,
                profitMargin: inputProfit.current.value,
                totalPrice: totalPrice.toFixed(2),
                launchDate: inputDate.current.value,
                isLaunched: true, 
            });
            alert('Lançamento realizado com sucesso! ✅');
            navigate('/menu');
        } catch (error) {
            alert('Erro ao realizar o lançamento. Tente novamente mais tarde. ❌');
        }
    }

    useEffect(() => {
        if (rocket && rocket.cost_per_launch && profit > 0) {
            const cost = rocket.cost_per_launch;
            const margin = (cost * profit) / 100;
            const total = cost + margin;
            setTotalPrice(total);
        }
    }, [rocket, profit]);

    const handleProfitChange = (e) => {
        setProfit(e.target.value);
    };

    const handleLaunchDateChange = (e) => {
        setLaunchDate(e.target.value);
    };

    const handleSubmit = (e) => {
        createLaunch(e);
    };

    return (
        <Container className="mt-5 text-center">
            <h3 className="text-start" style={{ 
                marginBottom: "7vh", 
                marginTop: "7vh", 
                fontWeight: 900}}>
                Olá, {user ? user.name : "Visitante"} selecione o lançamento
            </h3>
            <Row className="mb-4">
                <Col md={5}>
                    <h5>Foguete Selecionado:</h5>
                    <div
                        style={{
                            border: "1px solid rgba(51, 102, 204, 0.5)",
                            padding: "20px",
                            borderRadius: "10px",
                        }}
                    >
                        <Image src={rocket?.flickr_images?.[0] || "default-image.jpg"} fluid rounded />
                        <h3 className="font-weight-bold" style={{ marginTop: "20px",fontWeight: 900}}>
                            {rocket ? rocket.rocket_name : "Foguete Desconhecido"}
                        </h3>
                        <p><b>Nome da missão:</b> {launch?.mission_name || "Tipo de motor desconhecido"}</p>
                        <p><b>Tipo do motor:</b> {rocket?.engines?.type || "Tipo de motor desconhecido"}</p>
                        <p><b>Custo do lançamento:</b> {rocket?.cost_per_launch ? `$${rocket.cost_per_launch}` : "Custo desconhecido"}</p>
                        <p><b>Situação:</b> {rocket?.active ? "Ativo" : "Inativo"}</p>
                    </div>
                </Col>
                <Col md={6}>
                    <h5>Data e Lucro:</h5>
                    <div
                        style={{
                            border: "1px solid rgba(51, 102, 204, 0.2)",
                            padding: "20px",
                            borderRadius: "10px",
                        }}
                    >
                        <Form>
                            <Form.Group controlId="profitPercentage">
                                <Form.Label>% de lucro desejado</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Digite o % de lucro desejado"
                                    value={profit}
                                    onChange={handleProfitChange}
                                    ref={inputProfit}
                                />
                            </Form.Group>

                            <Form.Group controlId="launchDate">
                                <Form.Label>Data do Lançamento</Form.Label>
                                <Form.Control
                                    placeholder="Data do Lançamento"
                                    type="date"
                                    value={launchDate}
                                    onChange={handleLaunchDateChange}
                                    ref={inputDate}
                                />
                            </Form.Group>
                            <Button variant="primary" className="mt-3" onClick={handleSubmit}>
                                Realizar Lançamento
                            </Button>

                            {totalPrice !== null && (
                                <div className="mt-3">
                                    <p>Valor Total para o Lançamento: ${totalPrice.toFixed(2)}</p>
                                </div>
                            )}
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SelectedRocket;
