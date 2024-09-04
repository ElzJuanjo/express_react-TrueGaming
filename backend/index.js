import express from "express";
import cors from "cors";
import { config } from './src/config.js';
import { routes } from "./src/modules/routes.js";
import { encrypt } from "./src/modules/encrypt.js";
import { token } from "./src/modules/email/token.js";

const app = express();

// Inicialización
app.use(cors());
app.set("port", config.app.port);
app.listen(app.get("port"), () => {
    console.log(`El servidor se está ejecutando...`);
    console.log(`» Enlace: http://localhost:${app.get("port")}/`)
});

// Rutas
app.use('/all', routes.all);
app.use('/read', routes.read);
app.use('/create', routes.create);
app.use('/encrypt', encrypt.encrypted);
app.use('/verify', encrypt.verify);
app.use('/token', token.sendToken);