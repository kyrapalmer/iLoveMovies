const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//put routes here
router
    .route('/')
    .get(controller.list)
    .all(methodNotAllowed)

module.exports = router;