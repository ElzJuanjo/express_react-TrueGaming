import express from "express";
import cors from "cors";
import { config } from './src/config.js';
import { routes } from "./src/modules/routes.js";
import { encrypt } from "./src/modules/encrypt.js";
import { sendEmails } from "./src/modules/email/token.js";
import { uploads } from "./src/modules/upload.js";

const app = express();

// Inicialización
app.use(cors());
app.set("port", config.app.port);
app.listen(app.get("port"), () => {
    console.log(`El servidor se está ejecutando...`);
    console.log(`» Enlace: http://localhost:${app.get("port")}/`)
});

// Rutas
// CRUD
app.use('/all', routes.all);
app.use('/read', routes.read);
app.use('/create', routes.create);
app.use('/update', routes.update);
app.use('/delete', routes.del);

// SECURE
app.use('/encrypt', encrypt.encrypted);
app.use('/verify', encrypt.verify);
app.use('/token', sendEmails.sendToken);
app.use('/change', sendEmails.sendChange);
app.use('/notify', sendEmails.sendNotification);

// UPLOAD
app.use('/upload', uploads.upload);

// API DE JUEGOS
app.use('/igdb', routes.apiIGDB)