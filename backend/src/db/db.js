import pg from "pg";
import { config } from "../config.js";

const connection = new pg.Pool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
});

const all = (table) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

const create = (table, columns, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} (${columns}) VALUES (${data})`, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

const read = (table, column, id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ${column} = '${id}'`, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

const update = (table, column, data, reference, id) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ${column} = '${data}' WHERE ${reference} = '${id}'`, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

const del = (table, column, id) => {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE ${column} = '${id}'`, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

const reviews = (order) => {
    return new Promise((resolve, reject) => {
        connection.query(`
            SELECT 
                r.id_resena,
                r.titulo_resena,
                j.titulo_juego,
                r.imagen_resena,
                r.resena,
                r.puntuacion,
                r.fecha_resena,
                u.nickname,
                u.avatar,
                COUNT(DISTINCT l.id_like) AS total_likes,
                COUNT(DISTINCT c.id_comentarioresena) AS total_comentarios
            FROM 
                resena r
            JOIN 
                juego j ON r.id_juego_resena = j.id_juego
            JOIN 
                usuario u ON r.correo_autor = u.correo
            LEFT JOIN 
                likeresenia l ON r.id_resena = l.id_resena
            LEFT JOIN 
                comentarioresena c ON r.id_resena = c.id_resena
            GROUP BY 
                r.id_resena, r.titulo_resena, j.titulo_juego, r.imagen_resena, 
                r.resena, r.puntuacion, r.fecha_resena, u.nickname, u.avatar
            ORDER BY ${order} DESC;
            `, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

export const crud = {
    all,
    create,
    read,
    update,
    del,
    reviews
};