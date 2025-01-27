import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 

import User from './models/User.js';
import Launch from './models/Launch.js';

const app = express();

app.use(express.json());

app.use(cors());

app.get("/users", async (request, response) => {
    try {
        const users = await User.find();
        return response.json(users);
    } catch (error) {
        return response.status(500).json({ error: "Erro ao buscar usuários ❌" });
    }
});

app.post("/users", async (request, response) => {
    try {
        const { name } = request.body;
        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return response.status(400).json({ error: "Nome já existe no banco de dados ❌" });
        }
        const newUser = await User.create(request.body);
        return response.status(201).json(newUser);
    } catch (error) {
        return response.status(500).json({ error: "Erro ao criar usuário" });
    }
});

app.get("/launch", async (request, response) => {
    try {
        const users = await Launch.find();
        return response.json(users);
    } catch (error) {
        return response.status(500).json({ error: "Erro ao buscar lançamentos ❌" });
    }
});

app.post("/launch", async (req, res) => {
    try {
      const {
        flight_number,
        mission_name,
        rocketName,
        costPerLaunch,
        profitMargin,
        totalPrice,
        launchDate,
        isLaunched,
      } = req.body;
      const newLaunch = await Launch.create({
        flight_number: flight_number,
        mission_name: mission_name,
        rocketName: rocketName,
        costPerLaunch: costPerLaunch,
        profitMargin: profitMargin,
        totalPrice: totalPrice,
        launchDate: launchDate,
        isLaunched: isLaunched,
      });
      const launchData = newLaunch.toObject(); 

      return res.status(201).json(launchData); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao criar lançamento e cotação." });
    }
  });
  
mongoose
    .connect("mongodb+srv://vinicius:S2kuYlCDkfSLoZAt@cluster0.dqyfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Banco de dados conectado ✅"))
    .catch((error) => console.log("Erro ao se conectar com o banco de dados ❌", error));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
