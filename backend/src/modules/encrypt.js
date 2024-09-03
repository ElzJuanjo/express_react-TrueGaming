import express from "express";
import bcrypt from "bcrypt";
import { success } from "../response.js";

function encriptarContrasena(contrasena) {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(contrasena, saltRounds);
    return hashedPassword;
}

function verificarContrasena(contrasenaEnBruto, contrasenaEncriptada) {
    const isMatch = bcrypt.compareSync(contrasenaEnBruto, contrasenaEncriptada);
    return isMatch;
}

const encrypted = express.Router();

encrypted.get('/:contrasena', (req, res) => {
    const contrasena = decodeURIComponent(req.params.contrasena);
    const hashedPassword = encriptarContrasena(contrasena);
    const response = {
        message: hashedPassword
    };
    success(req, res, response, 200);
});

const verify = express.Router();

verify.get('/:contrasena/:encrypted', (req, res) => {
    const contrasena = decodeURIComponent(req.params.contrasena);
    const encrypted = decodeURIComponent(req.params.encrypted);
    const isMatch = verificarContrasena(contrasena, encrypted);
    const response = {
        message: isMatch
    };
    success(req, res, response, 200);
});

export const encrypt = {
    encrypted,
    verify
}
