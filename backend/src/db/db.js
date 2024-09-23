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

const reviews = (order, sessionUserEmail) => {
    let query = `
    SELECT 
        r.id_resena,
        r.titulo_resena,
        j.titulo_juego,
        r.imagen_resena,
        r.resena,
        r.puntuacion,
        r.fecha_resena,
        u.nickname,
        u.correo,
        u.avatar,
        COUNT(DISTINCT l.id_like) AS total_likes
    `;
    if (sessionUserEmail) {
        query += `,
        (SELECT COUNT(DISTINCT l2.id_like)
        FROM likeresenia l2
        WHERE l2.correo_autor = '${sessionUserEmail}' 
        AND l2.id_resena = r.id_resena) AS liked,
        COUNT(DISTINCT c.id_comentarioresena) AS total_comentarios
        `;
    }
    query += `
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
            r.resena, r.puntuacion, r.fecha_resena, u.nickname, u.avatar, u.correo
        ORDER BY 
            ${order} DESC;
    `;
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

const review = (id_resena, sessionUserEmail) => {
    let query = `
    SELECT 
        r.id_resena,
        r.titulo_resena,
        j.titulo_juego,
        r.imagen_resena,
        r.resena,
        r.puntuacion,
        r.fecha_resena,
        u.nickname,
        u.correo,
        u.avatar,
        COUNT(DISTINCT l.id_like) AS total_likes
    `;
    if (sessionUserEmail) {
        query += `,
        (SELECT COUNT(DISTINCT l2.id_like)
        FROM likeresenia l2
        WHERE l2.correo_autor = '${sessionUserEmail}' 
        AND l2.id_resena = r.id_resena) AS liked,
        COUNT(DISTINCT c.id_comentarioresena) AS total_comentarios
        `;
    }
    query += `
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
        WHERE 
            r.id_resena = ${id_resena}
        GROUP BY 
            r.id_resena, r.titulo_resena, j.titulo_juego, r.imagen_resena, 
            r.resena, r.puntuacion, r.fecha_resena, u.nickname, u.avatar, u.correo
    `;
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

const reviewComments = (id_resena, sessionUserEmail) => {
    console.log('fuck'+sessionUserEmail)
    let query = `
    SELECT 
        r.id_resena,
        c1.id_comentarioresena,
        c1.comentario,
        c1.fecha_comentario,
        u.correo,
        u.nickname,
        u.avatar,
    `;
    if (sessionUserEmail) {
        query += `
        CASE 
            WHEN u.correo = '${sessionUserEmail}' THEN 1
            ELSE 0
        END AS commented
        `;
    }
    query += `
        FROM 
            resena r
        JOIN 
            comentarioresena c1 ON c1.id_resena = r.id_resena
        JOIN 
            usuario u ON c1.correo_autor = u.correo
        WHERE 
            c1.id_resena = ${id_resena}
        GROUP BY 
            r.id_resena, c1.id_comentarioresena, c1.comentario, 
            c1.fecha_comentario, u.correo, u.nickname, u.avatar
        ORDER BY 
            c1.fecha_comentario DESC;
    `;
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

const deleteLike = (id_resena, correo_autor) => {
    return new Promise((resolve, reject) => {
        connection.query(`
            DELETE FROM
                likeresenia
            WHERE
                id_resena = ${id_resena}
            AND
                correo_autor = '${correo_autor}'

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
    reviews,
    reviewComments,
    review,
    deleteLike
};