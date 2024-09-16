import { crud } from "./db.js";

const all = (table) => {
    return crud.all(table);
};

const create = (table, columns, data) => {
    const newData = data.split(',').map(item => `'${item}'`).join(',');
    return crud.create(table, columns, newData);
};

const createWithBody = (table, columns, data) => { //YO SE QUE ESTO ES UN SACRILEGIO PERO UNA REVIEW NO CABE EN UNA URL, ADEMÁS DE QUE LAS COMAS SE LO TIRAN
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

export const controller = {
    all,
    create,
    createWithBody,
    read,
    update,
    del
}