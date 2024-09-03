import mysql from "mysql";
import { config } from "../config.js";

const connection = mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
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
            resolve(results[0]);
        });
    });
};

const update = (table, data, id) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ${data} WHERE id = ${id}`, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

const del = (table, id) => {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE id = ${id}`, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

export const crud = {
    all,
    create,
    read,
    update,
    del
};