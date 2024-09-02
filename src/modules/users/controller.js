const db = require("../../db/mysql");

const all = (table) => {
    return db.all(table);
};

module.exports = {
    all
}