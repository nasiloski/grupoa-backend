const express = require("express");
const routes = express.Router();
const databaseController = require("./controllers/studentsController")

routes.post("/students/create", databaseController.store);
routes.get("/students/list", databaseController.show);
routes.post("/students/delete/:ra", databaseController.destroy);
routes.get("/students/:ra", databaseController.studentsData);

module.exports = routes;