import { crud } from "./db.js";

const all = (table) => {
    return crud.all(table);
};

const create = (table, columns, data) => {
    const newData = data.split(',').map(item => `'${item}'`).join(',');
    return crud.create(table, columns, newData);
};

const createWithBody = (table, columns, data) => {
    const values = Object.values(data);
    const newData = values.map(value => `'${value}'`).join(', ');;
    return crud.create(table, columns, newData);
};

const read = (table, column, id) => {
    return crud.read(table, column, id);
};

const update = (table, column, data, reference, id) => {
    return crud.update(table, column, data, reference, id);
};

const del = (table, column, id) => {
    return crud.del(table, column, id);
};

const deleteLike = (id_resena, correo_autor) => {
    return crud.deleteLike(id_resena, correo_autor)
}

const reviews = (order, sessionUserEmail) => {
    return crud.reviews(order, sessionUserEmail);
}

const accountReviews = (order, sessionUserEmail, email) => {
    return crud.accountReviews(order,sessionUserEmail,email);
}

const review = (id_resena, sessionUserEmail) => {
    return crud.review(id_resena, sessionUserEmail);
}

const reviewComments = (id_resena, sessionUserEmail) => {
    return crud.reviewComments(id_resena,sessionUserEmail);
}

const getGamesByName = (search) => {
    return crud.getGamesByName(search)
}

const reviewsGame = (id_juego, sessionUserEmail) => {
    return crud.reviewsGame(id_juego,sessionUserEmail)
}

const readGame = (id) => {
    return crud.readGame(id)
}

export const controller = {
    all,
    create,
    createWithBody,
    read,
    update,
    del,
    deleteLike,
    reviews,
    accountReviews,
    reviewComments,
    getGamesByName,
    readGame,
    reviewsGame,
    review
}