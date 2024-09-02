const express = require('express');
const response = require('../../red/response');
const controller = require("./controller");

const router = express.Router();

router.get('/', (req, res) => {
    const allDB = controller.all("usuario").then(result => {
        response.success(req, res, result, 200);
    });

});

module.exports = router;