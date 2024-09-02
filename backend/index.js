import express from "express";
import cors from "cors";
import { config } from './src/config.js';
import { routes } from "./src/modules/routes.js";

const app = express();

// Inicialización
app.use(cors());
app.set("port", config.app.port);
app.set("db", config.mysql.database);
app.listen(app.get("port"), () => {
    console.log(`El servidor se está ejecutando...`);
    console.log(`» Puerto: ${app.get("port")}`)
    console.log(`» Base de datos: ${app.get("db")}`);
    console.log(`» Enlace: http://localhost:${app.get("port")}/`)
});

// Rutas
app.use('/all', routes.all);
app.use('/read', routes.read);
