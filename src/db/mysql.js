const mysql = require('mysql');
const config = require('../config');

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
                console.error(`Error ejecutando la consulta: ${error}`);
                return reject(error);
            }
            resolve(results);
        });
    });
};

const create = (table, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ${data}`, (error, results) => {
            if (error) {
                console.error(`Error ejecutando la consulta: ${error}`);
                return reject(error);
            }
            resolve(results);
        });
    });
};

const read = (table, id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id = ${id}`, (error, results) => {
            if (error) {
                console.error(`Error ejecutando la consulta: ${error}`);
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
                console.error(`Error ejecutando la consulta: ${error}`);
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
                console.error(`Error ejecutando la consulta: ${error}`);
                return reject(error);
            }
            resolve(results);
        });
    });
};

module.exports = {
    all,
    create,
    read,
    update,
    del
};
