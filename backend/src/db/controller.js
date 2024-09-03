import { crud } from "./mysql.js";

const all = (table) => {
    return crud.all(table);
};

const create = (table, columns, data) => {
    const newData = data.split(',').map(item => `'${item}'`).join(',');
    return crud.create(table, columns, newData);
};

const read = (table, column, id) => {
    return crud.read(table, column, id);
};

const update = (table, data, id) => {
    return crud.update(table, data, id);
};

const del = (table, id) => {
    return crud.del(table, id);
};

export const controller = {
    all,
    create,
    read,
    update,
    del
}