import express from "express";
import { controller } from "../db/controller.js";
import { success, reject } from "../response.js";

const all = express.Router();


all.get('/:table/:order?/:correo?', (req, res) => {
    const table = req.params.table;

    if (table == 'reviews') {
        const order = req.params.order;
        const correo = decodeURIComponent(req.params.correo);

        controller.reviews(order, correo)
            .then(answer => {
                success(req, res, answer.rows, 200);
            })
            .catch(error => {
                reject(req, res, error, 500);
            });
    } else {
        controller.all(table)
            .then(answer => {
                success(req, res, answer.rows, 200);
            })
            .catch(error => {
                reject(req, res, error, 500);
            });
    }
});

const read = express.Router();

read.get('/:table/:column/:id', (req, res) => {
    const table = req.params.table;
    const column = req.params.column;
    const id = decodeURIComponent(req.params.id);
    controller.read(table, column, id)
        .then(async answer => {
            success(req, res, answer.rows[0], 200);
        })
        .catch(error => {
            reject(req, res, error, 500);
        });
});

const create = express.Router();

create.post('/:table/:columns/:data', (req, res) => {
    const table = req.params.table;
    const columns = req.params.columns;
    const data = decodeURIComponent(req.params.data);
    controller.create(table, columns, data)
        .then(answer => {
            success(req, res, answer, 200);
        })
        .catch(error => {
            reject(req, res, error, 500);
        });
});

create.use(express.json());

create.post('/:table/:columns', (req, res) => {
    const table = req.params.table;
    const columns = req.params.columns;
    const data = req.body;
    controller.createWithBody(table, columns, data)
        .then(answer => {
            success(req, res, answer, 200);
        })
        .catch(error => {
            reject(req, res, error, 500);
        });
});

const update = express.Router();

update.post('/:table/:column/:data/:ref/:id', (req, res) => {
    const table = req.params.table;
    const column = req.params.column;
    const data = decodeURIComponent(req.params.data);
    const ref = req.params.ref;
    const id = decodeURIComponent(req.params.id);

    controller.update(table, column, data, ref, id)
        .then(answer => {
            success(req, res, answer, 200);
        })
        .catch(error => {
            reject(req, res, error, 500);
        });
});

const del = express.Router();

del.post('/:table/:column/:id', (req, res) => {
    const table = req.params.table;
    const column = req.params.column;
    const id = decodeURIComponent(req.params.id);

    controller.del(table, column, id)
        .then(answer => {
            success(req, res, answer, 200);
        })
        .catch(error => {
            reject(req, res, error, 500);
        });
});

del.post('/:id_resena/:correo_autor', (req, res) => {
    const id_resena = decodeURIComponent(req.params.id_resena);
    const correo_autor = decodeURIComponent(req.params.correo_autor);

    controller.deleteLike(id_resena, correo_autor)
        .then(answer => {
            success(req, res, answer, 200);
        })
        .catch(error => {
            reject(req, res, error, 500);
        });
});

export const routes = {
    all,
    read,
    create,
    update,
    del
};