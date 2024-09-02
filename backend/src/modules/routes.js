import express from "express";
import { controller } from "../db/controller.js";
import { success, reject } from "../response.js";

const all = express.Router();

all.get('/:table', (req, res) => {
    const table = req.params.table;
    controller.all(table)
        .then(answer => {
            success(req, res, answer, 200);
        })
        .catch(error => {
            reject(req, res, error, 500);
        });
});

const read = express.Router()

read.get('/:table/:column/:id', (req, res) => {
    const table = req.params.table;
    const column = req.params.column;
    const id = req.params.id;
    const connect = controller.read(table, column, id)
        .then(answer => {
            success(req, res, answer, 200);
        })
        .catch(error => {
            reject(req, res, error, 500);
        });
});

export const routes = {
    all,
    read
};